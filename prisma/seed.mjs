import { randomBytes, scryptSync } from "node:crypto";
import { AccountType, PrismaClient } from "../src/generated/prisma/index.js";

const prisma = new PrismaClient();

const hashPassword = (password) => {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
};

const seedUsers = [
  {
    firstName: "Demo",
    lastName: "Buyer",
    email: "buyer.demo@handcraftedhaven.test",
    accountType: AccountType.buyer,
    password: "Password123!",
  },
  {
    firstName: "Demo",
    lastName: "Artisan",
    email: "artisan.demo@handcraftedhaven.test",
    accountType: AccountType.artisan,
    businessName: "Demo Artisan Studio",
    bio: "Seeded artisan account for local and Vercel dev testing.",
    password: "Password123!",
  },
];

const main = async () => {
  for (const seedUser of seedUsers) {
    await prisma.user.upsert({
      where: { email: seedUser.email },
      update: {
        firstName: seedUser.firstName,
        lastName: seedUser.lastName,
        accountType: seedUser.accountType,
        businessName: seedUser.businessName ?? null,
        bio: seedUser.bio ?? null,
        passwordHash: hashPassword(seedUser.password),
      },
      create: {
        firstName: seedUser.firstName,
        lastName: seedUser.lastName,
        email: seedUser.email,
        accountType: seedUser.accountType,
        businessName: seedUser.businessName ?? null,
        bio: seedUser.bio ?? null,
        passwordHash: hashPassword(seedUser.password),
      },
    });
  }

  console.log("Seed complete. Test accounts:");
  console.log("- buyer.demo@handcraftedhaven.test / Password123!");
  console.log("- artisan.demo@handcraftedhaven.test / Password123!");
};

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
