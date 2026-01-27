import dayjs from "dayjs";

export function deliveryProgressPercentage( orderTimeMs, deliveryTimeMs ) {
  const totalDeliveryTimeMs = deliveryTimeMs - orderTimeMs;
  const timePassedMs = dayjs().valueOf() - orderTimeMs;
  // const timePassedMs = totalDeliveryTimeMs * 0.3;
  
  let deliveryPercentage = (timePassedMs / totalDeliveryTimeMs) * 100;

  if(deliveryPercentage >= 100) deliveryPercentage = 100;

  return deliveryPercentage;
}