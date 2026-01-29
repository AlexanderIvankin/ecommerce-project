import axios from "axios";
import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";
import { DeliveryOptions } from "./DeliveryOptions";
import { useState } from "react";

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
  const [editingItemId, setEditingItemId] = useState(null);

  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            },
          );

          const deleteCartItem = async () => {
            await axios.delete(`/api/cart-items/${cartItem.productId}`);
            await loadCart();
          };

          const updateItemQuantity = async (productId, quantity) => {
            await axios.put(`/api/cart-items/${productId}`, {
              quantity: Number(quantity),
            });
            setEditingItemId(null);

            await loadCart();      
          };

          console.log(cartItem);

          return (
            <div key={cartItem.productId} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:{" "}
                {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>

              <div className="cart-item-details-grid">
                <img className="product-image" src={cartItem.product.image} />

                <div className="cart-item-details">
                  <div className="product-name">{cartItem.product.name}</div>
                  <div className="product-price">
                    ${formatMoney(cartItem.product.priceCents)}
                  </div>
                  <div className="product-quantity">
                    <span>
                      Quantity:{" "}
                      {editingItemId === cartItem.productId ? (
                        <select
                          value={cartItem.quantity}
                          onChange={(e) =>
                            updateItemQuantity(
                              cartItem.productId,
                              e.target.value,
                            )
                          }
                          onBlur={() => setEditingItemId(null)}
                          autoFocus
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <>
                          <span className="quantity-label">
                            {cartItem.quantity}
                          </span>
                          <span
                            className="update-quantity-link link-primary"
                            onClick={() =>
                              setEditingItemId(cartItem.productId)
                            }
                          >
                            Update
                          </span>
                        </>
                      )}
                    </span>
                    <span
                      className="delete-quantity-link link-primary"
                      onClick={deleteCartItem}
                    >
                      Delete
                    </span>
                  </div>
                </div>

                <DeliveryOptions
                  cartItem={cartItem}
                  deliveryOptions={deliveryOptions}
                  loadCart={loadCart}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
