import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import { useState , useEffect } from 'react';
import { usePostProduct } from '@/app/hooks/usePostProduct';
import { v4 as uuidv4 } from 'uuid';

const DialogProduct = ({ show, onClose }) => { // استلام show و onClose
  const pathname = usePathname();
  const lastSegment = decodeURIComponent(pathname.split('/').filter(Boolean).pop());

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [productId, setProductId] = useState('');
  const { uploadOrder, progress, isUploading, error, isCompleted } = usePostProduct();
  const [uploadCompleted, setUploadCompleted] = useState(false);

  useEffect(() => {
  if (show) {
    setProductId(uuidv4()); // إنشاء معرف فريد
  }
}, [show]);

  const handleUpload = () => {
    if (!productImage) {
      alert('يرجى اختيار صورة للمنتج');
      return;
    }

    const orderData = {
      id: productId, // إضافة معرف المنتج
      name: productName,
      price: productPrice,
      description: productDescription,
      documentId: lastSegment,
    };

    uploadOrder(productImage, orderData);
  };
  useEffect(() => {
    if (isCompleted && !uploadCompleted) {
      setUploadCompleted(true);
      setProductId(uuidv4());
      setProductName('');
      setProductPrice('');
      setProductDescription('');
      setProductImage(null);
      
      onClose(); 
    }
  }, [isCompleted, uploadCompleted, onClose]);
 
  return (
    <StyledWrapper>
      
      {show && (
        <div className="con-dialog">
          <button className="button-close" onClick={onClose}>
            <span className="X" />
            <span className="Y" />
            <div className="close">Close</div>
          </button>

          {/* بقية مكونات الـ Dialog */}
          <div className="form__group field">
            <input
              type="text"
              className="form__field"
              placeholder="اسم المنتج"
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <label htmlFor="name" className="form__label">اسم المنتج</label>
          </div>

          <div className="form__group field">
            <input
              type="text"
              className="form__field"
              placeholder="سعر المنتج"
              required
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
            <label htmlFor="name" className="form__label">سعر المنتج</label>
          </div>

          <div className="form-group">
            <label htmlFor="textarea">اكتب مكونات المنتج</label>
            <textarea
              required
              cols={50}
              rows={10}
              id="textarea"
              name="textarea"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </div>

          <label className="custum-file-upload" htmlFor="file">
            <div className="icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                fill="currentColor"
              ></path>
            </svg>
            </div>
            <div className="text">
              <span>انقر لاختيار صورة</span>
            </div>
            <input
              type="file"
              id="file"
              onChange={(e) => setProductImage(e.target.files[0])}
            />
          </label>

          <button className="button" onClick={handleUpload} disabled={isUploading}>
            <svg xmlns="http://www.w3.org/2000/svg">
              <rect className="border" pathLength={100} />
              <rect className="loading" pathLength={100} style={{ strokeDashoffset: 100 - progress }} />
              <svg className="done-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path className="done done-cloud" pathLength={100} d="M 6.5,20 Q 4.22,20 2.61,18.43 ..." />
                <path className="done done-check" pathLength={100} d="M 7.515,12.74 10.34143,15.563569 ..." />
              </svg>
            </svg>
            <div className="txt-upload">{isUploading ? `جاري الرفع..${progress}.` : 'نشر'}</div>
          </button>

          {isCompleted && <p>تم رفع المنتج بنجاح!</p>}
          {error && <p>حدث خطأ أثناء الرفع: {error.message}</p>}
        </div>
      )}
    </StyledWrapper>
  );
};





