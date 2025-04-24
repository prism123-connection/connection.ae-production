"use client"
import SectionHeader from '@/app/components/SectionHeader'
import ActionButton from '@/app/components/ui/ActionButton'
import React from 'react'

function Test() {
  const handleButton = async () => {
    const res = await fetch("/api/mail-test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "yearsh7052@gmail.com",
        firstName: "yearsh",
        lastName: "kr"
      })
    });

    if (res.ok) {
      alert("Mail sent");
    } else {
      alert("Failed to send mail");
    }
  };
  return (
     <SectionHeader classes="py-30  px-20">
       <span className='text-3xl font-semibold mb-10'>Welcome to testing page! Check for db</span>
       <ActionButton onClick={handleButton} >Send Mail </ActionButton>
       </SectionHeader>
  )
}

export default Test