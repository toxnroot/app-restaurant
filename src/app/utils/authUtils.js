// دالة لجلب صلاحيات المستخدم من Firestore
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const fetchUserRole = async () => {
  const auth = getAuth();

  return new Promise((resolve, reject) => {
    // التحقق من حالة تسجيل الدخول باستخدام onAuthStateChanged
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const db = getFirestore();
        const userDocRef = doc(db, "users", currentUser.uid);

        try {
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            resolve(userData.role); // إرجاع الصلاحيات
          } else {
            console.log("No user document found!");
            resolve(null); // إرجاع null إذا لم يتم العثور على المستند
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          reject(error); // إرجاع خطأ إذا حدث
        }
      } else {
        console.log("No user is currently signed in.");
        resolve(null); // إرجاع null إذا لم يكن هناك مستخدم مسجل الدخول
      }

      unsubscribe(); // إلغاء الاشتراك بعد انتهاء الاستخدام
    });
  });
};
