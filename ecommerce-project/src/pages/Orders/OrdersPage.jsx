import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { OrderDetails } from "./OrderDetails";
import "./OrdersPage.css";
import { formatMoney } from "../../utils/money";

export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   axios.get("/api/orders?expand=products").then((response) => {
  //     setOrders(response.data);
  //   });
  // }, []);

  useEffect(() => {
    const fetchOrdersData = async () => {
      const response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    };
    fetchOrdersData();
  }, []);

  return (
    <>
      <title>Orders</title>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((orderItem) => {
            return (
              <div key={orderItem.id} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(orderItem.orderTimeMs).format("MMMM D")}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{`$${formatMoney(orderItem.totalCostCents)}`}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{orderItem.id}</div>
                  </div>
                </div>

                <OrderDetails orderItem={orderItem} />

              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
