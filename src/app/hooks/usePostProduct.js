import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'; // يستخدم لإنشاء معرف فريد

// هوك مخصص لتحميل الملفات وحفظ البيانات إلى Firestore
export const usePostProduct = () => {
  const [progress, setProgress] = useState(0); // نسبة تقدم الرفع
  const [isUploading, setIsUploading] = useState(false); // حالة الرفع
  const [error, setError] = useState(null); // أي خطأ يحدث أثناء الرفع
  const [isCompleted, setIsCompleted] = useState(false); // حالة انتهاء الرفع

  const storage = getStorage(); // تهيئة Firebase Storage
  const db = getFirestore(); // تهيئة Firestore

  // دالة لرفع ملف وحفظ البيانات في Firestore
  const uploadOrder = async (file, orderData) => {
    setIsUploading(true);
    setIsCompleted(false);
    setError(null);

    // إنشاء مسار للملف باستخدام UUID فريد
    const fileRef = ref(storage, `products/${uuidv4()}_${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    // مراقبة تقدم الرفع
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress); // تحديث التقدم في حالة التغيير
      },
      (error) => {
        setError(error);
        setIsUploading(false);
      },
      async () => {
        try {
          // الحصول على رابط التنزيل بعد اكتمال الرفع
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // إنشاء معرف الوثيقة ديناميكياً
          const documentId = orderData.documentId || uuidv4(); // استخدام المعرف المحدد أو إنشاء معرف جديد

          // الإشارة إلى الوثيقة
          const orderDocRef = doc(collection(db, 'orders'), documentId);

          // قراءة البيانات الحالية من Firestore
          const docSnap = await getDoc(orderDocRef);
          let existingProducts = [];

          if (docSnap.exists()) {
            // إذا كانت الوثيقة موجودة، احصل على المنتجات الحالية
            existingProducts = docSnap.data().products || [];
          }

          // أضف المنتج الجديد إلى المصفوفة
          const updatedProducts = [
            ...existingProducts,
            {
              ...orderData,
              fileUrl: downloadURL, // رابط الملف
              createdAt: new Date(),
            },
          ];

          // تحديث الوثيقة مع المنتجات الجديدة
          await setDoc(orderDocRef, { products: updatedProducts }, { merge: true });

          setIsCompleted(true);
        } catch (error) {
          setError(error);
        } finally {
          setIsUploading(false);
        }
      }
    );
  };

  return {
    uploadOrder,
    progress,
    isUploading,
    error,
    isCompleted,
  };
};
