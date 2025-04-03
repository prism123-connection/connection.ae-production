"use client"
import React, { useState } from 'react'
import { EmptyState } from "./EmptyState";
import { AddressForm, AddressFormData } from "./AddressForm";

function UserAddressManager() {
  const [showForm, setShowForm] = useState(false);

  const handleAddAddress = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmit = (data: AddressFormData) => {
    console.log("Form submitted:", data);
    // Here you would typically save the address data
    // setShowForm(false);
  };

  return (
    <div className="bg-red-500 w-full flex flex-col overflow-hidden items-center justify-center px-12  max-md:px-5 ">
      {!showForm ? (
        <EmptyState onAddAddress={handleAddAddress} />
      ) : (
        <AddressForm />
      )}
    </div>
  )
}

export default UserAddressManager