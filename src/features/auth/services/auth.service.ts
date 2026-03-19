import { browserLocalPersistence, browserSessionPersistence, createUserWithEmailAndPassword, sendEmailVerification, setPersistence, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../../../firebase/config"

export const handleSignup = async (email: string, pass: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    // await sendEmailVerification(userCredential.user);
  } catch (err: any) {
    console.error("Auth Error", err.code)
  }
}



export const handleLogin = async (email: string, pass: string, rememberMe: boolean = true) => {
  console.log(email, pass)
  try {
    const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;
    await setPersistence(auth, persistenceType);

    const userCredential = await signInWithEmailAndPassword(auth, email, pass);

    if (!userCredential.user.emailVerified) {
      console.warn("Please verify your email to access all features.");
    }

    return userCredential.user;
  } catch (err: any) {
    switch (err.code) {
      case 'auth/invalid-credential':
        console.error("Invalid email or password.");
        break;
      case 'auth/user-disabled':
        console.error("This account has been disabled.");
        break;
      case 'auth/too-many-requests':
        console.error("Too many failed attempts. Try again later.");
        break;
      default:
        console.error("Login Error:", err.code);
    }
    throw err;
  }
};


export const handleLogout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error("Logout Error", err);
  }
};