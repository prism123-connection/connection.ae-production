interface StreamActionsProps {
    isUpcoming?: boolean;
  }
  
  export const StreamActions = ({ isUpcoming = false }: StreamActionsProps) => {
    return (
      <div className="flex gap-2 mt-4">
        <button
          className="flex-1 flex justify-center items-center h-[46px] bg-[#EAEBED] rounded-lg"
          aria-label={isUpcoming ? "Start streaming" : "View stream"}
        >
          <span className="text-[#001625] opacity-50 text-sm leading-[16.8px]">
            {isUpcoming ? "Go Live Now" : "View stream"}
          </span>
        </button>
        <button
          className="w-[46px] h-[46px] flex justify-center items-center bg-[#EAEBED] rounded-lg"
          aria-label="Edit stream"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.5"
              d="M14 6.5L15 5.5C15.2163 5.28367 15.5098 5.16211 15.8159 5.16211C16.122 5.16211 16.4154 5.28367 16.6318 5.5C16.8482 5.71633 16.9697 6.00983 16.9697 6.31589C16.9697 6.62195 16.8482 6.91545 16.6318 7.13178L7.78947 15.974C7.46421 16.2992 7.06297 16.5381 6.62217 16.6694L4.96985 17.1617L5.46217 15.5094C5.59336 15.0686 5.83236 14.6674 6.15757 14.342L14 6.5ZM14 6.5L15.6233 8.12336"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    );
  };
  