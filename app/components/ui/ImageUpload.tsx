import React from "react";

interface ImageUploadProps {
  onChange: (files: File[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange }) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    onChange(files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    onChange(files);
  };

  return (
    <div
      className="justify-center items-center border border-[color:var(--Input-Default-Stroke,#9C9CA3)] bg-white flex min-w-60 w-full flex-col overflow-hidden flex-1 shrink basis-[0%] px-20 py-[102px] rounded-[5px] border-dashed"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="flex flex-col items-center">
        <div className="flex min-h-14 w-14" />
        <div className="mt-4 text-xl">Browser or Desktop</div>
        <input
          type="file"
          multiple
          className="hidden"
          onChange={handleChange}
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default ImageUpload;