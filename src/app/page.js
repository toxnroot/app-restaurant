"use client";
import AutoBanner from "./components/auto-banner/autoBanner";
import Card from "./components/card/card";
import ScrollToTopButton from "./components/scrollto-top/scrollToTop";
import { motion } from "framer-motion"; // استيراد motion

const Page = () => {
  return (
    <>
      <div className="container w-[80%] m-auto">
        <AutoBanner />
      </div>
      <motion.div
        className="home container w-[80%] m-auto"
        initial={{ opacity: 0 }} // بدأ الأنيميشن من الشفافية 0
        animate={{ opacity: 1 }} // الأنيميشن للوصول إلى الشفافية 1
        transition={{ duration: 2 }} // مدة الأنيميشن
      >
        <Card title="الكريبات" />
        <Card title="الشاورما" />
        <Card title="الكريبات" />
        <Card title="الشاورما" />
        <Card title="الكريبات" />
        <Card title="الشاورما" />
        <Card title="الكريبات" />
        <Card title="الشاورما" />
      </motion.div>
      <ScrollToTopButton />
    </>
  );
};

export default Page;
