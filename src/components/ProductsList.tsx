import { Product } from "@/types";
import React from "react";

const ProductsList: React.FC<{ products: Product[] }> = ({ products }) => {
  if (products.length === 0) {
    return <h1>No products found</h1>;
  }
  return (
    <div>
      <h1 className="text-xl text-gray-800 font-semibold mb-8">
        Products List
      </h1>
      <ul className="flex flex-col gap-y-4">
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
