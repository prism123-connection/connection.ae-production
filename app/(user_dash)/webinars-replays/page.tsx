"use client"
import { WebinarFilterButton } from '@/app/components/dashboard/webinar-replays/FilterButton'
import { WebinarReplayHeader } from '@/app/components/dashboard/webinar-replays/Header'
import { WebinarCard } from '@/app/components/dashboard/webinar-replays/WebinarCard';
import SectionHeader from '@/app/components/SectionHeader'
import React from 'react'

function WebinarReplays() {
    const handleFilterClick = (filterType: string) => {
        console.log(`Filter clicked: ${filterType}`);
      };
  return (
    <SectionHeader classes=' w-full! items-start justify-start gap-5! mt-10 '>
        <div className="w-full ">
        <div className="flex justify-between items-start mb-6 max-sm:flex-col max-sm:gap-4">
          <WebinarReplayHeader
            title="Webinar Replay"
            description="Watch past webinars and never miss an update."
          />
          <div className="flex gap-2 max-sm:w-full max-sm:justify-between">
            <WebinarFilterButton
              label="Date"
              onClick={() => handleFilterClick("date")}
            />
            <WebinarFilterButton
              label="Category"
              onClick={() => handleFilterClick("category")}
            />
            <WebinarFilterButton
              label="Host"
              onClick={() => handleFilterClick("host")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <WebinarCard
            image="https://cdn.builder.io/api/v1/image/assets/TEMP/57acdc9da485868e5f414132f56c920477d347cd"
            title="Quality Whey Protein from all brands"
            host="Shesha"
            hostImage="https://placehold.co/32x32/f4f4f4/f4f4f4"
            date="28 March, 2025"
            duration="45 mins"
          />
          <WebinarCard
            image="https://cdn.builder.io/api/v1/image/assets/TEMP/aebb2b335df58499ba0c01403e85efdc13516ddd"
            title="High performing GPUs- RTX Series, 1000 items available"
            host="XPS Tech"
            hostImage="https://placehold.co/32x32/f4f4f4/f4f4f4"
            date="28 March, 2025"
            duration="45 mins"
          />
          <WebinarCard
            image="https://cdn.builder.io/api/v1/image/assets/TEMP/86347b0d43c21130d19d3c2c56c14380f286604f"
            title="Quality Whey Protein from all brands"
            host="Stephen K"
            hostImage="https://placehold.co/32x32/f4f4f4/f4f4f4"
            date="28 March, 2025"
            duration="45 mins"
          />
          <WebinarCard
            image="https://cdn.builder.io/api/v1/image/assets/TEMP/86347b0d43c21130d19d3c2c56c14380f286604f"
            title="Quality Whey Protein from all brands"
            host="Stephen K"
            hostImage="https://placehold.co/32x32/f4f4f4/f4f4f4"
            date="28 March, 2025"
            duration="45 mins"
          />
          <WebinarCard
            image="https://cdn.builder.io/api/v1/image/assets/TEMP/86347b0d43c21130d19d3c2c56c14380f286604f"
            title="Quality Whey Protein from all brands"
            host="Stephen K"
            hostImage="https://placehold.co/32x32/f4f4f4/f4f4f4"
            date="28 March, 2025"
            duration="45 mins"
          />
          <WebinarCard
            image="https://cdn.builder.io/api/v1/image/assets/TEMP/86347b0d43c21130d19d3c2c56c14380f286604f"
            title="Quality Whey Protein from all brands"
            host="Stephen K"
            hostImage="https://placehold.co/32x32/f4f4f4/f4f4f4"
            date="28 March, 2025"
            duration="45 mins"
          />
        </div>
      </div>
    </SectionHeader>
  )
}

export default WebinarReplays