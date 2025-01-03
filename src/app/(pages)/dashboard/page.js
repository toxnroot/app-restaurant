import Carddash from "./components/card-dash/carddash";
import CardVist from "./components/card-vist/cardVist";
import SvgView from "./components/svg-view/svgView";

const Page = () => {

    return (
        <div>
            <div className="dash flex items-center justify-around gap-4 m-auto mt-4 w-[60%]">
                <CardVist value="8557"><SvgView svgname='anl'/></CardVist>
                <CardVist value="5850"><SvgView svgname='vist'/></CardVist>
                <CardVist value="7445"><SvgView svgname='rate'/></CardVist>
            </div>
            <div className="dash-v flex items-center justify-around gap-4 m-auto mt-4 w-[60%] p-5">
                <Carddash url='orders' nameBtn="الطلبات"><SvgView svgname='order'/></Carddash>
                <Carddash url='edit' nameBtn="تعديل"><SvgView svgname='edit'/></Carddash>
                <Carddash url='setting' nameBtn="الأعدادات"><SvgView svgname='setting'/></Carddash>
            </div>
        </div>
    );
}

export default Page;
