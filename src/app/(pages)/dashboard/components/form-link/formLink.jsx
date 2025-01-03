import React, { useState } from "react";
import styled from "styled-components";
import SelectOptions from "../select-options/selectOptions";

const FormLink = () => {
  const [type, setType] = useState("text");
  const [placeholder, setPlaceholder] = useState("Enter URL");
  const [customName, setCustomName] = useState(""); // لإدخال اسم الرابط
  const [linkName, setLinkName] = useState(""); // لأن "Other URL" يتطلب اسم مخصص
  const [url, setUrl] = useState(""); // لتخزين الرابط المُدخل

  const handleSelectChange = (selectedOption) => {
    if (selectedOption === "Phone") {
      setType("number");
      setPlaceholder("Enter phone number");
      setLinkName(selectedOption);
    } else if (selectedOption === "Email") {
      setType("email");
      setPlaceholder("Enter email address");
      setLinkName(selectedOption);
    } else if (selectedOption === "Other URL") {
      setType("text");
      setPlaceholder("Enter URL");
      setLinkName(""); // لإظهار إدخال اسم الرابط
    } else {
      setType("text");
      setPlaceholder("URL");
      setLinkName(selectedOption);
    }
  };

  return (
    <StyledWrapper>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <p className="form-title">اضافة رابط جديد</p>
        <SelectOptions onChange={handleSelectChange} defaultSelected="Other URL" />
        <div className="input-container">
          {linkName === "" && (
            <input
              type="text"
              placeholder="Enter name for URL"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
            />
          )}
          <input
            type={type}
            placeholder={placeholder}
            value={url}
            onChange={(e) => setUrl(e.target.value)} // تخزين قيمة الإدخال في حالة url
          />
        </div>
        <button
          type="submit"
          className="submit"
          onClick={() => {
            const finalName = linkName || customName;
            alert(`Link Name: ${finalName}, URL: ${url}`); // عرض الرابط المُدخل
          }}
        >
          Add Link
        </button>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form {
    background-color: #fff;
    display: block;
    padding: 1rem;
    max-width: 350px;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .form-title {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 600;
    text-align: center;
    color: #000;
  }

  .input-container {
    position: relative;
  }

  .input-container input,
  .form button {
    outline: none;
    border: 1px solid #e5e7eb;
    margin: 8px 0;
  }

  .input-container input {
    background-color: #fff;
    padding: 1rem;
    padding-right: 3rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    width: 300px;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    color: #000;
  }

  .submit {
    display: block;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    background-color: #4f46e5;
    color: #ffffff;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    width: 100%;
    border-radius: 0.5rem;
    text-transform: uppercase;
  }

  .signup-link {
    color: #343535;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: center;
  }

  .signup-link a {
    text-decoration: underline;
  }
`;

export default FormLink;
