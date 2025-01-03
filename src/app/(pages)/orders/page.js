// pages/OrdersPage.js
"use client";
import { useEffect } from "react";
import useOrders from "../../hooks/useOrderId  "; // استيراد هوك useOrders
import useAuth from "../../hooks/useAuth"; // استيراد useAuth للتأكد من أن المستخدم مسجل دخوله

const OrdersPage = () => {
  const { user, loading: authLoading } = useAuth(); // استخدام useAuth للحصول على المستخدم
  const { orders, loading, error } = useOrders(); // استخدام useOrders لاسترجاع الطلبات

  if (authLoading) {
    return <div>Loading user...</div>; // عرض حالة تحميل المستخدم
  }

  if (!user) {
    return <div>Please log in to see your orders.</div>; // إذا لم يكن هناك مستخدم
  }

  if (loading) {
    return <div>Loading orders...</div>; // عرض حالة تحميل الطلبات
  }

  if (error) {
    return <div>{error}</div>; // عرض الخطأ إذا حدث
  }

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <h3>Order ID: {order.id}</h3>
              <p>Name: {order.name}</p>
              <p>Phone: {order.phone}</p>
              <p>Address: {order.address}</p>
              <p>Status: {order.status}</p>
              <p>Created At: {new Date(order.createdAt.seconds * 1000).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage;
