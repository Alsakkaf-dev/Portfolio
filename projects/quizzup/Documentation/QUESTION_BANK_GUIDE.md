# 📚 QuizzUp Question Bank Guide

## 🎯 Overview
This guide explains how the question banks are organized and how to easily replace them with your real questions.

---

## 📁 File Structure

**File:** `src/js/quizData.js`

The file contains **4 subjects**, each with **3 chapters**, each chapter has **2 question types**:

```
quizData
├── SPM (Software Project Management)
│   ├── CH 6
│   │   ├── MCQ Bank (5 questions)
│   │   └── True/False Bank (5 questions)
│   ├── CH 7
│   │   ├── MCQ Bank (5 questions)
│   │   └── True/False Bank (5 questions)
│   └── CH 8
│       ├── MCQ Bank (5 questions)
│       └── True/False Bank (5 questions)
│
├── DSA (Data Structures & Algorithms)
│   ├── CH 6
│   │   ├── MCQ Bank (5 questions)
│   │   └── True/False Bank (5 questions)
│   ├── CH 7
│   │   ├── MCQ Bank (5 questions)
│   │   └── True/False Bank (5 questions)
│   └── CH 8
│       ├── MCQ Bank (5 questions)
│       └── True/False Bank (5 questions)
│
├── HCI (Human-Computer Interaction)
│   ├── CH 6
│   │   ├── MCQ Bank (5 questions)
│   │   └── True/False Bank (5 questions)
│   ├── CH 7
│   │   ├── MCQ Bank (5 questions)
│   │   └── True/False Bank (5 questions)
│   └── CH 8
│       ├── MCQ Bank (5 questions)
│       └── True/False Bank (5 questions)
│
└── OS (Operating Systems)
    ├── CH 6
    │   ├── MCQ Bank (5 questions)
    │   └── True/False Bank (5 questions)
    ├── CH 7
    │   ├── MCQ Bank (5 questions)
    │   └── True/False Bank (5 questions)
    └── CH 8
        ├── MCQ Bank (5 questions)
        └── True/False Bank (5 questions)
```

---

## 📝 Question Format

### **MCQ (Multiple Choice) Format:**
```javascript
{
    id: 1,                    // Unique ID (must be unique across all questions)
    question: "Your question text here?",
    options: [                // Array of 4 options
        "Option A",
        "Option B",
        "Option C",
        "Option D"
    ],
    correct: 1,               // Index of correct answer (0-3)
    type: "mcq"               // Must be "mcq"
}
```

### **True/False Format:**
```javascript
{
    id: 6,                    // Unique ID
    question: "Your statement here.",
    answer: true,             // true or false
    type: "tf"                // Must be "tf"
}
```

---

## 🔢 ID Ranges (Current Setup)

| Subject | ID Range |
|---------|----------|
| **SPM** | 1 - 30 |
| **DSA** | 101 - 130 |
| **HCI** | 201 - 230 |
| **OS** | 301 - 330 |

**Per Chapter:**
- CH 6: IDs 1-10 (SPM), 101-110 (DSA), 201-210 (HCI), 301-310 (OS)
- CH 7: IDs 11-20 (SPM), 111-120 (DSA), 211-220 (HCI), 311-320 (OS)
- CH 8: IDs 21-30 (SPM), 121-130 (DSA), 221-230 (HCI), 321-330 (OS)

---

## 🎯 How to Replace Questions

### **Step 1: Locate the Section**
Open `src/js/quizData.js` and find the section you want to update.

**Example:** To update SPM Chapter 6 MCQ questions, look for:
```javascript
SPM: {
    "CH 6": [
        // === MCQ BANK for SPM Chapter 6 ===
        { id: 1, question: "...", ... },
        // ... more MCQ questions

        // === TRUE/FALSE BANK for SPM Chapter 6 ===
        { id: 6, question: "...", ... },
        // ... more True/False questions
    ],
```

### **Step 2: Replace MCQ Questions**
Replace the MCQ questions (first 5 in each chapter) with your real questions:

```javascript
// === MCQ BANK for SPM Chapter 6 ===
{
    id: 1,
    question: "YOUR REAL QUESTION 1?",
    options: ["Answer A", "Answer B", "Answer C", "Answer D"],
    correct: 2,  // Index of correct answer (0 = A, 1 = B, 2 = C, 3 = D)
    type: "mcq"
},
{
    id: 2,
    question: "YOUR REAL QUESTION 2?",
    options: ["Answer A", "Answer B", "Answer C", "Answer D"],
    correct: 0,
    type: "mcq"
},
// ... continue for all MCQ questions
```

### **Step 3: Replace True/False Questions**
Replace the True/False questions (last 5 in each chapter):

```javascript
// === TRUE/FALSE BANK for SPM Chapter 6 ===
{
    id: 6,
    question: "YOUR REAL STATEMENT 1.",
    answer: true,  // or false
    type: "tf"
},
{
    id: 7,
    question: "YOUR REAL STATEMENT 2.",
    answer: false,
    type: "tf"
},
// ... continue for all True/False questions
```

### **Step 4: Repeat for All Chapters**
Do the same for:
- SPM: CH 6, CH 7, CH 8
- DSA: CH 6, CH 7, CH 8
- HCI: CH 6, CH 7, CH 8
- OS: CH 6, CH 7, CH 8

