import React from "react";

interface ProductImageProps {
  src: string;
  alt: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="aspect-[1] object-contain w-10 self-stretch shrink-0 my-auto"
    />
  );
};
