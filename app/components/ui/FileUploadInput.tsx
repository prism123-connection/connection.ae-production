import React from "react";

interface FileUploadInputProps {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
  id: string;
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({
  label,
  file,
  onChange,
  id,
}) => {
  return (
    <div className="flex flex-col mb-5">
      <label className="text-sm  text-[rgba(31,88,124,1)] mb-2">{label}</label>
      <label
        htmlFor={id}
        className="cursor-pointer py-2 bg-gray-500 text-white text-sm rounded-md hover:bg-blue-700 w-fit px-10"
      >
        Upload File
      </label>
      <input
        id={id}
        type="file"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />
      <span className="ml-3 text-sm text-gray-600 mt-2">
        {file?.name || "No file chosen"}
      </span>
    </div>
  );
};

export default FileUploadInput;
