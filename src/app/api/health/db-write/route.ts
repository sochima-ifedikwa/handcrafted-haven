import { randomBytes, scryptSync } from "node:crypto";
import { NextResponse } from "next/server";
import { AccountType } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
};

export async function GET() {
  const startedAt = Date.now();

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      {
        ok: false,
        status: "missing_env",
        message: "DATABASE_URL is not configured.",
      },
      { status: 500 },
    );
  }

  const marker = randomBytes(6).toString("hex");
  const email = `healthcheck+${marker}@example.com`;

  try {
    await prisma.$transaction(async (tx) => {
      await tx.user.create({
        data: {
          firstName: "Health",
          lastName: "Check",
          email,
          accountType: AccountType.buyer,
          passwordHash: hashPassword("temporary-password"),
        },
      });

      await tx.user.delete({
        where: { email },
      });
    });

    return NextResponse.json(
      {
        ok: true,
        status: "write_ok",
        latencyMs: Date.now() - startedAt,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        ok: false,
        status: "write_failed",
        message,
        latencyMs: Date.now() - startedAt,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
