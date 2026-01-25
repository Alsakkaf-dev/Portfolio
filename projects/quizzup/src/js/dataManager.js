/**
 * @fileoverview QuizzUp Data Manager
 * Handles data persistence (localStorage) and state management for users and quiz content.
 * @author Mohammed Alsakkaf
 */

const DATA_KEY = 'quizzup_content_v1';
const USERS_KEY = 'quizzup_arena_v1';

// Static fallback data (The original quizData)
const INITIAL_DATA = {
    SPM: {
        "CH 6": [], // Will be populated by the migration logic if needed, or we rely on the static file content initially
        "CH 7": [],
        "CH 8": []
    },
    DSA: { "CH 6": [], "CH 7": [], "CH 8": [] },
    HCI: { "CH 6": [], "CH 7": [], "CH 8": [] },
    OS: { "CH 6": [], "CH 7": [], "CH 8": [] }
};

/**
 * DataManager object for handling all data interactions.
 * @namespace DataManager
 */
const DataManager = {
    // --- Core Data Access ---

    /**
     * Retrieves the quiz data from localStorage or initializes it.
     * @returns {Object} The quiz data object.
     */
    getQuizData: function () {
        const stored = localStorage.getItem(DATA_KEY);
        if (stored) {
            return JSON.parse(stored);
        }

        // Initial Migration: If window.quizData exists (from quizData.js), use it
        if (window.quizData) {
            this.saveQuizData(window.quizData);
            return window.quizData;
        }

        // Fallback
        this.saveQuizData(INITIAL_DATA);
        return INITIAL_DATA;
    },

    /**
     * Saves the quiz data to localStorage.
     * @param {Object} data - The data to save.
     */
    saveQuizData: function (data) {
        localStorage.setItem(DATA_KEY, JSON.stringify(data));
        // Update runtime global if used
        if (window.quizData) window.quizData = data;
    },

    // --- User Management ---

    /**
     * Retrieves the list of users.
     * @returns {Array.<Object>} Array of user objects.
     */
    getUsers: function () {
        return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    },

    /**
     * Saves the list of users.
     * @param {Array.<Object>} users - The array of user objects.
     */
    saveUsers: function (users) {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    },

    /**
     * Resets points for a specific user or all users.
     * @param {string} username - The username to reset, or 'ALL'.
     * @returns {Array.<Object>} The updated users list.
     */
    resetUserPoints: function (username) {
        const users = this.getUsers();
        if (username === 'ALL') {
            users.forEach(u => {
                u.points = 0;
                u.level = 1;
                // Keep history? Maybe reset accuracy too?
                u.accuracy = 0;
            });
        } else {
            const user = users.find(u => u.username === username);
            if (user) {
                user.points = 0;
                user.level = 1;
                user.accuracy = 0;
            }
        }
        this.saveUsers(users);
        return users;
    },

    /**
     * Deletes a user by username.
     * @param {string} username - The username to delete.
     * @returns {Array.<Object>} The updated users list.
     */
    deleteUser: function (username) {
        let users = this.getUsers();
        users = users.filter(u => u.username !== username);
        this.saveUsers(users);
        return users;
    },

    /**
     * Deletes all bot users (cleanup utility).
     * @returns {Array.<Object>} The updated users list.
     */
    deleteAllBotUsers: function () {
        let users = this.getUsers();
        users = users.filter(u => !u.isBot);
        this.saveUsers(users);
        return users;
    },

    // --- Content Management Helpers ---

    /**
     * Adds a new subject.
     * @param {string} name - The name of the subject.
     * @returns {boolean} True if successful, false if it already exists.
     */
    addSubject: function (name) {
        const data = this.getQuizData();
        if (!data[name]) {
            data[name] = {};
            this.saveQuizData(data);
            return true;
        }
        return false;
    },

    /**
     * Deletes a subject.
     * @param {string} name - The name of the subject.
     * @returns {boolean} True if successful.
     */
    deleteSubject: function (name) {
        const data = this.getQuizData();
        if (data[name]) {
            delete data[name];
            this.saveQuizData(data);
            return true;
        }
        return false;
    },

    /**
     * Adds a chapter to a subject.
     * @param {string} subject - The subject name.
     * @param {string} chapterName - The chapter name.
     * @returns {boolean} True if successful.
     */
    addChapter: function (subject, chapterName) {
        const data = this.getQuizData();
        if (data[subject] && !data[subject][chapterName]) {
            data[subject][chapterName] = [];
            this.saveQuizData(data);
            return true;
        }
        return false;
    },

    /**
     * Deletes a chapter from a subject.
     * @param {string} subject - The subject name.
     * @param {string} chapterName - The chapter name.
     * @returns {boolean} True if successful.
     */
    deleteChapter: function (subject, chapterName) {
        const data = this.getQuizData();
        if (data[subject] && data[subject][chapterName]) {
            delete data[subject][chapterName];
            this.saveQuizData(data);
            return true;
        }
        return false;
    },

    /**
     * Adds a question to a specific subject and chapter.
     * @param {string} subject - The subject name.
     * @param {string} chapter - The chapter name.
     * @param {Object} questionObj - The question object.
     * @returns {boolean} True if successful.
     */
    addQuestion: function (subject, chapter, questionObj) {
        const data = this.getQuizData();
        if (data[subject] && data[subject][chapter]) {
            // Assign ID
            const existingIds = data[subject][chapter].map(q => q.id);
            const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
            questionObj.id = newId; // Ensure local ID uniqueness within chapter

            data[subject][chapter].push(questionObj);
            this.saveQuizData(data);
            return true;
        }
        return false;
    },

    /**
     * Deletes a question by ID.
     * @param {string} subject - The subject name.
     * @param {string} chapter - The chapter name.
     * @param {number} questionId - The question ID.
     * @returns {boolean} True if successful.
     */
    deleteQuestion: function (subject, chapter, questionId) {
        const data = this.getQuizData();
        if (data[subject] && data[subject][chapter]) {
            data[subject][chapter] = data[subject][chapter].filter(q => q.id !== questionId);
            this.saveQuizData(data);
            return true;
        }
        return false;
    },

    /**
     * Updates an existing question.
     * @param {string} subject - The subject name.
     * @param {string} chapter - The chapter name.
     * @param {Object} updatedQ - The updated question object (must have id).
     * @returns {boolean} True if successful.
     */
    updateQuestion: function (subject, chapter, updatedQ) {
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

    // --- Community & Social Data ---

    getPosts: function () {
        return JSON.parse(localStorage.getItem('quizzup_posts')) || [];
    },

    savePosts: function (posts) {
        localStorage.setItem('quizzup_posts', JSON.stringify(posts));
    },

    addPost: function (post) {
        let posts = this.getPosts();
        posts.unshift(post);
        // Limit to 50 posts to prevent overflow
        if (posts.length > 50) posts.pop();
        this.savePosts(posts);
        return posts;
    },

    getChatHistory: function () {
        return JSON.parse(localStorage.getItem('quizzup_chat')) || [];
    },

    saveChatHistory: function (chat) {
        localStorage.setItem('quizzup_chat', JSON.stringify(chat));
    },

    addChatMessage: function (msg) {
        let chat = this.getChatHistory();
        chat.push(msg);
        // Limit history to 50 messages
        if (chat.length > 50) chat.shift();
        this.saveChatHistory(chat);
        return chat;
    },

    /**
     * Seeds initial content if the feed is empty.
     * Solves the "Blank Page" problem.
     * DISABLED BY REQUEST: User wants to be the first user.
     */
    seedInitialContent: function () {
        // const posts = this.getPosts();
        // if (posts.length > 0) return; // Already populated

        // DISABLED SEEDING
        /*
        const initialPosts = [ ... ];
        this.savePosts(initialPosts);
        */

        console.log('Use DataManager.factoryReset() to clear data.');
    },

    /**
     * WIPES ALL DATA. 
     * Resets the app to a fresh installation state.
     */
    factoryReset: function () {
        console.warn('⚠️ PERFORMING FACTORY RESET ⚠️');
        localStorage.removeItem(DATA_KEY);
        localStorage.removeItem(USERS_KEY);
        localStorage.removeItem('quizzup_posts');
        localStorage.removeItem('quizzup_chat');

        // Also clear history keys dynamically if possible, or just specific ones
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('quizzup_')) localStorage.removeItem(key);
        });

        // Clear IndexedDB
        if (window.Storage && window.Storage.deleteDB) {
            window.Storage.deleteDB();
        } else {
            // Manual IDB Delete
            indexedDB.deleteDatabase(DB_CONFIG.name);
        }

        console.log('✅ Data Wiped. Reloading...');
        setTimeout(() => window.location.reload(), 500);
    }
};

