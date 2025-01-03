"use client"
import AlertDelete from "../../../components/alert-delete/alertDelete";
import ButtonProduct from "../../../components/btton-product/buttonProduct";
import Card from "../../../components/card-edit/card/card";
import './editPRoduct.css'
import useGetOrderData from "@/app/hooks/useGetProducts"; // استيراد الهوك

const Page = ({ params }) => {
    let part = decodeURIComponent(params.editProduct);
    
    const { data, loading, error } = useGetOrderData(part);
    
    if (loading) return <div>جاري التحميل...</div>;
    if (error) return <div>{error}</div>;
    
    // if (data.length === 0) {
    //     return <div>لا توجد منتجات لعرضها</div>;
    // }
    console.log(data);
    return (
        <div className="product">
            <div className="btn-add-pro">
                <ButtonProduct nameBtn="اضافة منتج"/>
            </div>
            <div className="edit-product">
                {data.map((dataItem) => (
                    <Card 
                        key={dataItem.id} 
                        photo={dataItem.fileUrl} 
                        titleProduct={dataItem.name} 
                        price={dataItem.price} 
                        ingredients={dataItem.description}
                        productId={dataItem.id}
                        ordersDocumentId={dataItem.documentId}
                    />
                ))}
            </div>
        </div>
    );
};


export default Page;
