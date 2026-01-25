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
            case 'POST_DELETED':
                this.onPostDeleted(data.payload);
                break;
            case 'LIKE_UPDATED':
                this.onLikeUpdated(data.payload);
                break;
            case 'COMMENT_ADDED':
                this.onCommentAdded(data.payload);
                break;
            case 'CHAT_SENT':
                this.onChatSent(data.payload);
                break;
            case 'USER_UPDATE':
                this.onUserUpdate(data.payload); // For points/profile changes
                break;
            case 'GLOBAL_RESET':
                window.location.reload();
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
        const likeBtn = document.querySelector(`button[data-id="${postId}"]`) || document.querySelector(`button[onclick*="'${postId}'"]`);
        if (likeBtn) {
            likeBtn.innerHTML = `❤️ ${newLikes}`;
            likeBtn.classList.add('pop-anim');
            setTimeout(() => likeBtn.classList.remove('pop-anim'), 500);
        }
    }

    onPostDeleted(postId) {
        // If on community page, remove the element
        const btn = document.querySelector(`button[onclick*="${postId}"]`);
        if (btn) {
            const card = btn.closest('.post-card');
            if (card) {
                card.style.opacity = '0';
                setTimeout(() => card.remove(), 500);
            }
        } else {
            // Re-render if finding element is hard (fallback)
            if (STATE.currentView === 'community') renderCommunity();
        }
    }

    onCommentAdded({ postId, comment }) {
        // Find comment list
        const list = document.getElementById(`comment-list-${postId}`);
        if (list) {
            // Check if already exists (prevent double add from local optimistic update)
            // Heuristic: Check last comment content
            const last = list.lastElementChild;
            if (last && last.innerHTML.includes(comment.text)) return;

            list.insertAdjacentHTML('beforeend', `
            <div class="comment-item fade-in">
                <div class="avatar-small" style="width:24px; height:24px; font-size:0.7rem;">${comment.user.charAt(0)}</div>
                <div class="comment-bubble">
                    <div class="comment-author">${comment.user}</div>
                    <div>${comment.text}</div>
                </div>
            </div>`);

            // Update reply count text
            const replyBtn = list.closest('.post-card').querySelector('.post-footer button:nth-child(2)');
            if (replyBtn) {
                const count = list.children.length;
                replyBtn.innerHTML = `💬 ${count} Replies`;
            }
        }
    }

    onUserUpdate(user) {
        // Update Leaderboard if visible
        if (STATE.currentView === 'leaderboard') {
            renderLeaderboard();
        }
        // Update Admin Panel users list if visible
        if (STATE.currentView === 'admin') {
            // We assume an admin render function exists or we reload
            if (window.AdminController) window.AdminController.renderUsers();
        }
    }
}

// Initialize and Expose
window.RealTime = new RealTimeEngine();
