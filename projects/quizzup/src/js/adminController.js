/**
 * @fileoverview QuizzUp Admin Controller
 * Handles the logic for the administrative panel, including user management, content management, and AI generation.
 * @author Mohammed Alsakkaf
 */

/**
 * AdminController object for handling admin UI and actions.
 * @namespace AdminController
 */
const AdminController = {
    /** @type {string} Current view mode ('users', 'content', 'questions', 'ai-gen') */
    currentView: 'users',
    /** @type {string|null} Currently selected subject */
    selectedSubject: null,
    /** @type {string|null} Currently selected chapter */
    selectedChapter: null,

    /**
     * Initializes the Admin Controller.
     */
    init: function () {
        try {
            console.log("AdminController Init");
            this.render();
        } catch (e) {
            console.error("Admin Init Error:", e);
            document.getElementById('main-content').innerHTML = `<div style="padding:2rem; color:red;"><h3>Admin Panel Error</h3><pre>${e.message}</pre></div>`;
        }
    },

    /**
     * Renders the main admin layout.
     */
    render: function () {
        const container = document.getElementById('main-content');
        if (!container) return;

        container.innerHTML = `
            <div class="admin-layout fade-in">
                <nav class="admin-sidebar">
                    <button class="admin-nav-btn ${this.currentView === 'users' ? 'active' : ''}" onclick="AdminController.switchView('users')">👥 User Management</button>
                    <button class="admin-nav-btn ${this.currentView === 'content' ? 'active' : ''}" onclick="AdminController.switchView('content')">📚 Subject Structure</button>
                    <button class="admin-nav-btn ${this.currentView === 'questions' ? 'active' : ''}" onclick="AdminController.switchView('questions')">❓ Question Banks</button>
                    <button class="admin-nav-btn ${this.currentView === 'ai-gen' ? 'active' : ''}" onclick="AdminController.switchView('ai-gen')">🤖 AI Generator</button>
                </nav>
                <div class="admin-content" id="admin-view-port">
                    <!-- Dynamic Content -->
                </div>
            </div>
        `;

        try {
            this.renderViewport();
        } catch (e) {
            document.getElementById('admin-view-port').innerHTML = `<div style="color:red;">Viewport Error: ${e.message}</div>`;
        }
    },

    /**
     * Switches the current view.
     * @param {string} view - The view identifier.
     */
    switchView: function (view) {
        this.currentView = view;
        this.render(); // Re-render shell to update active state
    },

    /**
     * Renders the specific content based on currentView.
     */
    renderViewport: function () {
        const viewport = document.getElementById('admin-view-port');
        if (!viewport) return;

        if (this.currentView === 'users') {
            this.renderUsers(viewport);
        } else if (this.currentView === 'content') {
            this.renderContent(viewport);
        } else if (this.currentView === 'questions') {
            this.renderQuestions(viewport);
        } else if (this.currentView === 'ai-gen') {
            this.renderAIGenerator(viewport);
        }
    },

    // --- User View ---

    /**
     * Renders the user management view.
     * @param {HTMLElement} container - The container element.
     */
    renderUsers: function (container) {
        const users = DataManager.getUsers() || [];

        let html = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
                <h2>User Management</h2>
                <div>
                    <button class="primary-btn" onclick="AdminController.handleAddUser()">+ Add User</button>
                    <button class="action-btn btn-warning" onclick="AdminController.handleResetAll()">Reset All Points</button>
                </div>
            </div>
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Level</th>
                        <th>Points</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
        `;

        if (users.length === 0) {
            html += `<tr><td colspan="4" class="text-center">No users found</td></tr>`;
        } else {
            users.forEach(u => {
                if (!u) return;
                html += `
                    <tr>
                        <td>
                            <div style="font-weight:600;">${u.name || u.username}</div>
                            <div style="font-size:0.8rem; color:var(--text-muted);">@${u.username} ${u.isBot ? '(BOT)' : ''} ${u.isAdmin ? '👑' : ''}</div>
                        </td>
                        <td>${u.level || 1}</td>
                        <td>${u.points}</td>
                        <td>
                            <button class="admin-action-btn btn-warning" onclick="AdminController.handleReset('${u.username}')">Reset Pts</button>
                            ${!u.isBot ? `<button class="admin-action-btn btn-danger" onclick="AdminController.handleDeleteUser('${u.username}')">Delete</button>` : ''}
                        </td>
                    </tr>
                `;
            });
        }

        html += `</tbody></table>`;
        container.innerHTML = html;
    },

    /**
     * Handles adding a new user via prompt.
     */
    handleAddUser: async function () {
        const u = prompt("Enter Username:");
        if (!u) return;
        const p = prompt("Enter Password:");
        if (!p) return;

        const users = DataManager.getUsers();
        if (users.find(user => user.username === u)) {
            alert("Username taken.");
            return;
        }

        const newUser = {
            username: u,
            name: u,
            password: p,
            points: 0,
            level: 1,
            profilePic: null,
            isAdmin: false
        };
        users.push(newUser);
        DataManager.saveUsers(users); // Local save

        // Cloud Sync
        if (typeof CloudManager !== 'undefined') await CloudManager.saveUser(newUser);

        this.renderViewport();
    },

    /**
     * Resets points for a user.
     * @param {string} username
     */
    handleReset: async function (username) {
        if (confirm(`Reset points for ${username}?`)) {
            DataManager.resetUserPoints(username);

            // Cloud Sync
            if (typeof CloudManager !== 'undefined') {
                const updatedUser = DataManager.getUsers().find(u => u.username === username);
                if (updatedUser) await CloudManager.saveUser(updatedUser);
            }

            this.renderViewport();
        }
    },

    /**
     * Resets points for all users.
     */
    handleResetAll: async function () {
        if (confirm("Reset ALL user points? This cannot be undone.")) {
            DataManager.resetUserPoints('ALL');

            // Cloud Sync
            if (typeof CloudManager !== 'undefined') {
                await CloudManager.syncUsers(DataManager.getUsers());
            }

            this.renderViewport();
        }
    },

    /**
     * Deletes a user.
     * @param {string} username
     */
    handleDeleteUser: async function (username) {
        if (confirm(`Delete user ${username}?`)) {
            DataManager.deleteUser(username);

            // Cloud Sync
            if (typeof CloudManager !== 'undefined') await CloudManager.deleteUser(username);

            this.renderViewport();
        }
    },

    // --- Content Structure View ---

    /**
     * Renders the content structure (Subjects/Chapters).
     * @param {HTMLElement} container
     */
    renderContent: function (container) {
        const data = DataManager.getQuizData();

        let html = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
                <h2>Subjects & Chapters</h2>
                <button class="primary-btn" onclick="AdminController.handleAddSubject()">+ New Subject</button>
            </div>
            <div class="content-tree">
        `;

        for (const [subject, chapters] of Object.entries(data)) {
            html += `
                <div class="subject-block">
                    <div class="subject-header">
                        <div style="display:flex; align-items:center; gap:1rem;">
                            <h3 style="color:var(--primary);">${subject}</h3>
                            <button class="admin-action-btn" onclick="AdminController.handleRenameSubject('${subject}')">✏️</button>
                        </div>
                        <div style="display:flex; gap:0.5rem;">
                             <button class="admin-action-btn btn-danger" onclick="AdminController.handleDeleteSubject('${subject}')">Delete Subject</button>
                        </div>
                    </div>
                    <div class="chapter-list">
                        ${Object.keys(chapters).map(ch => `
                            <div class="chapter-tag">
                                <span onclick="AdminController.handleRenameChapter('${subject}', '${ch}')" style="cursor:pointer;" title="Rename">${ch}</span>
                                <span style="cursor:pointer; opacity:0.6; margin-left:0.5rem;" onclick="AdminController.handleDeleteChapter('${subject}', '${ch}')">×</span>
                            </div>
                        `).join('')}
                        <button class="chapter-tag add-btn" onclick="AdminController.handleAddChapter('${subject}')">+ Add Chapter</button>
                    </div>
                </div>
            `;
        }

        html += `</div>`;
        container.innerHTML = html;
    },

    handleAddSubject: function () {
        const name = prompt("Enter Subject Code (e.g. NET, SEC):");
        if (name) {
            if (DataManager.addSubject(name)) this.renderViewport();
            else alert("Subject already exists.");
        }
    },

    handleRenameSubject: function (oldName) {
        const newName = prompt("Rename Subject:", oldName);
        if (newName && newName !== oldName) {
            const data = DataManager.getQuizData();
            if (data[newName]) { alert("Subject name exists."); return; }
            data[newName] = data[oldName];
            delete data[oldName];
            DataManager.saveQuizData(data);
            this.renderViewport();
        }
    },

    handleDeleteSubject: function (subject) {
        if (confirm(`Delete subject ${subject} and all its chapters?`)) {
            DataManager.deleteSubject(subject);
            this.renderViewport();
        }
    },

    handleAddChapter: function (subject) {
        const name = prompt("Enter Chapter Name (e.g. CH 1, MIXED):");
        if (name) {
            if (DataManager.addChapter(subject, name)) this.renderViewport();
            else alert("Chapter already exists.");
        }
    },

    handleRenameChapter: function (subject, oldName) {
        const newName = prompt("Rename Chapter:", oldName);
        if (newName && newName !== oldName) {
            const data = DataManager.getQuizData();
            if (data[subject][newName]) { alert("Chapter name exists."); return; }
            data[subject][newName] = data[subject][oldName];
            delete data[subject][oldName];
            DataManager.saveQuizData(data);
            this.renderViewport();
        }
    },

    handleDeleteChapter: function (subject, chapter) {
        if (confirm(`Delete ${chapter} from ${subject}?`)) {
            DataManager.deleteChapter(subject, chapter);
            this.renderViewport();
        }
    },

    // --- Questions View ---

    /**
     * Renders the questions editor view.
     * @param {HTMLElement} container
     */
    renderQuestions: function (container) {
        const data = DataManager.getQuizData();
        const subjects = Object.keys(data);

        // Initial Selection State
        if (!this.selectedSubject && subjects.length > 0) this.selectedSubject = subjects[0];
        if (this.selectedSubject && !data[this.selectedSubject]) this.selectedSubject = subjects[0]; // Safety if deleted

        if (this.selectedSubject && !this.selectedChapter) {
            const chaps = Object.keys(data[this.selectedSubject] || {});
            if (chaps.length > 0) this.selectedChapter = chaps[0];
        }

        const chapters = this.selectedSubject ? Object.keys(data[this.selectedSubject] || {}) : [];
        const questions = (this.selectedSubject && this.selectedChapter)
            ? (data[this.selectedSubject][this.selectedChapter] || [])
            : [];

        // Mixed Warning
        const isMixed = this.selectedChapter && this.selectedChapter.toUpperCase() === 'MIXED';

        let html = `
            <h2>Question Bank Editor</h2>
            <div style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap; align-items:center;">
                <select class="admin-input" style="width:auto;" onchange="AdminController.changeSubject(this.value)">
                    ${subjects.map(s => `<option value="${s}" ${s === this.selectedSubject ? 'selected' : ''}>${s}</option>`).join('')}
                </select>
                <select class="admin-input" style="width:auto;" onchange="AdminController.changeChapter(this.value)">
                    ${chapters.map(c => `<option value="${c}" ${c === this.selectedChapter ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
                ${!isMixed ? `<button class="primary-btn" onclick="AdminController.openQuestionEditor()">+ Add New Question</button>` : ''}
            </div>

            ${!isMixed && questions.length > 0 ? `
                <div style="margin-bottom:1rem;">
                    <input
                        type="text"
                        id="question-search-input"
                        class="admin-input"
                        placeholder="🔍 Search questions by text..."
                        oninput="AdminController.filterQuestions(this.value)"
                        style="width:100%; max-width:500px;"
                    >
                </div>
            ` : ''}

            ${isMixed ? `
                <div style="padding:1rem; background:rgba(245, 158, 11, 0.1); border:1px solid var(--gold); border-radius:8px; color:var(--gold); margin-bottom:1rem;">
                    ⚠️ <strong>MIXED Chapter:</strong> This chapter automatically aggregates questions from all other chapters in ${this.selectedSubject}. You cannot add questions directly to it.
                </div>
            ` : `
                <div style="background:rgba(0,0,0,0.2); padding:1rem; border-radius:8px; max-height:500px; overflow-y:auto;" id="questions-container">
                    <div style="margin-bottom:1rem; color:var(--text-muted);" id="question-count">${questions.length} questions found.</div>
                    ${questions.length === 0 ? '<p style="color:var(--text-muted); font-style:italic;">No questions in this bank yet.</p>' : ''}
                    <div id="questions-list">
                        ${questions.slice().reverse().map(q => `
                            <div class="question-preview-item" data-question-text="${q.question.toLowerCase()}" onclick="AdminController.openQuestionEditor(${q.id})">
                                <div style="display:flex; justify-content:space-between;">
                                    <span style="font-weight:600; color:var(--primary); font-size:0.8rem;">${q.type.toUpperCase()}</span>
                                    <span style="font-size:0.8rem; color:var(--text-muted);">ID: ${q.id}</span>
                                </div>
                                <div style="margin:0.5rem 0;">${q.question}</div>
                                <div style="font-size:0.85rem; color:var(--success);">Answer: ${q.type === 'mcq' ? q.options[q.correct] : (q.answer ? 'True' : 'False')}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `}
        `;

        container.innerHTML = html;
    },

    changeSubject: function (val) {
        this.selectedSubject = val;
        this.selectedChapter = null; // Reset chapter
        this.renderViewport();
    },

    changeChapter: function (val) {
        this.selectedChapter = val;
        this.renderViewport();
    },

    filterQuestions: function (searchText) {
        const questionItems = document.querySelectorAll('.question-preview-item');
        const searchLower = searchText.toLowerCase().trim();
        let visibleCount = 0;

        questionItems.forEach(item => {
            const questionText = item.getAttribute('data-question-text');
            const questionDiv = item.querySelector('div[style*="margin:0.5rem 0"]');

            if (questionText.includes(searchLower)) {
                item.style.display = '';
                visibleCount++;

                // Highlight the search term if there's a search query
                if (searchLower && questionDiv) {
                    const originalText = questionDiv.getAttribute('data-original-text') || questionDiv.textContent;

                    // Store original text if not already stored
                    if (!questionDiv.getAttribute('data-original-text')) {
                        questionDiv.setAttribute('data-original-text', originalText);
                    }

                    // Create highlighted version (case-insensitive)
                    const regex = new RegExp(`(${searchLower})`, 'gi');
                    const highlightedText = originalText.replace(regex, '<mark style="background-color: #fbbf24; color: #000; padding: 2px 4px; border-radius: 3px; font-weight: 600;">$1</mark>');
                    questionDiv.innerHTML = highlightedText;
                }
            } else {
                item.style.display = 'none';
            }
        });

        // If search is cleared, remove all highlights
        if (!searchLower) {
            questionItems.forEach(item => {
                const questionDiv = item.querySelector('div[style*="margin:0.5rem 0"]');
                if (questionDiv && questionDiv.getAttribute('data-original-text')) {
                    questionDiv.textContent = questionDiv.getAttribute('data-original-text');
                }
            });
        }

        // Update count display
        const countEl = document.getElementById('question-count');
        if (countEl) {
            if (searchText.trim()) {
                countEl.textContent = `${visibleCount} of ${questionItems.length} questions found.`;
            } else {
                countEl.textContent = `${questionItems.length} questions found.`;
            }
        }
    },

    openQuestionEditor: function (qId = null) {
        const viewport = document.getElementById('admin-view-port');
        const data = DataManager.getQuizData();
        let q = { type: 'mcq', question: '', options: ['', '', '', ''], correct: 0, explanation: '' };

        if (qId) {
            q = data[this.selectedSubject][this.selectedChapter].find(item => item.id === qId);
        }

        viewport.innerHTML = `
            <div style="margin-bottom:1rem;">
                <button class="secondary-btn" onclick="AdminController.renderViewport()">← Back to List</button>
            </div>
            <h2>${qId ? 'Edit' : 'Create'} Question</h2>
            <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:1rem;">Subject: ${this.selectedSubject} > Chapter: ${this.selectedChapter}</p>

            <div class="editor-form">
                <div class="editor-row">
                    <label>Type</label>
                    <select id="edit-type" class="admin-input" onchange="AdminController.toggleOptions(this.value)">
                        <option value="mcq" ${q.type === 'mcq' ? 'selected' : ''}>MCQ</option>
                        <option value="tf" ${q.type === 'tf' ? 'selected' : ''}>True/False</option>
                    </select>
                </div>

                <div class="editor-row">
                    <label>Question</label>
                    <textarea id="edit-question" class="admin-input" rows="3" placeholder="Enter the question text here...">${q.question}</textarea>
                </div>

                <div id="options-container" class="${q.type === 'tf' ? 'hidden' : ''}">
                    <div class="editor-row">
                        <label>Options</label>
                        <div style="display:grid; gap:0.5rem; width:100%;">
                            <input type="text" class="admin-input edit-option" placeholder="Option 1" value="${q.options ? q.options[0] : ''}">
                            <input type="text" class="admin-input edit-option" placeholder="Option 2" value="${q.options ? q.options[1] : ''}">
                            <input type="text" class="admin-input edit-option" placeholder="Option 3" value="${q.options ? q.options[2] : ''}">
                            <input type="text" class="admin-input edit-option" placeholder="Option 4" value="${q.options ? q.options[3] : ''}">
                        </div>
                    </div>
                </div>

                <div class="editor-row">
                    <label>Correct Answer</label>
                    <div id="correct-selector">
                        ${this.renderCorrectSelector(q.type, q.correct, q.answer)}
                    </div>
                </div>

                <div class="editor-row">
                    <label>Explanation</label>
                    <textarea id="edit-explanation" class="admin-input" rows="3" placeholder="Why is the correct answer correct? (Mandatory)">${q.explanation || ''}</textarea>
                </div>

                <div style="margin-top:1rem; display:flex; gap:1rem;">
                    <button class="primary-btn" onclick="AdminController.saveQuestion(${qId})">Save Question</button>
                    ${qId ? `<button class="admin-action-btn btn-danger" style="padding:0.8rem;" onclick="AdminController.deleteQuestion(${qId})">Delete</button>` : ''}
                </div>
            </div>
        `;
    },

    toggleOptions: function (type) {
        const container = document.getElementById('options-container');
        const correctContainer = document.getElementById('correct-selector');

        if (type === 'tf') {
            container.classList.add('hidden');
            correctContainer.innerHTML = this.renderCorrectSelector('tf', 0, true);
        } else {
            container.classList.remove('hidden');
            correctContainer.innerHTML = this.renderCorrectSelector('mcq', 0, null);
        }
    },

    renderCorrectSelector: function (type, correctIdx, correctBool) {
        if (type === 'tf') {
            return `
                <select id="edit-correct" class="admin-input">
                    <option value="true" ${correctBool === true ? 'selected' : ''}>True</option>
                    <option value="false" ${correctBool === false ? 'selected' : ''}>False</option>
                </select>
            `;
        } else {
            return `
                <select id="edit-correct" class="admin-input">
                    <option value="0" ${correctIdx === 0 ? 'selected' : ''}>Option 1</option>
                    <option value="1" ${correctIdx === 1 ? 'selected' : ''}>Option 2</option>
                    <option value="2" ${correctIdx === 2 ? 'selected' : ''}>Option 3</option>
                    <option value="3" ${correctIdx === 3 ? 'selected' : ''}>Option 4</option>
                </select>
            `;
        }
    },

    saveQuestion: function (qId) {
        const type = document.getElementById('edit-type').value;
        const question = document.getElementById('edit-question').value;
        const explanation = document.getElementById('edit-explanation').value;

        if (!question.trim()) { alert("Question text required"); return; }
        if (!explanation.trim()) { alert("Explanation is required for learning value."); return; }

        let newQ = { type, question, explanation };

        if (type === 'mcq') {
            const opts = Array.from(document.querySelectorAll('.edit-option')).map(i => i.value);
            if (opts.some(o => !o.trim())) { alert("All 4 options required for MCQ"); return; }
            newQ.options = opts;
            newQ.correct = parseInt(document.getElementById('edit-correct').value);
        } else {
            newQ.answer = document.getElementById('edit-correct').value === 'true';
        }

        if (qId) {
            newQ.id = qId;
            DataManager.updateQuestion(this.selectedSubject, this.selectedChapter, newQ);
        } else {
            DataManager.addQuestion(this.selectedSubject, this.selectedChapter, newQ);
        }

        this.renderViewport();
    },

    deleteQuestion: function (qId) {
        if (confirm("Delete this question?")) {
            DataManager.deleteQuestion(this.selectedSubject, this.selectedChapter, qId);
            this.renderViewport();
        }
    },

    // --- AI Generator View ---

    /**
     * Renders the AI Generator view.
     * @param {HTMLElement} container
     */
    renderAIGenerator: function (container) {
        const data = DataManager.getQuizData();
        const subjects = Object.keys(data);

        // Initial Selection Logic (Reuse or Default)
        if (!this.selectedSubject && subjects.length > 0) this.selectedSubject = subjects[0];
        if (this.selectedSubject && !data[this.selectedSubject]) this.selectedSubject = subjects[0];
        if (this.selectedSubject && !this.selectedChapter) {
            const chaps = Object.keys(data[this.selectedSubject] || {});
            if (chaps.length > 0) this.selectedChapter = chaps[0];
        }

        const chapters = this.selectedSubject ? Object.keys(data[this.selectedSubject] || {}) : [];

        container.innerHTML = `
            <h2>AI Question Bank Generator</h2>
            <p style="color:var(--text-muted); margin-bottom:1.5rem;">Use this tool to generate a prompt for an AI (like ChatGPT) and import the results directly.</p>

            <!-- Configuration -->
            <div class="glass-card" style="padding:1.5rem; margin-bottom:1.5rem;">
                <h3 style="margin-bottom:1rem; font-size:1.1rem;">1. Configuration</h3>
                <div style="display:grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap:1rem; margin-bottom:1rem;">
                    <div>
                        <label style="display:block; margin-bottom:0.5rem; font-size:0.8rem;">Subject</label>
                        <select class="admin-input" id="gen-subject" onchange="AdminController.updateGenChapters(this.value)">
                            ${subjects.map(s => `<option value="${s}" ${s === this.selectedSubject ? 'selected' : ''}>${s}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label style="display:block; margin-bottom:0.5rem; font-size:0.8rem;">Chapter</label>
                        <select class="admin-input" id="gen-chapter" onchange="AdminController.selectedChapter = this.value">
                            ${chapters.map(c => `<option value="${c}" ${c === this.selectedChapter ? 'selected' : ''}>${c}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label style="display:block; margin-bottom:0.5rem; font-size:0.8rem;">Quantity</label>
                        <input type="number" id="gen-count" class="admin-input" value="10" min="1" max="50">
                    </div>
                    <div>
                        <label style="display:block; margin-bottom:0.5rem; font-size:0.8rem;">Type</label>
                        <select class="admin-input" id="gen-type">
                            <option value="mixed">Mixed (MCQ & T/F)</option>
                            <option value="mcq">MCQ Only</option>
                            <option value="tf">True/False Only</option>
                        </select>
                    </div>
                </div>

                <div style="margin-bottom:1rem;">
                    <label style="display:block; margin-bottom:0.5rem; font-size:0.8rem;">Source Material (Optional Context)</label>
                    <textarea id="gen-source" class="admin-input" rows="3" placeholder="Paste summary, key points, or text here to include in the prompt..."></textarea>
                </div>

                <button class="primary-btn" style="width:100%;" onclick="AdminController.generatePrompt()">Generate Prompt ➜</button>
            </div>

            <!-- Prompt Output -->
            <div class="glass-card" style="padding:1.5rem; margin-bottom:1.5rem; display:none;" id="prompt-section">
                <h3 style="margin-bottom:1rem; font-size:1.1rem;">2. Copy Prompt to AI</h3>
                <textarea id="prompt-output" class="admin-input" rows="6" readonly style="font-family:monospace; font-size:0.85rem; color:var(--success);"></textarea>
                <button class="secondary-btn" style="width:100%; margin-top:0.5rem;" onclick="navigator.clipboard.writeText(document.getElementById('prompt-output').value); alert('Prompt copied!')">Copy to Clipboard</button>
            </div>

            <!-- Import Section -->
            <div class="glass-card" style="padding:1.5rem;">
                <h3 style="margin-bottom:1rem; font-size:1.1rem;">3. Paste AI Response & Import</h3>
                <textarea id="import-input" class="admin-input" rows="8" placeholder="Paste the exact output from the AI here..."></textarea>
                <button class="primary-btn" style="width:100%; margin-top:1rem; background:var(--tertiary);" onclick="AdminController.parseAndImport()">Parse & Save to Bank</button>
            </div>
        `;
    },

    updateGenChapters: function (subject) {
        this.selectedSubject = subject;
        this.renderAIGenerator(document.getElementById('admin-view-port'));
    },

    generatePrompt: function () {
        const subject = document.getElementById('gen-subject').value;
        const chapter = document.getElementById('gen-chapter').value;
        const count = document.getElementById('gen-count').value;
        const type = document.getElementById('gen-type').value;
        const source = document.getElementById('gen-source').value;

        if (!chapter) { alert("Please select a chapter."); return; }
        if (chapter === 'MIXED') { alert("Cannot generate for MIXED chapter (it is an aggregator)."); return; }

        let typeInstruction = "";
        if (type === 'mcq') typeInstruction = "All questions must be Multiple Choice Questions (MCQ).";
        else if (type === 'tf') typeInstruction = "All questions must be True/False Questions.";
        else typeInstruction = "Mix question types: MCQ and True/False.";

        const promptText = `
I need you to generate a question bank for a quiz platform.
Topic: ${subject} - ${chapter}
Number of Questions: ${count}
Question Type: ${typeInstruction}

${source ? `Source Material/Context:\n"${source}"\n` : ''}

Strict Formatting Rules:
1. Follow the example format exactly.
2. Each question must include: Question Number, Question Text, Options (if MCQ), Correct Answer, and Justification.
3. Justification is mandatory and must explain why the correct answer is right.

MCQ Example:
Question 1
What is the primary objective of the system?
A) Option A
B) Option B
C) Option C
D) Option D
Correct Answer: C
Justification: Option C is correct because...

True/False Example:
Question 2
The sky is green.
A) True
B) False
Correct Answer: B
Justification: False, because the sky is blue.

Output the questions now following this strict format.
`;

        const promptSection = document.getElementById('prompt-section');
        promptSection.style.display = 'block';
        document.getElementById('prompt-output').value = promptText.trim();
        promptSection.scrollIntoView({ behavior: 'smooth' });
    },

    parseAndImport: function () {
        const rawText = document.getElementById('import-input').value;
        if (!rawText.trim()) { alert("Please paste the AI output first."); return; }

        // Robust Regex-based parsing
        // We split by "Question X" to isolate blocks
        const blocks = rawText.split(/Question \d+/i).slice(1); // Ignore preamble

        if (blocks.length === 0) {
            alert("Could not parse questions. Ensure the format starts with 'Question 1', 'Question 2', etc.");
            return;
        }

        let successCount = 0;

        blocks.forEach(block => {
            try {
                // Extract lines
                const blockLines = block.trim().split('\n').map(l => l.trim()).filter(l => l.length > 0);

                // 1. Question Text: Everything until the first Option (A)) or 'Correct Answer'
                // Detection strategy: Find lines starting with A) or Correct Answer
                let questionText = "";
                let optionsStartIdx = -1;
                let correctAnswerLine = -1;
                let justificationLine = -1;

                for (let i = 0; i < blockLines.length; i++) {
                    const line = blockLines[i];
                    if (line.match(/^[A-D]\)/) && optionsStartIdx === -1) optionsStartIdx = i;
                    if (line.toLowerCase().startsWith("correct answer:")) correctAnswerLine = i;
                    if (line.toLowerCase().startsWith("justification:")) justificationLine = i;
                }

                if (optionsStartIdx !== -1) {
                    // It's likely MCQ or TF with options listed
                    questionText = blockLines.slice(0, optionsStartIdx).join(' ');
                } else if (correctAnswerLine !== -1) {
                    questionText = blockLines.slice(0, correctAnswerLine).join(' ');
                }

                // Determine Type based on Options
                let type = 'mcq';
                let options = [];
                let correct = 0;
                let answer = false; // for TF

                if (optionsStartIdx !== -1 && correctAnswerLine !== -1) {
                    const optLines = blockLines.slice(optionsStartIdx, correctAnswerLine);
                    // Check if options are True/False
                    const isTF = optLines.some(l => l.toLowerCase().includes('true')) && optLines.some(l => l.toLowerCase().includes('false'));

                    if (isTF && optLines.length <= 2) {
                        type = 'tf';
                    } else {
                        type = 'mcq';
                        // Clean options (remove A) B) etc)
                        options = optLines.map(l => l.replace(/^[A-D]\)\s*/, ''));
                    }
                }

                // Parse Correct Answer
                const correctLine = blockLines[correctAnswerLine]; // "Correct Answer: C" or "Correct Answer: B"
                const val = correctLine.split(':')[1].trim().toUpperCase(); // "C" or "B" or "TRUE"

                if (type === 'mcq') {
                    // Map A,B,C,D to 0,1,2,3
                    const map = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
                    correct = map[val.charAt(0)] !== undefined ? map[val.charAt(0)] : 0;
                } else {
                    // True/False
                    // If output says "Correct Answer: A" (where A is True) or "Correct Answer: True"
                    if (val === 'TRUE' || val.startsWith('A')) answer = true;
                    else answer = false;
                }

                // Justification
                let explanation = "";
                if (justificationLine !== -1) {
                    const parts = blockLines.slice(justificationLine);
                    explanation = parts.join(' ').replace(/^Justification:\s*/i, '');
                }

                // Construct Object
                const newQ = {
                    type: type,
                    question: questionText,
                    explanation: explanation
                };

                if (type === 'mcq') {
                    newQ.options = options;
                    newQ.correct = correct;
                } else {
                    newQ.answer = answer;
                }

                // Add to DB
                if (newQ.question) {
                    DataManager.addQuestion(this.selectedSubject, this.selectedChapter, newQ);
                    successCount++;
                }

            } catch (err) {
                console.error("Error parsing block:", block, err);
            }
        });

        alert(`Successfully imported ${successCount} questions into ${this.selectedSubject} > ${this.selectedChapter}.`);
        this.renderViewport(); // Refresh
    }
};

window.AdminController = AdminController;
