import Image from 'next/image'
import React from 'react'

interface IncomeStatsProps {
  referralBonus : string | number;
  walletBalance : string | number;
}

const IncomeStatCards: React.FC<IncomeStatsProps> = ({  referralBonus, walletBalance }) => {
  return (
    <div className='w-full flex gap-10'>
    <div className="h-40 rounded-lg relative p-4 bg-[#EAFCE8] text-[#256A1D] w-full flex flex-col justify-start max-w-[450px]">
              <Image
                src={"/dash/top_1.svg"}
                alt={"dash_icon"}
                height={80}
                width={80}
                className="absolute top-4 right-4"
              />
              <h2 className="text-sm font-novaLight">Total earnings</h2>
              <p className="font-novaSB text-4xl mt-5 font-semibold">${referralBonus}</p>
            </div>
            <div className="h-40 rounded-lg relative p-4 bg-[#E8F6FC] text-[#256A1D] w-full flex flex-col justify-start max-w-[450px]">
              <Image
                src={"/dash/top_2.svg"}
                alt={"dash_icon"}
                height={80}
                width={80}
                className="absolute top-4 right-4"
              />
              <h2 className="text-sm font-novaLight">Wallet balance</h2>
              <p className="font-novaSB text-4xl mt-5 font-semibold">${walletBalance}</p>
            </div>

</div>
  )
}

export default IncomeStatCards