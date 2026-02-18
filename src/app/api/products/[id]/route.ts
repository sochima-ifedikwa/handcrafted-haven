import { NextResponse } from "next/server";
import { getProductById } from "@/lib/marketplace-store";

export const runtime = "nodejs";

export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const productId = Number(id);

  if (Number.isNaN(productId)) {
    return NextResponse.json({ message: "Invalid product id." }, { status: 400 });
  }

  const product = await getProductById(productId);

  if (!product) {
    return NextResponse.json({ message: "Product not found." }, { status: 404 });
  }

  return NextResponse.json({ product }, { status: 200 });
}
