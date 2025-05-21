"use client";
import React, { useRef, useState } from "react";
import InputField from "@/app/components/ui/InputFields";
import ImageUpload from "@/app/components/ui/ImageUpload";
import TagSelector from "@/app/components/ui/TagSelector";
import { z } from "zod";
import ActionButton from "../../ui/ActionButton";
import LiveScheduler from "./LiveScheduler";
import { uploadImageToS3 } from "@/lib/aws/awsS3Helper";
import Image from "next/image";
import { createProduct } from "@/lib/ecommerce/ecommerceHelper";
import { toast } from "sonner";

const realEstateTags = [
  "Real Estate",
  "Luxury Homes",
  "Property Listings",
  "Apartments for Sale",
  "Commercial Properties",
  "Investment Opportunities",
  "Modern Architecture",
  "New Developments",
  "Prime Locations",
  "Verified Agents",
];

const businessTags = [
  "Business Expansion",
  "Startup Office",
  "Franchise Locations",
  "Affordable Workspace",
  "Strategic Location",
  "Ready to Move",
  "Growth Opportunities",
  "Flexible Leasing",
  "Scalable Space",
  "Business Relocation",
]

const brokerageTags = [ 
  "Exclusive Listings",
  "Brokerage Services",
  "Commission Opportunities",
  "Property Management",
  "Verified Listings",
  "Agent Tools",
  "Lead Generation",
  "Client Matching",
  "Listing Dashboard",
  "Market Insights",
]

const preciousMetalsTags = [
  "Gold Bullion",
  "Silver Coins",
  "Precious Metal Investment",
  "24K Gold",
  "Certified Purity",
  "Rare Collectibles",
  "Secure Storage",
  "Market-Driven Pricing",
  "Platinum Bars",
  "Trusted Dealers",

]

const oilAndGasTags = [
  "Crude Oil Investment",
  "Natural Gas Supply",
  "Energy Commodities",
  "Oilfield Equipment",
  "Refined Petroleum",
  "Upstream Operations",
  "Downstream Solutions",
  "Fossil Fuel Trading",
  "Global Energy Market",
  "Trusted Suppliers",
]

const electronicsTags = [
  "Latest Gadgets",
  "Smart Devices",
  "High Performance",
  "Affordable Electronics",
  "Tech Deals",
  "Wireless Technology",
  "Home Automation",
  "Cutting-edge Innovation",
  "Portable Electronics",
  "Trusted Brands",
]

const furnitureTags = [
  "Modern Furniture",
  "Space Saving Designs",
  "Premium Wood",
  "Home Essentials",
  "Comfort & Style",
  "Ergonomic Chairs",
  "Minimalist Aesthetics",
  "Durable Materials",
  "Customizable Options",
  "Fast Delivery",
]

const fashionTags = [
  "Trendy Apparel",
  "Seasonal Collections",
  "Sustainable Fashion",
  "Street Style",
  "Luxury Brands",
  "Casual Wear",
  "Accessories & Jewelry",
  "Eco-Friendly Fabrics",
  "Runway Inspired",
  "Comfort Meets Style",
]

const toysTags = [
  "Educational Toys",
  "Outdoor Play",
  "Creative Building",
  "Safe & Non-toxic",
  "STEM Toys",
  "Age Appropriate",
  "Popular Characters",
  "Interactive Games",
  "Classic Favorites",
  "Holiday Gifts",
]

// === Zod Schema ===
const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).optional(),
  productImages: z.array(z.string().url("Atleast one image must be entered")),
goLiveAt: z.string().min(1, "Please select date and time to go live").optional().or(z.literal("")),
});


