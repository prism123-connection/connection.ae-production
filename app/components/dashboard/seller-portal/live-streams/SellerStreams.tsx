import React from 'react'
import { SectionTitle } from './SectionTitle'
import { StreamCard } from './StreamCard'

const upcomingStreams = [
    {
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/e7edb33f85685938b2a8767898221e090092d55d",
      title: "iphone 14 Pro Max(Gold) 512GB...",
      username: "Salim",
      userInitials: "SA",
      location: "UK",
      date: "28 March, 2025",
      time: "4:40 PM",
      status: "scheduled" as const,
      isUpcoming: true,
    },
  ];

  const pastStreams = [
    {
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/e7edb33f85685938b2a8767898221e090092d55d",
      title: "iphone 14 Pro Max(Gold) 512GB...",
      username: "Salim",
      userInitials: "SA",
      location: "UK",
      date: "28 March, 2025",
      viewerCount: 4.2,
      status: "ended" as const,
    },
    {
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/e7edb33f85685938b2a8767898221e090092d55d",
      title: "iphone 14 Pro Max(Gold) 512GB...",
      username: "Salim",
      userInitials: "SA",
      location: "UK",
      date: "28 March, 2025",
      viewerCount: 4.2,
      status: "ended" as const,
    },
  ];

function SellerStreams() {
  return (
    <div className='w-full flex flex-col gap-5 '>
    <h1 className="text-2xl font-semibold ">Your live streams</h1>
    <span className="text-base  mb-5">Find all your live streams here</span>

    <div className=" w-full ">
        <div className="flex flex-col gap-10">
          <section className="flex flex-col gap-4">
            <SectionTitle title="Upcoming live streams" />
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
              {upcomingStreams.map((stream, index) => (
                <StreamCard key={`upcoming-${index}`} {...stream} />
              ))}
            </div>
          </section>

          <hr className="border my-10 border-[#D5D5D5]" />

          <section className="flex flex-col gap-4">
            <SectionTitle title="Past live streams" />
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
              {pastStreams.map((stream, index) => (
                <StreamCard key={`past-${index}`} {...stream} />
              ))}
            </div>
          </section>
        </div>
      </div>

</div>
  )
}

export default SellerStreams