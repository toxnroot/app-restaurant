"use client";
import React, { useState } from "react";
import styled from "styled-components";
import useAuth from "@/app/hooks/useAuth"; // استيراد الهوك


const AuthComponent = () => {
  const { registerWithCredentials, loginWithCredentials, error, loading } = useAuth(); // استخراج الدوال والحالة
  const [isFlipped, setIsFlipped] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // التعامل مع تسجيل الدخول
  const handleLogin = async () => {
    await loginWithCredentials(email, password); // استدعاء هوك تسجيل الدخول
  };

  // التعامل مع إنشاء الحساب (يمكنك إضافة منطق Firebase لإنشاء الحساب)
  const handleSignUp = async () => {
    await registerWithCredentials(email, password);
  };

  return (
    <StyleWrapper $isFlipped={isFlipped}>
      <div className="auth-container">
        <div className="auth-box">
          {/* تسجيل الدخول */}
          <div className="auth-form front">
            <h2>تسجيل الدخول</h2>
            {error && <p className="error-message">{error}</p>} {/* عرض الأخطاء */}
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // تحديث البريد الإلكتروني
            />
            <input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // تحديث كلمة المرور
            />
            <button onClick={handleLogin} disabled={loading}>
              {loading ? "جارٍ التحميل..." : "تسجيل الدخول"}
            </button>
            <button className="flip-button" onClick={() => setIsFlipped(true)}>
              إنشاء حساب جديد
            </button>
          </div>

          {/* إنشاء حساب */}
          <div className="auth-form back">
            <h2>إنشاء حساب</h2>
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              onChange={(e) => setEmail(e.target.value)} // تحديث البريد الإلكتروني
            />
            <input
              type="password"
              placeholder="كلمة المرور"
              onChange={(e) => setPassword(e.target.value)} // تحديث كلمة المرور
            />
            <button onClick={handleSignUp}>
              {loading ? "جارٍ التحميل..." : "إنشاء حساب"}
            </button>
            <button className="flip-button" onClick={() => setIsFlipped(false)}>
              تسجيل الدخول
            </button>
          </div>
        </div>
      </div>
      
    </StyleWrapper>
  );
};

export default AuthComponent;


const StyleWrapper = styled.div`
  .auth-container {
    perspective: 1000px;
    width: 400px;
    height: 500px;
    position: relative;
    margin: 50px auto;
  }

  .auth-box {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.8s ease-in-out;
    transform: ${(props) =>
      props.$isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};
  }

  .auth-form {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }

  .auth-form h2 {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
  }

  .auth-form input {
    width: 80%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    color: #333;
  }

  .auth-form button {
    background-color: #3b82f6;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .auth-form button:hover {
    background-color: #2563eb;
  }

  .auth-form .flip-button {
    background-color: transparent;
    color: #3b82f6;
    margin-top: 10px;
    border: none;
    cursor: pointer;
    text-decoration: underline;
  }

  .auth-form.back {
    transform: rotateY(180deg);
  }
`;