// === Component ===
const ProductInformationInputs = () => {
  const [loading, setLoading] = useState(false);
  const [recommendedTags, setRecommendedTags] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    description: "",
    price: "",      // String for controlled input; parseFloat before submission
    currency: "",
    category: "",
    goLiveAt: "",           // Will be a string (ISO date) or `Date` object
    tags: [] as string[],   // Each tag value (e.g., ["RGB", "Mechanical"])
    productImages: [] as string[], // Array of image URLs
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [goLiveDateParts, setGoLiveDateParts] = useState({
    date: "",      // e.g. "2025-04-15"
    hour: "12",    // default to 12
    minute: "00",  // default to 00
    meridiem: "AM" // AM or PM
  });
  const [liveMode, setLiveMode] = useState(false)
const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;

    switch (selectedCategory) {
      case "realEState":
        setRecommendedTags(realEstateTags);
        break;
      case "business":
        setRecommendedTags(businessTags);
        break;
      case "brokerage":
        setRecommendedTags(brokerageTags);
        break;
      case "preciousMetal":
        setRecommendedTags(preciousMetalsTags);
        break;
      case "oilAndGas":
        setRecommendedTags(oilAndGasTags);
        break;
      case "electronics":
        setRecommendedTags(electronicsTags);
        break;
      case "furniture":
        setRecommendedTags(furnitureTags);
        break;
      case "fashion":
        setRecommendedTags(fashionTags);
        break;
      case "toys":
        setRecommendedTags(toysTags);
        break;
      default:
        setRecommendedTags([]);
    }
  };


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Handle goLiveAt parts
    if (["date", "hour", "minute", "meridiem"].includes(name)) {
      const updatedParts = {
        ...goLiveDateParts,
        [name]: value,
      };
      setGoLiveDateParts(updatedParts);

      // Combine into ISO datetime string
      const { date, hour, minute, meridiem } = updatedParts;

      if (date && hour && minute && meridiem) {
        const hour24 = meridiem === "PM"
          ? String((+hour % 12) + 12).padStart(2, "0")
          : String(+hour % 12).padStart(2, "0");

        const isoString = `${date}T${hour24}:${minute}:00`;
        setFormData((prev) => ({ ...prev, goLiveAt: isoString }));
      }

      return;
    }

    // Regular input updates
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (tags: string[]) => {
    setFormData((prev) => ({ ...prev, tags }));
  };

  const handleImageInput = async (files: File[], done: () => void) => {
    try {
      for (const file of files) {
        const imageUrl = await uploadImageToS3(file);

        if (typeof imageUrl.url === "string" && imageUrl.url.trim() !== "") {
          setFormData((prev) => ({
            ...prev,
            productImages: [...prev.productImages, imageUrl.url],
          }));
        } else {
          console.warn("Invalid image URL returned:", imageUrl);
        }

      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      done(); // call only ONCE after all files are uploaded
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      productImages: prev.productImages.filter((_, index) => index !== indexToRemove),
    }));
  };

  async function submitProduct() {
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price as any), // convert string to number
      };
      const response = await createProduct(payload);
      console.log("Product created successfully:", response);
      return {status : 200}; 
    } catch (err) {
      console.error("Product creation failed:", err);
      return {status : 500}; 
    }
  } 





  const handleSubmit = async () => {
    const result = productSchema.safeParse(formData);
  
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const path = issue.path.join(".");
        fieldErrors[path] = issue.message;
      }
      setErrors(fieldErrors);
      // toast.error(fieldErrors[])
      console.log("Validation failed:", fieldErrors);
      return;
    }
  
    setErrors({});
    setLoading(true);
    try {
      console.log(formData)
      const res = await submitProduct();
      if (res.status === 500) {
        toast.error('Error creating the product');
        return
      }
   
       setFormData({
        name: "",
        shortDescription: "",
        description: "",
        price: "",      // String for controlled input; parseFloat before submission
        currency: "",
        category: "",
        goLiveAt: "",           // Will be a string (ISO date) or `Date` object
        tags: [] as string[],   // Each tag value (e.g., ["RGB", "Mechanical"])
        productImages: [] as string[], // Array of image URLs
      })
      alert('product update successfully')
  
    } finally {
      setLoading(false);
       window.scrollTo({
        top: 0,
      });
    }
  
  };

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLiveMode(e.target.checked);
    };

  if (loading) {
    return  <div className="w-full bg-white rounded-lg flex p-16 flex-col px-8 items-end">
    <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
  </div>
  }
  
  return (
    <section className="mb-10">
      <h2 className="text-[rgba(0,22,37,1)] text-xl font-semibold mb-8">
        Product Information
      </h2>

      <InputField
        label="Product Name"
        placeholder="Enter product name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />

      <InputField
        label="Product Short Description"
        placeholder="Enter product short description"
        name="shortDescription"
        value={formData.shortDescription}
        onChange={handleChange}
        error={errors.shortDescription}
      />

      {/* Watch from document upload */}
      <div className="mb-8">
        <h3 className="text-[#62676C] text-base font-semibold mb-[5px]">
          Product Images
        </h3>
        <ImageUpload
          onChange={handleImageInput}
        />
        {errors.productImages && (
          <p className="text-red-500 text-xs">{errors.productImages}</p>
        )}
        {
          formData.productImages.length > 0 && (
            <div className="flex gap-5 mt-5">
              {
                formData.productImages.map((e, index) => (
                  <div className=" relative" key={index}>
                    <span onClick={()=>handleRemoveImage(index)} className="absolute right-0 cursor-pointer ">
                    <svg  xmlns="http://www.w3.org/2000/svg" className="" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M6 6L18 18M6 18L18 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    </span>
                    <img src={e} className="w-30 h-30 object-contain " alt="product-image" />
                  </div>
                ))
              }
            </div>
          )
        }
      </div>

      <div className="mb-8">
        <h3 className="text-[#62676C] text-base font-semibold mb-[5px]">
          Product Description
        </h3>
        <textarea
          className="w-full p-4 border rounded-[10px] border-[rgba(197,197,197,1)] min-h-[100px]"
          placeholder="A detailed description of the product helps customers to learn more about the product."
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && (
          <p className="text-red-500 text-xs">{errors.description}</p>
        )}
        <div className="flex items-center gap-1 text-[13px] text-[#9C9CA3] mt-[5px]">
          <span className="w-5 h-5" />
          <span>{formData.description.length}/800</span>
        </div>

      </div>

      <div className="flex mb-5 flex-wrap">
        {/* <div className="w-[210px]">
          <InputField
            label="Product Price Currency"
            type="select"
            name="price.currency"
            value={formData.price.currency}
            onChange={handleChange}
            
            options={[
              { label: "Unselected", value: "" },
              { label: "USD", value: "usd" },
              { label: "INR", value: "inr" },
              { label: "EUR", value: "eur" },
            ]}
          />
        </div> */}
        <div className="min-w-60 w-[369px]">
          <InputField
            label="Product Price"
            type="number"
            placeholder="Please enter the product currency first."
            name="price"
            value={formData.price}
            onChange={handleChange}
            error={errors.price}
          />
        </div>
      </div>

      <div className="mb-[42px]">
        <label className="text-[#62676C] font-semibold block mb-[5px]">
          Product Category
        </label>
        <select
          className="border w-full min-h-[46px] px-4 py-3.5 rounded-[10px] border-[rgba(197,197,197,1)]"
          name="category"
          value={formData.category}
          onChange={(e)=>{handleChange(e); handleCategorySelect(e)}}
        >
          <option value="">Select a category</option>
          <option value="realEState">Real Estate</option>
          <option value="business">Business</option>
          <option value="brokerage">Brokerage</option>
          <option value="preciousMetal">Precious Metals</option>
          <option value="oilAndGas">Oil and Gas</option>
          <option value="electronics">Electronics</option>
          <option value="furniture">Furniture</option>
          <option value="fashion">Fashion</option>
          <option value="toys">Toys</option>
   
        </select>

        {errors.category && (
          <p className="text-red-500 text-xs">{errors.category}</p>
        )}
      </div>

      <div >
        <h3 className="text-[#62676C] text-xl font-semibold mb-4">
          Product Tags
        </h3>
        <p className="text-sm mb-4">Recommended Tags</p>
        <TagSelector tags={recommendedTags} onTagsChange={handleTagsChange} />
        {errors.tags && (
          <p className="text-red-500 text-xs">{errors.tags}</p>
        )}
      </div>

      <div className="my-10">
        <h3 className="text-[#62676C] text-xl font-semibold mb-4">
          Turn on live feature
        </h3>

       <label className="inline-flex items-center cursor-pointer">
        <input
         name="isLiveEnabled"
        checked={liveMode}
        onChange={handleToggle}
        type="checkbox" value="" className="sr-only peer"/>
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-blue-300  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 "></div>
      </label>
        
      </div>
      {
        liveMode ? (
          <LiveScheduler setGoLiveDateParts={setGoLiveDateParts} errors={errors} handleChange={handleChange} goLiveDateParts={goLiveDateParts} />
        )
        :
        <div className="h-1 my-10"/>
      }

      <ActionButton onClick={handleSubmit}>Submit Product</ActionButton>
    </section>
  );
};

