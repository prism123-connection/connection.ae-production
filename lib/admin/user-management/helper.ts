import { fetcher } from "@/lib/fetcher";

const BASE_URL = '/api/admin/user-management';

export const getAllUsersListed = () =>fetcher(BASE_URL)