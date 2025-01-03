"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './footer.css';

const Footer = () => {
    const pathname = usePathname();
        
    // إخفاء الـ footer إذا كان المسار `/dashboard`
    if (pathname.includes('/dashboard')) {
        return null;
    }

    return (
        <footer className='mt-4'>
            <div className='list'>
                <span>Facebook</span>
                <span>Phone</span>
                <span>Email</span>
                <span>Location</span>
            </div>
        </footer>
    );
}

export default Footer;
