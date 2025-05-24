import { ReactNode } from "react";

interface Column {
  header: string;
  width?: string;
}

interface ProductTableProps {
  columns: Column[];
  children: ReactNode;
  className?: string;
  childClassName?: string; 
}

const TableWrapperAdmin = ({
  columns,
  children,
  className = "",
  childClassName
}: ProductTableProps) => {
  return (
    <div
      className={`border shadow-[0_1px_2px_rgba(16,24,40,0.05)] bg-white mb-5 rounded-xl border-solid border-[#F6F5F6] w-full ${className}`}
    >
      <div className={`grid   text-sm text-[#001625] bg-[#F6F5F6] px-5 py-5 w-full rounded-xl ${columns.length === 6 ? 'grid-cols-[5%_35%_10%_10%_30%_10%]' : 'grid-cols-[5%_35%_10%_10%_10%_10%_20%]'} ${childClassName}`}>
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

export default TableWrapperAdmin;