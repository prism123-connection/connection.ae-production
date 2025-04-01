import React from "react";

interface ProductImageProps {
  src: string;
  alt: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ src, alt }) => {
  return (
    <div className="w-[45%] max-md:w-full max-md:ml-0">
      <img
        src={src}
        alt={alt}
        className="aspect-[0.79] object-contain w-full rounded-[0px_0px_0px_0px] max-md:max-w-full max-md:mt-8"
      />
    </div>
  );
};