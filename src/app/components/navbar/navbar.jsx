"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { auth } from "@/app/api/firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import useAuth from "../../hooks/useAuth";
import "./navbar.css";
import CartView from "../cart-view/cartView";
import ToggleButton from "../dark-light/darkLigh";
import { useRouter } from "next/navigation";
import ProfileDialog from "../profile/profile";

const Navbar = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  const { loginWithGoogle } = useAuth();

  const toggleCart = () => {
    setShow((prevShow) => !prevShow);
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const savedDarkMode = localStorage.getItem("darkMode") === "true";
      setIsDarkMode(savedDarkMode);
    }
  }, [isClient]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.style.setProperty("--background", "#0a0a0a");
      document.documentElement.style.setProperty("--foreground", "#ededed");
    } else {
      document.documentElement.style.setProperty("--background", "#ffffff");
      document.documentElement.style.setProperty("--foreground", "#171717");
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("darkMode", isDarkMode);
    }
  }, [isDarkMode, isClient]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("خطأ أثناء تسجيل الدخول بـ Google", error);
    }
  };

  const handleSignup = async () => {
    try {
      await loginWithGoogle();
      console.log("تم إنشاء الحساب بنجاح!");
    } catch (error) {
      console.error("خطأ أثناء إنشاء الحساب", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("خطأ أثناء تسجيل الخروج", error);
    }
  };

  return (
    <div className={`nav`}>
      <img
        onClick={() => router.push("/")}
        src="logo-rove.png"
        alt="logo"
        className="logo"
      />
      <p className="title">شاورما السوري</p>

      <div className={`con-nv ${navOpen ? "open" : ""}`}>
      
        <span className="badge-con">
          {totalItems > 0 && <span className="badge">{totalItems}</span>}
          <svg
          onClick={toggleCart}
          className="cart"
          xmlns="http://www.w3.org/2000/svg"
          width="128pt"
          height="128pt"
          viewBox="0 0 128 128"
        >
          <g
            transform="translate(0.000000,128.000000) scale(0.100000,-0.100000)"
            stroke="none"
          >
            <path
              d="M594 1172 c-21 -14 -32 -46 -27 -81 l5 -36 -59 -17 c-150 -43 -267
                      -184 -289 -347 l-7 -51 423 0 423 0 -7 51 c-22 162 -139 303 -288 347 l-58 17
                      0 46 c0 32 -6 51 -18 62 -19 17 -78 23 -98 9z m-128 -265 c2 -7 -15 -34 -39
                      -59 -25 -25 -53 -68 -63 -94 -18 -50 -32 -67 -46 -58 -25 16 23 125 81 183 43
                      43 58 49 67 28z"
            />
            <path
              d="M134 589 c-3 -6 15 -33 42 -60 l48 -49 416 0 416 0 48 49 c27 27 45
                      54 42 60 -10 16 -1002 16 -1012 0z"
            />
            <path
              d="M505 423 c-27 -8 -102 -17 -165 -21 l-115 -7 0 -125 0 -125 75 -5
                      c49 -4 113 -18 187 -43 l112 -38 148 26 c81 14 161 28 176 31 33 7 193 146
                      202 175 10 29 -20 69 -52 69 -15 0 -53 -20 -94 -50 -73 -52 -73 -57 -183 -71
                      -86 -14 -121 -17 -136 -9 -25 13 -26 30 -2 30 9 0 60 5 112 10 77 8 98 14 113
                      31 22 27 22 51 -1 79 -14 18 -39 24 -152 40 -158 23 -160 23 -225 3z"
            />
          </g>
        </svg>
        </span>
  
        <ToggleButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
  
        {isLoggedIn ? (
          <>
            <img
              src={user?.photoURL || "/user.png"}
              alt="profile"
              className="profile-icon"
              onClick={() => setDialogOpen(true)} // افتح نافذة الديالوج عند الضغط على الصورة
            />
          </>
        ) : (
          <>
            <button className="btn-login" onClick={handleLogin}>
              تسجيل الدخول
            </button>
            <button className="btn-signup" onClick={handleSignup}>
              إنشاء حساب
            </button>
          </>
        )}
      </div>
  
      <button className="toggle-nav" onClick={() => setNavOpen((prev) => !prev)}>
        ☰
      </button>
     
  
      <CartView view={show} onClose={toggleCart} />
  
      {/* عرض نافذة الديالوج عند فتحها */}
      {dialogOpen && (
        <ProfileDialog
          user={user}
          onClose={() => setDialogOpen(false)} // يغلق نافذة الديالوج
          onLogout={handleLogout} // تمرير دالة تسجيل الخروج
        />
      )}
    </div>
  );
  
};

export default Navbar;
