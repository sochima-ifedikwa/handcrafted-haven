import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { AccountType } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

type LocalAccountType = "buyer" | "artisan";

export type StoredUser = {
  firstName: string;
  lastName: string;
  email: string;
  accountType: LocalAccountType;
  businessName?: string;
  bio?: string;
  passwordHash: string;
  createdAt: string;
};

type CreateUserInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType: LocalAccountType;
  businessName?: string;
  bio?: string;
};

const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
};

const verifyPassword = (password: string, storedHash: string) => {
  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) {
    return false;
  }

  const hashedBuffer = scryptSync(password, salt, 64);
  const storedBuffer = Buffer.from(hash, "hex");

  if (hashedBuffer.length !== storedBuffer.length) {
    return false;
  }

  return timingSafeEqual(hashedBuffer, storedBuffer);
};

const mapAccountTypeToDb = (accountType: LocalAccountType): AccountType => {
  if (accountType === "artisan") {
    return AccountType.artisan;
  }

  return AccountType.buyer;
};

const mapAccountTypeFromDb = (accountType: AccountType): LocalAccountType => {
  if (accountType === AccountType.artisan) {
    return "artisan";
  }

  return "buyer";
};

export const createUser = async (input: CreateUserInput) => {
  const normalizedEmail = input.email.trim().toLowerCase();
  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    select: { id: true },
  });

  if (existingUser) {
    return {
      ok: false as const,
      error: "An account with this email already exists.",
    };
  }

  const newUser = await prisma.user.create({
    data: {
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      email: normalizedEmail,
      accountType: mapAccountTypeToDb(input.accountType),
      businessName: input.businessName?.trim() || null,
      bio: input.bio?.trim() || null,
      passwordHash: hashPassword(input.password),
    },
  });

  return {
    ok: true as const,
    user: {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      accountType: mapAccountTypeFromDb(newUser.accountType),
      businessName: newUser.businessName ?? undefined,
      bio: newUser.bio ?? undefined,
      createdAt: newUser.createdAt.toISOString(),
    },
  };
};

export const validateUserCredentials = async (
  email: string,
  password: string,
) => {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    return { ok: false as const, error: "Invalid email or password." };
  }

  const isValidPassword = verifyPassword(password, user.passwordHash);
  if (!isValidPassword) {
    return { ok: false as const, error: "Invalid email or password." };
  }

  return {
    ok: true as const,
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      accountType: mapAccountTypeFromDb(user.accountType),
      businessName: user.businessName ?? undefined,
      bio: user.bio ?? undefined,
      createdAt: user.createdAt.toISOString(),
    },
  };
};

export const getUserByEmail = async (email: string) => {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    return null;
  }

  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    accountType: mapAccountTypeFromDb(user.accountType),
    businessName: user.businessName ?? undefined,
    bio: user.bio ?? undefined,
    createdAt: user.createdAt.toISOString(),
  };
};
