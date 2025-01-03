"use client";
import { useState } from "react";
import DialogProduct from "../dialog-product/dialogProduct"; // استيراد مكون DialogProduct
import './buttonProduct.css';

const ButtonProduct = ({ nameBtn = "اسم الزر الافتراضي" }) => {
    const [show, setShow] = useState(false); // حالة لإظهار/إخفاء الـ Dialog

    const handelClick = () => {
        setShow((prev) => !prev); // تغيير الحالة عند النقر
    };

    return (
        <>
            <button 
                onClick={handelClick} 
                className="btn-pro rounded-lg relative w-3 h-10 cursor-pointer flex items-center overflow-hidden border border-green-500 bg-green-500 group hover:overflow-hidden hover:bg-green-500 active:bg-green-500 active:border-green-500"
            >
                <span className="text-gray-200 font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300 overflow-hidden">
                    {nameBtn}
                </span>
                <span className="absolute right-0 h-full w-10 rounded-lg bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300 overflow-hidden hover:overflow-hidden">
                    <svg className="svg w-8 text-white" fill="none" height={24} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg">
                        <line x1={12} x2={12} y1={5} y2={19} />
                        <line x1={5} x2={19} y1={12} y2={12} />
                    </svg>
                </span>
            </button>

            {/* تمرير حالة `show` إلى `DialogProduct` لعرضه بناءً على قيمتها */}
            <DialogProduct show={show} onClose={() => setShow(false)} /> 
        </>
    );
};

export default ButtonProduct;
