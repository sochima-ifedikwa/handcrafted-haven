import { NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/auth-store";
import { createProduct, listProducts } from "@/lib/marketplace-store";

export const runtime = "nodejs";

type CreateProductBody = {
  sellerEmail?: string;
  name?: string;
  description?: string;
  category?: string;
  price?: number;
  imageUrl?: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? undefined;
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const products = await listProducts({
    category,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  });

  return NextResponse.json({ products }, { status: 200 });
}

export async function POST(request: Request) {
  let body: CreateProductBody;

  try {
    body = (await request.json()) as CreateProductBody;
  } catch {
    return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
  }

  const sellerEmail = body.sellerEmail?.trim().toLowerCase() ?? "";
  const name = body.name?.trim() ?? "";
  const description = body.description?.trim() ?? "";
  const category = body.category?.trim() ?? "";
  const price = typeof body.price === "number" ? body.price : Number(body.price);

  if (!sellerEmail || !name || !description || !category || Number.isNaN(price)) {
    return NextResponse.json(
      { message: "sellerEmail, name, description, category, and price are required." },
      { status: 400 },
    );
  }

  if (price <= 0) {
    return NextResponse.json({ message: "Price must be greater than 0." }, { status: 400 });
  }

  const seller = await getUserByEmail(sellerEmail);
  if (!seller || seller.accountType !== "artisan") {
    return NextResponse.json(
      { message: "Only authenticated artisan accounts can create product listings." },
      { status: 403 },
    );
  }

  const product = await createProduct({
    sellerEmail,
    sellerName: `${seller.firstName} ${seller.lastName}`,
    sellerBusinessName: seller.businessName,
    name,
    description,
    category,
    price,
    imageUrl: body.imageUrl,
  });

  return NextResponse.json({ product }, { status: 201 });
}
