import { fetcher } from "../fetcher";

const BASE_URL = '/api/user';

export const requestWithdrawal = (amount: number ) =>
  fetcher(`${BASE_URL}/withdrawal`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount }),
  });