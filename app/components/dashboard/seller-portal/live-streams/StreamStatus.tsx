interface StreamStatusProps {
    status: "scheduled" | "live" | "ended";
  }
  
  export const StreamStatus = ({ status }: StreamStatusProps) => {
    const statusStyles = {
      scheduled: "text-[#F67F07] bg-[#FFF9F5] border-[#FEB78A]",
      live: "text-red-600 bg-red-50 border-red-200",
      ended: "text-gray-600 bg-gray-50 border-gray-200",
    };
  
    return (
      <div
        className={`text-xs leading-[18px] border px-3 py-1 rounded-[40px] ${statusStyles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    );
  };
  