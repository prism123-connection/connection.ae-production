import { WishlistHeader } from "./WishlistHeader";
import { WishlistItem } from "./WishlistItem";


export const WishlistContainer = () => {
  const wishlistItems = [
    {
      checkboxImage:
        "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/604d7c4e52959a52c16905a9b315f20500c0a5fc?placeholderIfAbsent=true",
      productImage:
        "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/6814c05c07d94f132ea94e1fbee3431e58cfc733?placeholderIfAbsent=true",
      productName: "AK-900 Wired Keyboard",
      productColor: "Black",
      price: "$960",
      actionLabel: "Send approval",
    },
    {
      checkboxImage:
        "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/7ff3c588fcec789f2cb54dbcd7b603241e71be45?placeholderIfAbsent=true",
      productImage:
        "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/2f314e19547d16cbe04a795131e582a562adf374?placeholderIfAbsent=true",
      productName: "Sofa",
      productColor: "Beige",
      price: "$345",
      actionLabel: "Add to cart",
    },
    {
      checkboxImage:
        "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/7ff3c588fcec789f2cb54dbcd7b603241e71be45?placeholderIfAbsent=true",
      productImage:
        "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/9e4b832c871808efaed28af3c02fce3cf068046d?placeholderIfAbsent=true",
      productName: "Bamboo basket",
      productColor: "Beige",
      price: "$8.80",
      actionLabel: "Add to cart",
    },
    {
      checkboxImage:
        "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/7ff3c588fcec789f2cb54dbcd7b603241e71be45?placeholderIfAbsent=true",
      productImage:
        "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/734261147c94f5da461349f0a31c397fbef7c75d?placeholderIfAbsent=true",
      productName: "Pillow",
      productColor: "Beige",
      price: "$8.80",
      actionLabel: "Add to cart",
    },
  ];

  return (
    <div className="bg-white flex items-center gap-2.5 overflow-hidden justify-center px-2.5 w-full ">
      <div className="self-stretch min-w-60 flex flex-col items-center w-full  max-md:px-5 max-w-4xl">
        <h1 className="text-black text-xl font-semibold leading-[1.6] text-left w-full ">
          Your Wishlist
        </h1>
        <div className="w-full  mt-10 max-md:max-w-full">
          <WishlistHeader/>
          {wishlistItems.map((item, index) => (
            <WishlistItem key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};