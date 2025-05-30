// Example button component
'use client';
import CommonAvatar from '@/app/components/ui/CommonAvatar';
import { useState } from 'react';

export default function PayButton() {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    const res = await fetch('/api/ngenius/order', {
      method: 'POST',
      body: JSON.stringify({ amount: 100 }),
      headers: { 'Content-Type': 'application/json' },
    });

    const { paymentUrl } = await res.json();
    // const { data } = await res.json();
    console.log(paymentUrl)
    window.location.href = paymentUrl; // redirect to hosted payment page
    setLoading(false)
  };

  return (
    <div className='w-[100%] h-screen mt-20 '>
      sdf
   <CommonAvatar  />
    </div>
  );
}
