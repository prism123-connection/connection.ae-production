import { fetcher } from "@/lib/fetcher";

const BASE_URL = '/api/admin/transactions';

export const getAllTransactions = () =>fetcher(BASE_URL)