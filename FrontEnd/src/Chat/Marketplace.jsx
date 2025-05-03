
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ChatBox from "./ChatBox";

const dummyProducts = [
  { id: 1, name: "Laptop", price: 1200, seller: "seller 1" },
  { id: 2, name: "Camera", price: 800, seller: "seller 2" },
];

function Marketplace() {
  const [chatSeller, setChatSeller] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Marketplace</h1>
      <div className="grid grid-cols-2 gap-4">
        {dummyProducts.map((product) => (
          <ProductCard key={product.id} product={product} onChat={setChatSeller} />
        ))}
      </div>
      {chatSeller && <ChatBox seller={chatSeller} onClose={() => setChatSeller(null)} />}
    </div>
  );
}

export default Marketplace;
