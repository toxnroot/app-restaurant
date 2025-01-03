import { useState } from 'react';
import { db, storage } from "@/app/api/firebase.config";
import { collection, setDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const useAddOrder = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);

    const addOrder = async ({ name, photo }) => {
        setLoading(true);
        setError(null);
        setProgress(0);

        try {
            if (!photo) {
                throw new Error("يجب اختيار صورة للرفع.");
            }

            const storageRef = ref(storage, `orders/${photo.name}`);
            const uploadTask = uploadBytesResumable(storageRef, photo);

            // استخدام الـ Promise لانتظار انتهاء عملية الرفع
            await new Promise((resolve, reject) => {
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progressValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setProgress(progressValue);
                    },
                    (error) => {
                        console.error("Error uploading file: ", error);
                        setError(`خطأ أثناء رفع الملف: ${error.message}`);
                        setLoading(false);
                        reject(error); // رفض الـ Promise في حالة حدوث خطأ
                    },
                    async () => {
                        try {
                            // التحقق من الـ snapshot.ref بشكل صحيح
                            const photoURL = await getDownloadURL(uploadTask.snapshot.ref);

                            // إضافة البيانات إلى Firestore باستخدام `name` كـ documentId
                            await setDoc(doc(db, "orders", name), {
                                name,
                                photo: { url: photoURL },
                                products: [],
                            });

                            resolve(); // إتمام الـ Promise بنجاح
                        } catch (error) {
                            console.error("Error getting download URL: ", error);
                            reject(error); // رفض الـ Promise في حالة حدوث خطأ
                        }
                    }
                );
            });

            setLoading(false);
            setProgress(0);
            return true; // إرجاع true بعد إتمام العملية بنجاح
        } catch (err) {
            console.error("Error adding document: ", err);
            setError(`خطأ أثناء إضافة الوثيقة: ${err.message}`);
            setLoading(false);
            return false; // إرجاع false في حالة حدوث خطأ
        }
    };

    return { addOrder, loading, error, progress };
};

export default useAddOrder;
