import { NextResponse } from "next/server";
import { addReviewToProduct } from "@/lib/marketplace-store";
import { getUserByEmail } from "@/lib/auth-store";

export const runtime = "nodejs";

type CreateReviewBody = {
  reviewerEmail?: string;
  rating?: number;
  review?: string;
};

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const productId = Number(id);

  if (Number.isNaN(productId)) {
    return NextResponse.json({ message: "Invalid product id." }, { status: 400 });
  }

  let body: CreateReviewBody;

  try {
    body = (await request.json()) as CreateReviewBody;
  } catch {
    return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
  }

  const reviewerEmail = body.reviewerEmail?.trim().toLowerCase() ?? "";
  const rating = typeof body.rating === "number" ? body.rating : Number(body.rating);
  const reviewText = body.review?.trim() ?? "";

  if (!reviewerEmail || Number.isNaN(rating) || !reviewText) {
    return NextResponse.json(
      { message: "reviewerEmail, rating, and review are required." },
      { status: 400 },
    );
  }

  if (rating < 1 || rating > 5) {
    return NextResponse.json({ message: "Rating must be between 1 and 5." }, { status: 400 });
  }

  const reviewer = await getUserByEmail(reviewerEmail);
  if (!reviewer) {
    return NextResponse.json(
      { message: "Only registered users can leave reviews." },
      { status: 403 },
    );
  }

  const review = await addReviewToProduct(productId, {
    reviewerEmail,
    reviewerName: `${reviewer.firstName} ${reviewer.lastName}`,
    rating,
    review: reviewText,
  });

  if (!review) {
    return NextResponse.json({ message: "Product not found." }, { status: 404 });
  }

  return NextResponse.json({ review }, { status: 201 });
}
