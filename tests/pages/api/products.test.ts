import { createMocks } from "node-mocks-http";
import type { NextApiRequest, NextApiResponse } from "next";
import handler from "@/pages/api/products";
import { Product } from "@/types";

describe("Products API", () => {
  test("returns a list of products", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(res._getStatusCode()).toBe(200);
    const data: Product[] = JSON.parse(res._getData());

    expect(data).toEqual([
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
    ]);
  });

  test("filters products by name", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        name: "iPhone",
      },
    });

    await handler(
      req as unknown as NextApiRequest,
      res as unknown as NextApiResponse
    );

    expect(res._getStatusCode()).toBe(200);
    const data: Product[] = JSON.parse(res._getData());

    expect(data).toEqual([
      { id: 5, name: "iPhone 15 Pro", price: 999.99 },
      { id: 6, name: "iPhone 15 Pro Max", price: 1199.99 },
      { id: 7, name: "iPhone 15", price: 799.99 },
      { id: 8, name: "iPhone 15 Plus", price: 899.99 },
    ]);
  });

  test("filters products by minPrice", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        minPrice: "1000",
      },
    });

    await handler(
      req as unknown as NextApiRequest,
      res as unknown as NextApiResponse
    );

    expect(res._getStatusCode()).toBe(200);
    const data: Product[] = JSON.parse(res._getData());

    expect(data).toEqual([
      { id: 2, name: "iPad Pro, 13-inch", price: 1299.99 },
      { id: 6, name: "iPhone 15 Pro Max", price: 1199.99 },
    ]);
  });

  test("filters products by maxPrice", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        maxPrice: "800",
      },
    });

    await handler(
      req as unknown as NextApiRequest,
      res as unknown as NextApiResponse
    );

    expect(res._getStatusCode()).toBe(200);
    const data: Product[] = JSON.parse(res._getData());

    expect(data).toEqual([
      { id: 3, name: "iPad Air, 11-inch", price: 599.99 },
      { id: 4, name: "iPad Air, 13-inch", price: 799.99 },
      { id: 7, name: "iPhone 15", price: 799.99 },
      { id: 9, name: "Apple Watch Series 9, Aluminum", price: 399.99 },
      { id: 10, name: "Apple Watch Series 9, Stainless Steel", price: 699.99 },
    ]);
  });

  test("filters products by name and price range", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        name: "Pro",
        minPrice: "1000",
        maxPrice: "1200",
      },
    });

    await handler(
      req as unknown as NextApiRequest,
      res as unknown as NextApiResponse
    );

    expect(res._getStatusCode()).toBe(200);
    const data: Product[] = JSON.parse(res._getData());

    expect(data).toEqual([
      { id: 6, name: "iPhone 15 Pro Max", price: 1199.99 },
    ]);
  });

  test("returns empty array when no products match the filter", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        name: "Nonexistent",
      },
    });

    await handler(
      req as unknown as NextApiRequest,
      res as unknown as NextApiResponse
    );

    expect(res._getStatusCode()).toBe(200);
    const data: Product[] = JSON.parse(res._getData());

    expect(data).toEqual([]);
  });
});
