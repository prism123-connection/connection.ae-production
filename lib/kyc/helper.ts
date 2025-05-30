import { fetcher } from "../fetcher";

const BASE_URL = '/api/user/kyc';

export const createKycRequest = ( formData: {} ) => 
      fetcher(`${BASE_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
});