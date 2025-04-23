"use client";

import Footer from "app/components/Footer";
import Navbar from "app/components/Navbar";
import RelatedProducts from "app/components/RelatedProducts";
import { useFurniroContext } from "context/FurniroContext";
import { useParams } from "next/navigation";

const ProductPage = () => {
  const { tableData } = useFurniroContext();
  const params = useParams();
  const id = params?.id?.toString();

  const product = tableData.find((item) => item.id.toString() === id);

  if (!product) {
    return <p>loading ....</p>;
  }

  return (
    < div className="bg-white font-poppins">
    <Navbar/>
      <h1>{product.name}</h1>
      <h1>{product.description}</h1>
      <h1>{product.id}</h1>
      <RelatedProducts category={product.category}  />
      <Footer/>
    </div>
  );
};

export default ProductPage;
