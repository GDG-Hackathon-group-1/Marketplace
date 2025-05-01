import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Cart.css";
import img613 from "../Assets/Frame 613.png";
import img611 from "../Assets/Frame 611.png";
const Cart = () => {
    return (
        <div>

<div className="sub-nav">
        <a style={{textDecoration: "none", color: "#aaa"}} href="#">Home&ensp;</a>/
    
        <p style={{display: "inline", color: "black"}}>&ensp;Cart</p>
      </div>
    <section className="products">
    <div className="product-list prolist" id="product-list">
        <div className="product">
            <p>Product</p> </div>
        <div className="price" id="price">
           <p>Price</p>

        </div>
        <div className="quantity" id="quantity">
            
           <p>Quantity</p> 
        </div>
        <div className="sub-total">
            <p>Subtotal</p></div>
    </div>
     
    <div className="product-list selected">
        <div className="item items" id="item">
            <img className="img1" src={img613} alt="LCD monitor"/>
            <p>LCD monitor</p>
        </div>
        <div className="items">
            <p>$650</p>
        </div>
        <div className="items">
            <input className="spin" type="number" min="1" max="20" required/>
        </div>
        <div className="items">
            <p>$650</p>
        </div>
    </div>
    <div className="product-list selected">
        <div className="item items">
            <img className="img1" src={img611} alt="LCD monitor"/>
            <p>HI Gamepad</p>
        </div>
        <div className="items">
            <p>$550</p>
        </div>
        <div className="items">
            <input className="spin" type="number" min="1" max="20" required/>
        </div>
        <div className="items">
            <p>$1110</p>
        </div>
    </div>
  
</section>

    <div className="cart-buttons" id="cart-buttons">
    <div className="return button">
        <input type="button" value="Return to Shop"/>

    </div>
    <div className="update button">
        <input type="button" value="Update Cart"/>
    </div>
</div>

<div className="cart-total" id="cart-total">
    <h6 >Cart Total</h6>
    <div className="data">
    <p>Subtotal:</p>
    <p>$1750</p>
    </div>
    <div className="data">
    <p>Shipping:</p>
     <p>free</p>
    

</div>
    <div className="data" id="total">
    <p>Total:</p>
     <p>$1750</p>
</div>
<div className="Checkout" id="Checkout">
   <Link to ="/checkout"> <input type="button" value="Process to Checkout"/></Link>
</div>
</div>
<div className="coupon" id="coupon">
    <input className="size space" type="text"/>
    <button className="size" id="apply-coupon">Apply coupon</button>
</div>
</div>
   
    );
}
export default Cart;