// Expose to window for app.js
window.DataManager = DataManager;

/* =========================================
   STORAGE ENGINE: INDEXED DB WRAPPER (JOLCE ARCHITECTURE)
   ========================================= */

const DB_CONFIG = {
    name: 'QuizzUpDB',
    version: 1,
    stores: {
        posts: { keyPath: 'id' },
        chat: { keyPath: 'id' }, // Auto-increment not needed if we manage IDs
        images: { keyPath: 'id' } // Store Blob/Base64 here
    }
};

class StorageEngine {
    constructor() {
        this.db = null;
        this.isReady = false;
        this.init();
    }

    init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_CONFIG.name, DB_CONFIG.version);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                // Create Stores
                if (!db.objectStoreNames.contains('posts')) db.createObjectStore('posts', { keyPath: 'id' });
                if (!db.objectStoreNames.contains('chat')) db.createObjectStore('chat', { keyPath: 'id' });
                if (!db.objectStoreNames.contains('images')) db.createObjectStore('images', { keyPath: 'id' });
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                this.isReady = true;
                console.log(' StorageEngine: IndexedDB Online');
                resolve(this.db);
            };

            request.onerror = (event) => {
                console.error(' StorageEngine: IndexedDB Failed', event);
                this.fallbackMode = true;
                reject('IDB_FAIL');
            };
        });
    }

    // Generic Add
    async add(storeName, data) {
        if (!this.isReady) await this.init();
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction([storeName], 'readwrite');
            const store = tx.objectStore(storeName);
            const req = store.put(data);

            req.onsuccess = () => resolve(true);
            req.onerror = () => reject(req.error);
        });
    }

    // Generic Get All (Sorted is harder in vanilla IDB without indexes, so we just get all and sort in memory for now)
    async getAll(storeName) {
        if (!this.isReady) await this.init();
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction([storeName], 'readonly');
            const store = tx.objectStore(storeName);
            const req = store.getAll();

            req.onsuccess = () => resolve(req.result || []);
            req.onerror = () => reject(req.error);
        });
    }

    // Initialize Seeding Wrapper
    async seedIfEmpty() {
        if (!this.isReady) await this.init();
        const posts = await this.getAll('posts');
        if (posts.length === 0) {
            console.log(' StorageEngine: Seeding Initial Content...');
            // Call DataManager's logic but route it through IDB
            // (We will refactor DataManager to use this engine)
        }
    }
}

