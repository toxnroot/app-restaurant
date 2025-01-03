import { useState } from "react";
import { db } from "@/app/api/firebase.config"; // تأكد من استيراد db بشكل صحيح
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore"; // تأكد من استيراد getDoc من firestore

const useAddOrder = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const addOrderToFirestore = async (name, phone, address, note, cart, user) => {
    setIsSubmitting(true);
    try {
      const orderData = {
        name: name,
        phone: phone,
        address: address,
        note: note,
        cart: cart,
        status: "pending",
        createdAt: new Date(),
        userId: user ? user.uid : "guest", // إضافة معرف المستخدم أو تحديد "guest"
      };

      // إذا كان المستخدم موجوداً (ليس ضيفاً)، سيتم إضافة الطلب داخل مستند معرف المستخدم
      const userDocRef = doc(db, "orders", user ? user.uid : "guest");  // تحديد مرجع المستند

      // تحقق من وجود المستند أولاً باستخدام getDoc
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        // إذا لم يكن هناك مستند، سيتم إنشاؤه
        await setDoc(userDocRef, { orders: [orderData] });
      } else {
        // إذا كان المستند موجودًا، سيتم إضافة الطلب إلى مصفوفة الطلبات
        await updateDoc(userDocRef, {
          orders: arrayUnion(orderData) // إضافة الطلب الجديد إلى مصفوفة الطلبات
        });
      }

      setIsSubmitting(false);
      return "تم إضافة الطلب بنجاح!";
    } catch (e) {
      console.error("Error adding order:", e);
      setError(e);
      setIsSubmitting(false);
    }
  };

  return { addOrderToFirestore, isSubmitting, error };
};

export { useAddOrder };
