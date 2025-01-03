"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardCart from "../card-cart/cardCart";
import { setCart } from "@/app/cartSlice";
import "./cartview.css";
import ButtonOrderNow from "../button-order-now/buttonOrderNow";
import styled from "styled-components";
import { motion } from "framer-motion"; // استيراد motion

const CartView = ({ view, onClose }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [animate, setAnimate] = useState(false); // متغير لتفعيل الأنيميشن

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    dispatch(setCart(cart));
  }, [dispatch, view]);

  const handleDelete = (updatedCart) => {
    dispatch(setCart(updatedCart));
  };

  const handleAddToCart = () => {
    setAnimate(true); // تفعيل الأنيميشن عند إضافة المنتج إلى السلة
    setTimeout(() => {
      setAnimate(false); // إعادة تعيين الأنيميشن بعد 1 ثانية
    }, 1000);
  };

  return (
    <>
      {view && (
        <div className="cart-view">
          <StyledWrapper>
            <button className="buttonn" onClick={onClose}>
              <span className="Xx" />
              <span className="Yy" />
              <div className="closee">إغلاق</div>
            </button>
          </StyledWrapper>
          <h2 className="cart-title">سلة الطعام</h2>
          {cartItems.length > 0 ? (
            <div className="cart-items">
              <ButtonOrderNow click={onClose} />
              <p className="total-price text-black m-auto">
                المجموع الكلي{" "}
                {cartItems.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
              </p>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <CardCart
                    id={item.id}
                    image={item.image}
                    product={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    onDelete={handleDelete}
                    onClick={handleAddToCart} // إضافة الـ onClick هنا
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="empty-cart">السلة فارغة</p>
          )}
        </div>
      )}
    </>
  );
};

const StyledWrapper = styled.div`
  .buttonn {
    position: fixed;
    width: 1rem;
    height: 1rem;
    border: none;
    background: rgba(180, 83, 107, 0.488);
    border-radius: 5px;
    transition: background 0.5s;
    right: 180px;
    top: 140px;
  }

  .Xx {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0.7rem;
    height: 1.5px;
    background-color: rgb(255, 255, 255);
    transform: translateX(-50%) rotate(45deg);
  }

  .Yy {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0.7rem;
    height: 1.5px;
    background-color: #fff;
    transform: translateX(-50%) rotate(-45deg);
  }

  .closee {
    position: absolute;
    display: flex;
    padding: 0.8rem 1.5rem;
    align-items: center;
    justify-content: center;
    transform: translateX(-50%);
    top: -30px;
    left: 50%;
    width: 3em;
    height: 1.7em;
    font-size: 12px;
    background-color: rgb(19, 22, 24);
    color: rgb(187, 229, 236);
    border: none;
    border-radius: 3px;
    pointer-events: none;
    opacity: 0;
  }

  .buttonn:hover {
    background-color: rgb(211, 21, 21);
  }

  .buttonn:active {
    background-color: rgb(130, 0, 0);
  }

  .buttonn:hover > .closee {
    animation: close 0.2s forwards 0.25s;
  }

  @keyframes close {
    100% {
      opacity: 1;
    }
  }
`;

export default CartView;
