import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import { useSearchParams } from "react-router";
import "./HomePage.css";

export function HomePage( { cart, loadCart } ) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();  
  const search = searchParams.get("search") || "";

  // useEffect(() => {
  //   axios.get("/api/products").then((response) => {
  //     setProducts(response.data);
  //   });
  // }, []);

  useEffect(() => {
    const getHomeData = async () => {
      // const response = await axios.get("/api/products");
      const response = search ? await axios.get(`/api/products?search=${search}`) : await axios.get("/api/products");
      setProducts(response.data);
    }

    getHomeData();
  }, [search]);

  return (
    <>
      <title>Ecommerce Project</title>

      <Header cart={cart}/>

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
