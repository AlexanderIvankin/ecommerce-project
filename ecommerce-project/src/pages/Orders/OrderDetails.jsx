import { OrderProduct } from "./OrderProduct";
export function OrderDetails({ orderItem, loadCart }) {
  return (
    <div className="order-details-grid">
      {orderItem.products.map((productItem) => {
        return (
          <OrderProduct
            key={orderItem.id + '-' + productItem.productId}
            orderItem={orderItem}
            productItem={productItem}
            loadCart={loadCart}
          />
        );
      })}
    </div>
  );
}
