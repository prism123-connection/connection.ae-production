"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { fetchData, updateAccount } from "@/lib/helper";
import Loader from "@/app/components/loader";
import { FaLandMineOn } from "react-icons/fa6";

import RigthArrow from "@/app/components/auth/RigthArrow";
import SpecialInputs from "@/app/components/ui/SpecialInputs";
import ProceedButtons from "@/app/components/ui/ProceedButtons";
import CustomSelect from "@/app/components/ui/CustomSelect";
import CustomCheckbox from "@/app/components/ui/CustomCheckBox";

const AccountSetupPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    referredBy: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    emiratesId: "",
    phoneNumber: "",
    occupation: "",
    referralSource: "",
    joinReason: "",
    acknowledgement: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeCount, setActiveCount] = useState(1);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let stepSchema: z.ZodObject<any>;

  if (activeCount === 1) {
    stepSchema = z.object({
      firstName: z.string().min(1, "First Name is required"),
      lastName: z.string().min(1, "Last Name is required"),
      email: z.string().email("Invalid email").min(1, "Email is required"),
      dateOfBirth: z.string().min(1, "Date of Birth is required"),
      gender: z.string().min(1, "Gender is required"),
    });
  } else if (activeCount === 2) {
    stepSchema = z.object({
      address: z.string().min(1, "Address is required"),
      city: z.string().min(1, "City is required"),
      state: z.string().min(1, "State is required"),
      zipCode: z.coerce.number().min(3, "ZIP Code is required"),
      phoneNumber: z.coerce.number().min(9, "Phone Number is required"),
    });
  } else if (activeCount === 3) {
    stepSchema = z.object({
      emiratesId: z.string().min(8, "Please enter correct Emirates ID/Passport No."),
      occupation: z.string().min(1, "Occupation/Company Name is required"),
      joinReason: z.string().min(1, "This is a required field"),
      acknowledgement: z.boolean().refine((val) => val === true, {
        message: "Please check the box to acknowledge the information is true.",
      }),
    });
  }

  const handleNext = async () => {
    setErrors({});

    const validation = stepSchema.safeParse(formData);

    if (!validation.success) {
      const formattedErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0]] = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }
    setActiveCount(activeCount + 1);
  };

  const handleSubmit = async () => {
    setErrors({});

    const validation = stepSchema.safeParse(formData);

    if (!validation.success) {
      const formattedErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0]] = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }

    setLoading(true);

    const result = await updateAccount(
      formData.dateOfBirth,
      formData.gender,
      formData.address,
      formData.city,
      formData.state,
      formData.zipCode,
      formData.emiratesId,
      formData.phoneNumber,
      formData.occupation,
      formData.referralSource,
      formData.joinReason
    );

    if (result.success) {
      router.push("/auth/onboard");
    } else {
      toast.error(result.message || "Profile update failed.");
    }

    setLoading(false);
  };

  const fetchPageData = async () => {
    setLoading(true);
    try {
      const response = await fetchData("user/setup_data");
      console.log("Response in frontend: ", response);

      if (response.user) {
        setFormData({
          email: response.user.email || "",
          firstName: response.user.firstName || "",
          lastName: response.user.lastName || "",
          dateOfBirth: response.user.dateOfBirth || "",
          gender: response.user.gender || "",
          address: response.user.address || "",
          city: response.user.city || "",
          state: response.user.state || "",
          zipCode: response.user.zipCode || "",
          emiratesId: response.user.emiratesId || "",
          phoneNumber: response.user.phoneNumber || "",
          occupation: response.user.occupation || "",
          referralSource: response.user.referralSource || "",
          joinReason: response.user.joinReason || "",
          acknowledgement: false,
          referredBy: response.referrer
            ? `${response.referrer.name} (${response.referrer.email})`
            : "",
        });
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPageData(); //turning this off due to edit page
  }, []);

  if (loading) {
    return (
      <div className=" w-full flex bg-[#51C2FF]/10 relative justify-center items-center min-h-screen overflow-hidden!">
        <div className="w-1/3 overflow-hidden aspect-square absolute fast-rotate-animation">
          <Image
            src="/logo.svg"
            alt="Account Setup"
            width={500}
            height={500}
            className="w-full h-full p-6 object-contain rounded-md"
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="w-1/2 h-screen overflow-y-auto p-6 custom-scrollbar flex justify-center items-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-red-600">
              An error occurred!
            </h2>
            <p className="mt-4 text-gray-600">
              We were unable to load your data. Please try again.
            </p>
            <button
              onClick={() => {
                setError(false);
                fetchPageData();
              }}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md"
            >
              Retry
            </button>
          </div>
        </div>
        <div className="w-1/2 overflow-hidden">
          <Image
            src="/logo.svg"
            alt="Account Setup"
            width={500}
            height={500}
            className="w-full h-full object-contain rounded-md"
          />
        </div>
      </div>
    );
  }

  const activeClass =
    "bg-[#1F587C] w-10 h-10 rounded-full text-lg text-center text-white flex items-center justify-center pb-0.5 cursor-pointer";
  const normalClass =
    "bg-[#1F587C]/10 text-[#1F587C]/50 w-10 h-10 rounded-full text-lg text-center font-medium border-2 border-[#1F587C]/30 flex items-center justify-center pb-0.5 -ml-1.5 cursor-pointer";

  return (
    <div className=" w-full flex bg-[#51C2FF]/10 relative justify-center items-center min-h-screen overflow-hidden!">
      <div className="w-full bg-white/10  z-10 backdrop-blur-xl mx-20 my-10 p-4 rounded-4xl flex items-center justify-center   ">
        <div className="w-full  bg-white/50  z-10 backdrop-blur-xl  rounded-4xl flex flex-col items-center justify-start py-5    ">
          {/* Heading & fill text */}
          <span className="text-5xl font-semibold bg-gradient-to-r from-[#51C2FF] via-[#A9EE86] to-[#FFA442] text-transparent bg-clip-text  decoration-[#51C2FF] leading-20">
            {" "}
            Finish Setting up your Account{" "}
          </span>
          <span className="text-base mt-4 text-[#333333]">
            Please fill in the details
          </span>

          {/* Top step numbers  */}
          <div className="flex mt-5 ">
            <div className={activeCount === 1 ? activeClass : normalClass}>
              1
            </div>
            <RigthArrow />

            <div
              className={`${activeCount === 2 ? activeClass : normalClass
                } -ml-1.5`}
            >
              2
            </div>
            <RigthArrow />
            <div
              className={`${activeCount === 3 ? activeClass : normalClass
                } -ml-1.5`}
            >
              3
            </div>
          </div>

          {/* Inputs  */}
          {activeCount === 1 && (
            <span className="text-[#333] text-lg font-medium w-full px-40">
              1. Personal Info
            </span>
          )}
          {activeCount === 1 && (
            <div className="w-full gap-5  flex flex-col items-end px-40 mt-5">
              <div className="flex w-full flex-1 gap-5 ">
                <SpecialInputs
                  name="firstName"
                  placeholder="Enter First Name"
                  label="First Name"
                  value={formData.firstName || ""}
                  onChange={handleChange}
                  disabled={true}
                  classes="bg-gray-300!"
                />
                <SpecialInputs
                  name="lastName"
                  placeholder="Enter Last Name"
                  label="Last Name"
                  value={formData.lastName || ""}
                  onChange={handleChange}
                  disabled={true}
                  classes="bg-gray-300!"
                />
              </div>
              <div className="flex w-full flex-1 gap-5">
                <div className="flex flex-col w-full">
                  <SpecialInputs
                    name="dateOfBirth"
                    placeholder="dd-mm-yy"
                    label="Date of birth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    type="date"
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-xs">{errors.dateOfBirth}</p>
                  )}
                </div>

                <div className="flex flex-col w-full">
                  <CustomSelect
                    value={formData.gender}
                    onValueChange={(value) =>
                      setFormData({ ...formData, gender: value })
                    }
                    name="Gender"
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "other", label: "Other" },
                    ]}
                    placeholder="Select Gender"
                  />
                  {errors.gender && (
                    <p className="text-red-500 text-xs">{errors.gender}</p>
                  )}
                </div>
              </div>

              <SpecialInputs
                name="emailID"
                placeholder="Enter Email here"
                label="Email ID"
                value={formData.email || ""}
                onChange={handleChange}
                disabled={true}
                classes="bg-gray-300!"
              />
              <ProceedButtons onClickFunc={handleNext}>Next</ProceedButtons>
            </div>
          )}
          {activeCount === 2 && (
            <span className="text-[#333] text-lg font-medium w-full px-40">
              2. Address and other details
            </span>
          )}
          {activeCount === 2 && (
            <div className="w-full gap-5  flex flex-col items-end px-40 mt-5">
              <div className="flex flex-col w-full">
                <SpecialInputs
                  name="address"
                  placeholder="Enter your address here"
                  label="Address"
                  value={formData.address || ""}
                  onChange={handleChange}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs">{errors.address}</p>
                )}
              </div>

              <div className="flex flex-col w-full">
                <SpecialInputs
                  name="city"
                  placeholder="Enter City here"
                  label="City"
                  value={formData.city || ""}
                  onChange={handleChange}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs">{errors.city}</p>
                )}
              </div>

              <div className="flex flex-col w-full">
                <SpecialInputs
                  name="state"
                  placeholder="Enter City here"
                  label="State"
                  value={formData.state || ""}
                  onChange={handleChange}
                />
                {errors.state && (
                  <p className="text-red-500 text-xs">{errors.state}</p>
                )}
              </div>

              <div className="flex flex-col w-full">
                <SpecialInputs
                  type="number"
                  name="zipCode"
                  placeholder="Enter Zip code here"
                  label="Zip Code"
                  value={formData.zipCode || ""}
                  onChange={handleChange}
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-xs">{errors.zipCode}</p>
                )}
              </div>

              <div className="flex flex-col w-full">
                <SpecialInputs
                  type="number"
                  name="phoneNumber"
                  placeholder="Enter Phone number here"
                  label="Phone number"
                  value={formData.phoneNumber || ""}
                  onChange={handleChange}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs">{errors.phoneNumber}</p>
                )}
              </div>
              <div className="w-full flex justify-between">
                <ProceedButtons
                  classes="bg-white text-black!"
                  onClickFunc={() => setActiveCount(1)}
                >
                  Back
                </ProceedButtons>
                <ProceedButtons onClickFunc={handleNext}>Next</ProceedButtons>
              </div>
            </div>
          )}
          {activeCount === 3 && (
            <span className="text-[#333] text-lg font-medium w-full px-40">
              3. Business details
            </span>
          )}
          {activeCount === 3 && (
            <div className="w-full gap-5  flex flex-col items-end px-40 mt-5">
              <div className="flex flex-col w-full">
                <SpecialInputs
                  name="emiratesId"
                  placeholder="Enter here"
                  label="Emirates ID/Passport No."
                  value={formData.emiratesId || ""}
                  onChange={handleChange}
                />
                {errors.emiratesId && (
                  <p className="text-red-500 text-xs">{errors.emiratesId}</p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <SpecialInputs
                  name="occupation"
                  placeholder="Enter here"
                  label="Occupation/ Company name"
                  value={formData.occupation || ""}
                  onChange={handleChange}
                />
                {errors.occupation && (
                  <p className="text-red-500 text-xs">{errors.occupation}</p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <SpecialInputs
                  name="referredBy"
                  placeholder="Enter here"
                  label="How did you hear about us?"
                  value={formData.referredBy || ""}
                  onChange={handleChange}
                />
                {errors.referredBy && (
                  <p className="text-red-500 text-xs">{errors.referredBy}</p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <SpecialInputs
                  name="joinReason"
                  placeholder="Enter here"
                  label="Reason for joining"
                  value={formData.joinReason || ""}
                  onChange={handleChange}
                />
                {errors.joinReason && (
                  <p className="text-red-500 text-xs">{errors.joinReason}</p>
                )}
              </div>

              <div className="flex gap-5 items-center justify-start w-full">
                {/* <CustomCheckbox label='sdf' checked={true} onChange={()=>{}}/> */}
                <Checkbox
                  checked={formData.acknowledgement}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, acknowledgement: !!checked })
                  }
                  className="text-gray-600 mt-0.5
              "
                />
                <span className="text-[#1F587C] text-sm text-left mt-0.5">
                  I acknowledge that the information provided is accurate and
                  complete, to the best of my knowledge
                </span>
              </div>

              <div className="w-full flex justify-between gap-20">
                <ProceedButtons
                  classes="bg-white text-black!"
                  onClickFunc={() => setActiveCount(2)}
                >
                  Back
                </ProceedButtons>
                {loading ? (
                  <ProceedButtons
                    disabled={loading}
                    classes="bg-[#479FD7]!  text-center!  justify-center! "
                  >
                    Processing...
                  </ProceedButtons>
                ) : (
                  <ProceedButtons
                    onClickFunc={handleSubmit}
                    disabled={loading}
                    classes="bg-[#479FD7]!  text-center!  justify-center! "
                  >
                    Submit
                  </ProceedButtons>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom logo */}
      <div className="w-2/3 overflow-hidden aspect-square absolute top-2/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-animation ">
        <Image
          src="/logo.svg"
          alt="Account Setup"
          width={500}
          height={500}
          className="w-full h-full p-6 object-contain rounded-md"
        />
      </div>
      <div className="absolute -top-20 -translate-y-1/2 -left-[12vw] w-[40vw] h-[25vw] bg-[#81FFD9] blur-3xl opacity-50 rounded-full"></div>
    </div>
  );
};

export default AccountSetupPage;

{
  /* <div className="absolute inset-0 border-10 rounded-4xl border-transparent"
        style={{
          borderImage: "linear-gradient(to right, #ff7e5f, #feb47b) 1",
          WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)"
        }}></div> */
}

// <div className="w-full h-screen overflow-y-auto p-6 custom-scrollbar hidden
// ">
//   <div>
//     <h1 className="text-2xl font-bold">Finish setting up your Account</h1>
//     <p className="mt-2 text-gray-600">Please fill in the details below</p>
//     <div className="flex w-full gap-4 mb-4">
//       <div className="flex w-full flex-col my-2">
//         <p className="text-sm">First Name</p>

//         <input
//           type="text"
//           name="firstName"
//           value={formData.firstName || ""}
//           onChange={handleChange}
//           disabled
//           className="w-full px-4 py-4 text-sm text-gray-500 mt-1 bg-gray-100 rounded-md outline-none cursor-not-allowed"
//         />
//       </div>
//       <div className="flex w-full flex-col my-2">
//         <p className="text-sm">Last Name</p>
//         <input
//           type="text"
//           name="lastName"
//           value={formData.lastName || ""}
//           onChange={handleChange}
//           disabled
//           className="w-full px-4 py-4 text-sm mt-1 text-gray-500 bg-gray-100 rounded-md outline-none cursor-not-allowed"
//         />
//       </div>
//     </div>
//     <div className="flex flex-col my-2">
//       <p className="text-sm">Email</p>
//       <input
//         type="text"
//         name="email"
//         value={formData.email || ""}
//         onChange={handleChange}
//         disabled
//         className="w-full px-4 py-4 text-sm mt-1 text-gray-500 bg-gray-100 rounded-md outline-none cursor-not-allowed"
//       />
//     </div>
//     <div className="flex flex-col my-2">
//       <p className="text-sm">Referred By</p>
//       <input
//         type="text"
//         name="referralCode"
//         value={formData.referredBy || ""}
//         onChange={handleChange}
//         disabled
//         placeholder="-"
//         className="w-full px-4 py-4 text-sm mt-1 text-gray-500 bg-gray-100 rounded-md outline-none cursor-not-allowed"
//       />
//     </div>

//     <div className="flex flex-col my-2">
//       <p className="text-sm">Date of Birth</p>
//       <input
//         type="date"
//         name="dateOfBirth"
//         value={formData.dateOfBirth}
//         onChange={handleChange}
//         className="w-full px-4 py-4 text-sm mt-1 bg-gray-100 rounded-md outline-none"
//       />
//       {errors.dateOfBirth && (
//         <p className="text-red-500 text-xs">{errors.dateOfBirth}</p>
//       )}
//     </div>

//     <div className="flex flex-col my-2">
//       <p className="text-sm">Gender</p>
//       <Select
//         value={formData.gender}
//         onValueChange={(value) =>
//           setFormData({ ...formData, gender: value })
//         }
//       >
//         <SelectTrigger className="w-full px-4 py-6 text-sm mt-1 bg-gray-100 rounded-md">
//           <SelectValue placeholder="Select Gender" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="male">Male</SelectItem>
//           <SelectItem value="female">Female</SelectItem>
//           <SelectItem value="other">Other</SelectItem>
//         </SelectContent>
//       </Select>
//       {errors.gender && (
//         <p className="text-red-500 text-xs">{errors.gender}</p>
//       )}
//     </div>

//     <div className="flex flex-col my-2">
//       <p className="text-sm">Address</p>
//       <input
//         type="text"
//         name="address"
//         value={formData.address}
//         onChange={handleChange}
//         className="w-full px-4 py-4 text-sm mt-1 bg-gray-100 rounded-md outline-none"
//       />
//       {errors.address && (
//         <p className="text-red-500 text-xs">{errors.address}</p>
//       )}
//     </div>

//     <div className="flex flex-col my-2">
//       <p className="text-sm">City</p>
//       <input
//         type="text"
//         name="city"
//         value={formData.city}
//         onChange={handleChange}
//         className="w-full px-4 py-4 text-sm mt-1 bg-gray-100 rounded-md outline-none"
//       />
//       {errors.city && (
//         <p className="text-red-500 text-xs">{errors.city}</p>
//       )}
//     </div>

//     <div className="flex flex-col my-2">
//       <p className="text-sm">State</p>
//       <input
//         type="text"
//         name="state"
//         value={formData.state}
//         onChange={handleChange}
//         className="w-full px-4 py-4 text-sm mt-1 bg-gray-100 rounded-md outline-none"
//       />
//       {errors.state && (
//         <p className="text-red-500 text-xs">{errors.state}</p>
//       )}
//     </div>

//     <div className="flex flex-col my-2">
//       <p className="text-sm">ZIP Code</p>
//       <input
//         type="text"
//         name="zipCode"
//         value={formData.zipCode}
//         onChange={handleChange}
//         className="w-full px-4 py-4 text-sm mt-1 bg-gray-100 rounded-md outline-none"
//       />
//       {errors.zipCode && (
//         <p className="text-red-500 text-xs">{errors.zipCode}</p>
//       )}
//     </div>

//     <div className="flex flex-col my-2">
//       <p className="text-sm">EmiratesID / Passport No.</p>
//       <input
//         type="text"
//         name="emiratesId"
//         value={formData.emiratesId}
//         onChange={handleChange}
//         className="w-full px-4 py-4 text-sm mt-1 bg-gray-100 rounded-md outline-none"
//       />
//       {errors.emiratesId && (
//         <p className="text-red-500 text-xs">{errors.emiratesId}</p>
//       )}
//     </div>

//     <div className="flex flex-col my-2">
//       <p className="text-sm">Phone Number</p>
//       <input
//         type="text"
//         name="phoneNumber"
//         value={formData.phoneNumber}
//         onChange={handleChange}
//         className="w-full px-4 py-4 text-sm mt-1 bg-gray-100 rounded-md outline-none"
//       />
//       {errors.phoneNumber && (
//         <p className="text-red-500 text-xs">{errors.phoneNumber}</p>
//       )}
//     </div>

//     <div className="flex flex-col my-2">
//       <p className="text-sm">Occupation / Company Name</p>
//       <input
//         type="text"
//         name="occupation"
//         value={formData.occupation}
//         onChange={handleChange}
//         className="w-full px-4 py-4 text-sm mt-1 bg-gray-100 rounded-md outline-none"
//       />
//       {errors.occupation && (
//         <p className="text-red-500 text-xs">{errors.occupation}</p>
//       )}
//     </div>

//     <div className="flex flex-col my-2">
//       <p className="text-sm">How did you hear about us?</p>
//       <input
//         type="text"
//         name="referralSource"
//         value={formData.referralSource}
//         onChange={handleChange}
//         className="w-full px-4 py-4 text-sm mt-1 bg-gray-100 rounded-md outline-none"
//       />
//       {errors.referralSource && (
//         <p className="text-red-500 text-xs">{errors.referralSource}</p>
//       )}
//     </div>

//     <div className="flex flex-col my-2">
//       <p className="text-sm">Reasons for Joining</p>
//       <textarea
//         name="joinReason"
//         value={formData.joinReason}
//         onChange={handleChange}
//         className="w-full px-4 py-4 text-sm mt-1 bg-gray-100 rounded-md outline-none"
//       />
//       {errors.joinReason && (
//         <p className="text-red-500 text-xs">{errors.joinReason}</p>
//       )}
//     </div>

//     <div className="flex items-center my-2">
//       <Checkbox
//         checked={formData.acknowledgement}
//         onCheckedChange={(checked) =>
//           setFormData({ ...formData, acknowledgement: !!checked })
//         }
//         className="text-gray-600"
//       />
//       <p className="ml-2 text-sm">
//         I acknowledge that the information provided is accurate and
//         complete, to the best of my knowledge.
//       </p>
//     </div>
//     {errors.acknowledgement && (
//       <p className="text-red-500 text-xs">{errors.acknowledgement}</p>
//     )}

//     <div className="flex items-center justify-center mt-6">
//       <button
//         type="button"
//         onClick={handleSubmit}
//         className="w-full px-4 py-4 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none"
//         disabled={loading}
//       >
//         {loading ? "Processing..." : "Submit"}
//       </button>
//     </div>
//     {Object.keys(errors).length > 0 && (
//       <p className="text-red-500 text-xs">There are missing fields</p>
//     )}
//   </div>
// </div>
