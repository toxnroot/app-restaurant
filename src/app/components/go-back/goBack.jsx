import Link from "next/link";

const GoBack = () => {
  return (
    <Link href="/">
        <button className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group" type="button">
        <div className="bg-[--praimary] rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="25px" width="25px">
            <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#ffffff" />
            <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" fill="#ffffff" />
            </svg>
        </div>
        <p className="translate-x-2">رجوع للخلف</p>
        </button>
    </Link>
  );
}

export default GoBack;
