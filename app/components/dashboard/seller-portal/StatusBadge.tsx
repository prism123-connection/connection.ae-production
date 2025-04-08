interface StatusBadgeProps {
    status: string;
  }
  
  const StatusBadge = ({ status }: StatusBadgeProps) => {
    return (
      <div className="border text-[#F67F07] text-xs bg-[#FFF9F5] ml-2 px-3 py-1 rounded-[40px] border-solid border-[#FEB78A]">
        {status}
      </div>
    );
  };
  
  export default StatusBadge;
  