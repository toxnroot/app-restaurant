import ButtonGo from '../button-go/buttonGo';
import './carddash.css'
const Carddash = ({children,nameBtn,url}) => {
    return (
        <div className="card-dash" style={{
            backdropFilter: "blur(10px)",
            padding: '8px',
            overflow: 'hidden',
            borderRadius: '10px'
        }}>
            <span>{children}</span>
            <ButtonGo nameBtn={nameBtn} url={url}/>
        </div>
    );
}

export default Carddash;
