import { browserLocalPersistence, browserSessionPersistence, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { auth } from "../../../firebase/config";
import { db } from "../../../firebase/firestore";
import { useAuthStore } from "../../../store/auth.store";

export const handleSignup = async (name: string, email: string, pass: string) => {
  try {
    //firebase auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);

    const user = userCredential.user;

    //firestore
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: user.email,
      role: "doctor",
      createdAt: Timestamp.now()
    })

    // zustand
    useAuthStore.getState().setUser({
      uid: user.uid,
      name: name,
      email: user.email,
    })

    return user

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

    const user = userCredential.user;

    // get firestore user
    const docRef = doc(db, "users", user.uid);
    const snap = await getDoc(docRef);

    const userData = snap.data();

    // store in zustand
    useAuthStore.getState().setUser({
      uid: user.uid,
      email: user.email,
      name: userData?.name,
    });

    if (!userCredential.user.emailVerified) {
      console.warn("Please verify your email to access all features.");
    }

    return user;
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

    useAuthStore.getState().setUser(null);

  } catch (err) {
    console.error("Logout Error", err);
  }
};
