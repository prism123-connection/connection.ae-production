import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface AccountMenuProps {

}

export const AccountMenu: React.FC<AccountMenuProps> = ({ }) => {
  const router = useRouter(); 
  const [loading, setLoading] = useState(false)

  const { setUser } = useUser();
  const handleLogout = async () => {
    setLoading(true)
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
  };

  const handleSupport = () =>{
    const email = "theconnection.ae@gmail.com";
    const subject = encodeURIComponent("Requesting Support for Platform assistance");
    const body = encodeURIComponent("Hi, \n\nI'm reaching out to get assistance with integrating and setting up support for this platform. Please let me know the next steps or any documentation I should follow. \n\nThanks!");

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  }

  if (loading) {
    return (
      <div className="w-full h-screen fixed top-0 left-0 flex justify-center items-center z-20 bg-white text-4xl">
       <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="w-[158px] max-w-full text-sm text-black font-normal leading-none absolute top-26 right-0">
      <div className="bg-white border flex flex-col p-4 rounded-2xl border-[rgba(227,227,227,1)] border-solid">
      
        <button
          onClick={() => router.push("/settings")}
          className="mt-4 text-left hover:text-[#E95744] transition-colors cursor-pointer"
        >
         Your account
        </button>

        <button
          // onClick={() => router.push("/settings")}
          className="mt-4 text-left hover:text-[#E95744] transition-colors cursor-pointer"
        >
         E-commerce Setup 
        </button>

        <button
          // onClick={() => router.push("/settings")}
          className="mt-4 text-left hover:text-[#E95744] transition-colors cursor-pointer"
        >
         Switch to Buyer
        </button>

        <button
          onClick={handleLogout}
          className="mt-4 text-left hover:text-[#E95744] transition-colors cursor-pointer"
        >
          Log out
        </button>
        <button
          onClick={handleSupport}
          className="self-stretch mt-4 text-left hover:text-[#E95744] transition-colors cursor-pointer"
        >
          Contact support
        </button>
      </div>
    </div>
  );
};