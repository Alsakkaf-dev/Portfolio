/**
 * @fileoverview QuizzUp Premium - Core Application Logic
 * Handles the main application flow, UI rendering, and user interactions.
 * @author Mohammed Alsakkaf
 */

// ==========================================
// QuizzUp Premium - Core Application Logic
// ==========================================

// --- DOM Elements ---
const appShell = document.getElementById('app');
const mainContent = document.getElementById('main-content');
const pageTitle = document.getElementById('page-title');

// Navigation
const sidebarNavItems = document.querySelectorAll('.nav-item[data-view]');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item[data-view]');
const logoutBtn = document.getElementById('sidebar-logout');

// Top Bar
const walletDisplay = document.getElementById('user-points-display');
const headerAvatar = document.getElementById('header-avatar');
const headerProfileImg = document.getElementById('header-profile-img');
const headerInitial = document.getElementById('header-avatar-initial');

// Auth
const authScreen = document.getElementById('auth-screen');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const tabLogin = document.getElementById('tab-login');
const tabSignup = document.getElementById('tab-signup');
const switchLink = document.getElementById('switch-link');
const authSwitch = document.getElementById('auth-switch');

// Modals
const settingsOverlay = document.getElementById('settings-overlay');
const inspectOverlay = document.getElementById('inspect-overlay');
const startQuizBtn = document.getElementById('start-quiz-now');
const closeSettingsBtn = document.getElementById('close-settings');
const closeInspectBtn = document.getElementById('close-inspect');
const typeOptions = document.querySelectorAll('.type-option');

// Intro
const initSequence = document.getElementById('init-sequence');
const heroDrone = document.getElementById('hero-drone');

// --- State Management ---
/**
 * Global application state.
 * @type {Object}
 * @property {Object|null} currentUser - The currently logged-in user.
 * @property {string} currentView - The ID of the current view.
 * @property {Object} quiz - The current quiz state.
 * @property {Array.<Object>} users - The list of all users.
 */
const STATE = {
    currentUser: null,
    currentView: 'dashboard',
    quiz: {
        category: null,
        chapter: null,
        type: 'mixed',
        data: [],
        index: 0,
        score: 0,
        history: [], // Stores user answers for review
        timer: 0,
        timerInterval: null
    },
    users: DataManager.getUsers() // Use DataManager
};

// --- Initialization ---

/**
 * Initializes the application.
 */
function init() {
    // Ensure data is migrated/loaded
    DataManager.getQuizData();

    // Remove all bot users on every load
    DataManager.deleteAllBotUsers();

    // Reload users after cleanup
    STATE.users = DataManager.getUsers();

    setupEventListeners();

    // Check if user session exists (optional, for now just force login)
    // if (localStorage.getItem('quizzup_session')) ...

    // Initialize Community Content (Seed)
    DataManager.seedInitialContent();

    // Check for Factory Reset Trigger
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('reset') === 'true') {
        DataManager.factoryReset();
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
    }

    // Session Restore
    const savedSession = localStorage.getItem('quizzup_session');
    if (savedSession) {
        try {
            const user = JSON.parse(savedSession);
            // Verify user still exists in DB
            const validUser = STATE.users.find(u => u.username === user.username);
            if (validUser) {
                // Update local object with latest stats
                STATE.currentUser = validUser;
                // Skip login screen
                login(validUser);
            } else {
                // User deleted remotely?
                logout();
            }
        } catch (e) {
            console.error("Session restore failed", e);
            logout();
        }
    }
}

/**
 * Saves current users to persistent storage.
 */
function saveUsers() {
    DataManager.saveUsers(STATE.users);
}

/**
 * Saves a quiz result to user history.
 * @param {Object} record - The quiz result record.
 */
function saveHistory(record) {
    const key = `quizzup_history_${STATE.currentUser.username}`;
    const history = JSON.parse(localStorage.getItem(key)) || [];
    history.push(record);
    localStorage.setItem(key, JSON.stringify(history));
}

// --- Navigation Engine ---

/**
 * Navigates to a specific view.
 * @param {string} viewName - The name of the view (e.g., 'dashboard').
 * @param {Object} [params={}] - Optional parameters for the view.
 */
function navigateTo(viewName, params = {}) {
    STATE.currentView = viewName;
    localStorage.setItem('quizzup_last_view', viewName);
    clearInterval(STATE.quiz.timerInterval); // Safety clear

    // Update Sidebar Active State
    document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(el => {
        if (el.dataset.view === viewName) el.classList.add('active');
        else el.classList.remove('active');
    });

    // Update Top Bar Title
    pageTitle.textContent = viewName.charAt(0).toUpperCase() + viewName.slice(1);

    // Render Content
    mainContent.innerHTML = ''; // Clear previous
    mainContent.className = 'content-area'; // Reset classes

    // Focus Mode Logic
    if (viewName === 'quiz') {
        appShell.classList.add('quiz-mode');
    } else {
        appShell.classList.remove('quiz-mode');
    }

    // Security Check
    if (viewName === 'admin' && (!STATE.currentUser || !STATE.currentUser.isAdmin)) {
        alert("⛔ Access Denied: Level 99 Clearance Required.");
        navigateTo('dashboard');
        return;
    }

    switch (viewName) {
        case 'dashboard': renderDashboard(); break;
        case 'leaderboard': renderLeaderboard(); break;
        case 'community': renderCommunity(); break;
        case 'profile': renderProfile(); break;
        case 'admin':
            pageTitle.textContent = "System Control";
            if (AdminController) AdminController.init();
            else mainContent.innerHTML = "Admin Module Error";
            break;
        case 'quiz':
            pageTitle.textContent = "Active Mission";
            renderQuiz();
            break;
        case 'chapters':
            pageTitle.textContent = `${params.category} Modules`;
            renderChapters(params.category);
            break;
    }
}

// --- Auth System ---

/**
 * Logs in a user.
 * @param {Object} user - The user object.
 */
function login(user) {
    STATE.currentUser = user;
    updateTopBar();

    // Persist Session
    localStorage.setItem('quizzup_session', JSON.stringify(user));

    // Animation Out
    authScreen.classList.add('hidden');
    appShell.classList.remove('hidden');

    // Check if restoring view
    const lastView = localStorage.getItem('quizzup_last_view') || 'dashboard';
    navigateTo(lastView);
    if (!localStorage.getItem('quizzup_session')) triggerGreeting(); // Only greet on fresh login
}

