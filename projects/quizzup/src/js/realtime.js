/**
 * @fileoverview QuizzUp Real-Time Sync Engine
 * Uses BroadcastChannel API to sync state across tabs without a backend.
 * Mimics "Server Push" behavior for a professional demo experience.
 */

const CHANNEL_NAME = 'quizzup_global_net';

class RealTimeEngine {
    constructor() {
        this.channel = new BroadcastChannel(CHANNEL_NAME);
        this.channel.onmessage = (event) => this.handleMessage(event.data);
        console.log('⚡ RealTimeEngine: Online & Listening on ' + CHANNEL_NAME);
    }

    /**
     * Broadcasts an event to all other tabs.
     * @param {string} type - Event type (e.g., 'POST_ADDED', 'LIKE_UPDATED')
     * @param {Object} payload - Data payload
     */
    broadcast(type, payload) {
        this.channel.postMessage({ type, payload });
        console.log(`📡 Broadcast Sent: ${type}`, payload);
    }

    /**
     * Handles incoming messages from other tabs.
     * @param {Object} data - { type, payload }
     */
    handleMessage(data) {
        console.log(`📩 Message Received: ${data.type}`, data.payload);

        // Route to specific handlers
        switch (data.type) {
            case 'POST_ADDED':
                this.onPostAdded(data.payload);
                break;
            case 'LIKE_UPDATED':
                this.onLikeUpdated(data.payload);
                break;
            case 'COMMENT_ADDED':
                // Optional: If we want real-time comments, we can add this handler
                // Implementation pending UI readiness
                break;
            case 'CHAT_SENT':
                this.onChatSent(data.payload);
                break;
        }
    }

    // --- Specific Handlers (UI Updates) ---

    onPostAdded(post) {
        // If we are on the Community page, prepend the post to the feed instantly
        if (STATE.currentView === 'community') {
            const feed = document.getElementById('feed-stream');
            if (feed) {
                // Determine if we need to remove the "Empty State" message
                if (feed.querySelector('.empty-state')) {
                    feed.innerHTML = '';
                }

                // Prepend new post
                // Resetting innerHTML is expensive, ideally we prepend a node
                // But for prototype consistency with renderPostHTML, we inject HTML
                const postHTML = renderPostHTML(post);
                feed.insertAdjacentHTML('afterbegin', postHTML);

                // Add highlight animation
                const newCard = feed.firstElementChild;
                if (newCard) {
                    newCard.style.animation = 'highlight-pulse 2s ease';
                }
            }
        }
    }

    onChatSent(msg) {
        // If chat is open, append message
        if (window.chatScroller) {
            let current = window.chatScroller.items;
            // Check for dupes (locally sent vs broadcast received)
            if (!current.find(m => m.id === msg.id)) {
                current.push(msg);
                window.chatScroller.setData(current);
            }
        }
    }

    onLikeUpdated({ postId, newLikes }) {
        // Find the post card and update the like button text
        // This is a DOM-only update for speed
        const likeBtn = document.querySelector(`button[onclick*="'${postId}'"]`); // Heuristic selector
        // A better way is to add IDs to like buttons, e.g., id="like-btn-${postId}"
        // But let's try to update data first then re-render if needed?
        // Re-rendering whole list causes scroll jumps. DOM manipulation is better.

        if (likeBtn) {
            likeBtn.innerHTML = `❤️ ${newLikes}`;
            likeBtn.classList.add('pop-anim');
            setTimeout(() => likeBtn.classList.remove('pop-anim'), 500);
        }
    }
}

// Initialize and Expose
window.RealTime = new RealTimeEngine();
