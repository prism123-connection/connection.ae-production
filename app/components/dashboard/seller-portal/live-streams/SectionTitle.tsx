interface SectionTitleProps {
    title: string;
  }
  
  export const SectionTitle = ({ title }: SectionTitleProps) => {
    return (
      <div className="flex items-center gap-3">
        <div className="w-1 h-[42px] bg-[#001625] rounded-[0px_12px_12px_0px]" />
        <h2 className="text-black text-2xl leading-9">{title}</h2>
      </div>
    );
  };
  