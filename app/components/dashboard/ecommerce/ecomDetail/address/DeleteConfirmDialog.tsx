import React from "react";

interface DeleteConfirmDialogProps {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  isVisible,
  onCancel,
  onConfirm,
}) => {
  if (!isVisible) return null;

  return (
    <div
      className="bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex w-[426px] max-w-full flex-col pl-8 pr-4 pt-8 pb-4 rounded-xl max-md:pl-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <h2
        id="dialog-title"
        className="text-[rgba(0,22,37,1)] text-base leading-none text-center"
      >
        Are you sure you want to delete this address?
      </h2>
      <div className="flex  max-w-full items-end justify-end gap-4 text-sm leading-loose mt-[47px] max-md:mt-10">
        <button
          onClick={onCancel}
          className="text-[rgba(0,22,37,1)] grow my-auto hover:opacity-80 cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="border flex items-center gap-1 text-[rgba(215,40,40,1)] px-4 py-2 rounded-lg border-[rgba(215,40,40,1)] border-solid hover:bg-red-50 cursor-pointer"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/92d5f47b278f7bb9da0bd1b541c0fb02876834af?placeholderIfAbsent=true"
            className="aspect-[0.8] object-contain w-4 self-stretch  my-auto"
            alt=""
          />
          <span className="self-stretch ">Yes, Delete</span>
        </button>
      </div>
    </div>
  );
};