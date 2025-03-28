interface StepCardProps {
    number: number;
    title: string;
    description: string;
  }
  
  export const StepCard = ({ number, title, description }: StepCardProps) => {
    return (
      <article className="flex flex-col items-stretch flex-1">
        <h3 className="text-base font-semibold text-[rgba(0,22,37,1)] text-center">
          {title}
        </h3>
        <p className="text-sm font-normal leading-[21px] text-[rgba(0,22,37,1)] text-center mt-1">
          {description}
        </p>
      </article>
    );
  };
  