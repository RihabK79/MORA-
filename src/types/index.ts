export type Category = 'Skincare' | 'Makeup' | 'Perfumes';
export type Product = { id: string; name: string; category: Category; subcategory?: string; price: number; description: string; image: number | string; ingredients?: string; size?: string };
export type Client = { id: string; name: string; email: string; phone?: string; country?: string };
export type CartLine = { product: Product; quantity: number };
export type Order = { id: string; date: string; items: CartLine[]; total: number; status: 'Confirmed' | 'Preparing' | 'Delivered'; address: string; payment: string };
