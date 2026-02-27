import { deliveryPercentage } from "../../utils/deliveryPercentage";

export function DeliveryProgress({ orderTimeMs, deliveryTimeMs }) {
  const deliveryProgress = deliveryPercentage(orderTimeMs, deliveryTimeMs);
  let deliveryStatus = "";

  if (deliveryProgress < 33) deliveryStatus = "Preparing";
  else if (deliveryProgress >= 33 && deliveryProgress < 100 )
    deliveryStatus = "Shipped";
  else deliveryStatus = "Delivered";

  return (
    <>
      {" "}
      <div className="progress-labels-container">
        <div
          className={`progress-label ${deliveryStatus === "Preparing" ? "current-status" : ""}`}
        >
          Preparing
        </div>
        <div
          className={`progress-label ${deliveryStatus === "Shipped" ? "current-status" : ""}`}
        >
          Shipped
        </div>
        <div
          className={`progress-label ${deliveryStatus === "Delivered" ? "current-status" : ""}`}
        >
          Delivered
        </div>
      </div>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${deliveryProgress}%` }}
        ></div>
      </div>
    </>
  );
}
