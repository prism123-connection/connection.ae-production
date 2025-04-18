"use client"
import React, { useEffect, useState } from "react";
import { LiveStreamCard } from "./LiveStreamCard";
import { getAllLiveStreams } from "@/lib/live-streams/streamHelper";


// const streams = [
//     {
//       thumbnailUrl:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFV4mAhYyeFveoQt2Lf-bgeR7SPBL6OpP7dA&s",
//       overlayUrl:
//         "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/ee461410101594a11bc4056fe37868027986cf11?placeholderIfAbsent=true",
//       title: "Branded Electronics Sales",
//       streamerName: "Stephen M",
//       streamerAvatar:
//         "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/a6de1b7a6a5b82bc04506662bc0ee6bc729a6663?placeholderIfAbsent=true",
//       location: "UK",
//       viewerCount: "4.2K",
//     },
//     {
//       thumbnailUrl:
//         "https://images.herzindagi.info/image/2023/Jan/homemade-protein-powder-easy-recipe.jpg",
//       overlayUrl:
//         "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/59c669e8b052be04add90262e9bb5c95bfdb5b0d?placeholderIfAbsent=true",
//       title: "Protein Powders",
//       streamerName: "Shesha",
//       streamerAvatar:
//         "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/7e39d80b17bfbb37f6893ffebe023f6e5755aece?placeholderIfAbsent=true",
//       location: "Bangladesh",
//       viewerCount: "4.2K",
//     },
//     {
//       thumbnailUrl:
//         "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2021/12/best-gpu-for-4k-gaming.jpg",
//       overlayUrl:
//         "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/582daaadcdfee722a9217ed16dad828db5551a9b?placeholderIfAbsent=true",
//       title: "Graphic Cards - RTX Series",
//       streamerName: "XPS Tech",
//       streamerAvatar:
//         "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/2e9e0bdcf0a05d2d1b8e9895e2dcd8f872a07865?placeholderIfAbsent=true",
//       location: "Hong Kong",
//       viewerCount: "3.8K",
//     },
//     {
//       thumbnailUrl:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdQCPq7-niGJ25YalzFLB9hqykMSNVRXMbvA&s",
//       overlayUrl:
//         "https://cdn.builder.io/api/v1/image/assets/xyz2?placeholderIfAbsent=true",
//       title: "Luxury Watches Sale",
//       streamerName: "James D",
//       streamerAvatar:
//         "https://cdn.builder.io/api/v1/image/assets/xyz3?placeholderIfAbsent=true",
//       location: "USA",
//       viewerCount: "5.1K",
//     },
//     {
//       thumbnailUrl:
//         "https://5.imimg.com/data5/SELLER/Default/2022/1/LO/QI/CH/89576160/wardrobe-1.jpg",
//       overlayUrl:
//         "https://cdn.builder.io/api/v1/image/assets/xyz5?placeholderIfAbsent=true",
//       title: "Handmade Jewelry Showcase",
//       streamerName: "Olivia R",
//       streamerAvatar:
//         "https://cdn.builder.io/api/v1/image/assets/xyz6?placeholderIfAbsent=true",
//       location: "France",
//       viewerCount: "3.2K",
//     },
//     {
//       thumbnailUrl:
//         "https://m.media-amazon.com/images/G/31/img24/intel/JAN/Amazon_JanBAU_Gaming2_1400x800._SX1242_QL85_.jpg",
//       overlayUrl:
//         "https://cdn.builder.io/api/v1/image/assets/xyz8?placeholderIfAbsent=true",
//       title: "Gaming Laptops Review",
//       streamerName: "Tech Guru",
//       streamerAvatar:
//         "https://cdn.builder.io/api/v1/image/assets/xyz9?placeholderIfAbsent=true",
//       location: "Germany",
//       viewerCount: "6.4K",
//     },
//     {
//       thumbnailUrl:
//         "https://media.designcafe.com/wp-content/uploads/2020/08/11193522/living-room-decor-ideas.jpg",
//       overlayUrl:
//         "https://cdn.builder.io/api/v1/image/assets/xyz11?placeholderIfAbsent=true",
//       title: "Home Decor & Interior Design",
//       streamerName: "Sophia M",
//       streamerAvatar:
//         "https://cdn.builder.io/api/v1/image/assets/xyz12?placeholderIfAbsent=true",
//       location: "Italy",
//       viewerCount: "2.9K",
//     },
//     {
//       thumbnailUrl:
//         "https://5.imimg.com/data5/SELLER/Default/2022/10/LO/ZQ/XF/113077208/i-phone14-pro-jpg-500x500.jpg",
//       overlayUrl:
//         "https://cdn.builder.io/api/v1/image/assets/xyz14?placeholderIfAbsent=true",
//       title: "Smartphones Comparison",
//       streamerName: "Mobile Tech",
//       streamerAvatar:
//         "https://cdn.builder.io/api/v1/image/assets/xyz15?placeholderIfAbsent=true",
//       location: "India",
//       viewerCount: "7.2K",
//     },
//     {
//       thumbnailUrl:
//         "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/rockcms/2024-06/240610-beauty-awards-2024-skincare-winners-vl-social-91be20.jpg",
//       overlayUrl:
//         "https://cdn.builder.io/api/v1/image/assets/xyz17?placeholderIfAbsent=true",
//       title: "Organic Skincare Products",
//       streamerName: "Beauty Essentials",
//       streamerAvatar:
//         "https://cdn.builder.io/api/v1/image/assets/xyz18?placeholderIfAbsent=true",
//       location: "Australia",
//       viewerCount: "3.6K",
//     },
//     {
//       thumbnailUrl:
//         "https://okcredit-blog-images-prod.storage.googleapis.com/2021/06/automobile-parts1--1-.jpg",
//       overlayUrl:
//         "https://cdn.builder.io/api/v1/image/assets/xyz20?placeholderIfAbsent=true",
//       title: "Automobile Accessories",
//       streamerName: "Car Mods",
//       streamerAvatar:
//         "https://cdn.builder.io/api/v1/image/assets/xyz21?placeholderIfAbsent=true",
//       location: "Japan",
//       viewerCount: "5.5K",
//     },
//   ];


