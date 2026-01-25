/**
 * Firebase Configuration for QuizzUp
 * 
 * INSTRUCTIONS:
 * 1. Go to https://console.firebase.google.com/
 * 2. Create a new project (or use an existing one).
 * 3. Go to Project Settings > General > Your Apps > Web App (</> icon).
 * 4. Register app (nickname 'QuizzUp').
 * 5. Copy the 'firebaseConfig' object they give you and PASTE it below, replacing the placeholder.
 */

// --- PASTE YOUR CONFIG HERE ---
const firebaseConfig = {
    apiKey: "AIzaSyBDoWSbTnQBX7DQUNrHjQPNzF8O-VgxyHA",
    authDomain: "quizzup-f3419.firebaseapp.com",
    projectId: "quizzup-f3419",
    storageBucket: "quizzup-f3419.firebasestorage.app",
    messagingSenderId: "1050767939102",
    appId: "1:1050767939102:web:a70feb16d4470b14a4000f",
    measurementId: "G-75PET57P2Y"
};
// ------------------------------

// Initialize Firebase
let db; // Firestore instance
let auth; // Auth instance
let app;

try {
    if (typeof firebase !== 'undefined') {
        app = firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        auth = firebase.auth();
        console.log("🔥 Firebase Connected Successfully");
    } else {
        console.warn("⚠️ Firebase SDK not loaded. Running in Offline Mode.");
    }
} catch (e) {
    console.error("Firebase Init Error (Did you paste your keys?):", e);
}
