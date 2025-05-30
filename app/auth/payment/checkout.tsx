import React, { useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { DISPATCH_ACTION } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CheckoutProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Checkout: React.FC<CheckoutProps> = ({ loading, setLoading }) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency);
  const [paymentSuccess, setPaymentSuccess] = useState(false);


  const router = useRouter();

  const onCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setCurrency(value);
    dispatch({
      type: DISPATCH_ACTION.RESET_OPTIONS,
      value: {
        ...options,
        currency: value,
      },
    });
  };

  const onCreateOrder = (data: Record<string, unknown>, actions: any) => {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "100.00",
          },
        },
      ],
    });
  };

  const onApproveOrder = async (
    data: Record<string, unknown>,
    actions: any
  ) => {
    if (!actions || !actions.order) {
      console.error("Order actions are undefined");
      return;
    }

    try {
      const details = await actions.order.capture();
      const payerName = details?.payer?.name?.given_name || "Unknown User";
      const transactionId = details.id;

      const response = await fetch("/api/payment/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transactionId,
          payerName,
          amount: details?.purchase_units?.[0]?.amount?.value || "0.00",
          currency:
            details?.purchase_units?.[0]?.amount?.currency_code || "USD",
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Payment recorded successfully:", result);
        setPaymentSuccess(true);
        router.push("/auth/success");
        window.location.reload(); 
      } else {
        console.error("Failed to record payment:", result);
      }
    } catch (error) {
      console.error("Error capturing payment:", error);
    }
  };


  

  return (
    <div className="checkout">
      {isPending ? (
        <p>LOADING...</p>
      ) : (
        <>
          <select value={currency} onChange={onCurrencyChange}>
            <option value="USD">💵 USD</option>
          </select>
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={onCreateOrder}
            onApprove={onApproveOrder}
          />
        </>
      )}
    </div>
  );
};

export default Checkout;