export const LiveStreamList = () => {
  const [liveStreams, setLiveStreams] = useState([]);
  const [upcomingStreams, setUpcomingStreams] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

      const fetchStreams = async () => {
        console.log('running fun')
        try {
          const response = await getAllLiveStreams();
          const live = response.filter((stream: any) => stream.status === 'LIVE');
          const upcoming = response.filter((stream: any) => stream.status === 'LIVE_PENDING');
          setLiveStreams(live);
          setUpcomingStreams(upcoming);
        } catch (error) {
          console.log(error)
          setError(true);
        } finally {
          setLoading(false);
        }
      };

        useEffect(() => {
          fetchStreams();
        }, []);
    
  return (
    <section className="bg-white flex flex-col overflow-hidden justify-center px-2.5  mt-10">
      {
        loading && (
          <div className="w-full bg-white rounded-lg flex p-16 flex-col px-8 items-end">
            <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
          </div>
        )
      }
      {
        liveStreams.length > 0 && (
          <h1 className="self-stretch text-3xl text-black font-normal leading-none">
          Live Streams
        </h1>
        )
      }

<div className="flex items-center justify-between gap-10 flex-wrap mt-10 max-md:max-w-full max-md:mt-10 ">
   
   

   {liveStreams.length > 0 && 
   liveStreams.map((stream: {
     product?: {
       name?: string;
       productImages?: { url?: string }[];
     };
     user?: {
       firstName?: string;
       lastName?: string;
     };
   }, index: number) => (
     <LiveStreamCard
       key={index}
       thumbnailUrl={stream.product?.productImages?.[0]?.url || ''}
       title={stream.product?.name || 'Untitled'}
       firstName={`${stream.user?.firstName || ''}`}
       lastName={`${stream.user?.lastName || ''}`}

       location=""
       viewerCount="No view yet"
     />
   ))
   
   }
 </div>

      {
        upcomingStreams.length > 0 && (
          <h1 className="self-stretch text-3xl text-black font-normal leading-none">
          Upcomming Streams
        </h1>
        )
      }
   
      <div className="flex items-center justify-between gap-10 flex-wrap mt-10 max-md:max-w-full max-md:mt-10 ">
   
   

        {upcomingStreams.length > 0 && 
        upcomingStreams.map((stream: {
          product?: {
            name?: string;
            productImages?: { url?: string }[];
          };
          user?: {
            firstName?: string;
            lastName?: string;
          };
        }, index: number) => (
          <LiveStreamCard
            key={index}
            thumbnailUrl={stream.product?.productImages?.[0]?.url || ''}
            title={stream.product?.name || 'Untitled'}
            firstName={`${stream.user?.firstName || ''}`}
            lastName={`${stream.user?.lastName || ''}`}
            location=""
            viewerCount="No view yet"
          />
        ))
        
        }
      </div>
    </section>
  );
};
