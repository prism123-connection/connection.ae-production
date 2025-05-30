import { fetcher } from "@/lib/fetcher";

const BASE_URL = '/api/admin/products';

export const getAllProductsListed = () =>fetcher(BASE_URL)

export const productManager = (productId: string, approvalStatus: string) => 
      fetcher(`${BASE_URL}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({productId, approvalStatus}),
});