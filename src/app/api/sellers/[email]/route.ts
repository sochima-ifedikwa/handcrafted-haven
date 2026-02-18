import { NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/auth-store";
import { getSellerProfile, updateSellerStory } from "@/lib/marketplace-store";

export const runtime = "nodejs";

type SellerProfileUpdateBody = {
  requesterEmail?: string;
  story?: string;
};

export async function GET(
  _: Request,
  context: { params: Promise<{ email: string }> },
) {
  const { email } = await context.params;
  const sellerEmail = decodeURIComponent(email).toLowerCase();

  const seller = await getUserByEmail(sellerEmail);
  if (!seller || seller.accountType !== "artisan") {
    return NextResponse.json({ message: "Seller not found." }, { status: 404 });
  }

  const profile = await getSellerProfile(sellerEmail);

  return NextResponse.json(
    {
      profile: {
        sellerEmail,
        sellerName: `${seller.firstName} ${seller.lastName}`,
        sellerBusinessName: seller.businessName,
        sellerStory: profile?.sellerStory ?? seller.bio ?? "",
        products: profile?.products ?? [],
      },
    },
    { status: 200 },
  );
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ email: string }> },
) {
  const { email } = await context.params;
  const sellerEmail = decodeURIComponent(email).toLowerCase();

  let body: SellerProfileUpdateBody;

  try {
    body = (await request.json()) as SellerProfileUpdateBody;
  } catch {
    return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
  }

  const requesterEmail = body.requesterEmail?.trim().toLowerCase() ?? "";
  const story = body.story?.trim() ?? "";

  if (!requesterEmail || !story) {
    return NextResponse.json(
      { message: "requesterEmail and story are required." },
      { status: 400 },
    );
  }

  if (requesterEmail !== sellerEmail) {
    return NextResponse.json(
      { message: "You can only update your own seller profile." },
      { status: 403 },
    );
  }

  const seller = await getUserByEmail(sellerEmail);
  if (!seller || seller.accountType !== "artisan") {
    return NextResponse.json({ message: "Seller not found." }, { status: 404 });
  }

  await updateSellerStory(sellerEmail, story);

  return NextResponse.json(
    { message: "Seller story updated successfully." },
    { status: 200 },
  );
}
