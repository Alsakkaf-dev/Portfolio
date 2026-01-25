/**
 * CloudManager - Handles Async Data Operations via Firestore
 */
const CloudManager = {
    // --- Users ---

    /**
     * Fetches all users from Firestore.
     * @returns {Promise<Array>} Array of user objects
     */
    getUsers: async function () {
        if (!db) return []; // Offline fallback
        try {
            const snapshot = await db.collection('users').get();
            return snapshot.docs.map(doc => doc.data());
        } catch (e) {
            console.error("Cloud Fetch Error:", e);
            return [];
        }
    },

    /**
     * Saves a new user or updates an existing one.
     * @param {Object} user 
     */
    saveUser: async function (user) {
        if (!db) return;
        try {
            // Use username as document ID for easy lookup
            await db.collection('users').doc(user.username).set(user, { merge: true });
        } catch (e) {
            console.error("Cloud Save Error:", e);
        }
    },

    /**
     * Syncs the entire user list (Mass Update).
     * CAUTION: High write count. Use sparingly.
     */
    syncUsers: async function (users) {
        if (!db) return;
        const batch = db.batch();
        users.forEach(u => {
            const ref = db.collection('users').doc(u.username);
            batch.set(ref, u, { merge: true });
        });
        await batch.commit();
    },

    // --- Content (Community/Posts) ---

    getPosts: async function () {
        if (!db) return [];
        try {
            const snapshot = await db.collection('posts').orderBy('timestamp', 'desc').limit(50).get();
            return snapshot.docs.map(doc => doc.data());
        } catch (e) { return []; }
    },

    addPost: async function (post) {
        if (!db) return;
        await db.collection('posts').doc(post.id).set(post);
    },

    deletePost: async function (postId) {
        if (!db) return;
        await db.collection('posts').doc(postId).delete();
    },

    deleteUser: async function (username) {
        if (!db) return;
        try {
            await db.collection('users').doc(username).delete();
        } catch (e) {
            console.error("Cloud Delete User Error:", e);
        }
    },

    // --- Quiz Data (Optional: If we want shared question banks) ---
    // For now we keep Quiz Data local JSON as it's static structure
    // But could be moved to cloud later.
};
