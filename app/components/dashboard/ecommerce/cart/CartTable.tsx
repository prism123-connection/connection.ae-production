import React, { useEffect, useState } from "react";
import { CartItem, CartItemProps } from "./CartItem";
import { deleteCartItem, getCartItems } from "@/lib/ecommerce/ecommerceHelper";
import ActionButton from "@/app/components/ui/ActionButton";
import { toast } from "sonner";


interface CartTableProps {
  items: CartItemProps[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
}

export const CartTable: React.FC<CartTableProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const [cartItems, setCartItems] = useState<any[]>([]); // Assuming cartItems is an array
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchCartItems = async () => {
    console.log('running fun')
    try {
      const response = await getCartItems();
      setCartItems(response);
    } catch (error) {
      console.log(error)
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (index: number) => {
    try {
      const productId = cartItems[index]?.productId;
      if (!productId) return;
      setCartItems((items) => items.filter((_, i) => i !== index));
      await deleteCartItem(productId);
      toast.success('Cart Item remove successfully')

    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);


  return (
    <div className="w-full font-semibold max-md:max-w-full">
      {/* <button onClick={fetchCartItems} className="p-5 bg-amber-200">Retry</button> */}
      <div className="justify-between border-b-[color:var(--neutral-04100,#6C7275)] flex w-full gap-[40px_100px] text-base text-[#121212] whitespace-nowrap leading-loose flex-wrap pb-5 border-b border-solid max-md:max-w-full">
        <div>Product</div>
        <div className="flex min-w-60 items-center gap-[40px_72px] justify-between w-[322px]">
          <div className="self-stretch my-auto">Quantity</div>
          <div className="self-stretch my-auto">Price</div>
          <div className="self-stretch my-auto">Subtotal</div>
        </div>
      </div>
      {
        loading && (
          <div className="w-full bg-white rounded-lg flex p-16 flex-col px-8 items-end">
            <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
          </div>
        )
      }
    
      {
        cartItems.length === 0 && loading === false && !error && (
          <div className="w-full py-10 flex items-center justify-center">
          <span>You had zero items in cart</span>
          </div>
        )
      }
      {
        error && !loading && (
          <div className="w-full py-10 flex items-center justify-center">
          <ActionButton onClick={fetchCartItems}>Retry</ActionButton>
          </div>
        )
      }
      {cartItems.length > 0 &&  cartItems.map((item, index) => (
         <CartItem
         key={item.id}
         image={item.product.productImages?.[0]?.url || ''}
         name={item.product.name}
         price={item.product.price}
         quantity={item.quantity}
         onQuantityChange={(quantity) => onUpdateQuantity(index, quantity)}
         onRemove={() => handleRemoveItem(index)}
       />
      ))}
    </div>
  );
};
