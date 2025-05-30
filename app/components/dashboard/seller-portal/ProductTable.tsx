import { ReactNode } from "react";

interface Column {
  header: string;
  width?: string;
}

interface ProductTableProps {
  columns: Column[];
  children: ReactNode;
  className?: string;
  childClasses?: string;
}

const ProductTable = ({
  columns,
  children,
  className = "",
  childClasses
}: ProductTableProps) => {
  return (
    <div
      className={`  bg-white mb-5 rounded-xl border-solid border-1  border-[#E6E4E7]  w-full ${className}`}
    >
      <div className={`grid   text-sm text-[#001625] bg-[#F6F5F6] px-5 py-5 w-full rounded-t-xl border-[#E6E4E7] border-b ${childClasses}`}>
        {columns.map((column, index) => (
          <div key={index} style={column.width ? { width: column.width } : {}}>
            {column.header}
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};

export default ProductTable;