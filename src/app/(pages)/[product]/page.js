import Slider from "@/app/components/slider/slider";
import GoBack from "@/app/components/go-back/goBack";
import "./product.css";

export async function generateMetadata({ params }) {
  // انتظار params.product
  const product = decodeURIComponent(await params.product); // فك ترميز المسار
  return {
    title: `${product} - Menu Coffee`,
    description: `احصل على المزيد من المعلومات حول ${product} وغيرها من المنتجات.`,
    openGraph: {
      title: `${product} - موقعك`,
      description: `اكتشف المزيد حول ${product} وغيرها من المنتجات الرائعة.`,
    },
  };
}

const Page = async ({ params }) => {
  // انتظار params.product
  const product = decodeURIComponent(await params.product); // فك ترميز المسار

  return (
    <div className="product flex items-center justify-center flex-col gap-2">
      <h1 className="title-product">{product}</h1>
      <Slider />
      <GoBack />
    </div>
  );
};

export default Page;
