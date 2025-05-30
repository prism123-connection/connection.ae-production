interface StreamStatsProps {
    viewerCount?: string;
    time: string;
    date: string;
  }
  
  export const StreamStats = ({ viewerCount, time, date }: StreamStatsProps) => {
    return (
      <div className="flex justify-between items-center mt-4">
        <div className="text-[rgba(0,0,0,0.58)] text-base">{date}</div>
        <div className="flex items-center gap-[13.2px]">
          {viewerCount ? (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#D72828]" />
              <span className="text-[rgba(0,0,0,0.58)] text-base">
                {viewerCount}K watched
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 3V9H13.5M18 9C18 10.1819 17.7672 11.3522 17.3149 12.4442C16.8626 13.5361 16.1997 14.5282 15.364 15.364C14.5282 16.1997 13.5361 16.8626 12.4442 17.3149C11.3522 17.7672 10.1819 18 9 18C7.81811 18 6.64778 17.7672 5.55585 17.3149C4.46392 16.8626 3.47177 16.1997 2.63604 15.364C1.80031 14.5282 1.13738 13.5361 0.685084 12.4442C0.232792 11.3522 0 10.1819 0 9C0 6.61305 0.948211 4.32387 2.63604 2.63604C4.32387 0.948211 6.61305 0 9 0C11.3869 0 13.6761 0.948211 15.364 2.63604C17.0518 4.32387 18 6.61305 18 9Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-[rgba(0,0,0,0.58)] text-base">{time}</span>
            </div>
          )}
        </div>
      </div>
    );
  };