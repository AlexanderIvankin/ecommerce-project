import axios from "axios";
import { useEffect, useState } from "react";
import { CheckoutHeader } from "./CheckoutHeader";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import "./CheckoutPage.css";

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get("/api/delivery-options?expand=estimatedDeliveryTime")
  //     .then((response) => {
  //       setDeliveryOptions(response.data);
  //     });

  //   axios.get("/api/payment-summary").then((response) => {
  //     setPaymentSummary(response.data);
  //   });
  // }, []);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      const deliveryResponse = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime",
      );
      setDeliveryOptions(deliveryResponse.data);
    };

    fetchCheckoutData();
  }, []);

  useEffect(() => {
    const fetchPaymentSummary = async () => {
      const paymentResponse = await axios.get("/api/payment-summary");
      setPaymentSummary(paymentResponse.data);
    };

    fetchPaymentSummary();
  }, [cart]);

  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader paymentSummary={paymentSummary} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
          />

          {paymentSummary && (
            <PaymentSummary
              paymentSummary={paymentSummary}
              loadCart={loadCart}
            />
          )}
        </div>
      </div>
    </>
  );
}
