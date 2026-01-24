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
    }
};

// Expose to window for app.js
window.DataManager = DataManager;
