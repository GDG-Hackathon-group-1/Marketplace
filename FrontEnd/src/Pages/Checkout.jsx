import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/Checkout.css";
import img613 from "../Assets/Frame 613.png";
import img611 from "../Assets/Frame 611.png";
import { FaPaypal, FaCcVisa, FaCcMastercard } from "react-icons/fa";

const Checkout = () => {
  // Sample items data
  const items = [
    {
      id: 1,
      name: "LCD monitor",
      price: 650,
      quantity: 1,
      image: img613,
    },
    {
      id: 2,
      name: "HI Gamepd",
      price: 1110,
      quantity: 1,
      image: img611,
    },
  ];

  // Calculate totals
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;

  const [formData, setFormData] = useState({
    firstName: "",
    companyName: "",
    address: "",
    apartment: "",
    city: "",
    phone: "",
    email: "",
    saveInfo: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here if needed
  };

  const validCoupons = ["FREE100", "ZEROPAY", "FREECHECKOUT"];

  // State for coupon and discount
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  const handleCouponApply = () => {
    if (validCoupons.includes(couponCode.toUpperCase())) {
      setTotal(0); // Set total to zero for valid coupon
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
      setCouponApplied(false);
      setTotal(subtotal + shipping); // Reset to original total
    }
  };

  return (
    <div>
      <div className="sub-nav">
        <a style={{ textDecoration: "none", color: "#aaa" }} href="#">
          Account&ensp;
        </a>
        /
        <a style={{ textDecoration: "none", color: "#aaa" }} href="#">
          My Account&ensp;
        </a>
        /
        <a style={{ textDecoration: "none", color: "#aaa" }} href="#">
          Product&ensp;
        </a>
        /
        <a style={{ textDecoration: "none", color: "#aaa" }} href="#">
          View Cart&ensp;
        </a>
        /<p style={{ display: "inline", color: "black" }}>&ensp;CheckOut</p>
      </div>

      <div className="checkout" id="billing-form">
        <h2>Billing Details</h2>
        {error && <div className="error-message">{error}</div>}

        {/* Regular form for collecting customer info */}
        {/* <div className="customer-info-form"> */}
        <form onSubmit={handleSubmit}>
          <div className="form-info">
            <label htmlFor="firstName">
              First Name <sup>*</sup>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-info">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
          <div className="form-info">
            <label htmlFor="address">
              Street Address <sup>*</sup>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-info">
            <label htmlFor="apartment">Apartment, Floor, etc. (optional)</label>
            <input
              type="text"
              id="apartment"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
            />
          </div>
          <div className="form-info">
            <label htmlFor="city">
              Town/city <sup>*</sup>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-info">
            <label htmlFor="phone">
              Phone Number <sup>*</sup>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-info">
            <label htmlFor="email">
              Email Address <sup>*</sup>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="tick">
            <input
              type="checkbox"
              id="saveInfo"
              name="saveInfo"
              checked={formData.saveInfo}
              onChange={handleChange}
            />
            <label htmlFor="saveInfo">
              Save this information for faster check-out next time
            </label>
          </div>
        </form>
        {/* </div> */}

        <div className="selected-items">
          {items.map((item) => (
            <React.Fragment key={item.id}>
              <div className="item items">
                <img className="img1" src={item.image} alt={item.name} />
                <p>{item.name}</p>
              </div>
              <div className="items price">
                <p>${item.price * item.quantity}</p>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="total">
          <table>
            <tbody>
              <tr>
                <td>Subtotal:</td>
                <td>${subtotal}</td>
              </tr>
              <tr>
                <td>Shipping:</td>
                <td>{shipping === 0 ? "free" : `$${shipping}`}</td>
              </tr>
              <tr>
                <td>Total:</td>
                <td>${total}</td>
              </tr>
            </tbody>
          </table>

          {/* Chapa Payment Form */}
          <form
            method="POST"
            action="https://api.chapa.co/v1/hosted/pay"
            onSubmit={(e) => {
              if (
                !formData.firstName ||
                !formData.address ||
                !formData.city ||
                !formData.phone ||
                !formData.email
              ) {
                e.preventDefault();
                setError("Please fill in all required fields");
              }
            }}
          >
            <input
              type="hidden"
              name="public_key"
              value="CHAPUBK_TEST-pY2wlM0OaAD7rMBEcGl4vK0Tpll7gnlq"
            />
            <input
              type="hidden"
              name="tx_ref"
              value={`tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`}
            />
            <input type="hidden" name="amount" value={total} />
            <input type="hidden" name="currency" value="ETB" />
            <input type="hidden" name="email" value={formData.email} />
            <input type="hidden" name="first_name" value={formData.firstName} />
            <input
              type="hidden"
              name="last_name"
              value={formData.companyName || "Customer"}
            />
            <input type="hidden" name="title" value="Order Payment" />
            <input
              type="hidden"
              name="description"
              value={`Payment for ${items.length} items`}
            />
            <input
              type="hidden"
              name="logo"
              value="https://yourwebsite.com/logo.png"
            />
            <input
              type="hidden"
              name="callback_url"
              // value="https://yourwebsite.com/callback"
              value=""
            />
            <input
              type="hidden"
              name="return_url"
              value="http://localhost:5174/Thankyou"
            />
            <input type="hidden" name="meta[title]" value="order-payment" />

            <div className="payment-method">
              <h3>Payment Method</h3>
              <div>
                <p>Pay securely with Chapa</p>
                <br />
                <div>
                  <FaPaypal />
                  &nbsp;Paypal&nbsp;&nbsp;&nbsp; <br />
                  <FaCcVisa />
                  &nbsp;Visa&nbsp;&nbsp;&nbsp;
                  <br />
                  <FaCcMastercard />
                  &nbsp;Mastercard
                  <br />
                </div>
              </div>
            </div>

            {/* Coupon Section */}
            <div className="Coupon">
              <input
                className="size space"
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                disabled={couponApplied}
              />
              <button
                className="size"
                type="button"
                onClick={handleCouponApply}
                disabled={couponApplied}
              >
                {couponApplied ? "Applied" : "Apply coupon"}
              </button>
              {couponError && (
                <div className="error-message">{couponError}</div>
              )}
              {couponApplied && (
                <div className="success-message">
                  Coupon applied successfully! Total is now $0
                </div>
              )}
            </div>
            <div className="order" id="order">
              <button type="submit">Pay with Chapa</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
