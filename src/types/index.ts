export type Category = 'Skincare' | 'Makeup' | 'Perfumes';
export type Product = { id: string; name: string; category: Category; price: number; description: string; image: string; ingredients?: string; size?: string };
export type Client = { id: string; name: string; email: string; phone?: string };
export type CartLine = { product: Product; quantity: number };
export type Order = { id: string; date: string; items: CartLine[]; total: number; status: 'Confirmed' | 'Preparing' | 'Delivered'; address: string; payment: string };
