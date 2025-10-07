
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config";

async function login(email: string, password: string) {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    console.log("Logged in as:", userCred.user);
  } catch (err) {
    console.error("Login failed:", err);
  }
}

async function signUp(email: string, password: string) {
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Signed up as:", userCred.user);
    return userCred.user;
  } catch (err) {
    console.error("Signup failed:", err);
  }         
}

async function logout(){
  try {
   await auth.signOut();
  } catch (error) {
    
  }
}

export { login, signUp, logout };