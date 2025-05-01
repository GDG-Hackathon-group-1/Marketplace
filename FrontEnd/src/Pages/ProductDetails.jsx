import React from "react";
import "../CSS/Productdetails.css";
import img57 from "../Assets/image 57.png";
import img58 from "../Assets/image 58.png";
import img59 from "../Assets/image 59.png";
import img61 from "../Assets/image 61.png";
import img63 from "../Assets/image 63.png";
import img611 from "../Assets/Frame 611.png";
import img612 from "../Assets/Frame 612.png";
import img610 from "../Assets/Frame 610.png";
import img613 from "../Assets/Frame 613.png";
import "remixicon/fonts/remixicon.css";
const ProductDetails = () => {
  return (
    <div>
      <div className="main">
        <div className="image1">
          <img src={img57} alt="" />
        </div>
        <div className="image2">
          <img src={img58} alt="" />
        </div>
        <div className="image3">
          <img src={img59} alt="" />
        </div>
        <div className="image4">
          <img src={img61} alt="" />
        </div>
        <div className="image5">
          <img src={img63} alt="" />
        </div>

        <div className="discription">
          <h3>Havic HV G-92 Gamepad</h3>
          <span className="head"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star">(150 reviews)</span>
          <h4>$1192.00</h4>
          <p>
            Playstation 5 Controller Skin High quality vinyl with air <br />{" "}
            channel adhesive for easy bubble free install and mess free <br />{" "}
            removal Pressure sensitive
          </p>

          <div className="choice">
            <label for="">Colour: </label>
            <input id="blue" type="radio" name="choose" />
            <label for="red">red</label>
            <input id="red" type="radio" name="choose" />
            <label for="blue">blue</label>
          </div>
          <div className="size">
            <label for="">Size:</label>
            <input className="space" type="button" value="XS" />
            <input className="space" type="button" value="S" />
            <input className="space" type="button" value="M" />
            <input className="space" type="button" value="L" />
            <input className="space" type="button" value="XL" />
          </div>
          <input className="spin" type="number" min="1" max="20" required />
          <input
            className="addcart"
            id="addcart"
            type="submit"
            value="Add to cart"
          />

          <div className="delivery" id="delivery">
            <p>Free Delivery</p>
            <a href="#" id="check-delivery-link">
              Enter your postal code for delivery avalaibility
            </a>
            <div id="postal-code-container" style={{ display: "none" }}>
              <input
                type="text"
                id="postal-code"
                placeholder="Enter your postal code"
              />
              <button id="check-delivery-btn">Check Delivery</button>
            </div>
            <p id="delivery-message" style={{ color: "green" }}></p>
          </div>
        </div>

        <div className="items">
          <h4 className="related">Related items</h4>

          <div className="item" id="item">
            <img src={img611} alt="" />
            <div className="add-to-cart">Add to Cart</div>

            <i className="ri-heart-3-line love"></i>

            <i className="ri-eye-line eye"></i>

            <div className="content">
              <p>HAVIT HV-G92 Gamepad</p>
              <h5>
                $120 <del>$160 ETB</del>
              </h5>
              <span className="head"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star"></span>
            </div>
          </div>
          <div className="item" id="">
            <img src={img612} alt="" />
            <div className="add-to-cart">Add to Cart</div>
            <i className="ri-heart-line love"></i>
            <i className="ri-eye-line eye"></i>
            <div className="content">
              <p>AK-900 Wired Keyboard</p>
              <h5>
                $960 <del>$1160</del>
              </h5>
              <span className="head"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star"></span>
            </div>
          </div>
          <div className="item" id="">
            <img src={img610} alt="" />
            <div className="add-to-cart">Add to Cart</div>
            <i className="ri-heart-line love"></i>
            <i className="ri-eye-line eye"></i>
            <div className="content">
              <p>IPS LCD Gaming Monitor</p>
              <h5>
                $370 <del>$400</del>
              </h5>
              <span className="head"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star"></span>
            </div>
          </div>
          <div className="item" id="">
            <img src={img613} alt="" />
            <div className="add-to-cart">Add to Cart</div>
            <i className="ri-heart-line love"></i>
            <i className="ri-eye-line eye"></i>
            <div className="content">
              <p>RGB liquid CPU Cooler</p>
              <h5>
                $160 ETB <del>$170</del>
              </h5>
              <span className="head"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
