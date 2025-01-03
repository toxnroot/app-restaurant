import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore'; // استيراد onSnapshot
import { db } from '../api/firebase.config';

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'orders'),
      (ordersSnapshot) => {
        // عند استلام البيانات
        const ordersList = ordersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersList);
        setLoading(false);
      },
      (err) => {
        // التعامل مع الخطأ
        setError(err.message);
        setLoading(false);
      }
    );

    // تنظيف المستمع عند مغادرة المكون
    return () => unsubscribe();
  }, []); // يمكن ترك المصفوفة فارغة لمتابعة التحديثات بشكل دائم

  return { orders, loading, error };
};

export default useOrders;
