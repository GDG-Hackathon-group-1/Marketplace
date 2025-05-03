import React from "react";

function ProductCard({ product, onChat }) {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-600">${product.price}</p>
      <button
        className="mt-2 bg-blue-500 text-white px-2 py-2 rounded"
        onClick={() => onChat(product.seller)}
      >
        Chat with Seller
      </button>
    </div>
  );
}

export default ProductCard;
