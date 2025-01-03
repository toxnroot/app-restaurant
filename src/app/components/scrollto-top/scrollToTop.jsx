"use client";
import { useState, useEffect } from "react";
import "./scrollToTop.css"
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false); // للتحكم في ظهور الزر
  const [scrollDirection, setScrollDirection] = useState(null); // لتحديد اتجاه التمرير
  let lastScrollTop = 0;

  useEffect(() => {
    // دالة لمعالجة التمرير
    const handleScroll = () => {
      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;

      // التحقق من اتجاه التمرير
      if (currentScroll > lastScrollTop) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      // تحديث آخر موضع للتمرير
      lastScrollTop = currentScroll;

      // عرض الزر إذا كان التمرير أكبر من 300 بكسل
      if (currentScroll > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // إضافة حدث التمرير
    window.addEventListener("scroll", handleScroll);

    // التحقق عند تحميل الصفحة أو عند العودة إليها
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    // تنظيف الحدث عند إلغاء المكون
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // سيعمل فقط مرة واحدة عند التحميل الأول

  // دالة الرجوع للأعلى
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // تمرير سلس
    });
  };

  return (
    <>
      {isVisible && (
        
          <button className="Btn" onClick={scrollToTop}>
            <svg height="1.2em" className="arrow" viewBox="0 0 512 512">
              <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
            </svg>
            <p className="text-1">رجوع للأعلى</p>
          </button>
        
      )}
    </>
  );
}; 

export default ScrollToTopButton;
