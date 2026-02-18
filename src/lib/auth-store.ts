import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type AccountType = "buyer" | "artisan";

export type StoredUser = {
  firstName: string;
  lastName: string;
  email: string;
  accountType: AccountType;
  businessName?: string;
  bio?: string;
  passwordHash: string;
  createdAt: string;
};

type UsersData = {
  users: StoredUser[];
};

type CreateUserInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType: AccountType;
  businessName?: string;
  bio?: string;
};

const dataDirectory = path.join(process.cwd(), "data");
const usersFilePath = path.join(dataDirectory, "users.json");

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

const ensureStoreExists = async () => {
  await mkdir(dataDirectory, { recursive: true });

  try {
    await readFile(usersFilePath, "utf-8");
  } catch {
    const emptyData: UsersData = { users: [] };
    await writeFile(usersFilePath, JSON.stringify(emptyData, null, 2), "utf-8");
  }
};

const loadUsersData = async (): Promise<UsersData> => {
  await ensureStoreExists();

  try {
    const fileContent = await readFile(usersFilePath, "utf-8");
    const parsed = JSON.parse(fileContent) as UsersData;

    if (!Array.isArray(parsed.users)) {
      return { users: [] };
    }

    return parsed;
  } catch {
    return { users: [] };
  }
};

const saveUsersData = async (data: UsersData) => {
  await ensureStoreExists();
  await writeFile(usersFilePath, JSON.stringify(data, null, 2), "utf-8");
};

export const createUser = async (input: CreateUserInput) => {
  const normalizedEmail = input.email.trim().toLowerCase();
  const usersData = await loadUsersData();

  const existingUser = usersData.users.find(
    (user) => user.email.toLowerCase() === normalizedEmail,
  );

  if (existingUser) {
    return { ok: false as const, error: "An account with this email already exists." };
  }

  const newUser: StoredUser = {
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    email: normalizedEmail,
    accountType: input.accountType,
    businessName: input.businessName?.trim() || undefined,
    bio: input.bio?.trim() || undefined,
    passwordHash: hashPassword(input.password),
    createdAt: new Date().toISOString(),
  };

  usersData.users.push(newUser);
  await saveUsersData(usersData);

  return {
    ok: true as const,
    user: {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      accountType: newUser.accountType,
      businessName: newUser.businessName,
      bio: newUser.bio,
      createdAt: newUser.createdAt,
    },
  };
};

export const validateUserCredentials = async (email: string, password: string) => {
  const normalizedEmail = email.trim().toLowerCase();
  const usersData = await loadUsersData();

  const user = usersData.users.find(
    (existingUser) => existingUser.email.toLowerCase() === normalizedEmail,
  );

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
      accountType: user.accountType,
      businessName: user.businessName,
      bio: user.bio,
      createdAt: user.createdAt,
    },
  };
};
