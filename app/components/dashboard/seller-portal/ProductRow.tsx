import StatusBadge from "./StatusBadge";
import TableButtons from "./TableButton";


type ProductRowProps = {
  index: number;
  type: "live" | "inventory" | "orders";
  data: any;
};

const ProductRow = ({ index, type, data }: ProductRowProps) => {
  return (
    <div className={`grid items-center  px-6 py-3 border-b border-[#E6E4E7] w-full ${type === 'live' ? 'grid-cols-[5%_35%_10%_10%_30%_10%]' : 'grid-cols-[5%_35%_10%_10%_10%_10%_20%] '}`}>
      <div>{String(index + 1).padStart(2, "0")}</div>

      <div className="flex items-center gap-3">
        <img src={data.image} alt={data.name} className="w-10 h-10" />
        <div>{data.name}</div>
      </div>

      <div>{data.price || data.grade}</div>
      <div>{data.skus}</div>

      {type === "live" && (
        <>
          <div className="flex items-center justify-start gap-0">
            <span>{data.liveStream}</span>
            <StatusBadge status={data.status} />
          </div>
          <div className="flex gap-10 max-sm:flex-col max-sm:gap-2">
            <TableButtons variant="delete" />
            <TableButtons variant="edit" />
          </div>
        </>
      )}

      {type === "inventory" && (
        <>
          <div>{data.category}</div>
          <div>{data.dateAdded}</div>
          <div className="flex gap-10 max-sm:flex-col max-sm:gap-2">
            <TableButtons variant="ship" />
            <TableButtons variant="know-more" />
          </div>
        </>
      )}

      {type === "orders" && (
        <>
          <div className="flex items-center gap-2">
            <img src={data.customer.avatar} alt={data.customer.name} className="w-6 h-6 rounded-full" />
            <span className="underline">{data.customer.name}</span>
          </div>
          <div>{data.purchaseDate}</div>
          <div className="flex gap-10 max-sm:flex-col max-sm:gap-2">
            <TableButtons variant="ship" />
            <TableButtons variant="know-more" />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductRow;