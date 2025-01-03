"use client";
import "./cardCart.css";
import { useDispatch } from 'react-redux';
import { setCart } from '@/app/cartSlice';

const CardCart = ({ id, image, product, price, quantity, onDelete }) => {
    const dispatch = useDispatch();

    const deleteItem = () => {
        // حذف العنصر من السلة
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = cart.filter((item) => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        dispatch(setCart(updatedCart)); // تحديث الـ Redux
        if (onDelete) onDelete(updatedCart);
    };

    const increaseQuantity = () => {
        // زيادة الكمية
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const item = cart.find(item => item.id === id);
        item.quantity += 1; // زيادة الكمية
        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch(setCart(cart)); // تحديث الـ Redux
        if (onDelete) onDelete(cart); // لتحديث السلة في CartView
    };

    const decreaseQuantity = () => {
        // تقليل الكمية
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const item = cart.find(item => item.id === id);
        if (item.quantity > 1) {
            item.quantity -= 1; // تقليل الكمية
        } else {
            deleteItem(); // إذا كانت الكمية 1، احذف العنصر
            return; // منع التحديث بعد الحذف
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch(setCart(cart)); // تحديث الـ Redux
        if (onDelete) onDelete(cart); // لتحديث السلة في CartView
    };

    return (
        <div className="con-card-cart">
            <img src={image} alt={product} className="img-card-cart" />
            <div className="info-card-cart">
                <p className="name-card-cart">{product}</p>
                <span className="price-card-cart">{price} LE</span>
            </div>
            <div className="quantity-controls">
                <button className="minus" onClick={decreaseQuantity}>-</button>
                <span className="counter">{quantity}</span> {/* عرض الكمية */}
                <button className="plus" onClick={increaseQuantity}>+</button>
            </div>
            <span className="delete" onClick={deleteItem}>&#10006;</span>
        </div>
    );
};

export default CardCart;
