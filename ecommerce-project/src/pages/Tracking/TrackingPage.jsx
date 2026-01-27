import axios from "axios";
import { Link } from "react-router";
import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { DeliveryProgress } from "./DeliveryProgress";
import dayjs from "dayjs";
import "./TrackingPage.css";

export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`,
      );
      setOrder(response.data);
    };

    fetchOrderData();
  }, [orderId, productId]);

  const selectedProduct = order?.products?.find((productItem) => {
    return productItem.productId === productId;
  });

  if (!order || !selectedProduct) {
    return null;
  }

  return (
    <>
      <title>Tracking</title>

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on{" "}
            {dayjs(selectedProduct.estimatedDeliveryTimeMs).format(
              "dddd, MMMM D",
            )}
          </div>

          <div className="product-info">{selectedProduct.product.name}</div>

          <div className="product-info">
            Quantity: {selectedProduct.quantity}
          </div>

          <img className="product-image" src={selectedProduct.product.image} />

          <DeliveryProgress
            orderTimeMs={order.orderTimeMs}
            deliveryTimeMs={selectedProduct.estimatedDeliveryTimeMs}
          />
        </div>
      </div>
    </>
  );
}
