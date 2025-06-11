import { fetcher } from '../fetcher';

const BASE_URL = '/api/sellerPortal';

export const getAllSellerInfo = () => fetcher(`${BASE_URL}/stats`);

export const updateDeliveryStatus = (dealId : string, deliveryStatus : string) => {
  return fetcher(`${BASE_URL}/order/action`, {
    method: 'POST',
    body: JSON.stringify({ dealId, deliveryStatus }),
  });
}