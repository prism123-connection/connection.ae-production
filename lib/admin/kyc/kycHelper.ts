import { fetcher } from "@/lib/fetcher";

const BASE_URL = '/api/admin/kyc';

export const getAllKyclist = () =>fetcher(BASE_URL)

export const kycManager = (userId: string, action : boolean) => 
      fetcher(`${BASE_URL}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userId, action}),
});