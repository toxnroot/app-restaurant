"use client";
import { useDispatch } from "react-redux";
import { setCart } from "@/app/cartSlice";

import "./addToCart.css";

const Tooltip = ({ id, product, price, image, imageRef }) => {
  const dispatch = useDispatch();

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newItem = {
        id: id,
        image: image,
        name: product,
        price: price,
        quantity: 1,
      };
      cart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch(setCart(cart));

    // تنفيذ الحركة
    const productImage = imageRef.current; // الحصول على مرجع الصورة
    const cartIcon = document.querySelector(".badge-con"); // الحصول على أيقونة السلة

    if (productImage && cartIcon) {
      const imageRect = productImage.getBoundingClientRect();
      const cartRect = cartIcon.getBoundingClientRect();

      const clone = productImage.cloneNode(true); // إنشاء نسخة من الصورة
      clone.style.position = "fixed";
      clone.style.top = `${imageRect.top}px`;
      clone.style.left = `${imageRect.left}px`;
      clone.style.width = `${imageRect.width}px`;
      clone.style.height = `${imageRect.height}px`;
      clone.style.transition = "all 0.8s ease-in-out";
      clone.style.zIndex = 1000;
      document.body.appendChild(clone);

      setTimeout(() => {
        clone.style.top = `${cartRect.top}px`;
        clone.style.left = `${cartRect.left}px`;
        clone.style.width = "30px";
        clone.style.height = "30px";
        clone.style.opacity = "0.5";
      }, 0);

      setTimeout(() => {
        clone.remove(); // إزالة الصورة بعد انتهاء الحركة
      }, 800);
    }
  };

  return (
    <div className="button" data-tooltip={`السعر ${price}`} onClick={addToCart}>
      <div className="button-wrapper">
        <div className="text">إضافة إلى السلة</div>
        <span className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="currentColor"
            className="bi bi-cart2"
            viewBox="0 0 16 16"
          >
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default Tooltip;
