import React from "react";

interface AccountMenuProps {

}

export const AccountMenu: React.FC<AccountMenuProps> = ({

}) => {
  return (
    <div className="w-[158px] max-w-full text-sm text-black font-normal leading-none absolute top-26 right-0">
      <div className="bg-white border flex flex-col p-4 rounded-2xl border-[rgba(227,227,227,1)] border-solid">
        <div className="cursor-default">Your account</div>
        <button
        //   onClick={onLogout}
          className="mt-4 text-left hover:text-[#E95744] transition-colors"
        >
          Log out
        </button>
        <button
        //   onClick={onSupport}
          className="self-stretch mt-4 text-left hover:text-[#E95744] transition-colors"
        >
          Contact support
        </button>
      </div>
    </div>
  );
};