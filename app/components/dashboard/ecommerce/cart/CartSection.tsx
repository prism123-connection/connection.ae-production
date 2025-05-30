"use client"
import React, { useState } from 'react'
import { CartTable } from './CartTable';

function CartSection() {

     interface CartItemProps {
        image: string;
        name: string;
        color: string;
        quantity: number;
        price: number;
        onQuantityChange?: (quantity: number) => void;
        onRemove?: () => void;
      }

    const [cartItems, setCartItems] = useState<CartItemProps[]>([
        {
          image:
            "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/00437beafe049aadcc38076cd0edfd9c47be9643?placeholderIfAbsent=true",
          name: "AK-900 Wired Keyboard",
          color: "Black",
          quantity: 1000,
          price: 80,
        },
        {
          image:
            "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/024ba6a06e22adf29393c50b7c8ff252f8495188?placeholderIfAbsent=true",
          name: "Tray Table",
          color: "Red",
          quantity: 2,
          price: 19.0,
        },
        {
          image:
            "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/d6388eeff0f8d82961cefa8d54e9caffaa595c58?placeholderIfAbsent=true",
          name: "Table lamp",
          color: "Gold",
          quantity: 1,
          price: 39.0,
        },
      ]);
    
      const handleUpdateQuantity = (index: number, quantity: number) => {
        setCartItems((items) =>
          items.map((item, i) => (i === index ? { ...item, quantity } : item)),
        );
      };
    
      const handleRemoveItem = (index: number) => {
        setCartItems((items) => items.filter((_, i) => i !== index));
      };
    
      const handleCheckout = () => {
        // Implement checkout logic
        console.log("Processing checkout...");
      };


  return (
    <main className=" flex flex-col overflow-hidden items-start justify-start px-2.5 w-full mt-5 ">
        <div className="text-3xl text-black font-medium whitespace-nowrap tracking-[-1px] leading-none max-md:text-[40px]">
      Cart
    </div>
    <section className="flex w-full max-w-full pr-10 flex-col justify-center mt-10 ">
      <CartTable
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
      {/* <CheckoutButton onClick={handleCheckout} /> */}
    </section>
  </main>
  )
}

export default CartSection