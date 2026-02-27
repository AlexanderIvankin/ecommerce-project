import axios from "axios";
import { Fragment } from "react";
import { Link } from "react-router";
import dayjs from "dayjs";

export function OrderProduct({ orderItem, productItem, loadCart}) {
  const addToCart = async () => {
    await axios.post("/api/cart-items", {
      productId: productItem.productId,
      quantity: 1,
    });
    await loadCart();
  };

  return (
    <Fragment key={productItem.productId}>
      <div key={productItem.productId} className="product-image-container">
        <img src={productItem.product.image} />
      </div>

      <div className="product-details">
        <div className="product-name">{productItem.product.name}</div>
        <div className="product-delivery-date">
          Arriving on:{" "}
          {dayjs(productItem.estimatedDeliveryTimeMs).format("dddd D")}
        </div>
        <div className="product-quantity">Quantity: {productItem.quantity}</div>
        <button className="buy-again-button button-primary" onClick={addToCart}>
          <img className="buy-again-icon" src="images/icons/buy-again.png" />
          <span className="buy-again-message">
            Add to Cart
          </span>
        </button>
      </div>

      <div className="product-actions">
        <Link to={`/tracking/${orderItem.id}/${productItem.productId}`}>
          <button className="track-package-button button-secondary">
            Track package
          </button>
        </Link>
      </div>
    </Fragment>
  );
}
