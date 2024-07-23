import { Product } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

const products: Product[] = [
  { id: 1, name: "iPad Pro, 11-inch", price: 999.99 },
  { id: 2, name: "iPad Pro, 13-inch", price: 1299.99 },
  { id: 3, name: "iPad Air, 11-inch", price: 599.99 },
  { id: 4, name: "iPad Air, 13-inch", price: 799.99 },
  { id: 5, name: "iPhone 15 Pro", price: 999.99 },
  { id: 6, name: "iPhone 15 Pro Max", price: 1199.99 },
  { id: 7, name: "iPhone 15", price: 799.99 },
  { id: 8, name: "iPhone 15 Plus", price: 899.99 },
  { id: 9, name: "Apple Watch Series 9, Aluminum", price: 399.99 },
  { id: 10, name: "Apple Watch Series 9, Stainless Steel", price: 699.99 },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[] | { error: string }>
) {
  const { name, minPrice, maxPrice } = req.query;

  let filteredProducts = products;

  if (name) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes((name as string).toLowerCase())
    );
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= parseFloat(minPrice as string)
    );
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= parseFloat(maxPrice as string)
    );
  }

  res.status(200).json(filteredProducts);
}
