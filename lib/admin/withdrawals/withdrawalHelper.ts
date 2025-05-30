import { fetcher } from "@/lib/fetcher";

const BASE_URL = '/api/admin/withdrawal';

export const getAllWithdrawalRequested = () =>fetcher(BASE_URL)

export const withDrawalManager = ( withdrawalId: string, action: string ) => 
      fetcher(`${BASE_URL}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({withdrawalId, action}),
});