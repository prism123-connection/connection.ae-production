import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface AccountMenuProps {

}

export const AccountMenu: React.FC<AccountMenuProps> = ({ }) => {
  const router = useRouter(); 
  const [loading, setLoading] = useState(false)
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const {user} = useUser()

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

    const [cardState, setCardState] = useState(false)
  const [isCardLoading, setIsCardLoading] = useState(false);
  const handleCard = () => {
    setIsCardLoading(true);
    setCardState(!cardState);
    
    // Set a delay for loading state
    setTimeout(() => {
      setIsCardLoading(false);
      // Set a small delay before showing the modal to ensure smooth transition
      setIsCardModalOpen(true);
    }, 2000);
  }

  // Close modal handler
  const closeCardModal = () => {
    setIsCardModalOpen(false);
    setTimeout(() => {
      setCardState(false);
    }, 400); // match this with the transition duration
  }

  if (loading) {
    return (
      <div className="w-full h-screen fixed top-0 left-0 flex justify-center items-center z-20 bg-white text-4xl">
       <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
      </div>
    )
  }

  const numbers = ["0","1","2","3","4","5","6","7","8","9"]
  let generatedID = [];
  const userID = () => {
    const id = user?.id;
    if (id) {
      for (let i = 0; i < id.length; i++) {
        if (numbers.includes(id[i])) {
          generatedID.push(id[i]);
        }
      }
    }
    return "2" + generatedID.slice(0, 3).join("") + " " + generatedID.slice(4, 8).join("") + " " + generatedID.slice(8, 12).join("") + " " + generatedID.slice(12, 16).join("");
  }


  // Prevent scrolling when modal is open
  useEffect(() => {
    if (cardState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [cardState]);

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
          onClick={handleCard}
          className="mt-4 text-left hover:text-[#E95744] transition-colors cursor-pointer"
        >
          Your Card
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

       {cardState && (
        <div 
          className="w-full h-screen fixed top-0 left-0 flex justify-center items-center z-50"
        >
          {/* Background overlay */}
          <div 
            className="absolute inset-0 transition-all duration-400 ease-in-out"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              opacity: isCardModalOpen ? 1 : 0 
            }}
            onClick={closeCardModal}
          />
          
          {/* Content container */}
          <div className="relative z-[60]">
            {isCardLoading ? (
              <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
                <div className="animate-spin h-8 w-8 border-4 border-[#E95744] border-t-transparent rounded-full"></div>
                <p className="mt-4 text-gray-600">Loading your card...</p>
              </div>
            ) : (
              <div 
                className={`w-[600px] h-[380px] rounded-2xl relative transform transition-all duration-400 ease-out ${isCardModalOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  {/* Card background image - using the Cloudinary URL */}
                  <div className="absolute inset-0 rounded-2xl">
                    <img 
                      src="https://res.cloudinary.com/dwshx7qui/image/upload/v1749618153/Connection_Member_Card_mehd7b.png" 
                      alt="Connection Card" 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  
                  {/* Card details overlapping the card image in the bottom left */}
                  <div className="absolute bottom-14 left-18 text-white z-10">
                    <p className="text-lg font-medium tracking-wider mt-2 drop-shadow-md text-white">{userID() || 'xxxx-xxxx-xxxx-xxxx'}</p>
                    <h4 className="text-lg text-white font-medium mt-1 drop-shadow-md">{user?.firstName.toUpperCase() || 'User'} {user?.lastName.toUpperCase() || ''}</h4>
                  </div>
                </div>
              
                
                {/* Close button */}
                <button 
                  onClick={closeCardModal}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-800 hover:bg-gray-100 transition-colors z-10 shadow-md"
                  aria-label="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};