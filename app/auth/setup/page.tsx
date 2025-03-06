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

const AccountSetupSchema = z.object({
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  gender: z.string().min(1, "Gender is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP Code is required"),
  emiratesId: z.string().min(1, "EmiratesID/Passport No. is required"),
  phoneNumber: z.string().min(1, "Phone Number is required"),
  occupation: z.string().min(1, "Occupation/Company Name is required"),
  referralSource: z.string().min(1, "This is a required field"),
  joinReason: z.string().min(1, "This is a required field"),
  acknowledgement: z.boolean().refine((val) => val === true, {
    message: "Please check the box to acknowledge the information is true.",
  }),
});

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
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setErrors({});

    const validation = AccountSetupSchema.safeParse(formData);

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
      router.push("/auth/payment");
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
    fetchPageData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="w-1/2 h-screen overflow-y-auto p-6 custom-scrollbar flex justify-center items-center">
          <Loader />
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

  return (
    <div className="h-screen w-full flex">
      <div className="w-1/2 h-screen overflow-y-auto p-6 custom-scrollbar">
        <div>
          <h1 className="text-2xl font-bold">Finish setting up your Account</h1>
          <p className="mt-2 text-gray-600">Please fill in the details below</p>
          <div className="flex w-full gap-4 mb-4">
            <div className="flex w-full flex-col my-2">
              <p className="text-sm">First Name</p>
              <input
                type="text"
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
                disabled
                className="w-full px-4 py-4 text-sm text-gray-500 mt-1 bg-gray-100 rounded-md outline-none cursor-not-allowed"
              />
            </div>
            <div className="flex w-full flex-col my-2">
              <p className="text-sm">Last Name</p>
              <input
                type="text"
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
                disabled
                className="w-full px-4 py-4 text-sm mt-1 text-gray-500 bg-gray-100 rounded-md outline-none cursor-not-allowed"
              />
            </div>
          </div>
          <div className="flex flex-col my-2">
            <p className="text-sm">Email</p>
            <input
              type="text"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              disabled
              className="w-full px-4 py-4 text-sm mt-1 text-gray-500 bg-gray-100 rounded-md outline-none cursor-not-allowed"
            />
          </div>
          <div className="flex flex-col my-2">
            <p className="text-sm">Referred By</p>
            <input
              type="text"
              name="referralCode"
              value={formData.referredBy || ""}
              onChange={handleChange}
              disabled
              placeholder="-"
              className="w-full px-4 py-4 text-sm mt-1 text-gray-500 bg-gray-100 rounded-md outline-none cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col my-2">
            <p className="text-sm">Date of Birth</p>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-4 text-sm mt-1 bg-gray-100 rounded-md outline-none"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-xs">{errors.dateOfBirth}</p>
            )}
          </div>

          <div className="flex flex-col my-2">
            <p className="text-sm">Gender</p>
            <Select
              value={formData.gender}
              onValueChange={(value) =>
                setFormData({ ...formData, gender: value })
              }
            >
              <SelectTrigger className="w-full px-4 py-6 text-sm mt-1 bg-gray-100 rounded-md">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && (
              <p className="text-red-500 text-xs">{errors.gender}</p>
            )}
          </div>

          <div className="flex flex-col my-2">
            <p className="text-sm">Address</p>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-4 text-sm mt-1 bg-gray-100 rounded-md outline-none"
            />
            {errors.address && (
              <p className="text-red-500 text-xs">{errors.address}</p>
            )}
          </div>

          <div className="flex flex-col my-2">
            <p className="text-sm">City</p>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-4 text-sm mt-1 bg-gray-100 rounded-md outline-none"
            />
            {errors.city && (
              <p className="text-red-500 text-xs">{errors.city}</p>
            )}
          </div>

          <div className="flex flex-col my-2">
            <p className="text-sm">State</p>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-4 py-4 text-sm mt-1 bg-gray-100 rounded-md outline-none"
            />
            {errors.state && (
              <p className="text-red-500 text-xs">{errors.state}</p>
            )}
          </div>

          <div className="flex flex-col my-2">
            <p className="text-sm">ZIP Code</p>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full px-4 py-4 text-sm mt-1 bg-gray-100 rounded-md outline-none"
            />
            {errors.zipCode && (
              <p className="text-red-500 text-xs">{errors.zipCode}</p>
            )}
          </div>

          <div className="flex flex-col my-2">
            <p className="text-sm">EmiratesID / Passport No.</p>
            <input
              type="text"
              name="emiratesId"
              value={formData.emiratesId}
              onChange={handleChange}
              className="w-full px-4 py-4 text-sm mt-1 bg-gray-100 rounded-md outline-none"
            />
            {errors.emiratesId && (
              <p className="text-red-500 text-xs">{errors.emiratesId}</p>
            )}
          </div>

          <div className="flex flex-col my-2">
            <p className="text-sm">Phone Number</p>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-4 text-sm mt-1 bg-gray-100 rounded-md outline-none"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs">{errors.phoneNumber}</p>
            )}
          </div>

          <div className="flex flex-col my-2">
            <p className="text-sm">Occupation / Company Name</p>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="w-full px-4 py-4 text-sm mt-1 bg-gray-100 rounded-md outline-none"
            />
            {errors.occupation && (
              <p className="text-red-500 text-xs">{errors.occupation}</p>
            )}
          </div>

          <div className="flex flex-col my-2">
            <p className="text-sm">How did you hear about us?</p>
            <input
              type="text"
              name="referralSource"
              value={formData.referralSource}
              onChange={handleChange}
              className="w-full px-4 py-4 text-sm mt-1 bg-gray-100 rounded-md outline-none"
            />
            {errors.referralSource && (
              <p className="text-red-500 text-xs">{errors.referralSource}</p>
            )}
          </div>

          <div className="flex flex-col my-2">
            <p className="text-sm">Reasons for Joining</p>
            <textarea
              name="joinReason"
              value={formData.joinReason}
              onChange={handleChange}
              className="w-full px-4 py-4 text-sm mt-1 bg-gray-100 rounded-md outline-none"
            />
            {errors.joinReason && (
              <p className="text-red-500 text-xs">{errors.joinReason}</p>
            )}
          </div>

          <div className="flex items-center my-2">
            <Checkbox
              checked={formData.acknowledgement}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, acknowledgement: !!checked })
              }
              className="text-gray-600"
            />
            <p className="ml-2 text-sm">
              I acknowledge that the information provided is accurate and
              complete, to the best of my knowledge.
            </p>
          </div>
          {errors.acknowledgement && (
            <p className="text-red-500 text-xs">{errors.acknowledgement}</p>
          )}

          <div className="flex items-center justify-center mt-6">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full px-4 py-4 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none"
              disabled={loading}
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
          {Object.keys(errors).length > 0 && (
            <p className="text-red-500 text-xs">There are missing fields</p>
          )}
        </div>
      </div>
      <div className="w-1/2 overflow-hidden">
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
};

export default AccountSetupPage;
