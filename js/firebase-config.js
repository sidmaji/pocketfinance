// Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyA8b0HlagpJbJ8xcDBqss28ClhFx_aodV8',
    authDomain: 'pockfin.firebaseapp.com',
    projectId: 'pockfin',
    storageBucket: 'pockfin.firebasestorage.app',
    messagingSenderId: '755907500804',
    appId: '1:755907500804:web:874f9ad94edc6bbc58ce51',
    measurementId: 'G-2LHZVSHMJG',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Initialize Auth
const auth = firebase.auth()

// Google Auth Provider
const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt: 'select_account',
})

// Export for use in other files
window.firebaseAuth = {
    auth,
    googleProvider,
    signInWithEmailAndPassword: (email, password) => auth.signInWithEmailAndPassword(email, password),
    createUserWithEmailAndPassword: (email, password) => auth.createUserWithEmailAndPassword(email, password),
    signInWithPopup: (provider) => auth.signInWithPopup(provider),
    sendPasswordResetEmail: (email) => auth.sendPasswordResetEmail(email),
    signOut: () => auth.signOut(),
}
