import React, { useState } from 'react'
import { toast } from 'sonner';

interface CopyButtonProps {
    textToCopy: string;
  }

  export const CopyAffiliate = ({ textToCopy }: CopyButtonProps) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);
        // toast({
        //   title: "Copied!",
        //   description: "The affiliate code has been copied to your clipboard.",
        // });
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        // toast({
        //   title: "Error",
        //   description: "Failed to copy text to clipboard",
        //   variant: "destructive",
        // });
      }
    };
  
    return (
      <button
        onClick={handleCopy}
        className="bg-[rgba(12,135,214,1)] text-white px-6 py-3 rounded-[10px] flex items-center gap-[31px]"
      >
        <span>{isCopied ? "Copied!" : "Copy"}</span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/2274f7e5ab0b7d9077bebe6eceb5af45c7493130?placeholderIfAbsent=true"
          alt="Copy icon"
          className="aspect-[0.87] object-contain w-3.5"
        />
      </button>
    );
  
}

export default CopyAffiliate