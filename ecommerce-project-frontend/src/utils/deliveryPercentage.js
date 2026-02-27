import dayjs from "dayjs";

export function deliveryPercentage( orderTimeMs, deliveryTimeMs ) {
  const totalDeliveryTimeMs = deliveryTimeMs - orderTimeMs;
  const timePassedMs = dayjs().valueOf() - orderTimeMs;
  // const timePassedMs = totalDeliveryTimeMs * 0.3;
  
  let deliveryProgress = (timePassedMs / totalDeliveryTimeMs) * 100;

  if(deliveryProgress >= 100) deliveryProgress = 100;

  return deliveryProgress;
}