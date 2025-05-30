"use client"
import BankDetailInputs from '@/app/components/KYC/BankDetailInputs'
import KYCPopup from '@/app/components/KYC/KYCPopup'
import SubmitPopup from '@/app/components/KYC/SubmitPopup'
import KYCHeader from '@/app/components/KYC/header'
import SectionHeader from '@/app/components/SectionHeader'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import EntityInformations from '../../components/KYC/EntityInfo'
import KycContactDetails from '@/app/components/KYC/ContactDetails'
import OwnerInformation from '@/app/components/KYC/OwnerInfo'
import LegalDeclarations from '@/app/components/KYC/LegalDeclarations'
import SupportingDocuments from '@/app/components/KYC/SupportingDocuments'
import { z } from 'zod'
import { uploadImageToS3 } from '@/lib/aws/awsS3Helper'
import { toast } from 'sonner'
import { createKycRequest } from '@/lib/kyc/helper'

type Owner = {
  fullName: string;
  role: string;
  nationality: string;
  shareholding: string;
  passportNumber: string;
  idDocumentUrl?: string;
};

type FormDataType = {
  iban: string;
  accountNumber: string;
  swiftCode: string;
  routingNumber: string;
  entityName: string;
  crTlNumber: string;
  crTlExpiryDate: string;
  incorporationDate: string; 
  incorporationCountry: string;
  entityType: string;
  registeredAddress: string;
  operationalAddress: string;
  contactPerson: string;
  designation: string;
  contactNumber: string;
  email: string;
  website: string;
  ownerInfo: Owner[];
  suportingDocuments: {
    tradeLicense: { url: string };
    passportCopies: { url: string };
    boardResolution?: { url: string };
    proofOfAddress: { url: string };
    additionalDocuments?: { url: string } | string;
  };
 isPoliticallyExposed: boolean | null;
  isUnderInternationalSanctions:  boolean | null;
  thirdPartyConsent: boolean;
  agreedToTerms : boolean
};


