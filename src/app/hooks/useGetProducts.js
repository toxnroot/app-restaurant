import { useState, useEffect } from 'react';
import { db } from "@/app/api/firebase.config";
import { doc, onSnapshot } from "firebase/firestore";

const useGetOrderData = (part) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const docRef = doc(db, "orders", part);

        // استمع للتغييرات على المستند باستخدام onSnapshot
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const fetchedData = docSnap.data();
                setData(fetchedData.products || []);
                setError(null); // إعادة ضبط الخطأ في حال نجاح الجلب
            } else {
                setData([]);
                setError("البيانات غير موجودة");
            }
            setLoading(false);
        }, (err) => {
            setError("حدث خطأ أثناء جلب البيانات");
            setLoading(false);
        });

        // تنظيف الاستماع عند تغيير الجزء أو إزالة المكون
        return () => unsubscribe();
    }, [part]);

    return { data, loading, error };
};

export default useGetOrderData;