/**
 * Logs out the current user.
 */
function logout() {
    STATE.currentUser = null;
    localStorage.removeItem('quizzup_session');
    localStorage.removeItem('quizzup_last_view');

    appShell.classList.add('hidden');
    authScreen.classList.remove('hidden');

    // Reset Forms
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
    showAuthForm('login');
}

/**
 * Switches between login and signup forms.
 * @param {string} type - 'login' or 'signup'.
 */
function showAuthForm(type) {
    if (type === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        tabLogin.classList.add('active');
        tabSignup.classList.remove('active');
        authSwitch.innerHTML = `Don't have an account? <span id="switch-link" style="color:var(--primary); cursor:pointer;">Sign Up</span>`;
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        tabLogin.classList.remove('active');
        tabSignup.classList.add('active');
        authSwitch.innerHTML = `Already have an account? <span id="switch-link" style="color:var(--primary); cursor:pointer;">Sign In</span>`;
    }
    document.getElementById('switch-link').addEventListener('click', () => showAuthForm(type === 'login' ? 'signup' : 'login'));
}

/**
 * Updates the top bar with user info.
 */
function updateTopBar() {
    if (!STATE.currentUser) return;

    walletDisplay.textContent = (STATE.currentUser.points || 0).toLocaleString();

    const initial = STATE.currentUser.name.charAt(0).toUpperCase();
    headerInitial.textContent = initial;

    if (STATE.currentUser.profilePic) {
        headerProfileImg.src = STATE.currentUser.profilePic;
        headerProfileImg.classList.remove('hidden');
        headerInitial.classList.add('hidden');
    } else {
        headerProfileImg.classList.add('hidden');
        headerInitial.classList.remove('hidden');
    }
}

// --- View Renderers ---

/**
 * Renders the Dashboard view.
 */
function renderDashboard() {
    const user = STATE.currentUser;
    const rank = [...STATE.users].sort((a, b) => b.points - a.points).findIndex(u => u.username === user.username) + 1;

    // Check if DataManager needs reload
    const subjects = Object.keys(DataManager.getQuizData());

    mainContent.innerHTML = `
        ${user.isAdmin ? `<button onclick="navigateTo('admin')" class="primary-btn" style="width:100%; margin-bottom:1.5rem; background: var(--tertiary);">⚙️ Access Admin Panel</button>` : ''}

        <div class="dashboard-hero fade-in">
            <h1 class="hero-greeting">Welcome back, ${user.name}</h1>
            <p style="color: var(--text-secondary);">Ready to expand your knowledge base?</p>

            <div class="hero-stats">
                <div class="hero-stat-item">
                    <span class="hero-stat-val">#${rank}</span>
                    <span class="hero-stat-label">Global Rank</span>
                </div>
                <div class="hero-stat-item">
                    <span class="hero-stat-val">Lvl ${user.level || 1}</span>
                    <span class="hero-stat-label">Operator Tier</span>
                </div>
                <div class="hero-stat-item">
                    <span class="hero-stat-val" style="color: var(--success);">${user.accuracy || '--'}%</span>
                    <span class="hero-stat-label">Avg Accuracy</span>
                </div>
            </div>
        </div>

        <h3 style="margin-bottom: 1.5rem;">Learning Modules</h3>
        <div class="cards-grid fade-in" style="animation-delay: 0.1s;">
            ${subjects.map(cat => `
                <div class="subject-card" onclick="navigateTo('chapters', {category: '${cat}'})">
                    <div class="subject-icon">
                        ${getCategoryIcon(cat)}
                    </div>
                    <div class="subject-title">${cat}</div>
                    <div class="subject-desc">Master the core concepts of ${cat}.</div>
                </div>
            `).join('')}
        </div>
    `;
}

/**
 * Returns an icon for a category.
 * @param {string} cat - The category name.
 * @returns {string} The emoji icon.
 */
function getCategoryIcon(cat) {
    const icons = {
        SPM: '📊', DSA: '💻', HCI: '🎨', OS: '⚙️'
    };
    return icons[cat] || '📚';
}

/**
 * Renders the chapters for a selected category.
 * @param {string} category - The category name.
 */
