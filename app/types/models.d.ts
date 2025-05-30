type Role = "FREE_USER" | "PAID_USER" | "ADMIN" | "SUPER_ADMIN" | "SETUP_PENDING" | "PAYMENT_PENDING" | "ONBOARDING";

export type ReviewStatus = 'APPROVED' | 'PENDING' | 'HOLD' | 'REJECTED';

export type PaymentStatus = 'PENDING' | 'RECEIVED' | 'FAILED' | 'CANCELLED';

export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export type TransactionType = 'SUBSCRIPTION' | 'DEAL' | 'PAYOUT';

interface User {
  id: string; 
  firstName: string;
  lastName: string;
  email: string;
  referralId: string;
  createdAt: string; // or Date, depending on your usage
  walletBalance: number;
  role: Role;
  kycDone: boolean; 
  phoneNumber?: string;
  occupation?: string;
  emiratesId?: string;
  zipCode?: string;
  state?: string;
  city?: string;
  address?: string;
  gender?: string;
  dateOfBirth?: string; // or Date
  referralSource?: string;
  joinReason?: string;
  avatarUrl?: string;
  kyc?: KycType; 
}

interface KycOwner {
  kycId: string;
  fullName: string;
  role: string;
  nationality: string;
  shareholding: number;
  passportNumber: string;
  idDocumentUrl?: string;
}

interface KycType {
  id: string;
  user: User;
  iban?: string;
  accountNumber?: string;
  swiftCode?: string;
  routingNumber?: string;
  entityName?: string;
  commercialRegNumber?: string;
  crExpiryDate?: string;
  incorporationDate?: string;
  countryOfIncorporation?: string;
  typeOfEntity?: string;
  registeredAddress?: string;
  operationalAddress?: string;
  contactPersonName?: string;
  designation?: string;
  contactNumber?: string;
  emailAddress?: string;
  website?: string;
  politicallyExposed?: boolean;
  underSanctions?: boolean;
  tradeLicenseUrl?: string;
  passportCopiesUrl?: string;
  boardResolutionUrl?: string;
  proofOfAddressUrl?: string;
  additionalDocumentsUrl?: string;
  thirdPartyConsent: boolean;
  agreedToTerms: boolean;
  owners: KycOwner[];
  createdAt: string;
  updatedAt: string;
}

export interface Withdrawal {
  id: string;
  createdAt: string; // ISO string if received from API as JSON
  updatedAt: string; // ISO string
  amount: string | number | Decimal; // depends on how your backend serializes it
  currency: string;
  userId: string;
  user: User;
  status: ReviewStatus ;
  walletBalance?: string | number | Decimal;
  adminNote?: string;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  createdAt: string; // ISO string
  approvalStatus: ReviewStatus;
  userId: string;
  user: User; 
  productImages: ProductImage[];
}

export interface Deal {
  id: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  productId: string;
  sellerId: string;
  buyerId: string;
  amount: string | number; // Decimal from Prisma, often serialized as string
  skus: string;
  adminComment?: string;
  dealStatus: ReviewStatus;
  paymentStatus: PaymentStatus;
  product: Product;
  seller: User;
  buyer:User;
}

export interface Transaction {
  id: string;
  userId: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  createdAt: string; // ISO string
  type: TransactionType;
  user:User
}