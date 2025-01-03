"use client"
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();
    
    const getPageTitle = () => {
        if (pathname === "/dashboard") return "لوحة التحكم";
        if (pathname === "/dashboard/edit") return "التعديل";
        if (pathname.includes('/dashboard/edit/')) return "تعديل القسم";
        if (pathname === "/dashboard/orders") return "الطلبات";
        if (pathname === "/dashboard/setting") return "الأعدادات";
        return "غير موجود"; // إذا لم يكن المسار متوافق مع أي من الحالات السابقة
    };

    return (
        <div className="flex justify-center items-center w-[90%] bg-[#96446e91] m-auto p-2 rounded" style={{backdropFilter:'blur(10px)'}}>
            <h1 className="text-white text-2xl">
                {getPageTitle()}
            </h1>
        </div>
    );
}

export default Navbar;
