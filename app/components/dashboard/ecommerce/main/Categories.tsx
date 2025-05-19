"use client"
import React, { useState } from 'react'
import { MdOutlineAddBusiness, MdOutlineRealEstateAgent } from 'react-icons/md';
import { GrTransaction } from "react-icons/gr";
import { AiOutlineGold } from "react-icons/ai";
import { GiOilPump } from "react-icons/gi";
import { LuSofa } from "react-icons/lu";
import { GiTravelDress } from "react-icons/gi";
import { MdOutlineSmartToy } from "react-icons/md";
import { RiComputerLine } from "react-icons/ri";
import { IoMdBusiness } from "react-icons/io";
import { MdOutlineTravelExplore } from "react-icons/md";

interface CategoryCardProps {
    icon: React.ReactNode;
    title: string;
    value:string; 
    onCategorySelect: (category: string) => void;
    index: number; 
    setActiveCategory: (value: number)=>void; 
    activeCategory: number; 
  }

  interface EcommerceCategoriesProps {
  onCategorySelect: (category: string) => void;
}


const CategoryCard: React.FC<CategoryCardProps> = ({ icon, title, value, onCategorySelect, index, setActiveCategory, activeCategory }) => {


  return (
        <div onClick={()=>{onCategorySelect(value); setActiveCategory(index)}} className={`rounded py-5 flex flex-col items-center justify-center cursor-pointer border-solid  hover:border-[#DB4444] transition-colors group ${
          activeCategory === index ? 'border border-[#DB4444]' :  'border border-[rgba(0,0,0,0.3)]' }`}>
            <div className='flex items-center justify-center flex-col  '>
            <div className="mb-4 w-full align-middle">{icon}</div>
            <div className={`text-base  text-center group-hover:text-[#DB4444]
              ${  activeCategory === index ? ' text-[#DB4444]' :  'text-black' }
              `} >{title}</div>
            </div>
        </div>
  )

};



  const EcommerceCategories:React.FC<EcommerceCategoriesProps> = ({onCategorySelect}) => {
    const categories = [
    {value: 'exploreAll', title: "Explore All", icon: <MdOutlineTravelExplore  size={48} opacity={0.7}  /> },
    {value: 'realEState', title: "Real estate", icon: <MdOutlineRealEstateAgent size={48} opacity={0.7}  /> },
    {value: 'business', title: "Business", icon: <IoMdBusiness  size={48} opacity={0.7}  /> },
    {value: 'brokerage', title: "Brokerage", icon: <GrTransaction size={48}  opacity={0.7} /> },
    {value: 'preciousMetal', title: "Precious Metals", icon: <AiOutlineGold   size={48} opacity={0.7}  /> },
    {value: 'oilAndGas', title: "Oil & Gas", icon: <GiOilPump   size={48}  opacity={0.7} /> },
    {value: 'electronics', title: "Electronics", icon: <RiComputerLine   size={48}  opacity={0.7}  /> },
    {value: 'furniture', title: "Furniture", icon: <LuSofa  size={48}  opacity={0.7} /> },
    {value: 'fashion', title: "Fashion", icon: <GiTravelDress  size={48} opacity={0.7} /> },
    {value: 'toys', title: "Toys", icon: <MdOutlineSmartToy size={48} opacity={0.7} /> },
    ];

    const [activeCategory, setActiveCategory] = useState(0)

    return (
        <section className='w-full'>
        <h2 className="text-xl font-semibold text-black mb-10 w-full">
          Browse By Category
        </h2>
        <div className="grid grid-cols-[repeat(5,1fr)] gap-[30px] mb-[60px] max-md:grid-cols-[repeat(3,1fr)] max-sm:grid-cols-[repeat(2,1fr)]">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              icon={category.icon}
              title={category.title}
              value={category.value}
              onCategorySelect={onCategorySelect}
              index={index}
              setActiveCategory={setActiveCategory}
              activeCategory={activeCategory}
            />
          ))}
        </div>
      </section>
    )
  }


export default EcommerceCategories

