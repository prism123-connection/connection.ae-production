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
    name,
    shortDescription,
    description,
    price,
    currency,
    category,
    goLiveAt,
    tags,           // Expecting tags as string[] like ['tag1', 'tag2']
    productImages,  // Expecting productImages as string[] of image URLs
  } = body;

  try {
    // Step 1: Create the product
    const updateData: any = {
    name,
    shortDescription,
    description,
    price,
    currency,
    category,
    userId: user.id,
  };

  if (goLiveAt && goLiveAt !== '') {
    updateData.goLiveAt = new Date(goLiveAt);
  }


    const product = await prisma.product.create({
      data: updateData,
    });

    // Step 2: Create associated tags if provided
    if (Array.isArray(tags) && tags.length > 0) {
      await prisma.productTag.createMany({
        data: tags.map((tag: string) => ({
          value: tag,
          productId: product.id,
        })),
        skipDuplicates: true, // In case same tag is accidentally repeated
      });
    }

    // Step 3: Create associated images if provided
    if (Array.isArray(productImages) && productImages.length > 0) {
      await prisma.productImage.createMany({
        data: productImages.map((url: string) => ({
          url,
          productId: product.id,
        })),
        skipDuplicates: true,
      });
    }

      // Step 4: Create the LiveStream for the product
      if (goLiveAt && goLiveAt !== '') {
          await prisma.liveStream.create({
          data: {
            productId: product.id,
            userId: user.id,
            goLiveAt: new Date(goLiveAt),
            status: 'LIVE_PENDING', 
          },
      });
      }
    

    // Step 4: Return the created product
    // const fullProduct = await prisma.product.findUnique({
    //   where: { id: product.id },
    //   include: {
    //     tags: true,
    //     productImages: true,
    //   },
    // });

    return NextResponse.json(product, { status: 201 });

  } catch (err: any) {
    console.error("Product creation failed:", err);
    return NextResponse.json({ error: "Failed to create product", details: err.message }, { status: 500 });
  }
}
