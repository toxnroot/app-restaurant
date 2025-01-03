"use client";
import { useState } from 'react';
import useAddOrder from "@/app/hooks/useAddParts";
import './dialogAdd.css';

const DialogAdd = ({ show, onClose }) => {
    const [sectionName, setSectionName] = useState("");
    const [photoFile, setPhotoFile] = useState(null);
    const { addOrder, loading, error, progress } = useAddOrder();

    const handleFileChange = (event) => {
        setPhotoFile(event.target.files[0]);
    };

    const handleAddSection = async () => {
        if (sectionName && photoFile) {
            const photoData = {
                name: sectionName,
                photo: photoFile,
            };

            try {
                // انتظار حتى يتم النشر بنجاح
                await addOrder(photoData);
                setSectionName("");
                setPhotoFile(null);
                onClose();  // إغلاق الـ dialog بعد النشر بنجاح
            } catch (err) {
                alert("حدث خطأ أثناء النشر");
            }
        } else {
            alert("يرجى تعبئة اسم القسم واختيار صورة قبل النشر.");
        }
    };

    if (!show) return null;

    return (
        <div className='dialog-add'>
            <button onClick={onClose} className="buttonC">
                <span className="XX" />
                <span className="YY" />
                <div className="close">Close</div>
            </button>
            <h1>أضافة قسم جديد</h1>
            <div className="flex items-center justify-center w-[60%]">
                <div className="relative w-[100%]">
                    <input
                        style={{direction:'rtl'}}
                        id="sectionName"
                        name="sectionName"
                        type="text"
                        className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-[#C55469] transition-colors focus:outline-none peer bg-inherit w-[100%]"
                        value={sectionName}
                        onChange={(e) => setSectionName(e.target.value)}
                    />
                    <label
                        htmlFor="sectionName"
                        className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-white"
                    >
                        اسم القسم
                    </label>
                </div>
            </div>

            <label className="custum-file-upload" htmlFor="file">
                <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
                </div>
                <div className="text">
                    <span>انقر الاختيار صورة</span>
                </div>
                <input type="file" id="file" onChange={handleFileChange} />
            </label>

            {loading && (
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${progress}%` }}>
                        {Math.round(progress)}%
                    </div>
                </div>
            )}

            <button className="button" onClick={handleAddSection} disabled={loading}>
  <svg xmlns="http://www.w3.org/2000/svg">
    <rect class="border" pathLength="100"></rect>
    <rect class="loading" pathLength="100"></rect>

    <svg
      class="done-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        class="done done-cloud"
        pathLength="100"
        d="M 6.5,20 Q 4.22,20 2.61,18.43 1,16.85 1,14.58 1,12.63 2.17,11.1 3.35,9.57 5.25,9.15 5.88,6.85 7.75,5.43 9.63,4 12,4 14.93,4 16.96,6.04 19,8.07 19,11 q 1.73,0.2 2.86,1.5 1.14,1.28 1.14,3 0,1.88 -1.31,3.19 Q 20.38,20 18.5,20 Z"
      ></path>
      <path
        class="done done-check"
        pathLength="100"
        d="M 7.515,12.74 10.34143,15.563569 15.275,10.625"
      ></path>
    </svg>
  </svg>
  <div class="txt-upload">نشر</div>
</button>

            {error && <p className="error-text">حدث خطأ أثناء النشر: {error}</p>}
        </div>
    );
};

export default DialogAdd;