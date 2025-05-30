import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to authenticate user
async function authenticateUser() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("auth_token")?.value;

  if (!token) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  let decoded: any;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    cookiesStore.delete("auth_token");
    return { error: NextResponse.json({ error: "Invalid token" }, { status: 401 }) };
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
  });

  if (!user) {
    cookiesStore.delete("auth_token");
    return { error: NextResponse.json({ error: "User not found" }, { status: 404 }) };
  }

  return { user };
}

// 📦 POST /api/ecommerce/create
export async function POST(req: NextRequest) {
  const { error, user } = await authenticateUser();
  if (error) return error;

  const body = await req.json();

  const {
        iban,
        accountNumber,
        swiftCode,
        routingNumber,
        entityName,
        crTlNumber,
        crTlExpiryDate,
        incorporationDate,
        incorporationCountry,
        entityType,
        registeredAddress,
        operationalAddress,
        contactPerson,
        designation,
        contactNumber,
        email,
        website,
        ownerInfo,
        suportingDocuments,
        isPoliticallyExposed,
        isUnderInternationalSanctions,
        thirdPartyConsent,
        agreedToTerms,
    } = body;


  try {
    const updateData: any = {
      userId: user.id, // from authenticated user
      iban,
      accountNumber,
      swiftCode,
      routingNumber,
      entityName,
      commercialRegNumber: crTlNumber,
      crExpiryDate: new Date(crTlExpiryDate),
      incorporationDate: new Date(incorporationDate),
      countryOfIncorporation: incorporationCountry,
      typeOfEntity: entityType,
      registeredAddress,
      operationalAddress,
      contactPersonName: contactPerson,
      designation,
      contactNumber,
      emailAddress: email,
      website,
      politicallyExposed: isPoliticallyExposed,
      underSanctions: isUnderInternationalSanctions,
      thirdPartyConsent,
      agreedToTerms,

      // File upload URLs
      tradeLicenseUrl: suportingDocuments.tradeLicense.url,
      passportCopiesUrl: suportingDocuments.passportCopies.url,
      boardResolutionUrl: suportingDocuments.boardResolution.url,
      proofOfAddressUrl: suportingDocuments.proofOfAddress.url,
    };

    if (suportingDocuments.additionalDocuments) {
      updateData.additionalDocumentsUrl = suportingDocuments.additionalDocuments.url
    }

    console.log("Creating KYC with data:", updateData);

    // Create KYC record
    const createdKyc = await prisma.kyc.create({
      data: {
        ...updateData,

        // Create related KycOwner records
        owners: {
          create: ownerInfo.map((owner: any) => ({
            fullName: owner.fullName,
            role: owner.role,
            nationality: owner.nationality,
            shareholding: parseFloat(owner.shareholding), // ensure float
            passportNumber: owner.passportNumber,
            idDocumentUrl: owner.idProof.url, // should be the file URL
          })),
        },
      },
    });

    return NextResponse.json({ status: 201 });
  } catch (err: any) {
    console.error("KYC creation failed:", err);
    return NextResponse.json({ error: "Failed to create product", details: err.message }, { status: 500 });
  }
}
