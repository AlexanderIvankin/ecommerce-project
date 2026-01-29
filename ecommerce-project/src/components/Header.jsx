import { useState } from "react";
import { Link, useNavigate } from "react-router";
import "./Header.css";

export function Header({ cart }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const updateSearchInput = (event) => {
    setSearch(event.target.value);
  };

  const searchProducts = () => {
    navigate(`/?search=${search}`);
  };
  
  const handleSearchKeyDown = (event) => {
  if (event.key === 'Enter') {
    searchProducts();
  }
};


  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return (
    <>
      <div className="header">
        <div className="left-section">
          <Link to="/" className="header-link">
            <img className="logo" src="images/logo-white.png" />
            <img className="mobile-logo" src="images/mobile-logo-white.png" />
          </Link>
        </div>

        <div className="middle-section">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            value={search}
            onChange={updateSearchInput}
            onKeyDown={handleSearchKeyDown}
          />

          <button className="search-button">
            <img
              className="search-icon"
              src="images/icons/search-icon.png"
              onClick={searchProducts}
            />
          </button>
        </div>

        <div className="right-section">
          <Link className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </Link>

          <Link className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>
    </>
  );
}
