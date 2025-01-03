import { useState } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db, storage } from '@/app/api/firebase.config'; // تأكد من إضافة `storage` لتكوين التخزين
import { deleteObject, ref } from 'firebase/storage';

const useDeleteProduct = (ordersDocumentId) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteProduct = async (productId) => {
        setLoading(true);
        setError(null);
        try {
            // الوصول إلى المستند
            const docRef = doc(db, 'orders', ordersDocumentId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                const products = Array.isArray(data.products) ? data.products : []; // التأكد من أن `products` هي مصفوفة

                // التحقق من وجود المنتج في المصفوفة باستخدام `find`
                const productToRemove = products.find((product) => product.id === productId);
                if (!productToRemove) {
                    throw new Error("المنتج غير موجود في المصفوفة.");
                }

                // حذف الصورة من التخزين إذا كانت `imageUrl` موجودة
                if (productToRemove.imageUrl) {
                    const imageRef = ref(storage, productToRemove.imageUrl);
                    await deleteObject(imageRef);
                    console.log("تم حذف الصورة بنجاح.");
                }

                // إنشاء مصفوفة جديدة بدون المنتج المراد حذفه
                const updatedProducts = products.filter((product) => product.id !== productId);

                // تحديث الحقل `products` بالمصفوفة الجديدة
                await updateDoc(docRef, {
                    products: updatedProducts
                });
            } else {
                throw new Error("المستند غير موجود في قاعدة البيانات.");
            }
        } catch (error) {
            console.error("خطأ أثناء حذف المنتج:", error);
            setError(error.message || "حدث خطأ أثناء الحذف.");
        } finally {
            setLoading(false);
        }
    };

    return { deleteProduct, loading, error };
};

export default useDeleteProduct;
