'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { toast } from 'sonner';

function CallBack() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ref = searchParams.get('ref');
  const dealId = searchParams.get('dealId');

  useEffect(() => {
    if (ref) {
      fetch(`/api/payment/ecommerce/ngenius/verify?ref=${dealId}`)
        .then(res => res.json())
        .then(({ status }) => {
          if (status === 'PURCHASED') {
            console.log(status)
            toast.success('Payment Successfully Made')
            router.push('/dashboard');
            window.location.reload(); 
          } else {
            console.log(status)
            toast.error('Error, the payment failed')
          }
        });
    }
  }, [ref]);

  return <div className='w-[100%] min-h-screen text-xl flex items-center justify-center'>Verifying payment... Please don't close the page</div>;
}

function PaymentCallback() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallBack/>
    </Suspense>
  );
}

export default PaymentCallback;
