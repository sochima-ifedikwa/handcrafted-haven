import { NextResponse } from "next/server";

type AccountType = "buyer" | "artisan";

type RegisterRequestBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  accountType?: AccountType;
  businessName?: string;
  bio?: string;
};

const registeredEmails = new Set<string>();

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: RegisterRequestBody;

  try {
    body = (await request.json()) as RegisterRequestBody;
  } catch {
    return NextResponse.json(
      { message: "Invalid request payload." },
      { status: 400 },
    );
  }

  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password ?? "";
  const accountType = body.accountType;
  const businessName = body.businessName?.trim() ?? "";

  if (!firstName || !lastName) {
    return NextResponse.json(
      { message: "First and last name are required." },
      { status: 400 },
    );
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { message: "Enter a valid email address." },
      { status: 400 },
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { message: "Password must be at least 8 characters long." },
      { status: 400 },
    );
  }

  if (accountType !== "buyer" && accountType !== "artisan") {
    return NextResponse.json(
      { message: "Account type must be buyer or artisan." },
      { status: 400 },
    );
  }

  if (accountType === "artisan" && !businessName) {
    return NextResponse.json(
      { message: "Business name is required for artisan accounts." },
      { status: 400 },
    );
  }

  if (registeredEmails.has(email)) {
    return NextResponse.json(
      { message: "An account with this email already exists." },
      { status: 409 },
    );
  }

  registeredEmails.add(email);

  return NextResponse.json(
    {
      message: "Account created successfully! Redirecting to sign in...",
      user: {
        firstName,
        lastName,
        email,
        accountType,
      },
    },
    { status: 201 },
  );
}
