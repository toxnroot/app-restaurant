"use client";
import FormCheckOut from "@/app/components/form-checkout/formCheckOut";
import styled from "styled-components";
const Page = () => {
    return (
        <StyledWrapper>
        <div>
            <h1 className="msg-checkout">إذا لم تقم بتسجيل الدخول لا يمكنك متابعة حالة الاوردر</h1>
            <FormCheckOut/>
        </div>
        </StyledWrapper>
    );
}

export default Page;

let StyledWrapper = styled.div`
    width: 100%;
    
    display: flex;
    justify-content: center;
    align-items: center;
    padding-block: 20px;
    .msg-checkout{
        text-align: center;
        margin-bottom: 20px;
        color: white;
        background: red;
        padding: 10px;
        border-radius: 10px;
        }
`
