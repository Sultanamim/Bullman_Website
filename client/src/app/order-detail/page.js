"use client";
import GuestOrderForm from "@/components/order-detail/GuestOrderForm";
import OrderDetails from "@/components/order-detail/OrderDetails";
import React, { useState } from "react";

export default function OrderDetail() {
  const [showForm, setShowForm] = useState(true);
  return (
    <div>
      {showForm ? (
        <GuestOrderForm setShowForm={setShowForm} />
      ) : (
        <OrderDetails />
      )}
    </div>
  );
}
