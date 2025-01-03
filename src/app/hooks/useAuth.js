// hooks/useAuth.js
import { useState, useEffect } from "react";
import {
  getAuth,
  signInAnonymously,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../api/firebase.config";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  // مراقبة حالة المستخدم
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  // تسجيل الدخول كمستخدم ضيف
  const loginAsGuest = async () => {
    try {
      await signInAnonymously(auth);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // تسجيل الدخول باستخدام Google
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // تسجيل الخروج
  const logout = async () => {
    try {
      await signOut(auth);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return { user, loading, error, loginAsGuest, loginWithGoogle, logout };
};

export default useAuth;