export default ProductInformationInputs;


// "use client"
// import React from "react";
// import { UseFormReturn } from "react-hook-form";
// import { ProductFormData } from "./Form";
// import InputField from "@/app/components/ui/InputFields";
// import ImageUpload from "@/app/components/ui/ImageUpload";
// import TagSelector from "@/app/components/ui/TagSelector";
// import { z } from "zod";

// const recommendedTags = [
//     "Keyboard",
//     "Gaming Keyboard",
//     "Mechanical keyboard",
//     "RGB Keyboard",
//     "Vibrant Colors",
//     "Sand Resistant",
//     "Stylish Design",
//     "High performance",
//   ];

// const ProductInformationInputs = ({  }) => {
//   return (
//     <section className="mb-10">
//       <h2 className="text-[rgba(0,22,37,1)] text-xl font-semibold mb-8">
//         Product Information
//       </h2>

//       <InputField
//         label="Product Name"
//        placeholder="Enter Product name"
//         // {...form.register("name")}
//         className="mb-8"
//       />

//       <InputField
//         label="Product Short Description"
//         placeholder="Enter product short description"
//         // {...form.register("shortDescription")}
//         className="mb-8"
//       />

//       <div className="mb-8">
//         <h3 className="text-[#62676C] text-base font-semibold mb-[5px]">
//           Product productImages
//         </h3>
//         <ImageUpload
//         onChange={(files) => console.log(files)}
//         />
//       </div>

