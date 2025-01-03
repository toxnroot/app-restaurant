
const CardVist = ({children,value}) => {
    return (
        <div className="card-vist" style={{
            backgroundImage: "url('/blob.svg')", // هنا نحدد الصورة مباشرة
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            padding: '8px',
            overflow: 'hidden',
            borderRadius: '10px'
        }}>
            {children}
            <h1 className='text-[--background] text-center text-[1.5rem] text-title w-[90%]'>{value}</h1>
        </div>
    );
}

export default CardVist;
