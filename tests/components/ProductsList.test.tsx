import React from "react";
import { render, screen } from "@testing-library/react";
import { Product } from "@/types";
import ProductsList from "@/components/ProductsList";

describe("ProductsList Component", () => {
  test('renders "No products found" when there are no products', () => {
    render(<ProductsList products={[]} />);
    expect(screen.getByText("No products found")).toBeInTheDocument();
  });

  test("renders the products list correctly", () => {
    const products: Product[] = [
      { id: 1, name: "Product 1", price: 100 },
      { id: 2, name: "Product 2", price: 200 },
    ];

    render(<ProductsList products={products} />);

    expect(screen.getByText("Products List")).toBeInTheDocument();
    expect(screen.getByText("Product 1 - $100")).toBeInTheDocument();
    expect(screen.getByText("Product 2 - $200")).toBeInTheDocument();
  });

  test("renders the correct number of products", () => {
    const products: Product[] = [
      { id: 1, name: "Product 1", price: 100 },
      { id: 2, name: "Product 2", price: 200 },
      { id: 3, name: "Product 3", price: 300 },
    ];

    render(<ProductsList products={products} />);

    const productItems = screen.getAllByRole("listitem");
    expect(productItems).toHaveLength(3);
  });
});
