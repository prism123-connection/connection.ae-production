import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function for auth and user validation
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

// GET /api/ecommerce/:id
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const { error, user } = await authenticateUser();
  if (error) return error;

  const product = await prisma.product.findUnique({
    where: {
      id: id
    },
    include: {
      tags: true,
      productImages: true,
      user: {
        select: {
          firstName: true,
          lastName: true,
          role: true, 
          avatarUrl: true,
        },
      }
    },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

// PUT /api/ecommerce/:id

function cleanUpdateData(data: any) {
  const cleaned: any = {};
  let imageUrls: string[] = [];
  console.log(data.productImages)

  if (data.name !== undefined) cleaned.name = data.name;
  if (data.shortDescription !== undefined) cleaned.shortDescription = data.shortDescription;
  if (data.description !== undefined) cleaned.description = data.description;
  if (data.price !== undefined) cleaned.price = data.price;
  if (data.currency !== undefined) cleaned.currency = data.currency;
  if (data.category !== undefined) cleaned.category = data.category;
  if (data.goLiveAt !== undefined) {
    const parsedDate = new Date(data.goLiveAt);
    if (!isNaN(parsedDate.getTime())) {
      cleaned.goLiveAt = parsedDate;
    }
  }

  if (Array.isArray(data.productImages)) {
    imageUrls = data.productImages.filter((url: any) => typeof url === "string" && url.trim() !== "");
  }

  return { cleanedData: cleaned, imageUrls };
}


export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const { error, user } = await authenticateUser();
  if (error) return error;

  const data = await req.json();
  const { cleanedData, imageUrls } = cleanUpdateData(data);

  // validate data here

  const existingProduct = await prisma.product.findUnique({
    where: {
      id: id,
      userId: user.id,
    },
  });

  if (!existingProduct) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const result = await prisma.$transaction(async (tx) => {

    if (Object.keys(cleanedData).length > 0) {
      await tx.product.update({
        where: { id },
        data: cleanedData,
      });
    }

    if (imageUrls.length > 0) {
      await tx.productImage.deleteMany({
        where: { productId: id },
      });

      await tx.productImage.createMany({
        data: imageUrls.map((url) => ({
          productId: id,
          url,
        })),
      });
    }
  
    // Return updated product with latest images
    return tx.product.findUnique({
      where: { id },
      include: {
        productImages: true,
        tags: true,
      },
    });
  });

  return NextResponse.json(result);
}

// DELETE /api/ecommerce/:id
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  
  const { id } = context.params;
  
  const { error, user } = await authenticateUser();
  if (error) return error;

  const existingProduct = await prisma.product.findUnique({
    where: {
      id: id,
      userId: user.id,
    },
  });

  if (!existingProduct) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  await prisma.product.delete({
    where: { id: id },
  });

  return NextResponse.json({ message: "Product deleted successfully" });
}
