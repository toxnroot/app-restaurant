import Link from 'next/link';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';

const ButtonOrderNow = ({click}) => {
  let pathname = usePathname();

  if (pathname.includes('/check-out')) {
    return (
      <></>
    );
  }
  return (
    <StyledWrapper>
        <Link href="/check-out">
            <button onClick={click}><span className="text">أطلب</span><span>الأن</span></button>
        </Link>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
   position: relative;
   overflow: hidden;
   border: 1px solid #18181a;
   color: #18181a;
   display: inline-block;
   font-size: 15px;
   line-height: 15px;
   padding: 8px;
   text-decoration: none;
   cursor: pointer;
   background: #fff;
   user-select: none;
   -webkit-user-select: none;
   touch-action: manipulation;
   width: 100px;
   border-radius: 10px;
  }
.text{
    color: black;
}
  button span:first-child {
   position: relative;
   transition: color 600ms cubic-bezier(0.48, 0, 0.12, 1);
   z-index: 10;
  }

  button span:last-child {
   color: white;
   display: block;
   position: absolute;
   bottom: 0;
   transition: all 500ms cubic-bezier(0.48, 0, 0.12, 1);
   z-index: 100;
   opacity: 0;
   top: 50%;
   left: 50%;
   transform: translateY(225%) translateX(-50%);
   height: 14px;
   line-height: 13px;
  }

  button:after {
   content: "";
   position: absolute;
   bottom: -50%;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: black;
   transform-origin: bottom center;
   transition: transform 600ms cubic-bezier(0.48, 0, 0.12, 1);
   transform: skewY(9.3deg) scaleY(0);
   z-index: 50;
  }

  button:hover:after {
   transform-origin: bottom center;
   transform: skewY(9.3deg) scaleY(2);
  }

  button:hover span:last-child {
   transform: translateX(-50%) translateY(-50%);
   opacity: 1;
   transition: all 900ms cubic-bezier(0.48, 0, 0.12, 1);
  }`;

export default ButtonOrderNow;
