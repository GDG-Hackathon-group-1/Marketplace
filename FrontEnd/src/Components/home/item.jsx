import React, { useEffect, useState } from "react";
import heart from "../../Assets/heart.svg";
import eye from "../../Assets/eye.svg";
import profile from "../../Assets/Profile.png";

const ItemSales = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/products/");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <section className="item-sales">
      {items.map((item) => (
        <div className="item-card" key={item.id}>
          <div className="item-upper">
            <div className="item-image">
              <div className="icons">
                <span className="icon-heart">
                  <img src={heart} alt="Heart Icon" />
                </span>
                <span className="icon-eye">
                  <img src={eye} alt="Eye Icon" />
                </span>
              </div>
              <img
                className="item-img"
                src={`http://localhost:8000/uploads/${item.itemProfile}`}
                alt="product"
              />
            </div>
          </div>
          <div className="item-detail">
            <img src={profile} alt="customer-profile" width={50} height={50} />
            <div className="customer-profile">
              <div className="profile">
                <h5>{item.itemName}</h5>
                <p>AASTU Electronics</p>
                <div className="rating">{item.itemRate}</div>
              </div>
              <p>{item.itemPrice} ETB</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ItemSales;
