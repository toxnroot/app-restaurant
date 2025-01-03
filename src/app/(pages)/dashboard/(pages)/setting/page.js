// Page.js
"use client";
import { useState } from "react";
import SvgView from "../../components/svg-view/svgView";
import Tooltip from "../../components/tooltip/tooltip";
import "./setting.css";
import AddLinks from "../../components/add-links/addLinks";

const Page = () => {
    const [img, setImg] = useState('');

    const handelChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImg(reader.result);
            };
        }
    };

    return (
        <div className="setting">
            
                <Tooltip nameTooltip='اضافة صورة'>
                    <div className="add-logo-con">
                    <label htmlFor="add-logo">
                        {img 
                            ? <img src={img} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> 
                            : <SvgView svgname='add-logo' />
                        }
                    </label>
                    <input 
                        onChange={handelChange} 
                        id="add-logo" 
                        type="file" 
                        accept="image/*" 
                    />
                    </div>
                </Tooltip>
                <AddLinks/>
            
        </div>
    );
}

export default Page;
