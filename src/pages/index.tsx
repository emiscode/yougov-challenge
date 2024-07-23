import React, { useCallback, useEffect, useState } from "react";
import ProductsList from "../components/ProductsList";
import { Product } from "@/types";
import axios from "axios";
import useCookies from "@/hooks/useCookies";
import ProductFilter from "@/components/ProductFilter";

const Home: React.FC = () => {
  const [minPrice, setMinPrice] = useCookies("yg_minPrice", "");
  const [maxPrice, setMaxPrice] = useCookies("yg_maxPrice", "");
  const [name, setName] = useCookies("yg_prodName", "");
  const [filteredAt, setFilteredAt] = useCookies("yg_filteredAt", "");

  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get("/api/products", {
        params: { name, minPrice, maxPrice },
      });
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setError((error as Error).message);
      setLoading(false);
    }
  }, [filteredAt]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products", {
          params: { name, minPrice, maxPrice },
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError((error as Error).message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filteredAt]);

  const handleSubmitFilter = () => {
    setFilteredAt(new Date().toISOString());
  };

  const handleClearFilters = () => {
    setName("");
    setMinPrice("");
    setMaxPrice("");
    handleSubmitFilter();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col m-8 gap-y-8">
      <ProductFilter
        name={name}
        minPrice={minPrice}
        maxPrice={maxPrice}
        setName={setName}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        onSubmitFilter={handleSubmitFilter}
        onClearFilter={handleClearFilters}
      />
      <ProductsList products={products} />
    </div>
  );
};

export default Home;