// const RealEstateIcon = () => (
//     <svg
//       width="56"
//       height="56"
//       viewBox="0 0 56 56"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <g clipPath="url(#clip0_158_11889)">
//         <path
//           d="M38.9375 6.125H17.0625C15.5523 6.125 14.3281 7.34922 14.3281 8.85938V47.1406C14.3281 48.6508 15.5523 49.875 17.0625 49.875H38.9375C40.4477 49.875 41.6719 48.6508 41.6719 47.1406V8.85938C41.6719 7.34922 40.4477 6.125 38.9375 6.125Z"
//           stroke="black"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M25.668 7H31.1367"
//           stroke="black"
//           strokeWidth="3"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M28 44.0054V44.0306"
//           stroke="black"
//           strokeWidth="2.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <line
//           x1="15.168"
//           y1="39.8335"
//           x2="40.8346"
//           y2="39.8335"
//           stroke="black"
//           strokeWidth="2"
//         />
//       </g>
//       <defs>
//         <clipPath id="clip0_158_11889">
//           <rect width="56" height="56" fill="white" />
//         </clipPath>
//       </defs>
//     </svg>
//   );
  
//   const ElectronicsIcon = () => (
//     <svg
//       width="57"
//       height="56"
//       viewBox="0 0 57 56"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <g clipPath="url(#clip0_158_11815)">
//         <path
//           d="M46.944 9.3335H9.61068C8.32201 9.3335 7.27734 10.3782 7.27734 11.6668V35.0002C7.27734 36.2888 8.32201 37.3335 9.61068 37.3335H46.944C48.2327 37.3335 49.2773 36.2888 49.2773 35.0002V11.6668C49.2773 10.3782 48.2327 9.3335 46.944 9.3335Z"
//           stroke="black"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M16.6094 46.6665H39.9427"
//           stroke="black"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M21.2773 37.3335V46.6668"
//           stroke="black"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M35.2773 37.3335V46.6668"
//           stroke="black"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M8.27734 32H48.2773"
//           stroke="black"
//           strokeWidth="2"
//           strokeLinecap="round"
//         />
//       </g>
//       <defs>
//         <clipPath id="clip0_158_11815">
//           <rect
//             width="56"
//             height="56"
//             fill="white"
//             transform="translate(0.277344)"
//           />
//         </clipPath>
//       </defs>
//     </svg>
//   );
  
//   const FoodIcon = () => (
//     <svg
//       width="57"
//       height="56"
//       viewBox="0 0 57 56"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <g clipPath="url(#clip0_158_11852)">
//         <path
//           d="M35.5469 14H21.5469C17.6809 14 14.5469 17.134 14.5469 21V35C14.5469 38.866 17.6809 42 21.5469 42H35.5469C39.4129 42 42.5469 38.866 42.5469 35V21C42.5469 17.134 39.4129 14 35.5469 14Z"
//           stroke="black"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M21.5469 42V49H35.5469V42"
//           stroke="black"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M21.5469 14V7H35.5469V14"
//           stroke="black"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <line
//           x1="24.5469"
//           y1="23"
//           x2="24.5469"
//           y2="34"
//           stroke="black"
//           strokeWidth="2"
//           strokeLinecap="round"
//         />
//         <line
//           x1="28.5469"
//           y1="28"
//           x2="28.5469"
//           y2="34"
//           stroke="black"
//           strokeWidth="2"
//           strokeLinecap="round"
//         />
//         <line
//           x1="32.5469"
//           y1="26"
//           x2="32.5469"
//           y2="34"
//           stroke="black"
//           strokeWidth="2"
//           strokeLinecap="round"
//         />
//       </g>
//       <defs>
//         <clipPath id="clip0_158_11852">
//           <rect
//             width="56"
//             height="56"
//             fill="white"
//             transform="translate(0.546875)"
//           />
//         </clipPath>
//       </defs>
//     </svg>
//   );
  
