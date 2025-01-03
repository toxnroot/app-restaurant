// hooks/useOrders.js
import { useState, useEffect } from "react";
import { db, collection, query, where, getDocs } from "@/app/api/firebase.config"; // استيراد Firebase
import useAuth from "./useAuth"; // استيراد useAuth

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // الحصول على بيانات المستخدم من useAuth

  const userId = user ? user.uid : null; // تعيين userId إذا كان موجودًا

  useEffect(() => {
    if (!userId) return; // لا نحاول تحميل الطلبات إذا لم يكن لدينا userId

    const fetchOrders = async () => {
      setLoading(true);
      try {
        // استعلام للحصول على الطلبات بناءً على userId
        const ordersQuery = query(collection(db, "orders"), where("userId", "==", userId));
        const querySnapshot = await getDocs(ordersQuery);
        const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
      } catch (err) {
        setError("Error fetching orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]); // إعادة التحميل عند تغيير userId

  return { orders, loading, error };
};

export default useOrders;