// Initialize Global Engine
window.Storage = new StorageEngine();

// --- Overwrite DataManager extensions to use Async Storage ---
// Note: This is a 'Patch' approach. 
// A real refactor would rewrite DataManager completely, but we will wrap for backward compatibility.

DataManager.getPosts = async function () {
    try {
        const posts = await window.Storage.getAll('posts');
        // Sort by timestamp desc
        return posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (e) {
        return JSON.parse(localStorage.getItem('quizzup_posts')) || []; // Fallback
    }
};

DataManager.addPost = async function (post) {
    try {
        await window.Storage.add('posts', post);
        // Also keep localStorage sync for now (Hybrid Mode) for safety
        let local = JSON.parse(localStorage.getItem('quizzup_posts')) || [];
        local.unshift(post);
        if (local.length > 20) local.pop();
        localStorage.setItem('quizzup_posts', JSON.stringify(local));
    } catch (e) {
        console.error(e);
    }
};

DataManager.getChatHistory = async function () {
    try {
        const chat = await window.Storage.getAll('chat');
        return chat.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    } catch (e) {
        return JSON.parse(localStorage.getItem('quizzup_chat')) || [];
    }
};

DataManager.addChatMessage = async function (msg) {
    try {
        await window.Storage.add('chat', msg);
        // Hybrid Sync
        let local = JSON.parse(localStorage.getItem('quizzup_chat')) || [];
        local.push(msg);
        if (local.length > 50) local.shift();
        localStorage.setItem('quizzup_chat', JSON.stringify(local));
    } catch (e) {
        console.error(e);
    }
};