//   const FurnitureIcon = () => (
//     <svg
//       width="57"
//       height="56"
//       viewBox="0 0 57 56"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <g clipPath="url(#clip0_158_11935)">
//         <path
//           d="M12.2135 16.3335H14.5469C15.7846 16.3335 16.9715 15.8418 17.8467 14.9667C18.7219 14.0915 19.2135 12.9045 19.2135 11.6668C19.2135 11.048 19.4594 10.4545 19.897 10.0169C20.3345 9.57933 20.928 9.3335 21.5469 9.3335H35.5469C36.1657 9.3335 36.7592 9.57933 37.1968 10.0169C37.6344 10.4545 37.8802 11.048 37.8802 11.6668C37.8802 12.9045 38.3719 14.0915 39.247 14.9667C40.1222 15.8418 41.3092 16.3335 42.5469 16.3335H44.8802C46.1179 16.3335 47.3049 16.8252 48.18 17.7003C49.0552 18.5755 49.5469 19.7625 49.5469 21.0002V42.0002C49.5469 43.2378 49.0552 44.4248 48.18 45.3C47.3049 46.1752 46.1179 46.6668 44.8802 46.6668H12.2135C10.9759 46.6668 9.78888 46.1752 8.91371 45.3C8.03854 44.4248 7.54688 43.2378 7.54688 42.0002V21.0002C7.54688 19.7625 8.03854 18.5755 8.91371 17.7003C9.78888 16.8252 10.9759 16.3335 12.2135 16.3335"
//           stroke="black"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M28.5469 37.3335C32.4129 37.3335 35.5469 34.1995 35.5469 30.3335C35.5469 26.4675 32.4129 23.3335 28.5469 23.3335C24.6809 23.3335 21.5469 26.4675 21.5469 30.3335C21.5469 34.1995 24.6809 37.3335 28.5469 37.3335Z"
//           stroke="black"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </g>
//       <defs>
//         <clipPath id="clip0_158_11935">
//           <rect
//             width="56"
//             height="56"
//             fill="white"
//             transform="translate(0.546875)"
//           />
//         </clipPath>
//       </defs>
//     </svg>
//   );
  
//   const FashionIcon = () => (
//     <svg
//       width="57"
//       height="56"
//       viewBox="0 0 57 56"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <g clipPath="url(#clip0_158_11896)">
//         <path
//           d="M16.8789 30.3335H14.5456C11.9682 30.3335 9.87891 32.4228 9.87891 35.0002V42.0002C9.87891 44.5775 11.9682 46.6668 14.5456 46.6668H16.8789C19.4562 46.6668 21.5456 44.5775 21.5456 42.0002V35.0002C21.5456 32.4228 19.4562 30.3335 16.8789 30.3335Z"
//           stroke="black"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M42.5469 30.3335H40.2135C37.6362 30.3335 35.5469 32.4228 35.5469 35.0002V42.0002C35.5469 44.5775 37.6362 46.6668 40.2135 46.6668H42.5469C45.1242 46.6668 47.2135 44.5775 47.2135 42.0002V35.0002C47.2135 32.4228 45.1242 30.3335 42.5469 30.3335Z"
//           stroke="black"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M9.87891 35.0002V28.0002C9.87891 23.0495 11.8456 18.3015 15.3462 14.8008C18.8469 11.3002 23.5949 9.3335 28.5456 9.3335C33.4963 9.3335 38.2442 11.3002 41.7449 14.8008C45.2456 18.3015 47.2122 23.0495 47.2122 28.0002V35.0002"
//           stroke="black"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </g>
//       <defs>
//         <clipPath id="clip0_158_11896">
//           <rect
//             width="56"
//             height="56"
//             fill="white"
//             transform="translate(0.546875)"
//           />
//         </clipPath>
//       </defs>
//     </svg>
//   );
  
//   const ToysIcon = () => (
//     <svg
//       width="57"
//       height="56"
//       viewBox="0 0 57 56"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <g clipPath="url(#clip0_158_11928)">
//         <path
//           d="M47.2148 14H9.88151C7.30418 14 5.21484 16.0893 5.21484 18.6667V37.3333C5.21484 39.9107 7.30418 42 9.88151 42H47.2148C49.7922 42 51.8815 39.9107 51.8815 37.3333V18.6667C51.8815 16.0893 49.7922 14 47.2148 14Z"
//           stroke="black"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M14.5469 28.0002H23.8802M19.2135 23.3335V32.6668"
//           stroke="black"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M35.5469 25.6665V25.6907"
//           stroke="black"
//           strokeWidth="3"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M42.5469 30.333V30.3572"
//           stroke="black"
//           strokeWidth="3"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </g>
//       <defs>
//         <clipPath id="clip0_158_11928">
//           <rect
//             width="56"
//             height="56"
//             fill="white"
//             transform="translate(0.546875)"
//           />
//         </clipPath>
//       </defs>
//     </svg>
//   );