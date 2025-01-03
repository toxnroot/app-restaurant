"use client"
import ButtonAdd from "../../components/btton-add/buttonAdd";
import DialogAdd from "../../components/dialog-add/dialogAdd";
import Part from "../../components/part/part";
import useOrders from "@/app/hooks/useGetParts";
import './edit.css'
const Page = () => {
    const { orders, loading, error } = useOrders();
    return (
        <div className="page-edit">
            <div className="add-btn">
            <ButtonAdd nameBtn='اضافة قسم'/>
            <DialogAdd/>
            </div>
            <div className="list-part">
                {orders.map((order)=>{
                    return (<Part key={order.id} titlePart={order.id} photo={order.photo.url}/>)
                })}
                

            </div>
        </div>
    );
}

export default Page;