---

## ✅ Important Rules

### **1. Unique IDs**
- Every question must have a **unique ID**
- Don't reuse IDs across different questions
- Suggested: Keep the current ID ranges per subject

### **2. Correct Answer Index (MCQ)**
- `correct: 0` → First option (index 0)
- `correct: 1` → Second option (index 1)
- `correct: 2` → Third option (index 2)
- `correct: 3` → Fourth option (index 3)

### **3. Type Field**
- MCQ questions: `type: "mcq"`
- True/False questions: `type: "tf"`
- **Never change these!**

### **4. Array Format**
- Each chapter is an **array** `[ ]`
- Questions are separated by **commas**
- Last question in array has **no comma after it**

### **5. Quote Marks**
- Use **double quotes** `"` for strings
- Be careful with apostrophes in questions (use `\'` or avoid)

---

## 🎮 Quiz Modes

The app has 3 quiz modes that work automatically:

| Mode | What It Shows |
|------|---------------|
| **MIXED** | All MCQ + All True/False questions randomly |
| **MCQ Only** | Only questions with `type: "mcq"` |
| **True/False** | Only questions with `type: "tf"` |

You don't need to do anything special - the app filters by the `type` field automatically!

---

## 📊 Current Question Count

| Subject | Chapter | MCQ | True/False | Total |
|---------|---------|-----|------------|-------|
| **SPM** | CH 6 | 5 | 5 | 10 |
| **SPM** | CH 7 | 5 | 5 | 10 |
| **SPM** | CH 8 | 5 | 5 | 10 |
| **DSA** | CH 6 | 5 | 5 | 10 |
| **DSA** | CH 7 | 5 | 5 | 10 |
| **DSA** | CH 8 | 5 | 5 | 10 |
| **HCI** | CH 6 | 5 | 5 | 10 |
| **HCI** | CH 7 | 5 | 5 | 10 |
| **HCI** | CH 8 | 5 | 5 | 10 |
| **OS** | CH 6 | 5 | 5 | 10 |
| **OS** | CH 7 | 5 | 5 | 10 |
| **OS** | CH 8 | 5 | 5 | 10 |
| **TOTAL** | | **60** | **60** | **120** |

---

## 🚀 Adding More Questions

Want to add more than 5 questions per type? Just add more objects to the array!

**Example - Adding a 6th MCQ question to SPM CH 6:**
```javascript
"CH 6": [
    // === MCQ BANK for SPM Chapter 6 ===
    { id: 1, question: "...", options: [...], correct: 1, type: "mcq" },
    { id: 2, question: "...", options: [...], correct: 0, type: "mcq" },
    { id: 3, question: "...", options: [...], correct: 2, type: "mcq" },
    { id: 4, question: "...", options: [...], correct: 1, type: "mcq" },
    { id: 5, question: "...", options: [...], correct: 0, type: "mcq" },
    { id: 31, question: "NEW QUESTION?", options: [...], correct: 3, type: "mcq" }, // ← NEW!

    // === TRUE/FALSE BANK for SPM Chapter 6 ===
    { id: 6, question: "...", answer: true, type: "tf" },
    // ... rest of True/False questions
]
```

---

## 🔍 Quick Reference Template

### **Copy-Paste MCQ Template:**
```javascript
{
    id: XXX,
    question: "YOUR QUESTION HERE?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    correct: 0,
    type: "mcq"
},
```

### **Copy-Paste True/False Template:**
```javascript
{
    id: XXX,
    question: "YOUR STATEMENT HERE.",
    answer: true,
    type: "tf"
},
```

---

## ⚠️ Common Mistakes to Avoid

1. **Missing Comma** between questions
   ```javascript
   { id: 1, ... }  // ← Missing comma here!
   { id: 2, ... }  // ← Will cause error
   ```

2. **Wrong correct index** (MCQ)
   ```javascript
   options: ["A", "B", "C", "D"],
   correct: 4  // ← ERROR! Max is 3 (0-indexed)
   ```

3. **Duplicate IDs**
   ```javascript
   { id: 1, ... },
   { id: 1, ... },  // ← ERROR! ID already used
   ```

4. **Wrong type**
   ```javascript
   type: "multiple"  // ← ERROR! Must be "mcq" or "tf"
   ```

5. **Missing quotes**
   ```javascript
   question: What is this?  // ← ERROR! Needs quotes
   question: "What is this?"  // ← CORRECT
   ```

---

## 📧 When You're Ready to Update

**Just send me:**
1. **Subject name** (SPM, DSA, HCI, or OS)
2. **Chapter number** (CH 6, CH 7, or CH 8)
3. **Question type** (MCQ or True/False)
4. **Your questions** in any format

I'll format them correctly and update the file for you!

---

## 🎓 Example Update Request

**"Please update SPM Chapter 6 MCQ questions with these:"**

1. What is software engineering? (A: Systematic approach, B: Random coding, C: Testing only, D: Documentation) - Answer: A
2. Which is an SDLC model? (A: Waterfall, B: Ocean, C: River, D: Lake) - Answer: A
3. ... etc

I'll convert them to the proper format automatically!

---

**Created:** January 23, 2026
**Version:** 1.0
**Status:** ✅ Ready for Question Updates
