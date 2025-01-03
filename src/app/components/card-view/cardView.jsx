"use client";
import { useRef, useState } from "react"; // استيراد useRef و useState
import Tooltip from "../add-to-cart/addToCart";
import "./cardView.css";

const CardView = ({ id, product, price, image, ingredients }) => {
  const productImageRef = useRef(null); // مرجع لصورة المنتج
  const [flipped, setFlipped] = useState(false); // حالة لمعرفة ما إذا كان الكرت مقلوبًا

  // استخدم الصورة الافتراضية إذا لم يكن هناك صورة متاحة
  let displayImage = image || "plate.webp";

  return (
    <div className={`card-view ${flipped ? "flipped" : ""}`}>
      <div className="card-inner">
        <div className="card-front">
          <img
            src={displayImage}
            alt="img"
            className="card-img"
            ref={productImageRef} // إضافة المرجع
          />
          <ul>
            <li className="pr">
              <span>السعر</span>
              <span>{`${price}LE`}</span>
            </li>
            <li>
              <span>{product}</span>
            </li>
            <li>
              <Tooltip
                price={price}
                product={product}
                image={displayImage}
                id={id}
                imageRef={productImageRef} // تمرير المرجع للمكون
              />
            </li>
          </ul>
          <button className="flip-btn" onClick={() => setFlipped(true)}>
            المكونات
          </button>
        </div>
        <div className="card-back">
          <p>المكونات</p>
          <span className="ingredients">{ingredients}</span>
          <button className="flip-btn" onClick={() => setFlipped(false)}>
            عودة
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardView;
