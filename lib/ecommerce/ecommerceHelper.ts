import { fetcher } from '../fetcher';

const BASE_URL = '/api/ecommerce';

export const getAllProducts = () => fetcher(BASE_URL);

export const getProductById = (id: string) =>
  fetcher(`${BASE_URL}/${id}`);

export const createProduct = (data: any) =>
  fetcher(`${BASE_URL}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const updateProduct = (id: string, data: any) =>
  fetcher(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const deleteProduct = (id: string) =>
  fetcher(`${BASE_URL}/${id}`, { method: 'DELETE' });

export const getCartItems = () => fetcher(`${BASE_URL}/cart`);

export const createCartItem = (productId: string, quantity: number = 1) =>
  fetcher(`${BASE_URL}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity }),
  });

export const deleteCartItem = (productId: string) =>
  fetcher(`${BASE_URL}/cart`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId }),
  });

export const getWishlistItems = () => fetcher(`${BASE_URL}/wishlist`);

export const createWishlistItem = (productId: string) =>
  fetcher(`${BASE_URL}/wishlist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId }),
  });

export const deleteWishlistItem = (productId: string) =>
  fetcher(`${BASE_URL}/wishlist`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId }),
  });

export const requestPurchaseProduct = (productId: string ) =>
  fetcher(`${BASE_URL}/deal`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId }),
  });