//       <div className="mb-8">
//         <h3 className="text-[#62676C] text-base font-semibold mb-[5px]">
//           Product Description
//         </h3>
//         <textarea
//           className="w-full p-4 border rounded-[10px] border-[rgba(197,197,197,1)] min-h-[100px]"
//           placeholder="A detailed description of the product helps customers to learn more about the product."
//         //   {...form.register("description")}
//         />
//         <div className="flex items-center gap-1 text-[13px] text-[#9C9CA3] mt-[5px]">
//           <span className="w-5 h-5" />
//           <span>0/800</span>
//         </div>
//       </div>

//       <div className="flex gap-[31px] flex-wrap">
//         <div className="w-[210px]">
//           <InputField
//             label="Product Price Currency"
//             type="select"
//             options={[{ label: "Unselected", value: "" }]}
//             // {...form.register("price.currency")}
//           />
//         </div>
//         <div className="min-w-60 w-[369px]">
//           <InputField
//             label="Product Price"
//             type="number"
//             placeholder="Please enter the product currency first."
//             // {...form.register("price.amount")}
//           />
//         </div>
//       </div>

//       <div className="mb-[42px]">
//         <label className="text-[#62676C] font-semibold block mb-[5px]">
//           Product Category
//         </label>
//         <select
//           className="border w-full min-h-[46px] px-4 py-3.5 rounded-[10px] border-[rgba(197,197,197,1)]"
//         //   {...form.register("category")}
//         >
//           <option value="electronics">Electronics</option>
//         </select>
//       </div>

//       <div>
//         <h3 className="text-[#62676C] text-xl font-semibold mb-4">
//           Product Tags
//         </h3>
//         <p className="text-sm mb-4">Recommended Tags</p>
//         <TagSelector
//           tags={recommendedTags}
//           onTagsChange={(tags) =>console.log(tags)}
//         //   onTagsChange={(tags) => form.setValue("tags", tags)}
//         />
//       </div>
//     </section>
//   );
// };

// export default ProductInformationInputs;