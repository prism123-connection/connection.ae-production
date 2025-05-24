interface ActionButtonProps {
    variant: "ship" | "delete" | "edit" | "know-more";
    onClick?: () => void;
  }
  
  const TableButtons = ({ variant, onClick }: ActionButtonProps) => {
    switch (variant) {
      case "ship":
        return (
          <button
            onClick={onClick}
            className="text-sm cursor-pointer border text-[#0C87D6] bg-sky-50 px-6 py-1 rounded-lg border-solid border-[#D7E9F5]"
          >
            Ship
          </button>
        );
      case "delete":
        return (
          <button
            onClick={onClick}
            className="text-sm cursor-pointer text-[#DC3434]"
          >
            Delete
          </button>
        );
      case "edit":
        return (
          <button
            onClick={onClick}
            className="text-sm cursor-pointer text-[#0C87D6]"
          >
            Edit
          </button>
        );
      case "know-more":
        return (
          <button onClick={onClick} className="text-xs text-[#001625] underline">
            Know more
          </button>
        );
      default:
        return null;
    }
  };
  
  export default TableButtons;