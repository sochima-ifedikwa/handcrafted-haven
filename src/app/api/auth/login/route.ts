import { NextResponse } from "next/server";
import { validateUserCredentials } from "@/lib/auth-store";

export const runtime = "nodejs";

type LoginRequestBody = {
  email?: string;
  password?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: LoginRequestBody;

  try {
    body = (await request.json()) as LoginRequestBody;
  } catch {
    return NextResponse.json(
      { message: "Invalid request payload." },
      { status: 400 },
    );
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password ?? "";

  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { message: "Enter a valid email address." },
      { status: 400 },
    );
  }

  if (!password) {
    return NextResponse.json(
      { message: "Password is required." },
      { status: 400 },
    );
  }

  const result = await validateUserCredentials(email, password);

  if (!result.ok) {
    return NextResponse.json({ message: result.error }, { status: 401 });
  }

  return NextResponse.json(
    {
      message: "Login successful! Redirecting...",
      user: result.user,
    },
    { status: 200 },
  );
}
