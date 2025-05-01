import React from "react";

import "../CSS/Checkout.css";
import img613 from "../Assets/Frame 613.png";
import img611 from "../Assets/Frame 611.png";
const Checkout = () => {
    return(
        <div>
            <div className="sub-nav">
      <a style={{textdecoration: "none", color: "#aaa"}} href="#">Account&ensp;</a>/
      <a style={{textdecoration: "none", color: "#aaa"}} href="#">My Account&ensp;</a
      >/
      <a style={{textdecoration: "none", color: "#aaa"}} href="#">Product&ensp;</a>/
      <a style={{textdecoration: "none", color: "#aaa"}} href="#">View Cart&ensp;</a
      >/
      <p style={{display: "inline", color: "black"}}>&ensp;CheckOut</p>
    </div>
     
    <div className="checkout" id="billing-form">
      <h2>Billing Details</h2>
      <form id="billing-form">
      <div className="form-info">
        <label for="Fname">First Name <sup>*</sup></label>
        <input type="text" id="Fname" required />
      </div>
      <div className="form-info">
        <label for="Cname">Company Name</label>
        <input type="text" id="Cname" />
      </div>
      <div className="form-info">
        <label for="address">Street Address <sup>*</sup></label>
        <input type="text" id="address" required />
      </div>
      <div className="form-info">
        <label for="Apartfloor">Apartment, Floor, etc. (optional)</label>
        <input type="text" id="Apartfloor" />
      </div>
      <div className="form-info">
        <label for="city">Town/city <sup>*</sup></label>
        <input type="text" id="city" required />
      </div>
      <div className="form-info">
        <label for="phone">Phone Number <sup>*</sup></label>
        <input type="tel" id="phone" required />
      </div>
      <div className="form-info">
        <label for="email">Email Address <sup>*</sup></label>
        <input type="email" id="email" required />
      </div>
      <div className="tick">
        <input type="checkbox" id="check" />
        <label for="check">Save this information for faster check-out next time</label>
      </div>
      <div className="order" id="order">
        <button type="submit">Place Order</button>
      </div>
    </form>
      <div id="confirmation-message"></div>
    </div>
  

    <div className="selected-items">
      <div className="item items">
        <img className="img1" src={img613} alt="LCD monitor" />
        <p>LCD monitor</p>
      </div>
      <div className="items price">
        <p>$650</p>
      </div>

      <div className="item items">
        <img
          className="img1 img2"
          src={img611}
          alt="LCD monitor"
        />
        <p>HI Gamepd</p>
      </div>
      <div className="items price">
        <p>$1110</p>
      </div>
    </div>
    <div className="total">
      <table>
        <tr >
          <td>Subtotal:</td>
          <hr />
          <td>$1750</td>
        </tr>

        <tr>
          <td>Shipping:</td>

          <td>free</td>
        </tr>
        <tr>
          <td>Total:</td>

          <td>$1750</td>
        </tr>
      </table>
      <div className="payment-method">
        <input type="radio" name="pay" />
        <label for="bank">Bank</label>
        <div className="logo">
          <img src="../Assets/Mastercard_Logo_1990-2048x1223.png" alt="" />
          <img className="visa" src="../Assets/visa.png" alt="" />
          <img className="paypal" src="../Assets/paypl.png" alt="" />
        </div>

        <input type="radio" name="pay" />
        <label for="cash">Cash on Delivery</label>
        <input type="radio" name="pay" />
       <label>pay with Telebirr</label>
       <input type="radio" name="pay" />
        <label>pay with MPESSA</label>
      </div>

      <div className="Coupon">
        <input className="size space" type="text" />
        <button className="size">Apply coupon</button>
      </div>
      
    </div>
        </div>
    );
}
export default Checkout;