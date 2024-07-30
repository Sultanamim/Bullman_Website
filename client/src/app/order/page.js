"use client";
import CartBox from "@/components/order/CartBox";
import CheckoutBox from "@/components/order/CheckoutBox";
import { useState } from "react";

export default function Order() {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("2343c4545");
  const updateAmount = amount.toFixed(2).toString();

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3001/payments/create-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: updateAmount,
            description: description,
            redirectUrl: "http://localhost:3000/order-detail",
            // webhookUrl: "http://127.0.0.1:4040/webhook/webhook",
            orderId: orderId,
          }),
        }
      );

      //console.log(await response.json());
      const data = await response.json();

      if (response.ok) {
        if (data && data._links && data._links.checkout) {
          window.location.href = data._links.checkout.href;
        } else {
          console.error("Failed to create payment link", data);
        }
      } else {
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("An error occurred while creating the payment:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    <div className="flex flex-row mt-20 px-20 justify-center items-center">
      <p>Loading...</p>
    </div>;
  }
  return (
    <div className="flex flex-row nlg:flex-col nlg:items-center mt-20 px-20 nlg:px-2">
      {/* Order Checkout */}
      <div className="w-4/5 bg-white p-5 nlg:px-0">
        <CheckoutBox
          description={description}
          setDescription={setDescription}
          handlePaymentSubmit={handlePaymentSubmit}
        />
      </div>

      {/* Cart Items */}
      <div className="ml-10 nlg:ml-0">
        <CartBox setAmount={setAmount} />
      </div>
    </div>
  );
}
