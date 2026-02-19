import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

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

  try {
    await prisma.$queryRaw`SELECT 1`;
    await prisma.user.count();

    return NextResponse.json(
      {
        ok: true,
        status: "connected",
        latencyMs: Date.now() - startedAt,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const isSchemaIssue =
      message.includes("does not exist") ||
      message.includes("relation") ||
      message.includes("table");

    if (isSchemaIssue) {
      return NextResponse.json(
        {
          ok: false,
          status: "schema_missing",
          message:
            "Database is reachable, but schema is not applied. Run Prisma migrate deploy.",
          latencyMs: Date.now() - startedAt,
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        ok: false,
        status: "unreachable",
        message: "Database connection failed.",
        latencyMs: Date.now() - startedAt,
        timestamp: new Date().toISOString(),
      },
      { status: 503 },
    );
  }
}
