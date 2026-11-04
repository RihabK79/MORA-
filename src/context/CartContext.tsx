import React, {createContext,useContext,useEffect,useMemo,useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Product,CartLine} from '../types';
type Ctx={items:CartLine[];add:(p:Product)=>void;remove:(id:string)=>void;changeQuantity:(id:string,d:number)=>void;clear:()=>void;count:number;total:number};
const CartContext=createContext<Ctx|undefined>(undefined); const KEY='@mora/cart';
export function CartProvider({children}:React.PropsWithChildren){const [items,setItems]=useState<CartLine[]>([]);const [ready,setReady]=useState(false);
 useEffect(()=>{AsyncStorage.getItem(KEY).then(v=>{if(v)setItems(JSON.parse(v));}).catch(()=>{}).finally(()=>setReady(true));},[]);
 useEffect(()=>{if(ready)AsyncStorage.setItem(KEY,JSON.stringify(items)).catch(()=>{});},[items,ready]);
 const add=(p:Product)=>setItems(old=>{const f=old.find(x=>x.product.id===p.id);return f?old.map(x=>x.product.id===p.id?{...x,quantity:x.quantity+1}:x):[...old,{product:p,quantity:1}];});
 const remove=(id:string)=>setItems(old=>old.filter(x=>x.product.id!==id));const changeQuantity=(id:string,d:number)=>setItems(old=>old.map(x=>x.product.id===id?{...x,quantity:x.quantity+d}:x).filter(x=>x.quantity>0));const clear=()=>setItems([]);
 const count=items.reduce((s,x)=>s+x.quantity,0),total=items.reduce((s,x)=>s+x.product.price*x.quantity,0);
 const value=useMemo(()=>({items,add,remove,changeQuantity,clear,count,total}),[items,count,total]);return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart(){const v=useContext(CartContext);if(!v)throw new Error('useCart must be inside CartProvider');return v;}