function KYC() {
  const [step, setstep] = useState(1)
  const router = useRouter()
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormDataType>({
    iban: "",
    accountNumber: "",
    swiftCode: "",
    routingNumber: "",
    entityName: "",
    crTlNumber: "",
    crTlExpiryDate: "",
    incorporationDate: "",
    incorporationCountry: "",
    entityType: "",
    registeredAddress: "",
    operationalAddress: "",
    contactPerson: "",
    designation: "",
    contactNumber: "",
    email: "",
    website: "",
    ownerInfo: [],
    suportingDocuments: {
        tradeLicense: { url: "" },
    passportCopies: { url: "" },
    boardResolution: { url: "" },
    proofOfAddress: { url: "" },
    additionalDocuments: { url: "" }, 
    },
    isPoliticallyExposed: null,
    isUnderInternationalSanctions: null,
    thirdPartyConsent: false,
    agreedToTerms: false
  })
  const [loading, setLoading] = useState(false)

  const ownerSchema = z.object({
    fullName: z.string().min(1, "Full Name is required"),
    role: z.string().min(1, "Role is required"),
    nationality: z.string().min(1, "Nationality is required"),
    shareholding: z.string().min(1, "Shareholding is required"),
    passportNumber: z.string().min(1, "Passport/ID Number is required"),
    idDocument: z.any().nullable().optional(), // Assuming file input
  });

  // ownerInfo must be a non-empty array of valid owner objects
  const ownerInfoSchema = z.array(ownerSchema).min(1, "At least one owner's all the information must be provided");


  let stepSchema: z.ZodObject<any>;

  if (step === 1) {
    stepSchema = z.object({
      iban: z.string().min(15, "IBAN must be at least 15 characters").max(34, "IBAN must be at most 34 characters"),
      accountNumber: z.string().min(5, "Account Number is required"),
      swiftCode: z.string().min(8, "SWIFT Code must be 8 or 11 characters").max(11, "SWIFT Code must be 8 or 11 characters"),
      routingNumber: z.string().min(5, "Routing Number is required"),
    });
  } else if (step === 2) {
    stepSchema = z.object({
      entityName: z.string().min(1, "Entity Name is required"),
      crTlNumber: z.string().min(1, "CR/TL Number is required"),
      crTlExpiryDate: z
        .string()
        .min(1, "CR/TL Expiry Date is required")
        .refine((date) => !isNaN(Date.parse(date)), {
          message: "Invalid date format",
        }),
      incorporationDate: z
        .string()
        .min(1, "Incorporation Date is required")
        .refine((date) => !isNaN(Date.parse(date)), {
          message: "Invalid date format",
        }),
      incorporationCountry: z.string().min(1, "Incorporation Country is required"),
      entityType: z.string().min(1, "Entity Type is required"),
      registeredAddress: z.string().min(1, "Registered Address is required"),
      operationalAddress: z.string().optional(),
    });
  } else if (step === 3) {
    stepSchema = z.object({
      contactPerson: z.string().min(1, "Contact Person is required"),
      designation: z.string().min(1, "Designation is required"),
      contactNumber: z
        .string()
        .min(10, "Contact Number must be at least 10 digits")
        .max(15, "Contact Number must not exceed 15 digits"),
      email: z
        .string()
        .email("Invalid email format")
        .min(1, "Email is required"),
      website: z
        .string()
        .url("Invalid website URL")
        .optional()
        .or(z.literal("")),
    });
  } else if (step === 4) {
    stepSchema = z.object({
      ownerInfo: ownerInfoSchema
    })
  } else if (step === 5) {
    stepSchema = z.object({
      isPoliticallyExposed: z.boolean({
        required_error: "This field is required",
        invalid_type_error: "Please select any of the option",
      }),
      isUnderInternationalSanctions: z.boolean({
        required_error: "This field is required",
        invalid_type_error: "Please select any of the option",
      }),
       thirdPartyConsent: z.literal(true, {
          errorMap: () => ({
            message: "You must provide third party consent to proceed.",
          }),
        }),
      agreedToTerms: z.literal(true, {
          errorMap: () => ({
            message: "You must agree to the terms and conditions.",
          }),
        }),
    })
  } else if (step === 6) {
     stepSchema = z.object({
        suportingDocuments: z.object({
          tradeLicense: z.object({
            url: z.string().url({ message: "Trade License URL is required" }),
          }),
          passportCopies: z.object({
            url: z.string().url({ message: "Passport Copies URL is required" }),
          }),
          proofOfAddress: z.object({
            url: z.string().url({ message: "Proof of Address URL is required" }),
          }),
          boardResolution: z
            .object({
              url: z.string().url(),
            })
            .optional(),
          additionalDocuments: z
            .union([
              z.string().optional(),
              z.object({
                url: z.string().url(),
              }),
            ])
            .optional(),
        }),
      });
  }

  const handleInputChange = (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

  const handleOwnerInput = (owner: Owner[]) => {
    setFormData(prev => ({ ...prev, ['ownerInfo']: owner}));
  }

  const handleLegalDeclaration = (field: string, value : boolean) =>{
    console.log(value)
      setFormData(prev => ({ ...prev, [field]: value }));
  }

const handleOwnerSubmit = (owner: Owner[]) => {
    handleOwnerInput(owner)
    handleNext()
  }

  const handleNext = () => {
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
    setstep(step + 1);

  }

     const imageUploadHandler = async (file: File, field: string,  ownerIndex: number) => {
        try {
          const imageUrl = await uploadImageToS3(file);
  
          if (typeof imageUrl.url === "string" && imageUrl.url.trim() !== "") {
            // setFormData(prev => ({ ...prev, [field]: imageUrl }));
         setFormData((prev) => {
            const updatedOwners = [...prev.ownerInfo];
            updatedOwners[ownerIndex] = {
              ...updatedOwners[ownerIndex],
              [field]: imageUrl,
            };

            return {
              ...prev,
              ownerInfo: updatedOwners,
            };
          
          })
          return imageUrl; 
        }
          else {
            console.warn("Invalid image URL returned:", imageUrl);
          }
        } catch (error) {
          console.error("Upload failed:", error);
        }
      };

    const handleImageInput = async (inputFile: File, field: string, ownerIdex: number): Promise<{ url: string } | undefined> => {
        const file = inputFile; // get only the first file
        // const file = e.target.files?.[0]; // get only the first file
  
        if (!file) return;
  
        setLoading(true);    
        const res = imageUploadHandler(file, field, ownerIdex); // pass single file
        setLoading(false);
        return res
      };

    const handleSupportingDocumentsFileUploads = async (inputFile: File, field: string, ) => {
      const file = inputFile;
      if (!file) return;
        try {
          const imageUrl = await uploadImageToS3(file);
  
          if (typeof imageUrl.url === "string" && imageUrl.url.trim() !== "") {
            // setFormData(prev => ({ ...prev, [field]: imageUrl }));
            setFormData((prev) => ({
                ...prev,
                suportingDocuments: {
                  ...prev.suportingDocuments,
                  [field]: imageUrl,
                },
              }));
            }
          else {
            console.warn("Invalid image URL returned:", imageUrl);
          }
        } catch (error) {
          console.error("Upload failed:", error);
        }
    }
        const handleSubmit = async () => {
          setLoading(true)
          try {
            if (Object.keys(errors).length > 0) {
              toast.error('Please enter and upload all the required fields');
              return;
            }

            const res = await createKycRequest(formData);
            console.log('response', res)
            // Check HTTP response status
            if (res.status === 201) {
              toast.success('KYC request successfully submitted');
              setstep(7);
              setLoading(false)
            } else {
              toast.error('Error submitting the KYC. Please try again later.');
              setLoading(false)
            }
          } catch (error) {
            toast.error('Something went wrong. Please try again.');
            console.error("KYC submission error:", error);
            setLoading(false)
          }
        };

    console.log('formData', formData)
    console.log('errors', errors)

  return (
    <SectionHeader classes=' w-full! items-start justify-start gap-5! mt-10 min-h-screen!  '>
      {/* <KYCHeader /> */}
      {step === 1 &&
        <BankDetailInputs
          errors={errors}
          iban={formData.iban}
          accountNumber={formData.accountNumber}
          swiftCode={formData.swiftCode}
          routingNumber={formData.routingNumber}
          handleInputChange={handleInputChange}
          onNext={handleNext}
          onPrev={() => router.back()}
        />
      }
      {step === 2 && (
        <EntityInformations
          errors={errors}
          entityName={formData.entityName}
          crTlNumber={formData.crTlNumber}
          crTlExpiryDate={formData.crTlExpiryDate}
          incorporationDate={formData.incorporationDate}
          incorporationCountry={formData.incorporationCountry}
          entityType={formData.entityType}
          registeredAddress={formData.registeredAddress}
          operationalAddress={formData.operationalAddress}
          handleInputChange={handleInputChange}
          onNext={handleNext}
          onPrev={() => setstep(1)}
        />
      )}
      {step === 3 && (
        <KycContactDetails
          errors={errors}
          contactPersonName={formData.contactPerson}
          contactDesignation={formData.designation}
          contactNumber={formData.contactNumber}
          contactEmail={formData.email}
          contactWebsite={formData.website}
          handleInputChange={handleInputChange}
          onNext={handleNext}
          onPrev={() => setstep(2)}
        />
      )}
      {step === 4 && (
        <OwnerInformation
          errors={errors}
          handleOwnerSubmit={handleOwnerSubmit}
          onNext={handleNext}
          onPrev={() => setstep(2)}
          handleImageInput={handleImageInput}
        />
      )}
      {step === 5 && (
        <LegalDeclarations
          handleLegalDeclaration={handleLegalDeclaration}
          errors={errors}
          onNext={handleNext}
          onPrev={() => setstep(4)}
        />
      )}
      {step === 6 && (
        <SupportingDocuments
          loading={loading}
          handleImageInput={handleSupportingDocumentsFileUploads}
          errors={errors}
          onNext={handleSubmit}
          onPrev={() => setstep(5)}
        />
      )}
      {step === 7 && (
        <SubmitPopup
          onPrev={() => router.push('/dashboard')}
        />
      )}
    </SectionHeader>
  )
}

export default KYC