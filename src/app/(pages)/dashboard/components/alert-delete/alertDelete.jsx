// AlertDelete.js

import styled from 'styled-components';

const AlertDelete = ({ onClose, onConfirm }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card-content">
          <p className="card-heading">حذف المنتج</p>
          <p className="card-description">هل انت متاكد من حذف المنتج ؟</p>
        </div>
        <div className="card-button-wrapper">
          <button className="card-button secondary" onClick={onClose}>إلغاء</button>
          <button className="card-button primary" onClick={onConfirm}>حذف</button>
        </div>
        <button className="exit-button" onClick={onClose}>
          <svg height="20px" viewBox="0 0 384 512">
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </button>
      </div>
    </StyledWrapper>
  );
};


const StyledWrapper = styled.div`
  .card {
    width: 300px;
    height: fit-content;
    background: rgb(255, 255, 255);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 30px;
    position: fixed;
    z-index: 8;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 20px 20px 30px rgba(0, 0, 0, 0.068);
  }
  .card-content {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .card-heading {
    font-size: 20px;
    font-weight: 700;
    color: rgb(27, 27, 27);
    text-align: right;
    margin-right: 10px;
  }
  .card-description {
    font-weight: 100;
    color: rgb(102, 102, 102);
    text-align: right;
    margin-right: 10px;
  }
  .card-button-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .card-button {
    width: 50%;
    height: 35px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-weight: 600;
  }
  .primary {
    background-color: rgb(255, 114, 109);
    color: white;
  }
  .primary:hover {
    background-color: rgb(255, 73, 66);
  }
  .secondary {
    background-color: #ddd;
  }
  .secondary:hover {
    background-color: rgb(197, 197, 197);
  }
  .exit-button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
  .exit-button:hover svg {
    fill: black;
  }
  .exit-button svg {
    fill: rgb(175, 175, 175);
  }`;

export default AlertDelete;