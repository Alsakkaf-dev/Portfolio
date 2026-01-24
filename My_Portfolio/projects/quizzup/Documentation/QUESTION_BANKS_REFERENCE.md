# 📊 QuizzUp Question Banks - Quick Reference

## 🎯 Current Structure Overview

**Total Questions:** 120 (60 MCQ + 60 True/False)

---

## 📚 SPM (Software Project Management)

### **Chapter 6** - IDs: 1-10
- **MCQ Questions (5):** IDs 1-5
  - Project management focus
  - Risk management
  - WBS definition
  - Project constraints
  - Project phases

- **True/False Questions (5):** IDs 6-10
  - Gantt charts
  - Scope changes
  - Stakeholder management
  - Risk identification
  - Resource allocation

### **Chapter 7** - IDs: 11-20
- **MCQ Questions (5):** IDs 11-15
  - CPM definition
  - Agile methodologies
  - Sprint concept
  - Project charter
  - Retrospective meetings

- **True/False Questions (5):** IDs 16-20
  - Agile development
  - Critical path
  - Scrum practices
  - Waterfall flexibility
  - Product backlog

### **Chapter 8** - IDs: 21-30
- **MCQ Questions (5):** IDs 21-25
  - Version control tools
  - COCOMO
  - Quality assurance
  - CI/CD
  - Code complexity metrics

- **True/False Questions (5):** IDs 26-30
  - Cost estimation
  - QA vs QC
  - Version control benefits
  - Technical debt
  - Automated testing

---

## 💻 DSA (Data Structures & Algorithms)

### **Chapter 6** - IDs: 101-110
- **MCQ Questions (5):** IDs 101-105
  - LIFO data structure
  - Array access complexity
  - Stack operations
  - FIFO definition
  - Recursion implementation

- **True/False Questions (5):** IDs 106-110
  - Stack implementation
  - Queue principles
  - Linked list insertion
  - Array size
  - Circular queue

### **Chapter 7** - IDs: 111-120
- **MCQ Questions (5):** IDs 111-115
  - Binary tree height
  - Tree traversal
  - Complete binary tree
  - Tree types
  - Maximum nodes

- **True/False Questions (5):** IDs 116-120
  - Binary search requirements
  - Binary tree children
  - BST traversal
  - Binary trees vs BST
  - Leaf nodes

### **Chapter 8** - IDs: 121-130
- **MCQ Questions (5):** IDs 121-125
  - Merge sort complexity
  - Stable sorting
  - Quick sort best case
  - Divide and conquer
  - Bubble sort space

- **True/False Questions (5):** IDs 126-130
  - Bubble sort efficiency
  - Quick sort worst case
  - Merge sort space
  - Selection sort stability
  - Insertion sort efficiency

---

## 🖥️ HCI (Human-Computer Interaction)

### **Chapter 6** - IDs: 201-210
- **MCQ Questions (5):** IDs 201-205
  - HCI definition
  - Usability principles
  - Affordance concept
  - User research methods
  - UX definition

- **True/False Questions (5):** IDs 206-210
  - User-centered design
  - Accessibility importance
  - Prototyping benefits
  - HCI scope
  - Feedback importance

### **Chapter 7** - IDs: 211-220
- **MCQ Questions (5):** IDs 211-215
  - Fitts's Law
  - Gestalt principles
  - Wireframing purpose
  - Color contrast
  - A/B testing

- **True/False Questions (5):** IDs 216-220
  - Fitts's Law application
  - White space value
  - Consistency benefits
  - Feature quantity
  - User testing frequency

### **Chapter 8** - IDs: 221-230
- **MCQ Questions (5):** IDs 221-225
  - WCAG definition
  - Input devices
  - Responsive design
  - Mobile-first benefits
  - Personas purpose

- **True/False Questions (5):** IDs 226-230
  - Color blindness impact
  - Touch target size
  - Accessibility benefits
  - Dark mode purpose
  - Error message clarity

---

## 🔧 OS (Operating Systems)

### **Chapter 6** - IDs: 301-310
- **MCQ Questions (5):** IDs 301-305
  - OS identification
  - OS main function
  - OS types
  - Kernel function
  - System calls

- **True/False Questions (5):** IDs 306-310
  - Resource management
  - GUI requirement
  - Kernel importance
  - System call usage
  - Hardware dependency

### **Chapter 7** - IDs: 311-320
- **MCQ Questions (5):** IDs 311-315
  - Process definition
  - Process states
  - Context switching
  - Scheduling algorithms
  - PCB definition

- **True/False Questions (5):** IDs 316-320
  - Process vs program
  - Process priority
  - Context switching overhead
  - Thread vs process
  - Deadlock desirability

### **Chapter 8** - IDs: 321-330
- **MCQ Questions (5):** IDs 321-325
  - RAM type
  - Virtual memory
  - Page replacement
  - Thrashing
  - Cache purpose

- **True/False Questions (5):** IDs 326-330
  - RAM volatility
  - Virtual memory benefits
  - Page fault impact
  - Cache speed
  - Memory management techniques

---

## 🎯 To Replace Questions

### **Find the section in `quizData.js`:**

```javascript
SUBJECT: {
    "CH X": [
        // === MCQ BANK ===
        { id: X, ... },  // ← Replace these
        { id: X, ... },
        { id: X, ... },
        { id: X, ... },
        { id: X, ... },

        // === TRUE/FALSE BANK ===
        { id: X, ... },  // ← Replace these
        { id: X, ... },
        { id: X, ... },
        { id: X, ... },
        { id: X, ... }
    ]
}
```

### **Replacement Checklist:**
- ✅ Keep the same ID range
- ✅ Keep `type: "mcq"` for MCQ questions
- ✅ Keep `type: "tf"` for True/False questions
- ✅ Update question text
- ✅ Update options (MCQ) or answer (True/False)
- ✅ Update correct answer index (MCQ only)

---

## 📝 Quick Templates

### **MCQ:**
```javascript
{
    id: XXX,
    question: "Question text?",
    options: ["A", "B", "C", "D"],
    correct: 0,
    type: "mcq"
},
```

### **True/False:**
```javascript
{
    id: XXX,
    question: "Statement text.",
    answer: true,
    type: "tf"
},
```

---

## 🚀 Ready to Update!

When you have your real questions, just tell me:
1. **Subject** (SPM/DSA/HCI/OS)
2. **Chapter** (6/7/8)
3. **Type** (MCQ/True-False)
4. **Your questions**

I'll update them for you! 🎉

---

**File Location:** `src/js/quizData.js`
**Total Banks:** 24 (4 subjects × 3 chapters × 2 types)
**Status:** ✅ Ready for Real Questions
