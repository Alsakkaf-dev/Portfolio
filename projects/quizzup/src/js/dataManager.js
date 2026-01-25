/**
 * @fileoverview QuizzUp Data Manager (Enhanced Architecture)
 * Implements a robust StorageEngine using IndexedDB with an in-memory Write-Through Cache.
 * Handles persistence for Users, Posts, Chat, and Quiz Content.
 * @author Mohammed Alsakkaf (Refactored by Jolce)
 */

const DB_NAME = 'QuizzUp_GlobalNexus';
const DB_VERSION = 1;
const STORES = {
    USERS: 'users',
    POSTS: 'posts',
    CHAT: 'chat',
    SYSTEM: 'system' // For quizData and other configs
};

class StorageEngine {
    constructor() {
        this.db = null;
        this.cache = {
            users: [],
            posts: [],
            chat: [],
            quizData: null
        };
        this.readyPromise = this.initDB();
    }

    /**
     * Initializes the IndexedDB connection and loads data into cache.
     */
    async initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(STORES.USERS)) {
                    db.createObjectStore(STORES.USERS, { keyPath: 'username' });
                }
                if (!db.objectStoreNames.contains(STORES.POSTS)) {
                    db.createObjectStore(STORES.POSTS, { keyPath: 'id' });
                }
                if (!db.objectStoreNames.contains(STORES.CHAT)) {
                    db.createObjectStore(STORES.CHAT, { keyPath: 'id', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains(STORES.SYSTEM)) {
                    db.createObjectStore(STORES.SYSTEM, { keyPath: 'key' });
                }
            };

            request.onsuccess = async (event) => {
                this.db = event.target.result;
                console.log("✅ [StorageEngine] Database Connected: " + DB_NAME);
                await this.loadCache();
                resolve();
            };

            request.onerror = (event) => {
                console.error("❌ [StorageEngine] Connection Failed:", event.target.error);
                reject(event.target.error);
            };
        });
    }

    /**
     * Loads all data from IDB into memory for synchronous access.
     */
    async loadCache() {
        try {
            this.cache.users = await this.getAll(STORES.USERS);
            this.cache.posts = await this.getAll(STORES.POSTS);
            this.cache.chat = await this.getAll(STORES.CHAT);

            const qData = await this.get(STORES.SYSTEM, 'quizData');
            this.cache.quizData = qData ? qData.value : null;

            console.log("✅ [StorageEngine] Cache Hydrated", {
                users: this.cache.users.length,
                posts: this.cache.posts.length,
                chat: this.cache.chat.length
            });
        } catch (e) {
            console.error("❌ [StorageEngine] Cache Load Error:", e);
        }
    }

    // --- Low Level IDB Helpers ---

    async getAll(storeName) {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async get(storeName, key) {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const request = store.get(key);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async put(storeName, item) {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            const request = store.put(item);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async delete(storeName, key) {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            const request = store.delete(key);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async clear(storeName) {
         return new Promise((resolve, reject) => {
            const tx = this.db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            const request = store.clear();
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
}

// Singleton Instance
const Storage = new StorageEngine();

/**
 * DataManager Facade
 * Exposes methods expected by app.js, bridging sync cache and async DB.
 */
const DataManager = {
    // --- Initialization ---
    init: async function() {
        await Storage.readyPromise;

        // Seeding / Migration Logic
        if (!Storage.cache.quizData && window.quizData) {
            console.log("🌱 [DataManager] Seeding Initial Quiz Data...");
            this.saveQuizData(window.quizData);
        }
    },

    // --- Quiz Data ---
    getQuizData: function() {
        // Fallback to window.quizData if cache is empty (first load before seed)
        return Storage.cache.quizData || window.quizData || {};
    },

    saveQuizData: function(data) {
        Storage.cache.quizData = data;
        Storage.put(STORES.SYSTEM, { key: 'quizData', value: data });
    },

    // --- Users ---
    getUsers: function() {
        return Storage.cache.users || [];
    },

    saveUsers: function(users) {
        Storage.cache.users = users;
        // Batch update implies rewriting logic.
        // For simplicity/robustness, we'll clear and rewrite or put individually.
        // Given 'users' is an array in App State, let's treat it as the source of truth.
        // But IDB stores individual users.
        // Optimization: We should update individual users, but the current app saves the WHOLE array.
        // We will loop and put.
        const tx = Storage.db.transaction(STORES.USERS, 'readwrite');
        const store = tx.objectStore(STORES.USERS);
        users.forEach(u => store.put(u));
    },

    // Helper to save single user (better performance)
    saveUser: function(user) {
        // Update cache
        const idx = Storage.cache.users.findIndex(u => u.username === user.username);
        if (idx >= 0) Storage.cache.users[idx] = user;
        else Storage.cache.users.push(user);

        // Update DB
        Storage.put(STORES.USERS, user);
    },

    deleteAllBotUsers: function() {
        const keep = Storage.cache.users.filter(u => !u.isBot);
        Storage.cache.users = keep;

        // In IDB, we have to delete them.
        // This is tricky without a "where" clause.
        // We'll clear and re-add real users for safety.
        Storage.clear(STORES.USERS).then(() => {
            keep.forEach(u => Storage.put(STORES.USERS, u));
        });

        return keep;
    },

    // --- Posts (Feed) ---
    getPosts: function() {
        // Sort by timestamp desc
        return Storage.cache.posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    },

    addPost: function(post) {
        Storage.cache.posts.unshift(post);
        Storage.put(STORES.POSTS, post);
    },

    savePosts: function(posts) {
        // This usually implies a delete occurred
        // We need to sync the list.
        // Find diff or just clear/rewrite?
        // Clear/rewrite is safer for prototype.
        Storage.cache.posts = posts;
        Storage.clear(STORES.POSTS).then(() => {
             posts.forEach(p => Storage.put(STORES.POSTS, p));
        });
    },

    // --- Chat ---
    getChatHistory: function() {
        // Limit to last 50?
        return Storage.cache.chat.slice(-50);
    },

    addChatMessage: function(msg) {
        // Ensure ID is set (if not auto-generated, but we set autoIncrement)
        // Actually, app.js passes an ID usually.
        Storage.cache.chat.push(msg);
        Storage.put(STORES.CHAT, msg);
    },

    // --- User Management (Extended) ---
    resetUserPoints: function(username) {
        if (username === 'ALL') {
            Storage.cache.users.forEach(u => {
                u.points = 0;
                u.level = 1;
                u.accuracy = 0;
            });
            this.saveUsers(Storage.cache.users);
        } else {
            const user = Storage.cache.users.find(u => u.username === username);
            if (user) {
                user.points = 0;
                user.level = 1;
                user.accuracy = 0;
                this.saveUser(user);
            }
        }
    },

    deleteUser: function(username) {
        Storage.cache.users = Storage.cache.users.filter(u => u.username !== username);
        // Async delete from IDB
        Storage.delete(STORES.USERS, username);
    },

    // --- Content Management (Restored) ---
    addSubject: function(name) {
        const data = this.getQuizData();
        if (!data[name]) {
            data[name] = {};
            this.saveQuizData(data);
            return true;
        }
        return false;
    },

    deleteSubject: function(name) {
        const data = this.getQuizData();
        if (data[name]) {
            delete data[name];
            this.saveQuizData(data);
            return true;
        }
        return false;
    },

    addChapter: function(subject, chapterName) {
        const data = this.getQuizData();
        if (data[subject] && !data[subject][chapterName]) {
            data[subject][chapterName] = [];
            this.saveQuizData(data);
            return true;
        }
        return false;
    },

    deleteChapter: function(subject, chapterName) {
        const data = this.getQuizData();
        if (data[subject] && data[subject][chapterName]) {
            delete data[subject][chapterName];
            this.saveQuizData(data);
            return true;
        }
        return false;
    },

    addQuestion: function(subject, chapter, questionObj) {
        const data = this.getQuizData();
        if (data[subject] && data[subject][chapter]) {
            const existingIds = data[subject][chapter].map(q => q.id);
            const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
            questionObj.id = newId;
            data[subject][chapter].push(questionObj);
            this.saveQuizData(data);
            return true;
        }
        return false;
    },

    deleteQuestion: function(subject, chapter, questionId) {
        const data = this.getQuizData();
        if (data[subject] && data[subject][chapter]) {
            data[subject][chapter] = data[subject][chapter].filter(q => q.id !== questionId);
            this.saveQuizData(data);
            return true;
        }
        return false;
    },

    updateQuestion: function(subject, chapter, updatedQ) {
        const data = this.getQuizData();
        if (data[subject] && data[subject][chapter]) {
            const idx = data[subject][chapter].findIndex(q => q.id === updatedQ.id);
            if (idx !== -1) {
                data[subject][chapter][idx] = updatedQ;
                this.saveQuizData(data);
                return true;
            }
        }
        return false;
    },

    // --- Seeds ---
    seedInitialContent: function() {
        // If empty feed, seed it
        if (Storage.cache.posts.length === 0) {
            const seedPosts = [
                {
                    id: 'seed-1',
                    username: 'system_admin',
                    name: 'System Administrator',
                    avatar: null,
                    content: 'Welcome to Global Nexus Phase 2. The architecture has been upgraded.',
                    timestamp: new Date().toISOString(),
                    likes: 999,
                    isHighlight: true
                }
            ];
            seedPosts.forEach(p => this.addPost(p));
        }
    }
};

window.DataManager = DataManager;
