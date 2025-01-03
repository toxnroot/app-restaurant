
import Navbar from "./components/navbar/navbar";


export const metadata = {
  title: "Dahsboard",
  description: "Dashboard use for admin",
};
let style = {
  with:"100%",
  minHeight:"100",
  height:"100%",
  position:"relative",
  backgroundImage:"url(/bg.svg)",
  backgroundPosition:"center",
  backgroundRepeat:"no-repeat",
  backgroundSize:"cover",
  
}
export default function DahsboardLayout({ children }) {
  return (
    
    <div style={style}>
        <Navbar/>
        {children}
        </div>

  );
}

