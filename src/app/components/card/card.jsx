"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import "./card.css";

const Card = ({ title }) => {
  const router = useRouter();

  const handleNavigation = () => {
    const encodedTitle = encodeURIComponent(title); // ترميز العنوان
    router.push(`/${encodedTitle}`); // التنقل باستخدام النص المشفر
    console.log("Original Title:", title);
    console.log("Encoded Title:", encodedTitle);
  };

  return (
    <button onClick={handleNavigation}>
      <motion.div
        className="card"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 25,
          delay: 0.2,
        }}
      >
        <img src="crepe.jpeg" alt="photo" className="img-card" />
        <p className="title-card">{title}</p>
      </motion.div>
    </button>
  );
};

export default Card;
