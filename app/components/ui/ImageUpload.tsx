import React, { useRef, useState } from "react";
import { MdOutlineInput } from "react-icons/md";

interface ImageUploadProps {
  onChange: (files: File[], done: () => void) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange }) => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setLoading(true);

    const done = () => {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      setLoading(false);
    };

    onChange(files, done);
  };

  return (
    <div className="justify-center items-center border border-[color:var(--Input-Default-Stroke,#9C9CA3)] bg-white flex min-w-60 w-full flex-col overflow-hidden flex-1 shrink basis-[0%] px-20 py-[102px] rounded-[5px] border-dashed cursor-pointer">
      <div className="flex flex-col items-center">
        <div className="flex min-h-14 w-14" />
        <label htmlFor="imageUpload" className="mt-4 text-xl flex gap-2 items-center justify-center p-5 border-2 rounded-lg border-black/50 cursor-pointer text-black/50 py-2">Browse Files <MdOutlineInput /></label>
        {loading ? (
          <div className="w-full bg-white rounded-lg flex p-16 flex-col px-8 items-end">
            <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <input
            id="imageUpload"
            ref={inputRef}
            name="imageInput"
            type="file"
            multiple
            onChange={handleChange}
            accept="image/*"
            className="hidden"
          />
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
