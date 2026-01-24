/**
 * @fileoverview QuizzUp Question Banks
 * Contains the static question data for the application.
 * Structure: Subject -> Chapter -> Questions
 * @author Mohammed Alsakkaf
 */

// ========================================
// QUIZZUP QUESTION BANKS
// ========================================
// Structure: Each subject has chapters, each chapter has separate MCQ and True/False banks
// You can easily replace the questions in each bank with real questions later
// ========================================

/**
 * The main data object containing all quiz questions.
 * @type {Object.<string, Object.<string, Array.<Object>>>}
 */
window.quizData = {
    // ==================== SPM (Software Project Management) ====================
    SPM: {
        "CH 6": [
            // === MCQ BANK for SPM Chapter 6 - DSDM & MoSCoW Prioritization (30 Questions) ===
            {
                id: 1,
                question: "Which DSDM lifecycle option describes a scenario where the project proceeds through Feasibility and Foundations once, followed by multiple Timeboxes in an Evolutionary Development Phase, ending with a single Deployment?",
                options: ["The Multi-Increment Lifecycle", "The Single-Increment Lifecycle", "The Continuous Delivery Cycle", "The Agile Multi-Increment Lifecycle"],
                correct: 1,
                type: "mcq",
                explanation: "The Single-Increment Lifecycle is used when the project is small or simple enough to be delivered in one go after the initial phases."
            },
            {
                id: 2,
                question: "According to the MoSCoW prioritization rules, what is the critical defining characteristic of a 'Must Have' requirement?",
                options: ["It is important but not vital; there may be a temporary workaround.", "It adds significant value and is desirable, but the solution is viable without it.", "Without this requirement, the solution is not legal, unsafe, or not viable.", "It is a requirement that will likely be delivered in a future timeframe."],
                correct: 2,
                type: "mcq",
                explanation: "Must Have requirements are non-negotiable. If they are missing, the project is considered a failure as it's either illegal, unsafe, or useless."
            },
            {
                id: 3,
                question: "In the context of MoSCoW effort allocation within a project or timebox, what is the recommended percentage cap for 'Must Have' effort?",
                options: ["Equal to 80%", "Less than or equal to 60%", "Approximately 20%", "Approximately 40%"],
                correct: 1,
                type: "mcq",
                explanation: "DSDM recommends limiting Must Haves to 60% of the total effort to ensure there is enough contingency (Should/Could Haves) to protect the deadline."
            },
            {
                id: 4,
                question: "Within a DSDM Structured Timebox, which step specifically involves checking if the Timebox objectives are still feasible, agreeing on acceptance criteria, and highlighting dependencies?",
                options: ["Consolidation", "Refinement", "Investigation", "Kick-off"],
                correct: 2,
                type: "mcq",
                explanation: "The Investigation step (10-20% of effort) is where the detail of requirements is understood and acceptance criteria are agreed upon."
            },
            {
                id: 5,
                question: "When defining the length of a Timebox during the Foundations phase, why should Timeboxes typically be kept between 2 and 4 weeks?",
                options: ["To allow the Business Ambassador enough time to take a break between reviews.", "To ensure the time is long enough to achieve something meaningful but short enough to keep the team focused.", "Because standard corporate payroll cycles occur monthly.", "To strictly mimic the Scrum 'Sprint' methodology without deviation."],
                correct: 1,
                type: "mcq",
                explanation: "Timeboxes shorter than 2 weeks often don't deliver meaningful value, while those longer than 4 weeks can cause the team to lose focus and urgency."
            },
            {
                id: 6,
                question: "Who is primarily responsible for running the Daily Stand-up (Scrum) in a DSDM project?",
                options: ["The Solution Development Team (SDT)", "The Agile Project Manager", "The Business Sponsor", "The Technical Coordinator"],
                correct: 0,
                type: "mcq"
            },
            {
                id: 7,
                question: "How does MoSCoW prioritization provide contingency for a project?",
                options: ["By setting a budget reserve of 20% at the start of the project.", "By identifying 'Should Have' and 'Could Have' requirements that can be dropped if 'Must Have' efforts take longer than expected.", "By extending the deadline of the Timebox if the team falls behind.", "By requiring the team to work overtime during the Consolidation phase."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 8,
                question: "Under which circumstance would a 'Free Format Timebox' be preferred over a 'DSDM Structured Timebox'?",
                options: ["When the team is new to Agile and needs strict guidance.", "When the Business Ambassador is not available for consistent ongoing feedback.", "When the structured approach is deemed not helpful, and the style resembles a Scrum Sprint with iterative cycles.", "When the project is in the Post-Project phase."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 9,
                question: "When assigning priorities using AgilePM tips, how should a dependency between a 'Must Have' and a 'Should Have' be handled?",
                options: ["The Must Have can depend on the Should Have, provided the Should Have is completed first.", "All dependent requirements must be converted to 'Won't Have'.", "A Must Have requirement cannot depend on the completion of a Should Have or Could Have requirement.", "The dependency does not matter as long as they are in the same Timebox."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 10,
                question: "In the 'Consolidation' phase of a Structured Timebox, what is the primary activity?",
                options: ["Investigating the requirements in detail.", "Developing the code and unit testing.", "Ensuring standards are met, performing final quality checks, and closing out the Timebox.", "Defining the high-level roadmap for the next increment."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 11,
                question: "What is the specific role of the 'Agile Project Manager' regarding priorities in the planning process?",
                options: ["They define the business requirements for the company.", "They verify that the technical code works.", "They ensure the balance of priorities (MoSCoW) reflects the known risks and that the delivery plan is realistic.", "They act as the sole decision-maker for what is a Must or a Should."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 12,
                question: "If a 'Must Have' requirement is discovered to be unachievable right before deployment, what does the definition of 'Must Have' imply?",
                options: ["The project or increment is effectively cancelled or failed because the solution is not viable.", "The requirement is automatically moved to the next Timebox.", "The team should deploy the solution anyway and fix it later.", "It is reclassified as a 'Could Have.'"],
                correct: 0,
                type: "mcq"
            },
            {
                id: 13,
                question: "During a Daily Stand-up, which of the following is NOT one of the three standard questions answered by team members?",
                options: ["What have I done since the last stand-up?", "What will I be doing until the next stand-up?", "Who is to blame for the current delay in the schedule?", "What problems or risks (blockers) are preventing me from achieving objectives?"],
                correct: 2,
                type: "mcq"
            },
            {
                id: 14,
                question: "How does a 'Should Have' requirement differ from a 'Could Have' requirement?",
                options: ["Should Haves are critical for legal compliance; Could Haves are not.", "Should Haves are painful to leave out and may require a workaround; Could Haves are desirable but have less impact if omitted.", "Should Haves are strictly capped at 20% of the effort; Could Haves are capped at 60%.", "Could Haves are prioritized higher than Should Haves in the Timebox Plan."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 15,
                question: "Regarding the changing of scope within a Timebox, which scenario allows the Solution Development Team (SDT) to accept changes without formal escalation to the Project Manager?",
                options: ["When a new 'Must Have' requirement is introduced.", "When the change increases the percentage of Must Haves beyond the limit.", "When the change falls within the agreed Timebox objectives and does not change the high-level requirements.", "When the change requires removing a project-level Must Have requirement."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 16,
                question: "What is the function of the 'kick-off' in a DSDM Structured Timebox?",
                options: ["To deploy the final code to the production server.", "To conduct a retrospective on the previous Timebox.", "To review dependencies, agree on acceptance criteria, and ensure the team is ready to start work.", "To sign off on the finalized solution."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 17,
                question: "The 'Won't Have this time' priority is crucial because:",
                options: ["It represents features that will never be developed.", "It identifies features agreed as out of scope for the current timeframe, preventing scope creep.", "It serves as a 'dustbin' for bad ideas.", "It allows the Project Manager to ignore stakeholder requests."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 18,
                question: "According to the DSDM tips for assigning priorities, if a stakeholder claims a requirement is a 'Must Have,' what question should the Agile PM or Analyst ask to validate this?",
                options: ["Can we afford this in the budget?", "Is there a workaround, even if it is painful?", "Do you really want this feature?", "Can the developer finish this in one day?"],
                correct: 1,
                type: "mcq"
            },
            {
                id: 19,
                question: "In a scenario where a team is running out of time in a Timebox, what is the correct DSDM approach?",
                options: ["Extend the Timebox by one week.", "Lower the quality standards to finish faster.", "De-scope 'Could Have' and 'Should Have' items to ensure 'Must Haves' are delivered.", "Cancel the project immediately."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 20,
                question: "Which DSDM product solves the challenge of 'Uncertainty whether the project is viable or worth pursuing'?",
                options: ["Terms of Reference (ToR)", "Solution Architecture Definition (SAD)", "Feasibility Assessment", "Daily/Timebox Review Records"],
                correct: 2,
                type: "mcq"
            },
            {
                id: 21,
                question: "Why is the 'Close-out' phase of a Timebox important?",
                options: ["It allows the team to negotiate new Must Have requirements.", "It assesses what was delivered, handles 'Not Delivered' items, and ensures acceptance criteria were met.", "It is the primary time for the Solution Developer to write the code.", "It is when the Terms of Reference are signed."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 22,
                question: "Which role validates that the business priorities are correct and has the final say on MoSCoW rankings?",
                options: ["Solution Tester", "Business Visionary and Business Ambassador", "Solution Developer", "Technical Coordinator"],
                correct: 1,
                type: "mcq"
            },
            {
                id: 23,
                question: "Which lifecycle phase focuses on establishing a firm foundation and defining the 'Must Haves' for the project?",
                options: ["Pre-Project", "Foundations", "Deployment", "Evolutionary Development"],
                correct: 1,
                type: "mcq"
            },
            {
                id: 24,
                question: "In a 960 man-hour project, if 'Must Have' effort is estimated at 576 hours, 'Should Have' at 192 hours, and 'Could Have' at 192 hours, what is the contingency percentage provided by the 'Could Have' items?",
                options: ["10%", "20%", "60%", "0%"],
                correct: 1,
                type: "mcq"
            },
            {
                id: 25,
                question: "What should happen to 'Should Have' items that are not completed in the current Timebox due to time constraints?",
                options: ["They are abandoned forever.", "They are reprioritized for the next Increment or Timebox.", "The Project Manager is fired.", "They are marked as 'Must Have' for the next day."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 26,
                question: "The AgilePM tips suggest asking 'Is this requirement dependent on completion of other requirements?' Why is this important?",
                options: ["Because dependent requirements are always 'Won't Have'.", "Because a 'Must Have' cannot functionally depend on a lower priority item like a 'Could Have'.", "Because dependencies decrease the total effort estimation.", "Because dependencies allow the team to skip the Investigation phase."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 27,
                question: "Which of the following is considered an AgilePM top tip for Timeboxing?",
                options: ["Always let the Timebox overrun if the quality is not 100%.", "Insist that work stops at the agreed time and assess what is 'done.'", "Ensure the Kick-off involves only the developers, not the business.", "Report every single activity to the Project Manager daily."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 28,
                question: "If an objective is NOT a 'Must,' what does that imply about the requirements attached strictly to that objective?",
                options: ["The requirements must be 'Must Have.'", "The requirements cannot be 'Must Have.'", "The requirements should be 'Won't Have.'", "The priority of the requirements is unrelated to the objective."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 29,
                question: "Why should large 'Must Have' requirements be decomposed?",
                options: ["To make them look more complicated.", "To split them into smaller elements, some of which might be Shoulds or Coulds, adding flexibility.", "To ensure the testing phase takes longer.", "To confuse the Business Sponsor."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 30,
                question: "What happens if the Solution Development Team (SDT) does not feel 'empowered'?",
                options: ["They will escalate every small decision to the PM, causing delays.", "They will work faster because they are afraid.", "The project quality will strictly increase.", "The Timebox structure allows them to ignore the Business Ambassador."],
                correct: 0,
                type: "mcq"
            },

            // === TRUE/FALSE BANK for SPM Chapter 6 - DSDM Principles (30 Questions) ===
            {
                id: 31,
                question: "According to the MoSCoW prioritization rules, a 'Must Have' requirement is one where, if it is not delivered, the solution is illegal, unsafe, or not viable.",
                answer: true,
                type: "tf"
            },
            {
                id: 32,
                question: "The 'Won't Have this time' priority classification means the requirement is rejected and will never be developed in any future project increment.",
                answer: false,
                type: "tf"
            },
            {
                id: 33,
                question: "Agile DSDM projects strictly forbid changes to requirements once the Foundations phase is complete.",
                answer: false,
                type: "tf"
            },
            {
                id: 34,
                question: "The recommended allocation of effort for 'Must Have' requirements in a Timebox is approximately 80% to ensure safety.",
                answer: false,
                type: "tf"
            },
            {
                id: 35,
                question: "In a DSDM Structured Timebox, the 'Consolidation' step is primarily for creating the initial design and writing the first lines of code.",
                answer: false,
                type: "tf"
            },
            {
                id: 36,
                question: "The Daily Stand-up is a reporting session where team members primarily report their status to the Agile Project Manager.",
                answer: false,
                type: "tf"
            },
            {
                id: 37,
                question: "Ideally, DSDM Timeboxes should be between 2 and 4 weeks long.",
                answer: true,
                type: "tf"
            },
            {
                id: 38,
                question: "'Should Have' requirements are vital and mandatory for the solution to work on launch day.",
                answer: false,
                type: "tf"
            },
            {
                id: 39,
                question: "If a 'Must Have' requirement relies on a 'Should Have' requirement to function, the priority of the 'Should Have' requirement essentially remains 'Should Have.'",
                answer: false,
                type: "tf"
            },
            {
                id: 40,
                question: "The Business Visionary and Business Ambassador have the final say on prioritizing requirements (deciding what is a Must vs. a Should).",
                answer: true,
                type: "tf"
            },
            {
                id: 41,
                question: "Under DSDM rules, if a Timebox is running behind schedule, the team should extend the Timebox deadline by a few days to finish.",
                answer: false,
                type: "tf"
            },
            {
                id: 42,
                question: "The 'Feasibility Phase' is used to determine if the project is viable technically and clearly cost-effective before proceeding.",
                answer: true,
                type: "tf"
            },
            {
                id: 43,
                question: "A 'Free Format Timebox' has no defined start or end points.",
                answer: false,
                type: "tf"
            },
            {
                id: 44,
                question: "The 'Solution Architecture Definition (SAD)' product helps ensure that the technical design aligns with business needs.",
                answer: true,
                type: "tf"
            },
            {
                id: 45,
                question: "Ideally, testing should only begin in the Deployment Phase after all development Timeboxes are complete.",
                answer: false,
                type: "tf"
            },
            {
                id: 46,
                question: "If a workaround exists for a specific requirement—even if it is painful—that requirement cannot be classified as a 'Must Have.'",
                answer: true,
                type: "tf"
            },
            {
                id: 47,
                question: "The Solution Development Team (SDT) is empowered to make decisions about details and changes within the boundaries of the Timebox without escalating to the Project Manager.",
                answer: true,
                type: "tf"
            },
            {
                id: 48,
                question: "Contingency in a DSDM project is managed primarily by holding extra financial budget in reserve.",
                answer: false,
                type: "tf"
            },
            {
                id: 49,
                question: "'Could Have' requirements generally represent about 20% of the total effort in a Timebox.",
                answer: true,
                type: "tf"
            },
            {
                id: 50,
                question: "During the Daily Stand-up, team members discuss who is to blame for missed deadlines.",
                answer: false,
                type: "tf"
            },
            {
                id: 51,
                question: "The 'Foundations Phase' occurs before the 'Feasibility Phase.'",
                answer: false,
                type: "tf"
            },
            {
                id: 52,
                question: "Reprioritization of requirements can happen at the end of an Increment or Timebox based on new learnings.",
                answer: true,
                type: "tf"
            },
            {
                id: 53,
                question: "Decomposing a large 'Must Have' requirement into smaller pieces is discouraged because it creates complexity.",
                answer: false,
                type: "tf"
            },
            {
                id: 54,
                question: "The 'Refinement' step in a Structured Timebox consumes the majority of the effort (60-80%).",
                answer: true,
                type: "tf"
            },
            {
                id: 55,
                question: "The Terms of Reference (ToR) product is created during the Deployment phase.",
                answer: false,
                type: "tf"
            },
            {
                id: 56,
                question: "If the Business Ambassador is not consistently available, the 'Free Format Timebox' style is difficult to operate successfully.",
                answer: true,
                type: "tf"
            },
            {
                id: 57,
                question: "One of the core questions in a Daily Stand-up is 'What will I be doing until the next stand-up?'",
                answer: true,
                type: "tf"
            },
            {
                id: 58,
                question: "Increasing the percentage of 'Must Haves' during a Timebox is considered a formal scope change that needs handling outside the SDT.",
                answer: true,
                type: "tf"
            },
            {
                id: 59,
                question: "The Post-Project phase focuses on checking if the benefits defined in the Business Case were actually realized.",
                answer: true,
                type: "tf"
            },
            {
                id: 60,
                question: "A 'Single-Increment' lifecycle is used when a project is too complex to deliver in one go.",
                answer: false,
                type: "tf"
            },

            // === ADDITIONAL MCQ BANK for SPM Chapter 6 - Advanced DSDM (15 Questions) ===
            {
                id: 61,
                question: "In a DSDM Structured Timebox, the Investigation phase typically consumes what percentage of the total effort?",
                options: ["60-80%", "10-20%", "Approx 40%", "Less than 5%"],
                correct: 1,
                type: "mcq"
            },
            {
                id: 62,
                question: "Which DSDM Phase typically produces the Business Case and the Prioritised Requirements List (PRL)?",
                options: ["Feasibility Phase", "Foundations Phase", "Evolutionary Development Phase", "Post-Project Phase"],
                correct: 1,
                type: "mcq"
            },
            {
                id: 63,
                question: "The document used during the Pre-Project phase to clarify the project concept, initial scope, and confirm sponsor commitment is called:",
                options: ["The Business Case", "The Deployment Plan", "The Terms of Reference (ToR)", "The Solution Architecture Definition (SAD)"],
                correct: 2,
                type: "mcq"
            },
            {
                id: 64,
                question: "If a project follows a 'Multi-Increment Lifecycle,' how is the project structure organized?",
                options: ["Feasibility -> Foundations -> Evolutionary Development (all Timeboxes) -> Single Deployment -> Post-Project", "Multiple cycles of Feasibility and Foundations followed by one Development phase.", "One Feasibility and Foundations phase, followed by multiple Increments, where each Increment consists of Timeboxes and a Deployment.", "The project is deployed continuously after every daily stand-up."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 65,
                question: "In a DSDM project, 20% of the total effort is allocated to 'Could Have' requirements. What is the primary purpose of this allocation?",
                options: ["To make the product look more feature-rich ('bells and whistles').", "To act as a contingency margin (safety buffer) to ensure 'Must Haves' are delivered on time.", "To allow the developers time to learn new technologies.", "To account for the time spent in Daily Stand-ups."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 66,
                question: "The Refinement step of a Structured Timebox (comprising 60-80% of effort) is focused on:",
                options: ["Detailed planning and agreeing on acceptance criteria.", "Iterative development and testing of the solution components.", "Final sign-off and retrospective.", "Negotiating the contract with the Business Sponsor."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 67,
                question: "During a Timebox 'Close-out,' what is the formal action regarding requirements that were not finished?",
                options: ["The team pretends they were finished to pass the audit.", "The duration is extended by 2 days to finish them.", "They are deemed 'Not Delivered,' and the impact is assessed (often moving them to the next Timebox's backlog).", "The Timebox is declared a total failure and repeated from scratch."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 68,
                question: "The MoSCoW definition 'Won't Have this time' implies:",
                options: ["The requirement is permanently deleted.", "The requirement is agreed out of scope for the current delivery but kept for future consideration.", "The business stakeholders are angry about the exclusion.", "The feature is impossible to build technically."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 69,
                question: "Which of the following is an AgilePM 'Top Tip' regarding assessing dependencies?",
                options: ["Tie requirements to a project objective: If the objective is not a Must, the requirements attached to it cannot be a Must.", "Ignore dependencies; everything will integrate eventually.", "Mark all dependent tasks as 'Must Have' to be safe.", "Assign dependencies to the Project Manager to solve alone."],
                correct: 0,
                type: "mcq"
            },
            {
                id: 70,
                question: "Calculate the recommended contingency days for a 20-day Timebox if following DSDM MoSCoW standards (approx 20% Could Have, 20% Should Have).",
                options: ["0 days (0% contingency)", "Approx 2 days (10%)", "Approx 4-8 days (20-40%)", "15 days (75%)"],
                correct: 2,
                type: "mcq"
            },
            {
                id: 71,
                question: "Why is 'Business Ambassador' participation critical in a Timebox?",
                options: ["To write the code when the developer is sick.", "To provide business input, validate requirements, and accept deliverables daily.", "To facilitate the Daily Stand-up.", "To report to the Board of Directors."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 72,
                question: "What is the DSDM recommendation for handling 'Should Have' and 'Could Have' requirements that are subjective?",
                options: ["The Business Analyst decides alone based on data.", "The Project Manager flips a coin.", "They are agreed upon up-front via discussion facilitated by the PM and Business Analyst.", "They are all converted to 'Won't Have' to save time."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 73,
                question: "How should the DSDM team handle the prioritization of a 'Must Have' requirement that was valid at the start but is found to have a workaround halfway through?",
                options: ["It remains a Must Have because the document was signed.", "It is reclassified to a Should Have or Could Have, releasing contingency.", "The team ignores the workaround to ensure high quality.", "The project is cancelled."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 74,
                question: "What defines the 'Investigation' step in a Structured Timebox?",
                options: ["It is when 10-20% of effort is used to detail requirements and check feasibility.", "It is when the team writes the code (60-80% effort).", "It is the final sign-off meeting.", "It is when the team deploys the code to production."],
                correct: 0,
                type: "mcq"
            },
            {
                id: 75,
                question: "The Feasibility Phase addresses which key challenge?",
                options: ["Misalignment between technical feasibility and business goals.", "Integration bugs in the code.", "Resistance to change during rollout.", "Unclear handover of ownership at the end of the project."],
                correct: 0,
                type: "mcq"
            },

            // === ADDITIONAL TRUE/FALSE BANK for SPM Chapter 6 - Advanced DSDM (15 Questions) ===
            {
                id: 76,
                question: "During the Daily Stand-up (Scrum), the Agile Project Manager should act as the chairperson, recording minutes and directing team members on their daily tasks.",
                answer: false,
                type: "tf"
            },
            {
                id: 77,
                question: "Agile DSDM advises that if a 'Must Have' requirement cannot be delivered by the deadline, the Timebox deadline should be extended to ensure quality.",
                answer: false,
                type: "tf"
            },
            {
                id: 78,
                question: "A 'Must Have' requirement represents a 'Minimum Usable Subset,' meaning the solution is viable without it, but less efficient.",
                answer: false,
                type: "tf"
            },
            {
                id: 79,
                question: "The Solution Development Team (SDT) has the authority to de-scope a 'Could Have' requirement within a Timebox without formally asking the Project Manager for permission.",
                answer: true,
                type: "tf"
            },
            {
                id: 80,
                question: "Ideally, a dependency should not exist where a higher priority requirement (e.g., Must Have) relies on the completion of a lower priority requirement (e.g., Should Have).",
                answer: true,
                type: "tf"
            },
            {
                id: 81,
                question: "The Business Visionary acts as the project's 'Budget Holder' and validates the final high-level Business Case alignment.",
                answer: false,
                type: "tf"
            },
            {
                id: 82,
                question: "The 'Consolidation' phase in a Timebox is an opportunity to add new 'Must Have' requirements that were forgotten during Kick-off.",
                answer: false,
                type: "tf"
            },
            {
                id: 83,
                question: "Technical Coordinators are responsible for designing the Solution Architecture and ensuring technical standards are met.",
                answer: true,
                type: "tf"
            },
            {
                id: 84,
                question: "The 'Benefits Assessment' product in the Deployment Phase is used to verify that the delivered solution meets the expected business objectives.",
                answer: true,
                type: "tf"
            },
            {
                id: 85,
                question: "The 'Free Format Timebox' is the preferred method for teams that are new to Agile or have difficulty communicating with the Business Ambassador.",
                answer: false,
                type: "tf"
            },
            {
                id: 86,
                question: "When new requirements are added to a project, the Project Manager should prioritize them as 'Must Have' immediately.",
                answer: false,
                type: "tf"
            },
            {
                id: 87,
                question: "A 'Single-Increment' Lifecycle implies that the Solution is built, but deployed only after a series of Timeboxes is completed.",
                answer: true,
                type: "tf"
            },
            {
                id: 88,
                question: "The role of the Solution Tester is to verify each increment within the Timebox, ideally allowing testing to start as soon as a user story is ready.",
                answer: true,
                type: "tf"
            },
            {
                id: 89,
                question: "The DSDM AgilePM process forbids the existence of documentation like 'Feasibility Assessment' or 'Terms of Reference.'",
                answer: false,
                type: "tf"
            },
            {
                id: 90,
                question: "MoSCoW prioritization is effective because it forces the Business Sponsor to accept that they cannot have everything, managing their expectations.",
                answer: true,
                type: "tf"
            },

            // === SECOND HALF - MCQ BANK for SPM Chapter 6 - AMS-FR Case Study (30 Questions) ===
            {
                id: 91,
                question: "What is the primary objective of the Attendance Management System using Facial Recognition (AMS-FR) project described in the case study?",
                options: ["To replace lecturers with AI avatars.", "To manually track student attendance using paper sheets.", "To digitalize attendance monitoring using automated face detection at classroom entrances.", "To use fingerprint scanning for student campus access."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 92,
                question: "In the MoSCoW prioritization technique, what defines a 'Must Have' requirement?",
                options: ["It is important but not vital; the solution is still viable without it.", "It represents the Minimum Usable Subset (Guaranteed) without which the solution is illegal, unsafe, or not viable.", "It is a desirable feature that can be left out with little impact.", "It is a feature agreed to be excluded from the current timeframe."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 93,
                question: "According to User Story #1 (Automated Facial Recognition), which of the following is a Functional Requirement?",
                options: ["Recognition accuracy ≥ 90%.", "Response time ≤ 3 seconds per face match.", "System uptime ≥ 99%.", "System must match detected faces with registered student profiles."],
                correct: 3,
                type: "mcq"
            },
            {
                id: 94,
                question: "Which priority classification applies to 'Should Have' requirements?",
                options: ["Essential for system operation.", "Critical features that, if missing, cause project failure.", "Important but not immediately mandatory; may be painful to leave out but the solution is still viable.", "Enhancements that are nice to have but not essential."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 95,
                question: "In the AMS-FR case study, what happens if the facial recognition system fails to match a student's face?",
                options: ["The student is automatically marked as 'Absent'.", "The system shuts down for security reasons.", "The entry is marked as 'Unverified' and placed in the lecturer's review panel.", "The system triggers a campus-wide alarm."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 96,
                question: "Based on the Timeboxing plan provided for Sprint 1, which phase occurs during Days 1–3?",
                options: ["Refine", "Investigate", "Consolidate", "Deployment"],
                correct: 1,
                type: "mcq"
            },
            {
                id: 97,
                question: "User Story #2 (Attendance Analytics Dashboard) is written from the perspective of which role?",
                options: ["Student", "Lecturer", "Administrator", "Developer"],
                correct: 2,
                type: "mcq"
            },
            {
                id: 98,
                question: "Which of the following is identified as a 'Won't Have' requirement for the AMS-FR project?",
                options: ["Mobile-responsive dashboards (FR10/NFR14 in different contexts).", "Integration with biometric devices other than facial recognition (e.g., fingerprints).", "Export of attendance reports.", "Secure storage of attendance records."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 99,
                question: "What is the specific Acceptance Criteria for the facial recognition accuracy in the Non-Functional Requirements?",
                options: ["≥ 99.9%", "≥ 75%", "≥ 90%", "100%"],
                correct: 2,
                type: "mcq"
            },
            {
                id: 100,
                question: "During the 'Refine' phase of a DSDM Timebox, what is the primary focus of the Solution Development Team?",
                options: ["High-level planning and feasibility checks.", "Developing the core logic, prototypes, and integrations iteratively.", "Final user acceptance testing.", "Training the end-users."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 101,
                question: "In the context of the project timeline presented, how long is one Sprint?",
                options: ["1 week", "2 weeks", "4 weeks", "2 months"],
                correct: 1,
                type: "mcq"
            },
            {
                id: 102,
                question: "Why are 'Could Have' requirements included in the project plan despite being lower priority?",
                options: ["To waste time during development.", "To increase the budget of the project.", "To provide a 'contingency' buffer; they can be dropped if 'Must Have' tasks take longer than expected.", "Because the law requires them."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 103,
                question: "Which software tool is suggested in Exercises #3 to generate the Gantt chart?",
                options: ["Jira", "Microsoft Excel", "Microsoft Project", "Trello"],
                correct: 1,
                type: "mcq"
            },
            {
                id: 104,
                question: "For Team B in Sprint 1 (User Story 2), what is a key deliverable during the Investigate phase?",
                options: ["Full analytics dashboard.", "Wireframes for the dashboard and defined analytics requirements.", "Live database connection.", "Final CSV export module."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 105,
                question: "Requirement NFR1 'Facial recognition response time ≤ 3 seconds per person' is classified as:",
                options: ["Won't Have", "Could Have", "Must Have", "Should Have"],
                correct: 2,
                type: "mcq"
            },
            {
                id: 106,
                question: "In Exercise #4, the project is extended to include a third Sprint. What new functionality is introduced?",
                options: ["Lecturers grading students automatically.", "Student Self-Service Attendance & Notification Portal.", "Parental access to attendance records.", "Cafeteria payment via facial recognition."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 107,
                question: "Which priority would you assign to 'Cloud auto-scaling architecture' according to the Case Study's Non-Functional Requirements?",
                options: ["Must Have", "Should Have", "Could Have", "Won't Have"],
                correct: 3,
                type: "mcq"
            },
            {
                id: 108,
                question: "What activity takes place during the 'Consolidate' phase of Timebox 1 for Team A?",
                options: ["Identifying attendance states.", "Debugging facial detection issues and conducting initial classroom testing.", "Analyzing classroom camera requirements.", "Writing the User Stories."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 109,
                question: "Ideally, DSDM Timeboxes are recommended to be how long according to the theoretical section of the slides?",
                options: ["1-5 days", "2-4 weeks", "3-6 months", "1 year"],
                correct: 1,
                type: "mcq"
            },
            {
                id: 110,
                question: "Which requirement regarding the Analytics Dashboard allows administrators to focus on problematic students?",
                options: ["System must display charts and heatmaps.", "System must generate low-attendance alerts.", "Dashboard must load within 5 seconds.", "Export formats ≤ 5MB."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 111,
                question: "'Portability: Admin dashboard could support tablets' is listed under which MoSCoW category?",
                options: ["Must Have", "Should Have", "Could Have", "Won't Have"],
                correct: 2,
                type: "mcq"
            },
            {
                id: 112,
                question: "Which subtask would be part of the 'UI/UX Design' Task for User Story 1?",
                options: ["Build database schema.", "Design live camera feed monitoring UI.", "Integrate facial recognition model with API.", "Monitor logs."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 113,
                question: "When performing testing for User Story 1 (Automated Attendance), which test is critical for data privacy compliance?",
                options: ["Performance test under multiple faces.", "Security testing on data privacy.", "Unit testing facial recognition module.", "System testing for real-time capture."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 114,
                question: "In the Exercise #4 extension for Sprint 3, a Functional Requirement (FR18) is 'Students can request correction if wrongly marked absent.' How is this labeled?",
                options: ["Must Have", "Should Have", "Could Have", "Optional future enhancement (Won't Have/Low priority)"],
                correct: 3,
                type: "mcq"
            },
            {
                id: 115,
                question: "What defines the 'Justification' column in a MoSCoW table exercise?",
                options: ["Who asked for the feature.", "How much the feature costs.", "The reasoning for the priority assignment (e.g., why is it a Must?).", "The name of the developer assigned."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 116,
                question: "User Story 2 includes a functional requirement to 'support filtering by class, lecturer, semester, and program.' This falls under:",
                options: ["FR8 (Support filtering) - Should Have.", "FR1 (Capture images) - Must Have.", "FR13 (Biometric) - Won't Have.", "FR5 (Lecturer dashboard) - Must Have."],
                correct: 0,
                type: "mcq"
            },
            {
                id: 117,
                question: "Which of the following describes the relationship between 'User Stories' and 'Tasks'?",
                options: ["They are identical.", "User Stories are high-level needs; Tasks are the specific actions required to deliver them.", "Tasks come first, then User Stories are written.", "User Stories are for developers; Tasks are for stakeholders."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 118,
                question: "Regarding the security of personal data (NFR3), what is the specific technical requirement?",
                options: ["Data must be deleted every 24 hours.", "Data must be open-source.", "All personal data must be encrypted (at rest + in transit).", "Data must be stored on a blockchain."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 119,
                question: "In DSDM Timeboxing, what guarantees that the project finishes on time?",
                options: ["The team works overtime.", "The deadline is extended if work is incomplete.", "Scope is variable (Priorities), while Time and Cost are fixed.", "The project budget is doubled."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 120,
                question: "Which diagram is best used to visualize the schedule of Timeboxes, Sprints, and Tasks over the 1-month timeline?",
                options: ["Use Case Diagram", "Gantt Chart", "Class Diagram", "Pie Chart"],
                correct: 1,
                type: "mcq"
            },

            // === SECOND HALF - TRUE/FALSE BANK for SPM Chapter 6 - AMS-FR Case Study (30 Questions) ===
            {
                id: 121,
                question: "The 'Attendance Management System (AMS-FR)' case study aims to implement fingerprint scanning as the primary method for student attendance.",
                answer: false,
                type: "tf"
            },
            {
                id: 122,
                question: "In the context of the case study project timeline, '1 Month' is equal to '2 Sprints.'",
                answer: true,
                type: "tf"
            },
            {
                id: 123,
                question: "'Recognition accuracy ≥ 90%' is classified as a Functional Requirement.",
                answer: false,
                type: "tf"
            },
            {
                id: 124,
                question: "User Story #1 focuses on the 'Administrator' persona wanting to generate analytics reports.",
                answer: false,
                type: "tf"
            },
            {
                id: 125,
                question: "Ideally, DSDM Timeboxes are recommended to be between 2 and 4 weeks long.",
                answer: true,
                type: "tf"
            },
            {
                id: 126,
                question: "A 'Must Have' requirement defines the Minimum Usable Subset (Guaranteed), without which the solution is not viable.",
                answer: true,
                type: "tf"
            },
            {
                id: 127,
                question: "According to the Timebox Plan for Team A, the 'Investigate' phase happens during Days 11–14.",
                answer: false,
                type: "tf"
            },
            {
                id: 128,
                question: "If the facial recognition system fails to match a student, it automatically marks them as 'Absent' to ensure security.",
                answer: false,
                type: "tf"
            },
            {
                id: 129,
                question: "The requirement NFR10 'Cloud auto-scaling architecture' is prioritized as 'Won't Have' for the current release.",
                answer: true,
                type: "tf"
            },
            {
                id: 130,
                question: "During the 'Refine' phase (Days 4–10), the team's primary focus is creating the initial high-level requirements list.",
                answer: false,
                type: "tf"
            },
            {
                id: 131,
                question: "'System must store attendance records securely in the database' is a 'Could Have' requirement.",
                answer: false,
                type: "tf"
            },
            {
                id: 132,
                question: "Team B is assigned User Story 2: 'Attendance Analytics Dashboard'.",
                answer: true,
                type: "tf"
            },
            {
                id: 133,
                question: "Sprint 3 was added to the project plan to enable 'Student Self-Service' capabilities.",
                answer: true,
                type: "tf"
            },
            {
                id: 134,
                question: "In the MoSCoW definitions, a 'Should Have' requirement is vital and must be delivered or the project is cancelled.",
                answer: false,
                type: "tf"
            },
            {
                id: 135,
                question: "Acceptance Criteria for User Story 1 requires that when a match succeeds, the system timestamps the entry and marks the student as 'Present'.",
                answer: true,
                type: "tf"
            },
            {
                id: 136,
                question: "Non-Functional Requirements include 'System uptime ≥ 99% during lecture hours.'",
                answer: true,
                type: "tf"
            },
            {
                id: 137,
                question: "The 'Consolidate' phase includes checking that organizational/project standards have been met.",
                answer: true,
                type: "tf"
            },
            {
                id: 138,
                question: "'Allow export of attendance reports (CSV/PDF)' is a Must Have requirement (FR9).",
                answer: false,
                type: "tf"
            },
            {
                id: 139,
                question: "Microsoft Excel is the suggested tool for generating the Gantt Chart in Exercise #3.",
                answer: true,
                type: "tf"
            },
            {
                id: 140,
                question: "Priorities using MoSCoW are only applied to Functional Requirements, not Non-Functional Requirements.",
                answer: false,
                type: "tf"
            },
            {
                id: 141,
                question: "The requirement 'Students can log in to view daily/weekly attendance' is part of User Story 1.",
                answer: false,
                type: "tf"
            },
            {
                id: 142,
                question: "Data encryption (NFR3) applies to data 'at rest' and 'in transit.'",
                answer: true,
                type: "tf"
            },
            {
                id: 143,
                question: "Gantt charts are used to visualize the user interface design.",
                answer: false,
                type: "tf"
            },
            {
                id: 144,
                question: "User Story 2 'Attendance Analytics Dashboard' includes 'Heatmap visual design' as a subtask in the 'Investigate' phase.",
                answer: true,
                type: "tf"
            },
            {
                id: 145,
                question: "'Could Have' requirements generally have less impact if left out compared with 'Should Have' requirements.",
                answer: true,
                type: "tf"
            },
            {
                id: 146,
                question: "Deployment of the Sprint 1 build to staging occurs during the 'Investigate' phase.",
                answer: false,
                type: "tf"
            },
            {
                id: 147,
                question: "Functional Requirement FR6 'Allow lecturers to review/resolve unverified attendance' is classified as a 'Must Have.'",
                answer: false,
                type: "tf"
            },
            {
                id: 148,
                question: "User Story 2 requires the dashboard to load analytics within 50 seconds.",
                answer: false,
                type: "tf"
            },
            {
                id: 149,
                question: "'Inter-faculty integration' (FR14) is listed as a 'Won't Have' requirement.",
                answer: true,
                type: "tf"
            },
            {
                id: 150,
                question: "A task for Team A during 'Refine' is to 'Implement manual verification & correction options' in Sprint 2.",
                answer: true,
                type: "tf"
            },

            // === SECOND HALF - MIXED BANK for SPM Chapter 6 - AMS-FR Advanced (30 Questions: 15 MCQ + 15 TF) ===
            {
                id: 151,
                question: "Based on the Case Study project timeline, what is the total duration of the project before the extension is added?",
                options: ["1 week", "2 months", "1 month (4 weeks)", "6 months"],
                correct: 2,
                type: "mcq"
            },
            {
                id: 152,
                question: "According to the MoSCoW prioritization in the case study, 'Integration with biometric devices (fingerprints)' is classified as:",
                options: ["Must Have", "Should Have", "Won't Have", "Could Have"],
                correct: 2,
                type: "mcq"
            },
            {
                id: 153,
                question: "Which Non-Functional Requirement (NFR) dictates the 'Facial recognition response time'?",
                options: ["≤ 3 seconds per person", "≤ 10 seconds per person", "≤ 5 milliseconds", "≥ 1 minute"],
                correct: 0,
                type: "mcq"
            },
            {
                id: 154,
                question: "The 'Student Self-Service Attendance & Notification Portal' user story was added during:",
                options: ["Sprint 1", "Sprint 2", "The Project Kick-off", "The Project Extension (Sprint 3)"],
                correct: 3,
                type: "mcq"
            },
            {
                id: 155,
                question: "For Team B in Sprint 1 (Analytics Dashboard), the 'Consolidate' phase includes which activity?",
                options: ["Define analytics requirements.", "Develop analytics computation engine.", "Deploy Sprint 1 build to staging & conduct sprint review.", "Connect camera hardware."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 156,
                question: "Which tool is recommended in the case study exercises for creating the Requirements Table (Req ID, Description, Justification)?",
                options: ["Microsoft PowerPoint", "Microsoft Word", "Microsoft Excel", "Notepad"],
                correct: 2,
                type: "mcq"
            },
            {
                id: 157,
                question: "Who is the primary actor (Persona) for User Story #1?",
                options: ["Administrator", "Student", "Lecturer", "System Architect"],
                correct: 2,
                type: "mcq"
            },
            {
                id: 158,
                question: "According to the Case Study, what constitutes 'Sprint 1 Deliverables' for Team A?",
                options: ["Full analytics dashboard and heatmaps.", "Camera integration, Basic facial detection engine, and Basic dashboard view.", "Mobile App for students.", "PDF Export Module."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 159,
                question: "Which Functional Requirement corresponds to 'Allow lecturers to review and resolve unverified attendance'?",
                options: ["FR1", "FR6", "FR8", "FR15"],
                correct: 1,
                type: "mcq"
            },
            {
                id: 160,
                question: "The Non-Functional Requirement regarding 'High availability during peak reporting periods' is part of which User Story?",
                options: ["User Story 1", "User Story 2 (Administrator)", "User Story 3", "None"],
                correct: 1,
                type: "mcq"
            },
            {
                id: 161,
                question: "In Exercise #3 (Gantt Chart), what items should be included besides the timeline?",
                options: ["The cost of the coffee.", "The code snippets.", "Activities and key milestones to be delivered.", "Pictures of the students."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 162,
                question: "What does 'NFR' stand for in the prioritization exercises?",
                options: ["New Feature Request", "Non-Functional Requirements", "Not For Release", "New Facial Recognition"],
                correct: 1,
                type: "mcq"
            },
            {
                id: 163,
                question: "Which 'Consolidate' phase activity applies to Team A in Sprint 1?",
                options: ["Draft initial database schema.", "Define low attendance alert rules.", "Conduct initial classroom testing.", "Design UI."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 164,
                question: "If 'FR2: Match detected faces...' is a 'Must Have,' what is the implication of this classification?",
                options: ["It can be left out if the developers get tired.", "Without it, the solution is not a viable Attendance System (Guaranteed delivery).", "It is less important than the 'About Us' page.", "It is an optional setting."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 165,
                question: "Which team is responsible for 'Validate accuracy of analytics data' during the 'Consolidate' phase of Sprint 1?",
                options: ["Team A", "Team B", "Both Teams", "The Students"],
                correct: 1,
                type: "mcq"
            },
            {
                id: 166,
                question: "User Story #2 (Analytics Dashboard) allows the Administrator to filter attendance data by class, lecturer, semester, and program.",
                answer: true,
                type: "tf"
            },
            {
                id: 167,
                question: "During the 'Refine' phase (Days 4–10) of Sprint 1, Team A focuses on 'Debugging issues in face detection'.",
                answer: false,
                type: "tf"
            },
            {
                id: 168,
                question: "Team B (User Story 2) has a specific task in the 'Refine' phase to 'Implement alert generation service.'",
                answer: true,
                type: "tf"
            },
            {
                id: 169,
                question: "The functional requirement 'Provide lecturers with a dashboard to view real-time attendance' (FR5) is prioritized as a 'Should Have'.",
                answer: false,
                type: "tf"
            },
            {
                id: 170,
                question: "The MoSCoW justification for NFR10 'Cloud auto-scaling' being a 'Won't Have' is that it is intended for 'future enhancement' for large multi-campus operations.",
                answer: true,
                type: "tf"
            },
            {
                id: 171,
                question: "The Functional Requirement FR18 ('Students can request correction if wrongly marked absent') is a mandatory 'Must Have' for the Sprint 3 Extension.",
                answer: false,
                type: "tf"
            },
            {
                id: 172,
                question: "In the AMS-FR project, specific acceptance criteria state that if a match fails, the data is deleted immediately to save space.",
                answer: false,
                type: "tf"
            },
            {
                id: 173,
                question: "The 'Investigate' phase in a Timebox Plan typically lasts for days 4–10.",
                answer: false,
                type: "tf"
            },
            {
                id: 174,
                question: "Scalability NFR5 ('Support at least 20–30 face detections simultaneously') is prioritized as 'Should Have'.",
                answer: true,
                type: "tf"
            },
            {
                id: 175,
                question: "During Sprint 2, Team B works on 'Heatmap analytics' in the 'Refine' phase.",
                answer: true,
                type: "tf"
            },
            {
                id: 176,
                question: "Ideally, DSDM MoSCoW prioritization suggests having no 'Won't Have' requirements to ensure maximum delivery.",
                answer: false,
                type: "tf"
            },
            {
                id: 177,
                question: "The Project Extension for Sprint 3 involves creating a dashboard that loads within 5 minutes.",
                answer: false,
                type: "tf"
            },
            {
                id: 178,
                question: "A valid 'Acceptance Criteria' for User Story 2 is 'The dashboard must show accurate attendance percentages for all selected classes.'",
                answer: true,
                type: "tf"
            },
            {
                id: 179,
                question: "In Exercise #4, 'NFR13: Student data must remain private' is identified as a requirement for the Student Self-Service Portal.",
                answer: true,
                type: "tf"
            },
            {
                id: 180,
                question: "The primary output of the Case Study's first exercise is a Microsoft Word document containing an essay.",
                answer: false,
                type: "tf"
            }
        ],

        "CH 7": [
            // === MCQ BANK for SPM Chapter 7 - Facilitated Workshops & Iterative Development (30 Questions) ===
            {
                id: 11,
                question: "What is the primary role of a 'Facilitator' within a DSDM Facilitated Workshop?",
                options: ["To make the final decisions for the team to save time.", "To act as a neutral party supporting the process of reaching a predetermined objective.", "To dictate the schedule and force agreements when the team is stuck.", "To record the minutes of the meeting without interacting with the participants."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 12,
                question: "Which of the following is listed as a critical success factor for a Facilitated Workshop?",
                options: ["Rigid adherence to a format without deviation.", "Allowing the workshop to run as long as necessary to finish all topics.", "Rapid distribution of the workshop report to participants soon after the session.", "Ensuring the facilitator has a strong opinion on the technical solution."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 13,
                question: "In the context of DSDM Modelling, what does the concept of 'Abstraction' refer to?",
                options: ["Creating a model that is more complex than the reality it represents.", "Omitting details to focus on specific aspects of the problem or solution.", "Using only mathematical formulas to describe the project.", "Delaying the modeling process until the deployment phase."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 14,
                question: "According to the 'Modelling Perspectives' Venn diagram, which perspective is represented by the term 'WHAT'?",
                options: ["Functions, features, and processes.", "People (customers, users, stakeholders).", "Information within the solution area (data, relationships, business rules).", "Locations of business operations."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 15,
                question: "What is the primary purpose of the 'WHY' perspective in DSDM Modelling?",
                options: ["To define the time and scheduling of events.", "To establish the Business Objectives and Strategy.", "To determine the location of the hardware.", "To map out the relationships between data entities."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 16,
                question: "Which phase of DSDM Iterative Development is essentially a cycle of 'Thought, Action, and [?]'?",
                options: ["Documentation", "Conversation", "Deployment", "Testing"],
                correct: 1,
                type: "mcq"
            },
            {
                id: 17,
                question: "How should 'Quality' be handled in an Iterative Development environment according to DSDM?",
                options: ["Quality should be traded off to meet deadlines if necessary.", "Quality is defined early and verified continuously; it is never compromised.", "Quality is assessed only during the final Post-Project phase.", "Quality is strictly the responsibility of the Solution Tester, not the developers."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 18,
                question: "Which of the following describes 'Static' verification in DSDM?",
                options: ["Running the deliverables to confirm behavior.", "Executing code to find runtime errors.", "Conducting Reviews of documents, designs, and code.", "User Acceptance Testing (UAT)."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 19,
                question: "What role does 'Configuration Management' play in controlling Iterative Development?",
                options: ["It assigns tasks to developers.", "It ensures correct versions and stability of the solution.", "It manages the financial budget of the project.", "It negotiates with external suppliers."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 20,
                question: "In DSDM, testing is categorized into Positive, Negative, and Unhappy Path. What does an 'Unhappy Path' test focus on?",
                options: ["Confirming the expected behavior under normal conditions.", "Blocking invalid actions.", "Testing unusual cases or exceptions.", "Testing the morale of the development team."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 21,
                question: "What are the three stages within a DSDM Timebox (often referred to as IRC)?",
                options: ["Initiate, Review, Close.", "Investigate, Refine, Consolidate.", "Ideate, Realize, Check.", "Input, Review, Control."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 22,
                question: "Which role is primarily responsible for validating that non-functional requirements are met?",
                options: ["Solution Developer", "Business Ambassador", "Technical Coordinator", "Scribe"],
                correct: 2,
                type: "mcq"
            },
            {
                id: 23,
                question: "Ideally, what should each Timebox deliver?",
                options: ["A comprehensive set of documentation only.", "A potentially deployable increment of the solution.", "A finalized budget for the next phase.", "A visual model of the problem without any code."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 24,
                question: "Who is responsible for 'Unit Testing' a feature in DSDM?",
                options: ["Solution Tester", "Technical Coordinator", "Solution Developer", "Business Advisor"],
                correct: 2,
                type: "mcq"
            },
            {
                id: 25,
                question: "Which perspective in Modelling answers the question of 'HOW'?",
                options: ["Data and relationships.", "Functions, features, and processes.", "Business objectives.", "Events and scheduling."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 26,
                question: "What is a major benefit of Facilitated Workshops?",
                options: ["They enable the team to work in isolation to avoid distraction.", "They allow for rapid, high-quality team decisions.", "They ensure that the Project Manager makes all critical decisions.", "They replace the need for documentation entirely."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 27,
                question: "During Iterative Development, which phase determines the initial Strategy?",
                options: ["Deployment phase", "Foundations phase", "Pre-Project phase", "Consolidate phase"],
                correct: 1,
                type: "mcq"
            },
            {
                id: 28,
                question: "What is the purpose of 'Reviews' within the Iterative Development cycle?",
                options: ["To assign blame for delays.", "To check if the solution is evolving wrongly or if business needs have changed.", "To increase the length of the timebox.", "To prevent the Business Ambassador from viewing the prototype."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 29,
                question: "'Negative Tests' are designed to:",
                options: ["Confirm the expected behavior.", "Ensure the application crashes gracefully.", "Block invalid actions.", "Verify the User Interface colors."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 30,
                question: "Which modelling perspective is concerned with 'Locations of business operations'?",
                options: ["WHO", "WHEN", "WHERE", "HOW"],
                correct: 2,
                type: "mcq"
            },
            {
                id: 31,
                question: "Why involves 'Abstraction' in modelling?",
                options: ["To make the diagrams look more artistic.", "To omit details to focus on specific aspects.", "To prevent stakeholders from understanding the technical depth.", "To increase the time spent on design."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 32,
                question: "Which of the following is NOT a responsibility of the Technical Coordinator?",
                options: ["Validating non-functional requirements.", "Ensuring quality from a technical perspective.", "Conducting Business Acceptance Testing.", "Overseeing technical reviews."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 33,
                question: "What defines a 'Timebox'?",
                options: ["A variable period where scope can change indefinitely.", "A short, fixed period in which work is delivered.", "A meeting room with a clock.", "The duration between Project Kick-off and Post-Project Review."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 34,
                question: "During the Investigate stage of a Timebox (IRC), what is a key activity?",
                options: ["Converging on the accurate solution.", "Defining acceptance criteria and understanding details.", "Developing and enhancing the solution code.", "Deploying the solution to production."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 35,
                question: "What happens during the Consolidate stage of a Timebox?",
                options: ["The team brainstorms high-level ideas.", "The team develops the initial prototype.", "The team converges on an accurate solution and ensures validity.", "The team defines the acceptance criteria."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 36,
                question: "The Iterative Development cycle supports early 'ROI'. What does ROI stand for?",
                options: ["Return on Innovation", "Risk of Iteration", "Return on Investment", "Reduction of Input"],
                correct: 2,
                type: "mcq"
            },
            {
                id: 37,
                question: "Which visual tool is used to show the six modelling perspectives in DSDM?",
                options: ["Gantt Chart", "Venn Diagram", "Flowchart", "Histogram"],
                correct: 1,
                type: "mcq"
            },
            {
                id: 38,
                question: "A 'Workshop Facilitator' should ideally be:",
                options: ["The Project Manager.", "A stakeholder with a strong interest in the outcome.", "An independent, trained person.", "The senior developer."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 39,
                question: "The sentence 'Decisions and agreements not forced' serves as:",
                options: ["A definition of a Timebox.", "A success factor for Facilitated Workshops.", "A rule for unit testing.", "A method for static reviews."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 40,
                question: "Which practice ensures that 'a viable solution is always delivered' in DSDM projects?",
                options: ["Combining Facilitated Workshops with lengthy documentation.", "Following MoSCoW prioritization and Timeboxing.", "Using only static reviews and ignoring dynamic testing.", "Skipping the 'Consolidate' phase."],
                correct: 1,
                type: "mcq"
            },

            // === TRUE/FALSE BANK for SPM Chapter 7 - DSDM Principles (30 Questions) ===
            {
                id: 41,
                question: "Iterative Development evolves a solution from a high-level concept closer to something with acknowledged business value.",
                answer: true,
                type: "tf"
            },
            {
                id: 42,
                question: "In a Facilitated Workshop, the facilitator should be the Project Manager to ensure authority.",
                answer: false,
                type: "tf"
            },
            {
                id: 43,
                question: "Modeling in DSDM implies creating a large, fully detailed replica of the entire system before coding begins.",
                answer: false,
                type: "tf"
            },
            {
                id: 44,
                question: "The 'WHEN' perspective in modelling refers to events important to the business, such as time and scheduling.",
                answer: true,
                type: "tf"
            },
            {
                id: 45,
                question: "Testing should only happen at the very end of the project in Iterative Development.",
                answer: false,
                type: "tf"
            },
            {
                id: 46,
                question: "A benefit of Facilitated Workshops is building team spirit and consensus.",
                answer: true,
                type: "tf"
            },
            {
                id: 47,
                question: "The 'Thought, Action, and Conversation' cycle happens after the initial conversation.",
                answer: true,
                type: "tf"
            },
            {
                id: 48,
                question: "Static Reviews involve running the code to see if it crashes.",
                answer: false,
                type: "tf"
            },
            {
                id: 49,
                question: "The Technical Coordinator is responsible for performing all Unit Tests.",
                answer: false,
                type: "tf"
            },
            {
                id: 50,
                question: "Timeboxes are short, fixed periods.",
                answer: true,
                type: "tf"
            },
            {
                id: 51,
                question: "In DSDM, it is acceptable to compromise quality to meet a deadline.",
                answer: false,
                type: "tf"
            },
            {
                id: 52,
                question: "The 'WHO' modelling perspective refers to the business objectives and strategy.",
                answer: false,
                type: "tf"
            },
            {
                id: 53,
                question: "Refinement is the stage of a Timebox where acceptance criteria are primarily defined.",
                answer: false,
                type: "tf"
            },
            {
                id: 54,
                question: "Facilitated Workshops require thorough preparation by both the Facilitator and Participants.",
                answer: true,
                type: "tf"
            },
            {
                id: 55,
                question: "Incremental Delivery helps support early Return on Investment (ROI).",
                answer: true,
                type: "tf"
            },
            {
                id: 56,
                question: "'Positive Tests' focus on blocking invalid actions.",
                answer: false,
                type: "tf"
            },
            {
                id: 57,
                question: "A diagram or analogy is a form of Model.",
                answer: true,
                type: "tf"
            },
            {
                id: 58,
                question: "The Solution Tester conducts Business Acceptance Testing (BAT).",
                answer: false,
                type: "tf"
            },
            {
                id: 59,
                question: "'Consolidate' is the stage where the solution is converged upon and its validity ensured.",
                answer: true,
                type: "tf"
            },
            {
                id: 60,
                question: "Workshops are unstructured meetings designed to let conversation flow randomly.",
                answer: false,
                type: "tf"
            },
            {
                id: 61,
                question: "Reviews may show that the business needs have changed during development.",
                answer: true,
                type: "tf"
            },
            {
                id: 62,
                question: "The 'WHERE' perspective in modelling relates to the locations of business operations.",
                answer: true,
                type: "tf"
            },
            {
                id: 63,
                question: "Configuration Management is not needed in Agile projects because they move too fast.",
                answer: false,
                type: "tf"
            },
            {
                id: 64,
                question: "Modelling helps confirm expectations and validate requirements.",
                answer: true,
                type: "tf"
            },
            {
                id: 65,
                question: "In the IRC cycle, 'Refine' comes before 'Investigate.'",
                answer: false,
                type: "tf"
            },
            {
                id: 66,
                question: "The goal of iterative development is to produce the final perfect solution in the first cycle.",
                answer: false,
                type: "tf"
            },
            {
                id: 67,
                question: "'Unhappy Path' tests cover unusual cases or exceptions.",
                answer: true,
                type: "tf"
            },
            {
                id: 68,
                question: "Participants in a workshop should be forced to make a decision if they take too long.",
                answer: false,
                type: "tf"
            },
            {
                id: 69,
                question: "Iterative Development reduces project risks.",
                answer: true,
                type: "tf"
            },
            {
                id: 70,
                question: "A neutral facilitator increases the likelihood of a successful workshop.",
                answer: true,
                type: "tf"
            },

            // === MIXED BANK for SPM Chapter 7 - Advanced Concepts (30 Questions: 15 MCQ + 15 TF) ===
            {
                id: 71,
                question: "The Venn diagram for Modelling Perspectives includes Data, Functions, and People. Which list correctly maps these to their Perspective Names?",
                options: ["Data=WHEN, Functions=WHERE, People=WHO", "Data=WHAT, Functions=HOW, People=WHO", "Data=WHY, Functions=WHAT, People=HOW", "Data=HOW, Functions=WHAT, People=WHEN"],
                correct: 1,
                type: "mcq"
            },
            {
                id: 72,
                question: "Identify the missing word in this definition: 'A [?] group meeting to enable participants to reach a predetermined objective in a compressed time frame, supported by a neutral facilitator.'",
                options: ["Informal", "Daily", "Structured", "Virtual"],
                correct: 2,
                type: "mcq"
            },
            {
                id: 73,
                question: "What is the DSDM recommendation regarding the length of development cycles?",
                options: ["They should be as short as possible.", "They should be exactly 3 months long.", "They should be variable depending on how tired the team is.", "They should only happen once a year."],
                correct: 0,
                type: "mcq"
            },
            {
                id: 74,
                question: "Which activity is a 'Dynamic' Verification method?",
                options: ["Reviewing the design specs.", "Inspecting the code visually.", "Running the deliverable to confirm behavior.", "Reading the requirements document."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 75,
                question: "When 'Planning Iterative Development,' where is the overall Strategy decided?",
                options: ["In the Post-Project Phase.", "During the first Daily Stand-up.", "During the Foundations Phase.", "It is not decided; it emerges randomly."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 76,
                question: "To deliver a viable solution, a DSDM project relies on two main practices: Timeboxing and [?].",
                options: ["Bureaucracy.", "MoSCoW prioritization.", "Excessive Documentation.", "Waterfall planning."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 77,
                question: "What distinguishes a 'Negative' test from an 'Unhappy Path' test?",
                options: ["Negative tests block invalid actions; Unhappy Path tests look at unusual cases/exceptions.", "Negative tests verify expected outcomes; Unhappy Path tests crash the system.", "Negative tests are manual; Unhappy Path tests are automated.", "There is no difference; they are the same."],
                correct: 0,
                type: "mcq"
            },
            {
                id: 78,
                question: "Complete the list of IRC steps: Investigate, [?], Consolidate.",
                options: ["Release", "Review", "Refine", "Record"],
                correct: 2,
                type: "mcq"
            },
            {
                id: 79,
                question: "Which role acts as the 'exception' in the Solution Tester's responsibilities, handling Business Acceptance Testing instead?",
                options: ["Business Ambassadors/Advisors.", "Technical Coordinators.", "Project Managers.", "Facilitators."],
                correct: 0,
                type: "mcq"
            },
            {
                id: 80,
                question: "'Maintaining solution integrity' and 'Encouraging flexibility' are benefits of:",
                options: ["Configuration Management (Controlling Iterative Development).", "Rigid Waterfall Planning.", "Avoiding Workshops.", "Ignoring Non-Functional Requirements."],
                correct: 0,
                type: "mcq"
            },
            {
                id: 81,
                question: "Which modeling perspective answers the question of 'WHY' (Business objectives and strategy)?",
                options: ["The Data Perspective.", "The Strategy Perspective.", "The Location Perspective.", "The Function Perspective."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 82,
                question: "What is a result of 'Thorough preparation' by the Facilitator and Participants?",
                options: ["The workshop is more likely to succeed.", "The workshop will take longer.", "The workshop will be cancelled.", "The facilitator will become biased."],
                correct: 0,
                type: "mcq"
            },
            {
                id: 83,
                question: "When a solution evolves from a high-level concept to something of acknowledged business value, this is called:",
                options: ["Static Analysis.", "Facilitated Workshop.", "Iterative Development.", "Unit Testing."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 84,
                question: "Who provides testing knowledge and expertise to the team but does not write unit tests?",
                options: ["Solution Developer.", "Solution Tester.", "Facilitator.", "Project Manager."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 85,
                question: "The Venn Diagram of perspectives shows 'WHAT, HOW, WHERE' and which other three?",
                options: ["WHO, WHEN, WHY.", "WHICH, WHOSE, WHITHER.", "WHO, TIME, STRATEGY.", "PEOPLE, TIME, PLACE."],
                correct: 0,
                type: "mcq"
            },
            {
                id: 86,
                question: "In a Free Format Timebox, the 'Iterative Development' step implies that formal acceptance of deliverables occurs during the scheduled reviews of work in progress.",
                answer: false,
                type: "tf"
            },
            {
                id: 87,
                question: "The Solution Tester is responsible for ensuring the solution is 'Technical Quality,' while the Technical Coordinator writes the unit tests.",
                answer: false,
                type: "tf"
            },
            {
                id: 88,
                question: "The phrase 'Decisions and agreements not forced' is considered a critical Success Factor for Facilitated Workshops.",
                answer: true,
                type: "tf"
            },
            {
                id: 89,
                question: "Modelling allows a team to visualise something that cannot be directly observed.",
                answer: true,
                type: "tf"
            },
            {
                id: 90,
                question: "An 'Early sample, model or release of a product to test a concept' describes a Prototype, which is a tool used in Iterative Development.",
                answer: true,
                type: "tf"
            },
            {
                id: 91,
                question: "Reviews scheduled within a Timebox help maintain business focus and stakeholder engagement.",
                answer: true,
                type: "tf"
            },
            {
                id: 92,
                question: "The workshop report should be distributed several weeks after the workshop to ensure high editing quality.",
                answer: false,
                type: "tf"
            },
            {
                id: 93,
                question: "Visual modelling should be as detailed as possible, covering every single aspect of the system.",
                answer: false,
                type: "tf"
            },
            {
                id: 94,
                question: "'Strategy for iterative development with integrated testing' is a concept that flows from Feasibility to Foundations in the Planning diagram.",
                answer: true,
                type: "tf"
            },
            {
                id: 95,
                question: "Reviews (from informal to formal) are only necessary at the end of the project, not during timeboxes.",
                answer: false,
                type: "tf"
            },
            {
                id: 96,
                question: "Ideally, each Timebox should deliver a 'potentially deployable increment.'",
                answer: true,
                type: "tf"
            },
            {
                id: 97,
                question: "The facilitator must be an expert in the technical topic being discussed to be effective.",
                answer: false,
                type: "tf"
            },
            {
                id: 98,
                question: "'Modelling' is defined as making solution elements visible early (e.g., prototypes, mock-ups).",
                answer: true,
                type: "tf"
            },
            {
                id: 99,
                question: "An outcome of Iterative Development is that new issues are often discovered during reviews.",
                answer: true,
                type: "tf"
            },
            {
                id: 100,
                question: "What enables 'Rapid, high quality team decisions'?",
                answer: true,
                type: "tf"
            }
        ],

        "CH 8": [
            // === MCQ BANK for SPM Chapter 8 - Software Effort Estimation (30 Questions) ===
            {
                id: 21,
                question: "What is the primary definition of Software Effort Estimation?",
                options: ["Calculating the total monetary cost of the software license.", "Predicting the amount of work, time, and resources required to develop a software product.", "Determining the hardware specifications needed to run the software.", "Scheduling the marketing campaign for the software release."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 22,
                question: "How does 'Duration' differ from 'Effort' in project estimation?",
                options: ["Duration refers to the actual monetary value spent on the project.", "Duration represents the human labor required to complete tasks.", "Duration measures calendar time, including delays and non-working days.", "Duration and Effort are synonymous terms in software engineering."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 23,
                question: "Which of the following is identified as a significant Product Factor influencing software costs?",
                options: ["The clarity of communication between stakeholders.", "The level of skill team members have with the programming language.", "The organizational maturity model used (e.g., CMMI).", "System size (SLOC, Function Points) and functional complexity."],
                correct: 3,
                type: "mcq"
            },
            {
                id: 24,
                question: "Why is accurate estimation critical for the 'Pre-Project' or early planning phases?",
                options: ["It eliminates the need for software testing.", "It ensures that the code will have zero bugs.", "It helps determine project feasibility and supports budgeting decisions.", "It allows the team to skip the design phase."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 25,
                question: "What is a key characteristic of Top-Down Estimation?",
                options: ["It breaks work into small tasks and estimates each one separately.", "It uses a big-picture view to give a quick, overall effort estimate.", "It is typically used at the very end of the project life cycle.", "It is considered the most time-consuming and expensive estimation technique."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 26,
                question: "Which estimation technique classifies items into rough sizes like S, M, L, and XL?",
                options: ["Function Point Analysis", "T-Shirt Sizing", "Work Breakdown Structure", "Code Line Counting"],
                correct: 1,
                type: "mcq"
            },
            {
                id: 27,
                question: "In Velocity-Based Estimation, what does 'Velocity' represent?",
                options: ["The speed at which the CPU runs the code.", "The average number of Story Points a team completes per Timebox/Sprint.", "The time it takes to travel between the client site and the office.", "The number of hours a developer works in a day."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 28,
                question: "What is the main advantage of Function Point Estimating over Source Lines of Code (SLOC)?",
                options: ["It is dependent on the technology used.", "It measures system size based on user-visible functions and is independent of the programming language.", "It focuses solely on the database schema.", "It is faster because it involves no calculations."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 29,
                question: "When using Work Breakdown Estimating, how is the total project effort calculated?",
                options: ["By averaging the complexity of the hardest tasks.", "By looking at the size of similar past projects.", "By estimating each task individually and adding them together.", "By guessing a random number based on the budget."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 30,
                question: "In the Agile/Timebox context, if a sprint lasts 2 weeks and a team of 3 has a capacity of 30 person-days, what is the implicit working assumption for individual availability?",
                options: ["Each person works 7 days a week.", "Each person works 10 working days per sprint (2 weeks x 5 days).", "Each person works 24 hours a day.", "The team does not take weekends off."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 31,
                question: "Which factor creates 'Communication Overhead' according to Brooks's Law?",
                options: ["Having too few tools.", "The complexity of the algorithm.", "Coordination challenges in larger teams.", "The lack of documentation."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 32,
                question: "Product Breakdown Estimating is useful because:",
                options: ["It ignores the small components to save time.", "It helps ensure no major part or component of the system is forgotten.", "It relies entirely on the gut feeling of the product owner.", "It estimates the cost of the hardware, not the software."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 33,
                question: "In the context of Organizational Maturity, what benefit do well-established processes (like CMMI standards) provide?",
                options: ["They increase cost variation significantly.", "They allow teams to ignore documentation.", "They enable better predictability and lower cost variation.", "They remove the need for project managers."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 34,
                question: "Which of the following best describes the 'External Input (EI)' component in Function Point Analysis?",
                options: ["Data sent out from the system to the user.", "Data entering the system (e.g., user entry).", "Data files referenced internally.", "Data retrieved for display without processing."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 35,
                question: "Why can't Velocity be easily compared across different Agile teams?",
                options: ["Because teams use different computers.", "Because Velocity is unique to each team's estimation baseline and consistency.", "Because Velocity is a measurement of money, which varies by currency.", "Because Velocity must be recalculated every day."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 36,
                question: "According to the slide on 'Human & Team Factors,' what is often ranked as the highest factor influencing productivity and accuracy?",
                options: ["The speed of the internet connection.", "Team experience.", "The brand of the IDE software.", "The number of meetings held."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 37,
                question: "What is a risk of relying solely on 'Expert-Judgment' methods (mentioned as a challenge)?",
                options: ["Experts are too expensive.", "It is slower than algorithmic models.", "Human bias can affect estimates.", "Computers cannot process expert data."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 38,
                question: "What implies that Top-Down Estimation is 'less accurate' than Bottom-Up?",
                options: ["It is done by managers who don't know code.", "It uses a big-picture view without knowing all specific details.", "It relies on mathematical formulas only.", "It takes too long to calculate."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 39,
                question: "In the 'T-Shirt Estimation Example' provided (Case Study AMS-FR), how is total effort calculated?",
                options: ["By measuring the lines of code in Java.", "Size Effort (assigned days) × Quantity of Stories.", "Number of Developers × Days in the Month.", "Quantity of Stories + Story Points."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 40,
                question: "Which component of Function Points refers to 'data files used/maintained within the system'?",
                options: ["External Interface Files (EIF)", "Internal Logical Files (ILF)", "External Inputs (EI)", "External Outputs (EO)"],
                correct: 1,
                type: "mcq"
            },
            {
                id: 41,
                question: "If a project is estimated to take 2,000 person-hours (Effort) but only one person is working on it 40 hours a week, how does this affect Duration?",
                options: ["The Duration will be very short.", "The Duration will decrease as effort increases.", "The Duration will be long (approx. 50 weeks) because only one resource is applied.", "The Duration is irrelevant to effort."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 42,
                question: "Which Project Environment Factor relates specifically to the rigidity of requirements?",
                options: ["Availability of domain experts.", "Requirements clarity or volatility.", "Choice of IDE.", "Hardware upgrades."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 43,
                question: "When using Work Breakdown Estimating for the AMS-FR User Interface Module, what is an example of a sub-task identified in the slide?",
                options: ["Facial recognition algorithm design.", "Student check-in interface.", "Database normalization.", "Buying a new server."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 44,
                question: "Why does 'Technical Complexity' act as a cost driver?",
                options: ["Because it makes the code shorter.", "Because complex software requires more effort in design, testing, and integration.", "Because complexity makes the team work faster.", "Because complex software does not require documentation."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 45,
                question: "What describes Agile Estimation (Story-based/Velocity) compared to Traditional estimation?",
                options: ["Agile estimation is done once at the beginning and never touched again.", "Agile estimation supports realistic planning conversations and tracks changes in team performance over iterations.", "Agile estimation uses detailed mathematical algorithms like COCOMO II exclusively.", "Agile estimation guarantees 100% accuracy in the first week."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 46,
                question: "Function Point (FP) analysis requires mapping functions to:",
                options: ["T-Shirt sizes.", "Colors.", "Complexity ratings (Low, Medium, High).", "Code repositories."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 47,
                question: "Which estimation category does Machine Learning belong to in the taxonomy of estimation techniques?",
                options: ["Non-Algorithmic", "Expert-Driven", "Algorithmic (specifically Data/Text Mining and Neural Networks).", "T-Shirt Sizing"],
                correct: 2,
                type: "mcq"
            },
            {
                id: 48,
                question: "In the AMS-FR case study for Bottom-Up estimation, how was the Total Estimated Effort derived?",
                options: ["By applying a COCOMO formula.", "By asking the CEO for a number.", "By summing the days allocated to every individual sub-component (e.g., Facial Recognition + Attendance Mgmt + Analytics + UI).", "By multiplying the total lines of code by a productivity factor."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 49,
                question: "'Hidden complexity increases effort.' This finding is attributed to which type of research in the slides?",
                options: ["A Scrum SLR (Systematic Literature Review) finding.", "A T-Shirt manufacturing study.", "A waterfall history book.", "An interview with a database administrator."],
                correct: 0,
                type: "mcq"
            },
            {
                id: 50,
                question: "Which factor allows organizations to experience 'lower cost variation' and better consistency?",
                options: ["High staff turnover.", "Organizational Maturity (established processes/standards).", "Use of notepad for coding.", "Constant change of management."],
                correct: 1,
                type: "mcq"
            },

            // === TRUE/FALSE BANK for SPM Chapter 8 - Estimation Principles (30 Questions) ===
            {
                id: 51,
                question: "'Software Effort' and 'Project Duration' are interchangeable terms that represent the same value in project planning.",
                answer: false,
                type: "tf"
            },
            {
                id: 52,
                question: "Software Effort Estimation is primarily performed at the very end of a project to calculate the final invoice.",
                answer: false,
                type: "tf"
            },
            {
                id: 53,
                question: "According to Brooks's Law, adding more people to a late software project always decreases the timeline linearly.",
                answer: false,
                type: "tf"
            },
            {
                id: 54,
                question: "Technical Complexity factors, such as complex algorithms or integration with legacy systems, act as major cost drivers.",
                answer: true,
                type: "tf"
            },
            {
                id: 55,
                question: "Organizations with high 'Maturity' (well-established processes like CMMI) tend to struggle more with estimation consistency than immature organizations.",
                answer: false,
                type: "tf"
            },
            {
                id: 56,
                question: "Top-Down estimation is typically faster and simpler than Bottom-Up estimation but is often less accurate.",
                answer: true,
                type: "tf"
            },
            {
                id: 57,
                question: "Velocity is a metric that can be safely used to compare the performance of different Agile teams against each other.",
                answer: false,
                type: "tf"
            },
            {
                id: 58,
                question: "T-Shirt Estimating is a high-precision technique used when every line of code is known.",
                answer: false,
                type: "tf"
            },
            {
                id: 59,
                question: "Function Point Estimation is heavily dependent on the programming language used (e.g., Java vs. Python).",
                answer: false,
                type: "tf"
            },
            {
                id: 60,
                question: "Bottom-Up estimation is best used when the team has clear, detailed requirements.",
                answer: true,
                type: "tf"
            },
            {
                id: 61,
                question: "An 'Internal Logical File (ILF)' in Function Point Analysis refers to data maintained inside the system.",
                answer: true,
                type: "tf"
            },
            {
                id: 62,
                question: "In the Work Breakdown Estimating method, the total effort is calculated by averaging the estimates of all tasks.",
                answer: false,
                type: "tf"
            },
            {
                id: 63,
                question: "Product Breakdown Estimating is useful because it divides a system into smaller, manageable sub-products.",
                answer: true,
                type: "tf"
            },
            {
                id: 64,
                question: "'External Inquiries (EQ)' are a component of T-Shirt Sizing.",
                answer: false,
                type: "tf"
            },
            {
                id: 65,
                question: "Velocity forecasts allow teams to predict how long it will take to finish the product backlog based on past performance.",
                answer: true,
                type: "tf"
            },
            {
                id: 66,
                question: "Human factors, such as team experience and skill level, are considered irrelevant to software cost estimation.",
                answer: false,
                type: "tf"
            },
            {
                id: 67,
                question: "In the context of software projects, 'Cost' represents the monetary value based on effort and resources.",
                answer: true,
                type: "tf"
            },
            {
                id: 68,
                question: "A 'Sprint' in the provided Case Study is assumed to last 4 weeks.",
                answer: false,
                type: "tf"
            },
            {
                id: 69,
                question: "Machine Learning approaches to estimation (like Neural Networks) are categorized as 'Expert-Judgment' methods.",
                answer: false,
                type: "tf"
            },
            {
                id: 70,
                question: "Estimation eliminates all uncertainty from a software project.",
                answer: false,
                type: "tf"
            },
            {
                id: 71,
                question: "'Work Breakdown Estimating' is synonymous with 'Top-Down Estimating.'",
                answer: false,
                type: "tf"
            },
            {
                id: 72,
                question: "If a new team is formed, their historic Velocity from previous different teams should be used for immediate planning.",
                answer: false,
                type: "tf"
            },
            {
                id: 73,
                question: "According to the Function Point case study (AMS-FR), 'Student Profile Database' is classified as an External Interface File (EIF).",
                answer: false,
                type: "tf"
            },
            {
                id: 74,
                question: "Agile estimation methods typically involve re-estimating and updating plans as the project evolves.",
                answer: true,
                type: "tf"
            },
            {
                id: 75,
                question: "In T-Shirt estimation, categories like S, M, and L must be converted to Story Points or Time for calculation purposes.",
                answer: true,
                type: "tf"
            },
            {
                id: 76,
                question: "Requirements volatility (changing requirements) simplifies the estimation process.",
                answer: false,
                type: "tf"
            },
            {
                id: 77,
                question: "In the Bottom-Up case study, the 'Total Estimated Effort' is 39 person-days.",
                answer: true,
                type: "tf"
            },
            {
                id: 78,
                question: "Algorithmic estimation uses mathematical formulas (like COCOMO II) to predict effort.",
                answer: true,
                type: "tf"
            },
            {
                id: 79,
                question: "'External Inputs' in Function Point Analysis refer to data sent from the system to the user.",
                answer: false,
                type: "tf"
            },
            {
                id: 80,
                question: "A primary purpose of software estimation is to help stakeholders distinguish between realistic commitments and wishful thinking.",
                answer: true,
                type: "tf"
            },

            // === MIXED BANK for SPM Chapter 8 - Advanced Estimation Concepts (30 Questions: 15 MCQ + 15 TF) ===
            {
                id: 81,
                question: "Which estimating method would be most appropriate for the 'Early Planning' phase of a project when specific details are still vague?",
                options: ["Work Breakdown Estimating (Bottom-Up)", "Source Lines of Code (SLOC) count", "T-Shirt Sizing (Top-Down)", "Measuring code complexity in a repository"],
                correct: 2,
                type: "mcq"
            },
            {
                id: 82,
                question: "Based on the Case Study's Bottom-Up estimate (AMS-FR System), which module required the highest effort (11 days)?",
                options: ["Facial Recognition", "User Interface", "System Integration", "Analytics & Reporting"],
                correct: 0,
                type: "mcq"
            },
            {
                id: 83,
                question: "Which factor does 'Brooks's Law' warn about when trying to compress a project schedule?",
                options: ["The cost of hardware will increase linearly.", "Adding manpower to a late software project makes it later due to communication overhead.", "Technical complexity decreases with more people.", "Requirements volatility disappears when the team is large."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 84,
                question: "What does the 'Adjusted Function Point' formula take into account that 'Unadjusted Function Points' do not?",
                options: ["The programming language.", "The Value Adjustment Factor (VAF) based on general system characteristics.", "The salary of the developers.", "The timeline of the project."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 85,
                question: "Which category of estimation technique involves 'Relative Estimation' like grouping items by similarity?",
                options: ["Bottom-Up", "Algorithmic", "Story-based (T-Shirt / Story Points)", "Time-based"],
                correct: 2,
                type: "mcq"
            },
            {
                id: 86,
                question: "In the AMS-FR Case Study, 'Auto-generate attendance status' is listed under which complexity module?",
                options: ["Facial Recognition", "Attendance Management", "User Interface", "System Integration"],
                correct: 1,
                type: "mcq"
            },
            {
                id: 87,
                question: "When a team's Velocity increases over several sprints, what is the most likely implication for future planning?",
                options: ["They can take on more Story Points per sprint.", "They should switch to Bottom-Up estimation.", "The product owner should cancel the project.", "The team should reduce their hours."],
                correct: 0,
                type: "mcq"
            },
            {
                id: 88,
                question: "Identify the External Output (EO) in the AMS-FR case study Function Point example.",
                options: ["'Generate attendance analytics report'", "'Capture student facial image'", "'Lecturer manually updates attendance'", "'Student Profile Database'"],
                correct: 0,
                type: "mcq"
            },
            {
                id: 89,
                question: "What represents a 'Risk' or 'Challenge' regarding Human Factors in estimation?",
                options: ["Teams typically over-document their work.", "Human bias (e.g., optimism bias) affects estimates.", "Experts refuse to estimate.", "Programming languages are too hard to learn."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 90,
                question: "If a project's 'Total Estimated Effort' is 39 person-days and the team has 3 people (30 person-days capacity per sprint of 2 weeks), how long will the project take?",
                options: ["Less than 1 Sprint.", "Exactly 1 Sprint.", "About 1.3 to 1.5 Sprints.", "4 Sprints."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 91,
                question: "Which factor is NOT considered a 'Product Factor'?",
                options: ["System size.", "Required reliability.", "Team cohesion.", "Functional complexity."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 92,
                question: "In T-Shirt estimation, what happens after items are grouped into S, M, L, XL?",
                options: ["The letters are printed on shirts for the team.", "Each size is assigned an estimated effort value (e.g., Small = 1 day) to calculate total effort.", "The items are discarded if they are XL.", "The items are given to stakeholders to program."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 93,
                question: "Why is 'Historical Data' useful in estimation?",
                options: ["It isn't useful because every project is 100% unique.", "It allows teams to compare current work with past performance (e.g., Velocity) to increase accuracy.", "It allows the company to sue the developers.", "It replaces the need for requirements."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 94,
                question: "What is the effect of 'Organizational Maturity' on project risks?",
                options: ["Immature organizations handle risks better.", "Mature organizations generally have better risk identification and management processes.", "Maturity has no link to risk.", "Mature organizations ignore risks."],
                correct: 1,
                type: "mcq"
            },
            {
                id: 95,
                question: "In the Function Point calculation for the case study, 'Student Profile Database' is identified as:",
                options: ["External Output (EO).", "External Input (EI).", "Internal Logical File (ILF).", "Complexity Factor."],
                correct: 2,
                type: "mcq"
            },
            {
                id: 96,
                question: "'External Interface Files (EIF)' in Function Point analysis refers to data that is owned and maintained by the software system being estimated.",
                answer: false,
                type: "tf"
            },
            {
                id: 97,
                question: "Effort is usually measured in 'person-hours' or 'person-days,' whereas Duration is measured in 'calendar weeks' or 'months.'",
                answer: true,
                type: "tf"
            },
            {
                id: 98,
                question: "'Agile projects' never perform estimation because the scope is constantly changing.",
                answer: false,
                type: "tf"
            },
            {
                id: 99,
                question: "The primary goal of 'Product Breakdown Estimating' is to ensure complete coverage of components so no major part of the system is forgotten.",
                answer: true,
                type: "tf"
            },
            {
                id: 100,
                question: "Function Points are a measure of system size derived solely from the number of lines of code (SLOC).",
                answer: false,
                type: "tf"
            },
            {
                id: 101,
                question: "The estimation technique that breaks work into 'External Inputs,' 'External Outputs,' and 'Internal Logical Files' is called T-Shirt Sizing.",
                answer: false,
                type: "tf"
            },
            {
                id: 102,
                question: "One of the benefits of estimation is that it supports decision-making for contracts and budgeting.",
                answer: true,
                type: "tf"
            },
            {
                id: 103,
                question: "'External Interface Files (EIF)' and 'Internal Logical Files (ILF)' usually carry the same weight (complexity points) in calculations regardless of their actual structure.",
                answer: false,
                type: "tf"
            },
            {
                id: 104,
                question: "Velocity can be calculated for a brand new team on Day 1 by checking the industry average.",
                answer: false,
                type: "tf"
            },
            {
                id: 105,
                question: "The term 'Hidden complexity increases effort' is associated with a 'Waterfall history book' finding.",
                answer: false,
                type: "tf"
            },
            {
                id: 106,
                question: "'Machine Learning' methods for software estimation are considered 'Non-Algorithmic' because computers don't use algorithms.",
                answer: false,
                type: "tf"
            },
            {
                id: 107,
                question: "Work Breakdown Estimating allows for 'more accurate estimation' than Top-Down because it prevents the team from missing small, hidden tasks.",
                answer: true,
                type: "tf"
            },
            {
                id: 108,
                question: "Algorithmic Estimation, such as 'Ordinary Least Squares Regression' or 'COCOMO,' uses mathematical formulas to derive estimates.",
                answer: true,
                type: "tf"
            },
            {
                id: 109,
                question: "What describes the relationship between 'Work' and 'Tasks' in Bottom-Up estimation?",
                answer: true,
                type: "tf"
            },
            {
                id: 110,
                question: "The purpose of 'Planning Poker' (often implied in story sizing) is to have the manager dictate the estimates to the team.",
                answer: false,
                type: "tf"
            }
        ]
    },


    // ==================== DSA (Data Structures & Algorithms) ====================
    DSA: {
        "CH 6": [],
        "CH 7": [],
        "CH 8": []
    },

    // ==================== HCI (Human-Computer Interaction) ====================
    HCI: {
        "CH 6": [],
        "CH 7": [],
        "CH 8": []
    },

    // ==================== OS (Operating Systems) ====================
    OS: {
        "CH 6": [],
        "CH 7": [],
        "CH 8": []
    }
};

// ========================================
// NOTES FOR UPDATING QUESTIONS:
// ========================================
// 1. Each chapter has MCQ questions first, then True/False questions
// 2. MCQ format: { id, question, options: [array], correct: index, type: "mcq" }
// 3. True/False format: { id, question, answer: true/false, type: "tf" }
// 4. To replace questions:
//    - Find the subject (SPM, DSA, HCI, OS)
//    - Find the chapter (CH 6, CH 7, CH 8)
//    - Replace MCQ questions (keep type: "mcq")
//    - Replace True/False questions (keep type: "tf")
// 5. Keep unique IDs for each question
// 6. The "MIXED" mode automatically combines MCQ and True/False questions
// ========================================
