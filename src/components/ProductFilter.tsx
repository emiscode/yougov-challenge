import useCookies from "@/hooks/useCookies";
import React from "react";

interface ProductFilterProps {
  name: string;
  setName: (name: string) => void;
  minPrice: string;
  setMinPrice: (minPrice: string) => void;
  maxPrice: string;
  setMaxPrice: (maxPrice: string) => void;
  onSubmitFilter: () => void;
  onClearFilter: () => void;
}

export default function ProductFilter({
  name,
  setName,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  onSubmitFilter,
  onClearFilter,
}: ProductFilterProps) {
  return (
    <div className="flex gap-x-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded-md px-2"
      />
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="border border-gray-300 rounded-md px-2"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="border border-gray-300 rounded-md px-2"
      />
      <button
        onClick={onSubmitFilter}
        className="bg-blue-500 text-white hover:bg-blue-700 rounded-md px-4 py-2"
      >
        Filter
      </button>
      <button
        onClick={onClearFilter}
        className="bg-blue-500 text-white hover:bg-blue-700 rounded-md px-4 py-2"
      >
        Clear filters
      </button>
    </div>
  );
}
