import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import Home from "@/pages"; // Adjust the path if necessary
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

describe("Home Component", () => {
  beforeEach(() => {
    mock.reset();
  });

  test("renders loading state initially", () => {
    render(<Home />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders products after successful fetch", async () => {
    const mockProducts = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ];
    mock.onGet("/api/products").reply(200, mockProducts); // Adjust the endpoint as necessary

    await act(async () => {
      render(<Home />);
    });

    await waitFor(() => expect(mock.history.get.length).toBe(1));

    const productList = await screen.findByRole("list");
    expect(productList).toBeInTheDocument();

    const productItems = await screen.findAllByRole("listitem");
    expect(productItems).toHaveLength(mockProducts.length);

    expect(productItems[0]).toHaveTextContent("Product 1");
    expect(productItems[1]).toHaveTextContent("Product 2");
  });

  test("renders 'No products' message when no products are returned", async () => {
    mock.onGet("/api/products").reply(200, []);

    await act(async () => {
      render(<Home />);
    });

    await waitFor(() => expect(mock.history.get.length).toBe(1));
    await waitFor(() =>
      expect(screen.getByText(/no products/i)).toBeInTheDocument()
    );
  });

  test("renders error message on fetch failure", async () => {
    mock.onGet("/api/products").reply(500);

    await act(async () => {
      render(<Home />);
    });

    await waitFor(() => expect(mock.history.get.length).toBe(1));
    await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
  });
});
