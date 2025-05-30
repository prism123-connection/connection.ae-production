import { useEffect, useState } from "react";
import { WishlistHeader } from "./WishlistHeader";
import { WishlistItem } from "./WishlistItem";
import { deleteWishlistItem, getWishlistItems } from "@/lib/ecommerce/ecommerceHelper";
import { toast } from "sonner";
import ActionButton from "@/app/components/ui/ActionButton";


export const WishlistContainer = () => {
 
    const [wishlistItems, setWishlistItems] = useState<any[]>([]); // Assuming cartItems is an array
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
  
    const fetchWishlistItems= async () => {
      try {
        const response = await getWishlistItems();
        setWishlistItems(response);
      } catch (error) {
        console.log(error)
        setError(true);
      } finally {
        setLoading(false);
      }
    };
  
    const handleRemoveItem = async (index: number) => {
      try {
        const productId = wishlistItems[index]?.productId;
        if (!productId) return;
        setWishlistItems((items) => items.filter((_, i) => i !== index));
        await deleteWishlistItem(productId);
        toast.success('Cart Item remove successfully')
  
      } catch (error) {
        console.error('Failed to remove item from cart:', error);
      }
    };
  
    useEffect(() => {
      fetchWishlistItems();
    }, []);

  return (
    <div className="bg-white flex items-center gap-2.5 overflow-hidden justify-center px-2.5 w-full ">
      <div className="self-stretch min-w-60 flex flex-col items-center w-full  max-md:px-5 max-w-4xl">
        <h1 className="text-black text-xl font-semibold leading-[1.6] text-left w-full ">
          Your Wishlist
        </h1>
        <div className="w-full  mt-10 max-md:max-w-full">
        {
        loading && (
          <div className="w-full bg-white rounded-lg flex p-16 flex-col px-8 items-end">
            <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
          </div>
        )
      }
    
      {
        wishlistItems.length === 0 && loading === false && !error && (
          <div className="w-full py-10 flex items-center justify-center">
          <span>You had zero items in cart</span>
          </div>
        )
      }
      {
        error && !loading && (
          <div className="w-full py-10 flex items-center justify-center">
          <ActionButton onClick={fetchWishlistItems}>Retry</ActionButton>
          </div>
        )
      }
          <WishlistHeader/>
          {wishlistItems.map((item, index) => (
            <WishlistItem
            key={item.id}
            image={item.product.productImages?.[0]?.url || ''}
            name={item.product.name}
            price={item.product.price}
            quantity={item.quantity}
            onRemove={() => handleRemoveItem(index)}
             />
          ))}
        </div>
      </div>
    </div>
  );
};