function renderChapters(category) {
    const allData = DataManager.getQuizData();
    // Ensure MIXED is always available as the first option, filtering out if it exists in DB to avoid dupes
    const rawChapters = Object.keys(allData[category] || {}).filter(c => c !== 'MIXED');
    const chapters = ['MIXED', ...rawChapters];

    mainContent.innerHTML = `
        <button class="secondary-btn" onclick="navigateTo('dashboard')" style="margin-bottom: 2rem;">← Back to Dashboard</button>
        <div class="cards-grid fade-in">
            ${chapters.map((ch, index) => `
                <div class="subject-card" style="position: relative;" id="card-${index}">
                    <div onclick="toggleChapterMenu('menu-${category}-${index}')">
                        <div class="subject-icon">${ch === 'MIXED' ? '🌪️' : '📑'}</div>
                        <div class="subject-title">${ch}</div>
                        <div class="subject-desc">${ch === 'MIXED' ? 'Mastery Mode: All Chapters Combined' : 'Deep dive into specific topic'}</div>
                    </div>

                    <!-- Dropdown Overlay Menu -->
                    <div id="menu-${category}-${index}" class="chapter-dropdown">
                        <button class="dropdown-close" onclick="toggleChapterMenu('menu-${category}-${index}')">×</button>
                        <h4 style="margin-bottom:0.5rem; font-size: 0.9rem; color: var(--text-muted);">Select Type</h4>
                        <div class="dropdown-option" onclick="startDirectQuiz(event, '${category}', '${ch}', 'mixed')">✨ Mixed</div>
                        <div class="dropdown-option" onclick="startDirectQuiz(event, '${category}', '${ch}', 'mcq')">📝 MCQ</div>
                        <div class="dropdown-option" onclick="startDirectQuiz(event, '${category}', '${ch}', 'tf')">⚖️ True/False</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

/**
 * Toggles a chapter dropdown menu.
 * @param {string} menuId - The ID of the menu element.
 */
window.toggleChapterMenu = function (menuId) {
    // Close all other menus first
    document.querySelectorAll('.chapter-dropdown').forEach(el => {
        if (el.id !== menuId) el.classList.remove('active');
    });

    const menu = document.getElementById(menuId);
    if (menu) {
        menu.classList.toggle('active');
    }
};

/**
 * Starts a quiz directly from the chapter selection.
 * @param {Event} e - The click event.
 * @param {string} category - The category.
 * @param {string} chapter - The chapter.
 * @param {string} type - The quiz type.
 */
window.startDirectQuiz = function (e, category, chapter, type) {
    e.stopPropagation(); // Prevent bubbling

    STATE.quiz.category = category;
    STATE.quiz.chapter = chapter;
    STATE.quiz.type = type;

    startQuiz(); // Reuse core logic
};

function openQuizSettings(category, chapter) {
    // Legacy function kept for reference or backup, but unused in new flow
    STATE.quiz.category = category;
    STATE.quiz.chapter = chapter;
    settingsOverlay.classList.remove('hidden');
}

/**
 * Initializes and starts the quiz based on STATE.quiz configuration.
 */
function startQuiz() {
    settingsOverlay.classList.add('hidden');

    // Prepare Data from DataManager
    const allData = DataManager.getQuizData();
    let pool = [];
    const cat = STATE.quiz.category;
    const ch = STATE.quiz.chapter;

    if (ch === 'MIXED' || ch.toUpperCase() === 'MIXED') {
        // Gather all chapters for this category
        const chapterObj = allData[cat] || {};
        const chapters = Object.values(chapterObj);
        pool = chapters.flat();
    } else {
        pool = (allData[cat] && allData[cat][ch]) ? allData[cat][ch] : [];
    }

    // Filter Type
    if (STATE.quiz.type !== 'mixed') {
        pool = pool.filter(q => q.type === STATE.quiz.type);
    }

    if (pool.length === 0) {
        alert("No questions available for this configuration.");
        return;
    }

    // Shuffle and Limit to 10
    // Fix: Create a copy before sorting to avoid mutating the original data source
    pool = [...pool].sort(() => Math.random() - 0.5).slice(0, 10);

    STATE.quiz.data = pool;
    STATE.quiz.index = 0;
    STATE.quiz.score = 0;
    STATE.quiz.history = []; // Reset history for review
    STATE.quiz.timer = 0;

    // Start Timer
    if (STATE.quiz.timerInterval) clearInterval(STATE.quiz.timerInterval);
    STATE.quiz.timerInterval = setInterval(() => {
        STATE.quiz.timer++;
        const timerEl = document.getElementById('quiz-timer');
        if (timerEl) {
            const m = Math.floor(STATE.quiz.timer / 60).toString().padStart(2, '0');
            const s = (STATE.quiz.timer % 60).toString().padStart(2, '0');
            timerEl.textContent = `${m}:${s}`;
        }
    }, 1000);

    navigateTo('quiz');
}

/**
 * Renders the current question in the quiz.
 */
function renderQuiz() {
    const q = STATE.quiz.data[STATE.quiz.index];
    const progress = ((STATE.quiz.index) / STATE.quiz.data.length) * 100;

    // Format Timer for initial render
    const m = Math.floor(STATE.quiz.timer / 60).toString().padStart(2, '0');
    const s = (STATE.quiz.timer % 60).toString().padStart(2, '0');

    mainContent.innerHTML = `
        <div class="quiz-wrapper fade-in">
            <!-- Header Stats -->
            <div class="quiz-header-stats">
                <div class="stat-pill"><span id="quiz-timer">${m}:${s}</span> ⏱️</div>
                <div class="stat-pill correct-pill"><span id="quiz-score">${STATE.quiz.score}</span> Correct ✅</div>
                <div class="stat-pill remaining-pill">Q${STATE.quiz.index + 1}/${STATE.quiz.data.length} 📚</div>
            </div>

            <div class="quiz-progress">
                <div class="quiz-progress-bar" style="width: ${progress}%"></div>
            </div>

            <div class="quiz-card" id="quiz-card-container">
                <div class="question-meta">
                    <span>${STATE.quiz.category} / ${STATE.quiz.chapter}</span>
                    <span class="difficulty-badge">${q.type.toUpperCase()}</span>
                </div>

                <h2 class="question-text">${q.question}</h2>

                <div class="options-grid">
                    ${q.type === 'mcq'
            ? q.options.map((opt, i) => `<button class="option-btn" onclick="handleAnswer(${i})">${opt}</button>`).join('')
            : `<button class="option-btn" onclick="handleAnswer('true')">True</button>
                           <button class="option-btn" onclick="handleAnswer('false')">False</button>`
        }
                </div>

                <!-- Feedback Area (Hidden initially) -->
                <div id="feedback-area" class="hidden feedback-box">
                    <h3 id="feedback-title"></h3>
                    <p id="feedback-text"></p>
                    <button class="primary-btn" onclick="nextQuestion()" style="margin-top:1rem;">Next Question ➜</button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Handles the user's answer selection.
 * @param {number|string} answer - The selected answer index (MCQ) or 'true'/'false' (TF).
 */
window.handleAnswer = function (answer) {
    const q = STATE.quiz.data[STATE.quiz.index];
    const btns = document.querySelectorAll('.option-btn');
    const feedbackArea = document.getElementById('feedback-area');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackText = document.getElementById('feedback-text');

    // Stop Timer temporarily? No, keep it running for total time.

    // Disable all
    btns.forEach(b => b.disabled = true);

    let isCorrect = false;
    let userAnswerText = "";

    if (q.type === 'mcq') {
        isCorrect = parseInt(answer) === q.correct;
        userAnswerText = q.options[answer];
    } else {
        isCorrect = (answer === 'true') === q.answer;
        userAnswerText = answer === 'true' ? 'True' : 'False';
    }

    // Store for Review
    STATE.quiz.history.push({
        question: q,
        userAnswer: userAnswerText,
        isCorrect: isCorrect
    });

    // Highlight & Animate
    if (q.type === 'mcq') {
        const selectedBtn = btns[answer];
        selectedBtn.classList.add(isCorrect ? 'correct' : 'wrong');
        selectedBtn.classList.add(isCorrect ? 'pop-anim' : 'shake-anim');

        if (!isCorrect) {
            btns[q.correct].classList.add('correct'); // Show correct one
        }
    } else {
        const selectedBtn = Array.from(btns).find(b => b.textContent.trim() === (answer === 'true' ? 'True' : 'False'));
        selectedBtn.classList.add(isCorrect ? 'correct' : 'wrong');
        selectedBtn.classList.add(isCorrect ? 'pop-anim' : 'shake-anim');

        if (!isCorrect) {
            const correctBtn = Array.from(btns).find(b => b.textContent.trim() === (q.answer ? 'True' : 'False'));
            correctBtn.classList.add('correct');
        }
    }

    if (isCorrect) {
        STATE.quiz.score++;
        document.getElementById('quiz-score').textContent = STATE.quiz.score;
        feedbackTitle.textContent = "Correct! 🎉";
        feedbackTitle.style.color = "var(--success)";
    } else {
        feedbackTitle.textContent = "Incorrect ⚠️";
        feedbackTitle.style.color = "var(--danger)";
    }

    // Explanation Text
    if (q.explanation) {
        feedbackText.innerHTML = `<strong style="color:var(--tertiary); display:block; margin-bottom:0.5rem;">💡 Insight</strong> ${q.explanation}`;
    } else {
        feedbackText.textContent = isCorrect ? "Great job! Keep up the momentum." : "Review this topic in the study material.";
    }

    // Show Feedback
    feedbackArea.classList.remove('hidden');
    feedbackArea.classList.add('fade-up');

    // Scroll to bottom to see feedback if needed
    feedbackArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Proceeds to the next question or finishes the quiz.
 */
window.nextQuestion = function () {
    STATE.quiz.index++;
    if (STATE.quiz.index < STATE.quiz.data.length) {
        renderQuiz();
    } else {
        finishQuiz();
    }
};

/**
 * Completes the quiz and shows results.
 */
function finishQuiz() {
    clearInterval(STATE.quiz.timerInterval);
    const total = STATE.quiz.data.length;
    const score = STATE.quiz.score;
    const accuracy = Math.round((score / total) * 100);
    const points = score * 10;

    // Update User
    STATE.currentUser.points = (STATE.currentUser.points || 0) + points;
    STATE.currentUser.level = Math.floor(STATE.currentUser.points / 500) + 1;

    // Rolling Average Accuracy
    const oldAcc = STATE.currentUser.accuracy || 0;
    STATE.currentUser.accuracy = oldAcc === 0 ? accuracy : Math.round((oldAcc + accuracy) / 2);

    // Save
    const uIdx = STATE.users.findIndex(u => u.username === STATE.currentUser.username);
    STATE.users[uIdx] = STATE.currentUser;
    saveUsers();
    updateTopBar();

    // Save History
    saveHistory({
        timestamp: new Date().toISOString(),
        category: STATE.quiz.category,
        chapter: STATE.quiz.chapter,
        score: score,
        total: total,
        points: points
    });

    mainContent.innerHTML = `
        <div class="quiz-wrapper fade-in text-center">
            <div class="quiz-card">
                <div style="font-size: 4rem; margin-bottom: 1rem;">${accuracy >= 80 ? '🏆' : (accuracy >= 50 ? '👍' : '📚')}</div>
                <h1>Mission Complete</h1>
                <p style="color: var(--text-muted); margin-bottom: 2rem;">Performance Analysis</p>

                <div class="stats-banner" style="grid-template-columns: 1fr 1fr 1fr;">
                    <div class="stat-box">
                        <span class="val" style="color: var(--success);">${score}/${total}</span>
                        <span class="lbl">Score</span>
                    </div>
                    <div class="stat-box">
                        <span class="val" style="color: var(--gold);">+${points}</span>
                        <span class="lbl">Credits</span>
                    </div>
                     <div class="stat-box">
                        <span class="val">${Math.floor(STATE.quiz.timer / 60)}:${(STATE.quiz.timer % 60).toString().padStart(2, '0')}</span>
                        <span class="lbl">Time</span>
                    </div>
                </div>

                <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <button class="secondary-btn" onclick="navigateTo('dashboard')">Dashboard</button>
                    <button class="primary-btn" onclick="shareToCommunity(${score}, ${total}, '${STATE.quiz.category}')">📢 Share to Community</button>
                    <button class="secondary-btn" onclick="startQuiz()">Retry Mission</button>
                </div>
                <div style="margin-top: 1rem;">
                    <button class="text-btn" onclick="renderReviewMode()">Review Detailed Answers</button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Shares the quiz result to the community feed.
 */
window.shareToCommunity = function (score, total, category) {
    const accuracy = Math.round((score / total) * 100);
    const emoji = accuracy >= 90 ? '🔥' : (accuracy >= 70 ? '🚀' : '📚');
    const msg = `Just scored ${score}/${total} (${accuracy}%) in the ${category} module! ${emoji} Can anyone beat my accuracy?`;

    DataManager.addPost({
        id: Date.now().toString(),
        username: STATE.currentUser.username,
        name: STATE.currentUser.name,
        avatar: STATE.currentUser.profilePic,
        content: msg,
        timestamp: new Date().toISOString(),
        likes: 0
    });

    navigateTo('community');
};

/**
 * Renders the review mode showing user answers.
 */
window.renderReviewMode = function () {
    const history = STATE.quiz.history;

    mainContent.innerHTML = `
        <div class="quiz-wrapper fade-in">
            <button class="secondary-btn" onclick="finishQuiz()" style="margin-bottom: 1.5rem;">← Back to Results</button>
            <h2 style="margin-bottom: 1.5rem;">Mission Review</h2>

            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                ${history.map((item, i) => {
        const q = item.question;
        const correctText = q.type === 'mcq' ? q.options[q.correct] : (q.answer ? 'True' : 'False');

        return `
                    <div class="glass-card" style="padding: 1.5rem; border-left: 4px solid ${item.isCorrect ? 'var(--success)' : 'var(--danger)'}">
                        <div style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 0.5rem;">Question ${i + 1}</div>
                        <h3 style="font-size: 1.1rem; margin-bottom: 1rem;">${q.question}</h3>

                        <div style="margin-bottom: 0.5rem;">
                            <span style="color: var(--text-secondary);">Your Answer:</span>
                            <span style="font-weight: 600; color: ${item.isCorrect ? 'var(--success)' : 'var(--danger)'};">
                                ${item.userAnswer}
                            </span>
                        </div>

                        ${!item.isCorrect ? `
                            <div style="margin-bottom: 0.5rem;">
                                <span style="color: var(--text-secondary);">Correct Answer:</span>
                                <span style="font-weight: 600; color: var(--success);">${correctText}</span>
                            </div>
                        ` : ''}

                        ${q.explanation ? `
                            <div style="margin-top: 1rem; padding: 1rem; background: rgba(255,255,255,0.05); border-radius: 8px; font-size: 0.9rem;">
                                <strong>💡 Insight:</strong> ${q.explanation}
                            </div>
                        ` : ''}
                    </div>
                    `;
    }).join('')}
            </div>
        </div>
    `;
};

function renderLeaderboard() {
    const sorted = [...STATE.users].sort((a, b) => (b.points || 0) - (a.points || 0));

    mainContent.innerHTML = `
        <div class="glass-card fade-in" style="padding: 0; overflow: hidden;">
            <table class="leaderboard-table">
                <thead>
                    <tr>
                        <th style="padding-left: 1.5rem;">Rank</th>
                        <th>Operator</th>
                        <th>Level</th>
                        <th style="text-align: right; padding-right: 1.5rem;">Points</th>
                    </tr>
                </thead>
                <tbody>
                    ${sorted.map((u, i) => `
                        <tr class="leaderboard-row rank-${i + 1} ${STATE.currentUser && u.username === STATE.currentUser.username ? 'current-user' : ''}" onclick="inspectUser('${u.username}')">
                            <td style="padding-left: 1.5rem;">
                                <span class="rank-cell">#${i + 1}</span>
                            </td>
                            <td>
                                <div class="flex-center" style="justify-content: flex-start; gap: 1rem;">
                                    <div class="avatar-small">
                                        ${u.profilePic ? `<img src="${u.profilePic}">` : u.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div style="font-weight: 600;">${u.name}</div>
                                        <div style="font-size: 0.8rem; color: var(--text-muted);">@${u.username}</div>
                                    </div>
                                </div>
                            </td>
                            <td><span style="color: var(--secondary);">Lvl ${u.level || 1}</span></td>
                            <td style="text-align: right; padding-right: 1.5rem; font-family: var(--font-mono); font-weight: 700;">
                                ${u.points.toLocaleString()}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function inspectUser(username) {
    const user = STATE.users.find(u => u.username === username);
    if (!user) return;

    document.getElementById('inspect-name').textContent = user.name;
    document.getElementById('inspect-username').textContent = '@' + user.username;
    document.getElementById('inspect-points').textContent = user.points.toLocaleString();
    document.getElementById('inspect-level').textContent = user.level || 1;

    const img = document.getElementById('inspect-img');
    const init = document.getElementById('inspect-initial');

    if (user.profilePic) {
        img.src = user.profilePic;
        img.classList.remove('hidden');
        init.classList.add('hidden');
    } else {
        img.classList.add('hidden');
        init.classList.remove('hidden');
        init.textContent = user.name.charAt(0);
    }

    inspectOverlay.classList.remove('hidden');
}

// Make globally available for onclick events in HTML
window.inspectUser = inspectUser;

function renderProfile() {
    const user = STATE.currentUser;
    const historyKey = `quizzup_history_${user.username}`;
    const history = JSON.parse(localStorage.getItem(historyKey)) || [];
    const lastSession = history[history.length - 1];

    mainContent.innerHTML = `
        <div class="profile-grid fade-in" style="grid-template-columns: 1fr 2fr; gap: 2rem;">
            <!-- ID Card -->
            <div class="glass-card" style="padding: 2rem; text-align: center;">
                <div style="width: 120px; height: 120px; margin: 0 auto 1.5rem; border-radius: 50%; overflow: hidden; background: var(--bg-secondary); border: 2px solid var(--primary);">
                     ${user.profilePic ? `<img src="${user.profilePic}" style="width:100%; height:100%; object-fit:cover;">` : `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size:3rem; color:white;">${user.name.charAt(0)}</div>`}
                </div>
                <h2>${user.name}</h2>
                <p style="color: var(--text-muted);">@${user.username}</p>
                <div style="margin-top: 1.5rem; display: flex; justify-content: center; gap: 1rem;">
                    <div class="stat-box">
                        <span class="val">${user.level || 1}</span>
                        <span class="lbl">Level</span>
                    </div>
                     <div class="stat-box">
                        <span class="val">${user.points.toLocaleString()}</span>
                        <span class="lbl">Points</span>
                    </div>
                </div>

                <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border-glass);">
                    <label class="secondary-btn" style="display: block; cursor: pointer; margin-bottom: 1rem;">
                        Change Avatar
                        <input type="file" id="new-avatar-upload" hidden accept="image/*">
                    </label>
                    <button class="secondary-btn" style="display: block; width: 100%;" onclick="toggleEditProfile()">Edit Credentials</button>
                </div>

                <!-- Edit Form (Hidden by default) -->
                <div id="edit-profile-form" class="hidden" style="margin-top: 1.5rem; text-align: left;">
                    <div style="margin-bottom: 1rem;">
                        <label style="font-size: 0.8rem; color: var(--text-muted);">Display Name</label>
                        <input type="text" id="edit-name" value="${user.name}" class="glass-input">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="font-size: 0.8rem; color: var(--text-muted);">New Password</label>
                        <input type="password" id="edit-pass" placeholder="Leave blank to keep" class="glass-input">
                    </div>
                    <button class="primary-btn" style="width: 100%;" onclick="saveProfileChanges()">Save Changes</button>
                </div>
            </div>

            <!-- Stats -->
            <div class="glass-card" style="padding: 2rem;">
                <h3 style="margin-bottom: 1.5rem;">Performance Analytics</h3>

                <div class="stats-banner">
                    <div class="stat-box">
                        <span class="val">${history.length}</span>
                        <span class="lbl">Total Missions</span>
                    </div>
                    <div class="stat-box">
                        <span class="val" style="color: var(--success);">${user.accuracy || 0}%</span>
                        <span class="lbl">Accuracy</span>
                    </div>
                    <div class="stat-box">
                        <span class="val" style="color: var(--tertiary);">${lastSession ? lastSession.category : 'N/A'}</span>
                        <span class="lbl">Last Active</span>
                    </div>
                </div>

                <h4 style="margin: 1.5rem 0 1rem;">Mission Log</h4>
                <div style="max-height: 300px; overflow-y: auto;">
                    ${history.length === 0 ? '<p style="color: var(--text-muted);">No records found.</p>' : history.slice().reverse().map(h => `
                        <div class="history-item-mini">
                            <div>
                                <strong style="color: var(--primary);">${h.category}</strong> - ${h.chapter}
                                <div style="font-size: 0.75rem; color: var(--text-muted);">${new Date(h.timestamp).toLocaleDateString()}</div>
                            </div>
                            <div style="text-align: right;">
                                <div style="font-weight: 700; color: ${h.score / h.total >= 0.8 ? 'var(--success)' : 'var(--danger)'};">${h.score}/${h.total}</div>
                                <div style="font-size: 0.75rem;">+${h.points} pts</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    // Bind File Input
    setTimeout(() => {
        const input = document.getElementById('new-avatar-upload');
        if (input) {
            input.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                        STATE.currentUser.profilePic = ev.target.result;
                        const idx = STATE.users.findIndex(u => u.username === STATE.currentUser.username);
                        STATE.users[idx] = STATE.currentUser;
                        saveUsers();
                        updateTopBar();
                        renderProfile(); // re-render
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }, 100);
}


// --- Event Listeners ---
function setupEventListeners() {
    // Nav
    sidebarNavItems.forEach(btn => {
        btn.addEventListener('click', () => navigateTo(btn.dataset.view));
    });

    mobileNavItems.forEach(btn => {
        btn.addEventListener('click', () => navigateTo(btn.dataset.view));
    });

    logoutBtn.addEventListener('click', logout);

    // Auth
    tabLogin.addEventListener('click', () => showAuthForm('login'));
    tabSignup.addEventListener('click', () => showAuthForm('signup'));

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const u = document.getElementById('login-username').value;
        const p = document.getElementById('login-password').value;

        // Admin Backdoor
        if (u === 'admin' && p === 'admin123') {
            login({ username: 'admin', name: 'System Administrator', points: 99999, level: 99, isAdmin: true });
            return;
        }

        const found = STATE.users.find(user => user.username === u && user.password === p);

        if (found) {
            login(found);
        } else {
            document.getElementById('login-error').textContent = 'Invalid credentials.';
        }
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const u = document.getElementById('signup-username').value;
        const p = document.getElementById('signup-password').value;

        if (p.length < 8) {
            document.getElementById('signup-error').textContent = 'Password must be at least 8 chars.';
            return;
        }

        if (STATE.users.find(user => user.username === u)) {
            document.getElementById('signup-error').textContent = 'Username taken.';
            return;
        }

        const newUser = {
            username: u,
            name: u, // Default name
            password: p,
            points: 0,
            level: 1,
            profilePic: null
        };

        STATE.users.push(newUser);
        saveUsers();

        // Intro Sequence Logic
        runIntro(newUser);
    });

    // Quiz Settings
    closeSettingsBtn.addEventListener('click', () => settingsOverlay.classList.add('hidden'));
    startQuizBtn.addEventListener('click', startQuiz);

    typeOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            typeOptions.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            STATE.quiz.type = opt.dataset.type;
        });
    });

    // Inspect
    closeInspectBtn.addEventListener('click', () => inspectOverlay.classList.add('hidden'));
}

/**
 * Runs the intro animation sequence.
 * @param {Object} user
 */
function runIntro(user) {
    authScreen.classList.add('hidden');
    initSequence.classList.remove('hidden');
    document.getElementById('intro-user-name').textContent = user.name.toUpperCase();

    // Simple timeout based animation to replace GSAP complexity for stability
    const tl = gsap.timeline();
    tl.to('.intro-logo', { scale: 1, opacity: 1, duration: 1 })
        .to('.intro-welcome', { opacity: 1, y: 0, duration: 0.5 })
        .to({}, { duration: 1.5 }) // Wait
        .to(initSequence, {
            opacity: 0, duration: 0.5, onComplete: () => {
                initSequence.classList.add('hidden');
                login(user);
            }
        });
}

function triggerGreeting() {
    heroDrone.classList.remove('hidden');
    gsap.fromTo(heroDrone, { x: 300, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
    setTimeout(() => {
        gsap.to(heroDrone, { x: 300, opacity: 0, duration: 1, onComplete: () => heroDrone.classList.add('hidden') });
    }, 3000);
}

// --- Profile Edit Helpers ---
window.toggleEditProfile = function () {
    const form = document.getElementById('edit-profile-form');
    form.classList.toggle('hidden');
};

window.saveProfileChanges = function () {
    const nameInput = document.getElementById('edit-name');
    const passInput = document.getElementById('edit-pass');

    if (nameInput.value) STATE.currentUser.name = nameInput.value;
    if (passInput.value && passInput.value.length >= 8) STATE.currentUser.password = passInput.value;

    const idx = STATE.users.findIndex(u => u.username === STATE.currentUser.username);
    STATE.users[idx] = STATE.currentUser;
    saveUsers();

    updateTopBar();
    renderProfile();
    alert("Profile Updated Successfully.");
};

// Start
init();

/* =========================================
   COMMUNITY HUB & CHAT SYSTEM (ASYNC V2 - JOLCE ARCHITECTURE)
   ========================================= */

// Virtual Scroller Logic (Vanilla JS)
class VirtualScroller {
    constructor(containerId, itemHeight, renderItemFn) {
        this.container = document.getElementById(containerId);
        this.itemHeight = itemHeight;
        this.renderItem = renderItemFn;
        this.items = [];
        this.visibleItems = 20; // Viewport size roughly

        if (this.container) {
            this.container.addEventListener('scroll', () => this.onScroll());
        }
    }

    setData(items) {
        this.items = items;
        this.render();
    }

    render() {
        if (!this.container) return;
        // Simplified Logic: Just render last 50 for now to ensure stability
        // Full virtual scrolling requires a spacer div and calculation
        // For this version, we stick to the "Limit 50" robustness rule
        const visibleInfo = this.items.slice(-50);
        this.container.innerHTML = visibleInfo.map(this.renderItem).join('');
        this.container.scrollTop = this.container.scrollHeight;
    }

    onScroll() {
        // Future expansion: Dynamic loading
    }
}

async function renderCommunity() {
    pageTitle.textContent = "Global Nexus";

    // Show Loading State
    mainContent.innerHTML = `<div class="loader">Accessing Secure Vault...</div>`;

    // Get stored data via DataManager (ASYNC)
    // Note: DataManager methods were patched to be async
    let posts = [];
    let chat = [];

    try {
        posts = await DataManager.getPosts();
        chat = await DataManager.getChatHistory();
    } catch (e) {
        console.warn("Async fetch failed, using fallback", e);
        posts = JSON.parse(localStorage.getItem('quizzup_posts_v3')) || [];
        chat = JSON.parse(localStorage.getItem('quizzup_chat_v3')) || [];
    }

    mainContent.innerHTML = `
        <div class="community-layout fade-in">
            <!-- Left Column: Activity Feed -->
            <div class="feed-section">
                <!-- Post Creator -->
                <div class="glass-card create-post-card">
                    <div class="flex-center" style="justify-content: flex-start; gap: 1rem; margin-bottom: 1rem;">
                        <div class="avatar-small">
                            ${STATE.currentUser.profilePic ? `<img src="${STATE.currentUser.profilePic}">` : STATE.currentUser.name.charAt(0)}
                        </div>
                        <input type="text" id="post-input" placeholder="Share your achievement or thought..." class="post-input">
                    </div>
                    <div class="flex-center" style="justify-content: space-between;">
                        <div class="post-actions">
                            <button class="icon-btn" title="Attach Image" onclick="triggerImageUpload()">📷</button>
                            <input type="file" id="img-upload-hidden" hidden accept="image/*" onchange="handleImageSelect(event)">
                            <button class="icon-btn" title="Add Poll" onclick="togglePollCreator()">📊</button>
                        </div>
                        <button class="primary-btn small-btn" onclick="submitPost()">Post Update</button>
                    </div>
                    
                    <!-- Image Preview Area -->
                    <div id="img-preview-area" class="hidden" style="margin-top:1rem; position:relative;">
                        <img id="img-preview" src="" style="max-height: 200px; border-radius: 8px;">
                        <button onclick="clearImageUpload()" style="position:absolute; top:5px; left:5px; background:rgba(0,0,0,0.5); color:white; border:none; border-radius:50%; width:24px;">×</button>
                    </div>
                </div>

                <!-- Feed Stream -->
                <div id="feed-stream" class="feed-stream">
                    ${posts.length === 0 ? '<div class="empty-state">No meaningful signals detected yet. Be the first to transmit.</div>' :
            posts.map(post => renderPostHTML(post)).join('')}
                </div>
            </div>

            <!-- Right Column: Live Chat -->
            <div class="chat-section">
                <div class="glass-card chat-container">
                    <div class="chat-header">
                        <h3>⚡ Live Comms <span style="font-size:0.8rem; opacity:0.7;">• ${STATE.users.length * 3} Online</span></h3>
                        <div class="live-indicator"><span class="blink-dot"></span> Online</div>
                    </div>
                    
                    <div id="chat-messages" class="chat-messages">
                        <!-- Populated by VirtualScroller -->
                    </div>

                    <div class="chat-typing hidden" id="chat-typing-indicator" style="padding: 0.5rem 1rem; font-size: 0.8rem; color: var(--text-muted); font-style: italic;">
                        Aria is typing...
                    </div>

                    <div class="chat-input-area">
                        <input type="text" id="chat-input" placeholder="Type a message..." onkeypress="handleChatEnter(event)">
                        <button class="send-btn" onclick="sendChatMessage()">➤</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Init Virtual Scroller for Chat
    window.chatScroller = new VirtualScroller('chat-messages', 60, renderChatHTML);
    window.chatScroller.setData(chat);
}

function renderChatHTML(msg) {
    const isMe = msg.username === STATE.currentUser.username;
    return `
        <div class="chat-message ${isMe ? 'my-message' : ''}">
            <div class="chat-bubble">
                <div class="chat-user">${msg.name}</div>
                <div class="chat-text">${msg.text}</div>
            </div>
        </div>
    `;
}

// Image Handling Logic
window.triggerImageUpload = () => document.getElementById('img-upload-hidden').click();
window.currentPostImage = null;

window.handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
            window.currentPostImage = evt.target.result; // Base64
            const prev = document.getElementById('img-preview');
            const area = document.getElementById('img-preview-area');
            prev.src = window.currentPostImage;
            area.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
};

window.clearImageUpload = () => {
    window.currentPostImage = null;
    document.getElementById('img-preview-area').classList.add('hidden');
    document.getElementById('img-upload-hidden').value = '';
};

window.submitPost = async function () {
    const input = document.getElementById('post-input');
    const content = input.value.trim();

    if (!content && !window.currentPostImage) return;

    const newPost = {
        id: Date.now().toString(),
        username: STATE.currentUser.username,
        name: STATE.currentUser.name,
        avatar: STATE.currentUser.profilePic,
        content: content,
        image: window.currentPostImage, // Rich Media Support
        timestamp: new Date().toISOString(),
        likes: 0
    };

    await DataManager.addPost(newPost); // Async add
    await DataManager.addPost(newPost); // Async add
    // DataManager now handles broadcast 'POST_ADDED'

    input.value = '';
    clearImageUpload();
    renderCommunity(); // Re-render triggers async fetch
};

window.deletePost = function (id) {
    let posts = DataManager.getPosts();
    posts = posts.filter(p => p.id !== id);
    DataManager.savePosts(posts);
    if (window.RealTime) window.RealTime.broadcast('POST_DELETED', id);
    renderCommunity();
};

window.handleChatEnter = function (e) {
    if (e.key === 'Enter') sendChatMessage();
};

window.sendChatMessage = async function () {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;

    const msg = {
        id: Date.now(),
        username: STATE.currentUser.username,
        name: STATE.currentUser.name,
        text: text,
        timestamp: new Date().toISOString()
    };

    await DataManager.addChatMessage(msg);
    await DataManager.addChatMessage(msg);
    // DataManager handles broadcast 'CHAT_SENT'
    input.value = '';

    // Optimistic Update
    if (window.chatScroller) {
        let current = window.chatScroller.items;
        current.push(msg);
        window.chatScroller.setData(current);
    }

    // Smart Bot Trigger
    setTimeout(() => {
        simulateBotReply(); // Now with IDB support
    }, 2000 + Math.random() * 3000);
};

function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
}

// Bot Logic (Refactored to DataManager)
const BOT_NAMES = ['Aria', 'Nexus', 'Kai', 'Nova', 'System'];
const BOT_MESSAGES = [
    "Anyone up for a DSA challenge?",
    "Need help with OS paging concepts!",
    "Just hit level 15! 🚀",
    "This platform is looking slick.",
    "Good luck everyone!",
    "Who is top of the leaderboard now?"
];

function simulateBotReply() {
    const name = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
    const text = BOT_MESSAGES[Math.floor(Math.random() * BOT_MESSAGES.length)];

    const msg = {
        username: 'bot_' + name.toLowerCase(),
        name: name,
        text: text,
        timestamp: new Date().toISOString()
    };

    DataManager.addChatMessage(msg);

    if (STATE.currentView === 'community') {
        const chatBox = document.getElementById('chat-messages');
        if (chatBox) {
            chatBox.innerHTML += renderChatHTML(msg);
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }
}

/* =========================================
   PHASE 3: INTERACTION ENGINE (MANUAL INJECT)
   ========================================= */

window.likePost = async function (btn) {
    btn.classList.add('active');
    btn.innerHTML = btn.innerHTML.replace('❤️', '💖');

    // Heuristic: Find ID from data attribute or context
    let postId = btn.dataset.id;
    if (!postId) return;

    let posts = await DataManager.getPosts();
    const postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex !== -1) {
        posts[postIndex].likes++;
        await DataManager.savePosts(posts);
        window.RealTime.broadcast('LIKE_UPDATED', { postId, newLikes: posts[postIndex].likes });
        btn.innerHTML = `❤️ ${posts[postIndex].likes}`;
    }
};

window.toggleComments = function (postId) {
    const section = document.getElementById(`comments-${postId}`);
    if (section) {
        section.classList.toggle('hidden');
        if (!section.classList.contains('hidden')) {
            const input = section.querySelector('.comment-input');
            if (input) input.focus();
        }
    }
};

window.submitComment = async function (postId) {
    const input = document.getElementById(`comment-input-${postId}`);
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    let posts = await DataManager.getPosts();
    const postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex !== -1) {
        const post = posts[postIndex];
        if (!post.comments) post.comments = [];

        const newComment = {
            id: Date.now().toString(),
            user: STATE.currentUser.name,
            text: text,
            time: new Date().toISOString()
        };

        post.comments.push(newComment);
        await DataManager.savePosts(posts);

        // Broadcast new comment
        if (window.RealTime) window.RealTime.broadcast('COMMENT_ADDED', { postId: postId, comment: newComment });

        const list = document.getElementById(`comment-list-${postId}`);
        if (list) {
            list.insertAdjacentHTML('beforeend', `
            <div class="comment-item">
                <div class="avatar-small" style="width:24px; height:24px; font-size:0.7rem;">${newComment.user.charAt(0)}</div>
                <div class="comment-bubble">
                    <div class="comment-author">${newComment.user}</div>
                    <div>${newComment.text}</div>
                </div>
            </div>`);
        }
        input.value = '';
    }
};

// OVERWRITE RENDER FUNCTION TO ENSURE COMMENTS ARE SEEN
renderPostHTML = function (post) {
    const isMe = post.username === STATE.currentUser.username;
    const commentCount = post.comments ? post.comments.length : 0;

    return `
        <div class="glass-card post-card ${post.isHighlight ? 'highlight-post' : ''}">
            <div class="post-header">
                <div class="flex-center" style="gap: 0.8rem; justify-content: flex-start;">
                    <div class="avatar-small">
                         ${post.avatar ? `<img src="${post.avatar}">` : post.name.charAt(0)}
                    </div>
                    <div>
                        <div class="post-author">${post.name} ${isMe ? '(You)' : ''}</div>
                        <div class="post-time">${timeAgo(post.timestamp)}</div>
                    </div>
                </div>
                ${isMe ? `<button class="delete-post-btn" onclick="deletePost('${post.id}')">×</button>` : ''}
            </div>
            <div class="post-content">
                ${post.content}
                ${post.image ? `<img src="${post.image}" style="max-width:100%; border-radius:8px; margin-top:1rem;">` : ''}
            </div>
            
            ${post.type === 'poll' ? renderPollWidget(post) : ''}

            <div class="post-footer">
                <button class="reaction-btn" data-id="${post.id}" onclick="likePost(this)">❤️ ${post.likes || 0}</button>
                <button class="reaction-btn" onclick="toggleComments('${post.id}')">💬 ${commentCount > 0 ? commentCount + ' Replies' : 'Reply'}</button>
            </div>

            <div id="comments-${post.id}" class="comments-section ${commentCount > 0 ? '' : 'hidden'}">
                 <div id="comment-list-${post.id}">
                    ${post.comments ? post.comments.map(c => `
                    <div class="comment-item">
                        <div class="avatar-small" style="width:24px; height:24px; font-size:0.7rem;">${c.user.charAt(0)}</div>
                        <div class="comment-bubble">
                            <div class="comment-author">${c.user}</div>
                            <div>${c.text}</div>
                        </div>
                    </div>`).join('') : ''}
                 </div>
                 <div class="comment-input-area">
                    <input type="text" id="comment-input-${post.id}" class="comment-input" placeholder="Write a reply...">
                    <button class="primary-btn small-btn" onclick="submitComment('${post.id}')">Send</button>
                 </div>
            </div>
        </div>
    `;
};

// Helper for Polls
function renderPollWidget(post) {
    const totalVotes = post.options.reduce((a, b) => a + b.votes, 0) || 1;
    return `
        <div class="poll-widget" style="margin-bottom:1rem;">
           <div class="poll-options">
                ${post.options.map((opt, i) => {
        const pct = totalVotes === 1 && post.options.every(o => o.votes === 0) ? 0 : Math.round((opt.votes / totalVotes) * 100);
        return `
                    <div class="poll-option" onclick="votePoll('${post.id}', ${i})">
                        <div class="poll-bar" style="width: ${pct}%"></div>
                        <span style="position:relative; z-index:2;">${opt.text}</span>
                        <span style="position:relative; z-index:2; float:right;">${pct}%</span>
                    </div>
                    `;
    }).join('')}
            </div>
        </div>
    `;
}

// Start Broadcast
if (window.RealTime) window.RealTime.broadcast('POST_ADDED', {});