const StyledWrapper = styled.div`
.button-close {
    position: absolute;
    top: 20px;
    right: 35px;
    width: 20px;
    height: 20px;
    border: none;
    background: rgba(180, 83, 107, 0.11);
    border-radius: 5px;
    transition: background 0.5s;
    z-index: 6;
  }

  .X {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 15px;
    height: 1.5px;
    background-color: rgb(255, 255, 255);
    transform: translateX(-50%) rotate(45deg);
  }

  .Y {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 15px;
    height: 1.5px;
    background-color: #fff;
    transform: translateX(-50%) rotate(-45deg);
  }

  .close {
    position: absolute;
    display: flex;
    padding: 0.8rem 1.5rem;
    align-items: center;
    justify-content: center;
    transform: translateX(-50%);
    top: -50px;
    left: 50%;
    width: 3em;
    height: 1.7em;
    font-size: 12px;
    background-color: rgb(19, 22, 24);
    color: rgb(187, 229, 236);
    border: none;
    border-radius: 3px;
    pointer-events: none;
    opacity: 0;
  }

  .button-close:hover {
    background-color: rgb(211, 21, 21);
  }

  .button-close:active {
    background-color: rgb(130, 0, 0);
  }

  .button-close:hover > .close {
    animation: close 0.2s forwards 0.25s;
  }

  @keyframes close {
    100% {
      opacity: 1;
    }
  }
  .form__group {
    position: relative;
    padding: 20px 0 0;
    width: 90%;
    
  }

  .form__field {
    font-family: inherit;
    width: 100%;
    border: none;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 1rem;
    color: #fff;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
  }

  .form__field::placeholder {
    color: transparent;
  }

  .form__field:placeholder-shown ~ .form__label {
    font-size: 1rem;
    cursor: text;
    top: 20px;
  }

  .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: #9b9b9b;
    pointer-events: none;
    
  }

  .form__field:focus {
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, #C55469, #cb7988);
    border-image-slice: 1;
  }

  .form__field:focus ~ .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: #C55469;
    font-weight: 700;
  }

  /* reset input */
  .form__field:required, .form__field:invalid {
    box-shadow: none;
  }
  
  
  .custum-file-upload {
    height: 140px;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    gap: 20px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border: 2px dashed #cacaca;
    background-color: rgba(255, 255, 255, 0);
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0px 48px 35px -48px rgba(0,0,0,0.1);
  }

  .custum-file-upload .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custum-file-upload .icon svg {
    height: 60px;
    fill: var(--clr);
  }

  .custum-file-upload .text {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custum-file-upload .text span {
    font-weight: 400;
    color: var(--clr);
  }

  .custum-file-upload input {
    display: none;
  }
  .con-dialog{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 15px;
    position: absolute;
    z-index: 3;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    padding: 20px;
    border-radius: 30px;
    backdrop-filter: blur(20px);
    border-top:solid 5px #C55469;
    border-right:solid 1px #C55469;
    border-left:solid 1px #C55469;
    border-bottom:solid 5px #C55469;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 90%;
  }
  .form-group label {
    display: block;
    margin-bottom: 5px;
    color: #9b9b9b;
    font-weight: 600;
    font-size: 1rem;
  }
  .form-group textarea {
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    resize: none;
    color: #fff;
    height: 96px;
    border: 2px solid #9b9b9b;
    background-color: transparent;
    font-family: inherit;
  }
  .form-group textarea:focus {
    outline: none;
    border-color: #C55469;
  }
  .button {
    position: relative;
    width: fit-content;
    height: 40px;
    cursor: pointer;
    border: none;
    background: none;
  }

  .button svg {
    width: 100%;
    height: 35px;
    overflow: visible;
  }

  .border {
    width: 100%;
    height: 100%;
    stroke: #9b9b9b;
    stroke-width: 2px;
    fill: #0000;
    rx: 1em;
    ry: 1em;
    stroke-dasharray: 25;
    transition: fill 0.25s;
    animation: 4s linear infinite stroke-animation;
  }

  .button:hover .border {
    fill: #0001;
  }

  .button:focus .border {
    transition: fill 0.25s 7.75s;
    fill: #0000;
  }

  @keyframes stroke-animation {
    0% {
      stroke-dashoffset: 100;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  .txt-upload {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .txt-upload::after {
    content: "";
  }

  .button:focus .rect {
    stroke-dasharray: 50;
  }
  .button:focus .border {
    stroke: #0000;
  }

  .button:focus .txt-upload {
    opacity: 0;
    transition: opacity 0.25s 8s;
  }

  .button:focus .txt-upload::after {
    animation: 0.66666s anim step-end forwards,
      1.33333s 0.6666s anim2 linear infinite alternate;
  }

  @keyframes anim {
    0% {
      content: "";
    }
    50% {
      content: "";
    }
    to {
      content: "";
    }
  }

  @keyframes anim2 {
    0% {
      content: "";
    }
    33% {
      content: "";
    }
    66% {
      content: "";
    }
    to {
      content: "";
    }
  }

  .loading {
    width: 100%;
    height: 100%;
    stroke: #C55469;
    stroke-width: 2px;
    fill: none;
    rx: 1em;
    ry: 1em;
    stroke-dasharray: 0 100;
  }

  .button:focus .loading {
    transition: stroke 0.5s 7.5s, stroke-dasharray 8s 0.5s ease-out;
    stroke: #21ce3e;
    stroke-dasharray: 100 0;
  }

  .done {
    fill: none;
    stroke: #C55469;
    stroke-dasharray: 0 100;
  }

  .button:focus .done-cloud {
    transition: stroke-dasharray 0.75s 8.5s ease-out;
    stroke-dasharray: 100 0;
  }

  .button:focus .done-check {
    transition: stroke-dasharray 0.5s 9.2s ease-out;
    stroke: #21ce3e;
    stroke-dasharray: 100 0;
  }
  `;

export default DialogProduct;
