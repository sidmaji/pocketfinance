import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { getAuth, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyA8b0HlagpJbJ8xcDBqss28ClhFx_aodV8',
    authDomain: 'pockfin.firebaseapp.com',
    projectId: 'pockfin',
    storageBucket: 'pockfin.firebasestorage.app',
    messagingSenderId: '755907500804',
    appId: '1:755907500804:web:874f9ad94edc6bbc58ce51',
    measurementId: 'G-2LHZVSHMJG',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)

let analytics
if (typeof window !== 'undefined') {
    analytics = getAnalytics(app)
}

export { analytics, sendEmailVerification, sendPasswordResetEmail }
export default app
