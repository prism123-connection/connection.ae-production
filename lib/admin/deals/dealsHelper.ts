import { fetcher } from "@/lib/fetcher";

const BASE_URL = '/api/admin/deals';

export const getAllDealsListed = () =>fetcher(BASE_URL)

export const dealsManageer = ( dealId: string, dealStatus: string, productId: string ) => 
      fetcher(`${BASE_URL}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({dealId, dealStatus, productId}),
});