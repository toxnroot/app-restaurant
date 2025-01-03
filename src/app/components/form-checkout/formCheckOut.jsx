import { useState, useEffect } from "react";
import styled from "styled-components";
import { useAddOrder } from '@/app/hooks/useAddOrder'; // hook لإضافة الطلب
import useAuth from '@/app/hooks/useAuth'; // hook خاص بتسجيل الدخول
import { useRouter } from 'next/navigation'; // استخدام useRouter

const FormCheckOut = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [check, setCheck] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { user, loading, error: authError } = useAuth();
  const { addOrderToFirestore, isSubmitting, error } = useAddOrder();
  const router = useRouter();

  // جلب بيانات المستخدم المخزنة عند تحميل الصفحة
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setName(userData.name || "");
      setPhone(userData.phone || "");
      setAddress(userData.address || "");
      setCheck(true);
    }
  }, []);

  const handleCheckboxChange = () => {
    if (check) {
      localStorage.removeItem("user");
      setCheck(false);
    } else {
      const userData = { name, phone, address };
      localStorage.setItem("user", JSON.stringify(userData));
      setCheck(true);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
  
    // التحقق من الحقول المطلوبة
    if (!name || !phone || !address) {
      setErrorMessage("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }
  
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      setErrorMessage("السلة فارغة، يرجى إضافة منتجات.");
      return;
    }
  
    const orderData = {
      name,
      phone,
      address,
      note,
      cart,
      user,
    };
  
    console.log("بيانات الطلب المرسلة:", orderData); // تحقق من القيم هنا قبل الإرسال
  
    try {
      const orderId = await addOrderToFirestore(name, phone, address, note, cart, user);
      if (orderId) {
        alert('تم إرسال الطلب بنجاح!');
        localStorage.removeItem("cart");
        router.push('/thank-you');
      }
    } catch (err) {
      console.error("Error adding order:", err);
      setErrorMessage("حدث خطأ عند إرسال الطلب. يرجى المحاولة لاحقًا.");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setErrorMessage(null);

  //   // التحقق من الحقول المطلوبة
  //   if (!name || !phone || !address) {
  //     setErrorMessage("يرجى تعبئة جميع الحقول المطلوبة");
  //     return;
  //   }

  //   try {
  //     const cart = JSON.parse(localStorage.getItem("cart")) || [];
  //     if (cart.length === 0) {
  //       setErrorMessage("السلة فارغة، يرجى إضافة منتجات.");
  //       return;
  //     }

  //     const orderData = {
  //       uid: user?.uid || "ضيف",
  //       name,
  //       phone,
  //       address,
  //       note,
  //       cart,
  //       createdAt: new Date().toISOString(),
  //     };

  //     console.log("Sending order data:", orderData); // للتأكد من البيانات قبل الإرسال

  //     const orderId = await addOrderToFirestore(orderData);
  //     if (orderId) {
  //       alert('تم إرسال الطلب بنجاح!');
  //       localStorage.removeItem("cart");
  //       setName("");
  //       setPhone("");
  //       setAddress("");
  //       setNote("");
  //       setCheck(false);
  //       router.push('/thank-you');
  //     }
  //   } catch (err) {
  //     console.error("Error adding order:", err);
  //     setErrorMessage("حدث خطأ عند إرسال الطلب. يرجى المحاولة لاحقًا.");
  //   }
  // };

  if (loading) return <div>جاري التحقق من حالة المستخدم...</div>;

  return (
    <StyledWrapper>
      <div className="container">
        <div className="heading">تـأكيد الطلب</div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              type="text"
            />
            <label>الأسم الكامل</label>
          </div>
          <div className="input-field">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              type="number"
            />
            <label>رقم الهاتف</label>
          </div>
          <div className="input-field">
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              type="text"
            />
            <label>العنوان</label>
          </div>
          <div className="form-group">
            <label htmlFor="textarea">ملاحظة على الطلب</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              cols={50}
              rows={10}
            />
          </div>
          <button className="button5" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "جاري إرسال الطلب..." : "إرسال الطلب"}
          </button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {error && <p style={{ color: 'red' }}>حدث خطأ عند إرسال الطلب: {error.message}</p>}
          {authError && <p style={{ color: 'red' }}>خطأ في تسجيل الدخول: {authError}</p>}

          <div className="container checkbox">
            <input
              checked={check}
              onChange={handleCheckboxChange}
              style={{ opacity: 0, position: 'absolute', pointerEvents: 'none' }}
              id="mute"
              type="checkbox"
            />
            <label className="check" htmlFor="mute">
              <svg viewBox="0 0 18 18" height="25px" width="25px">
                <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z" />
                <polyline points="1 9 7 14 15 4" />
              </svg>
            </label>
            <span>حفظ البيانات</span>
          </div>
        </form>
      </div>
    </StyledWrapper>
  );
};


const StyledWrapper = styled.div`
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
    text-align: right;
  }
  .form-group label {
    display: block;
    margin-bottom: 5px;
    color: #717171;
    font-weight: 600;
    font-size: 12px;
  }
  .form-group textarea {
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    resize: none;
    color: #202020;
    height: 96px;
    border: 1px solid #414141;
    background-color: transparent;
    font-family: inherit;
    text-align: right;
  }
  .form-group textarea:focus {
    outline: 1px solid var(--praimary);
  }
  .container {
    border: solid 1px #8d8d8d;
    padding: 20px;
    border-radius: 20px;
    background-color: #fff;
  }

  .container .heading {
    font-size: 1.3rem;
    margin-bottom: 20px;
    font-weight: bolder;
    color: var(--praimary);
    text-align: right;
  }

  .form {
    max-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .input-field {
    position: relative;
    color: #111111;
    text-align: right;
  }

  .input-field label {
    position: absolute;
    color: #434343;
    pointer-events: none;
    background-color: transparent;
    right: 10px;
    transform: translateY(0.6rem);
    transition: all 0.3s ease;
    text-align: right;
  }

  .input-field input {
    padding: 10px 15px;
    font-size: 1rem;
    border-radius: 8px;
    border: solid 1px #434343;
    letter-spacing: 1px;
    width: 100%;
    text-align: right;
  }

  .input-field input:focus,
  .input-field input:valid {
    outline: none;
    border: solid 1px var(--praimary);
  }

  .input-field input:focus ~ label,
  .input-field input:valid ~ label {
    transform: translateY(-51%) translateX(-10px) scale(0.8);
    background-color: #fff;
    padding: 0px 5px;
    color: var(--praimary);
    font-weight: bold;
    letter-spacing: 1px;
    border: none;
    border-radius: 100px;
  }

  .form .passicon {
    cursor: pointer;
    font-size: 1.3rem;
    position: absolute;
    top: 6px;
    right: 8px;
  }

  .form .close {
    display: none;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  .button5 {
    position: relative;
    padding: 10px 22px;
    border-radius: 6px;
    border: none;
    color: #fff;
    cursor: pointer;
    background-color: var(--praimary);
    transition: all 0.2s ease;
  }
  .button5:hover {
    background-color: #fff;
    color: var(--praimary);
    border: solid 1px var(--praimary);
  }

  .button5:active {
    transform: scale(0.96);
  }

  .button5:before,
  .button5:after {
    position: absolute;
    content: "";
    width: 150%;
    left: 50%;
    height: 100%;
    transform: translateX(-50%);
    z-index: -1000;
    background-repeat: no-repeat;
  }

  .button5:hover:before {
    top: -70%;
    background-image: radial-gradient(
        circle,
        var(--praimary) 20%,
        transparent 20%
      ),
      radial-gradient(
        circle,
        transparent 20%,
        var(--praimary) 20%,
        transparent 30%
      ),
      radial-gradient(circle, var(--praimary) 20%, transparent 20%),
      radial-gradient(circle, var(--praimary) 20%, transparent 20%),
      radial-gradient(
        circle,
        transparent 10%,
        var(--praimary) 15%,
        transparent 20%
      ),
      radial-gradient(circle, var(--praimary) 20%, transparent 20%),
      radial-gradient(circle, var(--praimary) 20%, transparent 20%),
      radial-gradient(circle, var(--praimary) 20%, transparent 20%),
      radial-gradient(circle, var(--praimary) 20%, transparent 20%);
    background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%,
      15% 15%, 10% 10%, 18% 18%;
    background-position: 50% 120%;
    animation: greentopBubbles 0.6s ease;
  }

  @keyframes greentopBubbles {
    0% {
      background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%,
        40% 90%, 55% 90%, 70% 90%;
    }

    50% {
      background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%,
        50% 50%, 65% 20%, 90% 30%;
    }

    100% {
      background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%,
        50% 40%, 65% 10%, 90% 20%;
      background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
    }
  }

  .button5:hover::after {
    bottom: -70%;
    background-image: radial-gradient(
        circle,
        var(--praimary) 20%,
        transparent 20%
      ),
      radial-gradient(circle, var(--praimary) 20%, transparent 20%),
      radial-gradient(
        circle,
        transparent 10%,
        var(--praimary) 15%,
        transparent 20%
      ),
      radial-gradient(circle, var(--praimary) 20%, transparent 20%),
      radial-gradient(circle, var(--praimary) 20%, transparent 20%),
      radial-gradient(circle, var(--praimary) 20%, transparent 20%),
      radial-gradient(circle, var(--praimary) 20%, transparent 20%);
    background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 20% 20%,
      18% 18%;
    background-position: 50% 0%;
    animation: greenbottomBubbles 0.6s ease;
  }

  @keyframes greenbottomBubbles {
    0% {
      background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%,
        70% -10%, 70% 0%;
    }

    50% {
      background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%,
        105% 0%;
    }

    100% {
      background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%,
        110% 10%;
      background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
    }
  }

  .check {
    cursor: pointer;
    position: relative;
    margin: auto;
    width: 18px;
    height: 18px;
    -webkit-tap-highlight-color: transparent;
    transform: translate3d(0, 0, 0);
  }

  .check:before {
    content: "";
    position: absolute;
    top: -15px;
    left: -15px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgb(33 33 33 / 0%);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .check svg {
    position: relative;
    z-index: 1;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: #c8ccd4;
    stroke-width: 1.5;
    transform: translate3d(0, 0, 0);
    transition: all 0.2s ease;
  }

  .check svg path {
    stroke-dasharray: 60;
    stroke-dashoffset: 0;
  }

  .check svg polyline {
    stroke-dasharray: 22;
    stroke-dashoffset: 66;
  }

  .check:hover:before {
    opacity: 1;
  }

  .check:hover svg {
    stroke: var(--praimary);
  }

  #mute:checked + .check svg {
    stroke: var(--praimary);
  }

  #mute:checked + .check svg path {
    stroke-dashoffset: 60;
    transition: all 0.3s linear;
  }

  #mute:checked + .check svg polyline {
    content: "done";
    stroke-dashoffset: 42;
    transition: all 0.2s linear;
    transition-delay: 0.15s;
    border-color: transparent;
    stroke: #5fa212;
    animation: mute 0.6s ease;
  }

  @keyframes mute {
    from {
      transform: scale(1, 1);
    }

    30% {
      transform: scale(1.25, 0.75);
    }

    40% {
      transform: scale(0.75, 1.25);
    }

    50% {
      transform: scale(1.15, 0.85);
    }

    65% {
      transform: scale(0.95, 1.05);
    }

    75% {
      transform: scale(1.05, 0.95);
    }

    to {
      transform: scale(1, 1);
    }
  }
  .checkbox {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
    span {
      color: var(--praimary);
    }
  }
`;

export default FormCheckOut;
