import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";

export type ProductReview = {
  id: number;
  reviewerEmail: string;
  reviewerName: string;
  rating: number;
  review: string;
  createdAt: string;
};

export type ProductItem = {
  id: number;
  sellerEmail: string;
  sellerName: string;
  sellerBusinessName?: string;
  sellerStory?: string;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl?: string;
  createdAt: string;
  reviews: ProductReview[];
};

type DbReview = {
  id: number;
  productId: number;
  reviewerEmail: string;
  reviewerName: string;
  rating: number;
  review: string;
  createdAt: Date;
};

type MarketplaceData = {
  products: ProductItem[];
};

type CreateProductInput = {
  sellerEmail: string;
  sellerName: string;
  sellerBusinessName?: string;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl?: string;
};

type AddReviewInput = {
  reviewerEmail: string;
  reviewerName: string;
  rating: number;
  review: string;
};

const dataDirectory = path.join(process.cwd(), "data");
const marketplaceFilePath = path.join(dataDirectory, "marketplace.json");

const seedProducts: ProductItem[] = [
  {
    id: 1,
    sellerEmail: "sarah@crafts.com",
    sellerName: "Sarah Crafts",
    sellerBusinessName: "Sarah Crafts",
    sellerStory:
      "I am a leatherworker who creates durable, timeless bags inspired by family traditions.",
    name: "Artisan Leather Bag",
    description:
      "Handcrafted with premium leather using traditional techniques. Each piece is unique.",
    category: "accessories",
    price: 89,
    imageUrl: "👜",
    createdAt: new Date().toISOString(),
    reviews: [
      {
        id: 1,
        reviewerEmail: "emma@example.com",
        reviewerName: "Emma",
        rating: 5,
        review: "Beautiful craftsmanship and very sturdy!",
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: 2,
    sellerEmail: "clay@studio.com",
    sellerName: "Clay Studio",
    sellerBusinessName: "Clay Studio",
    sellerStory:
      "We hand-throw small-batch ceramics that blend modern design with timeless utility.",
    name: "Hand-Thrown Ceramic Bowl",
    description:
      "Food-safe ceramic bowl, perfect for soups, salads, and display.",
    category: "pottery",
    price: 65,
    imageUrl: "🏺",
    createdAt: new Date().toISOString(),
    reviews: [],
  },
];

const ensureStoreExists = async () => {
  await mkdir(dataDirectory, { recursive: true });

  try {
    await readFile(marketplaceFilePath, "utf-8");
  } catch {
    const seed: MarketplaceData = { products: seedProducts };
    await writeFile(
      marketplaceFilePath,
      JSON.stringify(seed, null, 2),
      "utf-8",
    );
  }
};

const loadData = async (): Promise<MarketplaceData> => {
  await ensureStoreExists();

  try {
    const content = await readFile(marketplaceFilePath, "utf-8");
    const parsed = JSON.parse(content) as MarketplaceData;

    if (!Array.isArray(parsed.products)) {
      return { products: [] };
    }

    return parsed;
  } catch {
    return { products: [] };
  }
};

const saveData = async (data: MarketplaceData) => {
  await ensureStoreExists();
  await writeFile(marketplaceFilePath, JSON.stringify(data, null, 2), "utf-8");
};

const mapDbReview = (review: DbReview): ProductReview => ({
  id: review.id,
  reviewerEmail: review.reviewerEmail,
  reviewerName: review.reviewerName,
  rating: review.rating,
  review: review.review,
  createdAt: review.createdAt.toISOString(),
});

const mergeReviews = (
  fileReviews: ProductReview[],
  dbReviews: ProductReview[],
) =>
  [...fileReviews, ...dbReviews].sort((a, b) => {
    const left = new Date(a.createdAt).getTime();
    const right = new Date(b.createdAt).getTime();
    return right - left;
  });

export const listProducts = async (filters?: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  const data = await loadData();
  const filteredProducts = data.products.filter((product) => {
    const categoryOk = filters?.category
      ? product.category.toLowerCase() === filters.category.toLowerCase()
      : true;
    const minOk =
      filters?.minPrice !== undefined
        ? product.price >= filters.minPrice
        : true;
    const maxOk =
      filters?.maxPrice !== undefined
        ? product.price <= filters.maxPrice
        : true;
    return categoryOk && minOk && maxOk;
  });

  const productIds = filteredProducts.map((product) => product.id);
  if (productIds.length === 0) {
    return filteredProducts;
  }

  const dbReviews = await prisma.review.findMany({
    where: { productId: { in: productIds } },
    orderBy: { createdAt: "desc" },
  });

  const reviewsByProductId = new Map<number, ProductReview[]>();
  for (const review of dbReviews) {
    const mapped = mapDbReview(review);
    const existing = reviewsByProductId.get(review.productId) ?? [];
    existing.push(mapped);
    reviewsByProductId.set(review.productId, existing);
  }

  return filteredProducts.map((product) => ({
    ...product,
    reviews: mergeReviews(
      product.reviews,
      reviewsByProductId.get(product.id) ?? [],
    ),
  }));
};

export const getProductById = async (id: number) => {
  const data = await loadData();
  const product = data.products.find((item) => item.id === id);

  if (!product) {
    return null;
  }

  const dbReviews = await prisma.review.findMany({
    where: { productId: id },
    orderBy: { createdAt: "desc" },
  });

  return {
    ...product,
    reviews: mergeReviews(product.reviews, dbReviews.map(mapDbReview)),
  };
};

export const createProduct = async (input: CreateProductInput) => {
  const data = await loadData();
  const nextId =
    data.products.length > 0
      ? Math.max(...data.products.map((product) => product.id)) + 1
      : 1;

  const product: ProductItem = {
    id: nextId,
    sellerEmail: input.sellerEmail.trim().toLowerCase(),
    sellerName: input.sellerName.trim(),
    sellerBusinessName: input.sellerBusinessName?.trim() || undefined,
    name: input.name.trim(),
    description: input.description.trim(),
    category: input.category.trim().toLowerCase(),
    price: input.price,
    imageUrl: input.imageUrl?.trim() || undefined,
    createdAt: new Date().toISOString(),
    reviews: [],
  };

  data.products.push(product);
  await saveData(data);

  return product;
};

export const addReviewToProduct = async (
  productId: number,
  input: AddReviewInput,
) => {
  const product = await getProductById(productId);

  if (!product) {
    return null;
  }

  const created = await prisma.review.create({
    data: {
      productId,
      reviewerEmail: input.reviewerEmail.trim().toLowerCase(),
      reviewerName: input.reviewerName.trim(),
      rating: input.rating,
      review: input.review.trim(),
    },
  });

  return mapDbReview(created);
};

export const listProductsBySeller = async (sellerEmail: string) => {
  const normalizedEmail = sellerEmail.trim().toLowerCase();
  const data = await loadData();
  return data.products.filter(
    (product) => product.sellerEmail === normalizedEmail,
  );
};

export const updateSellerStory = async (sellerEmail: string, story: string) => {
  const normalizedEmail = sellerEmail.trim().toLowerCase();
  const data = await loadData();

  let updatedAny = false;
  data.products = data.products.map((product) => {
    if (product.sellerEmail !== normalizedEmail) {
      return product;
    }

    updatedAny = true;
    return {
      ...product,
      sellerStory: story.trim(),
    };
  });

  if (updatedAny) {
    await saveData(data);
  }

  return updatedAny;
};

export const getSellerProfile = async (sellerEmail: string) => {
  const products = await listProductsBySeller(sellerEmail);

  if (products.length === 0) {
    return null;
  }

  const firstProduct = products[0];

  return {
    sellerEmail: firstProduct.sellerEmail,
    sellerName: firstProduct.sellerName,
    sellerBusinessName: firstProduct.sellerBusinessName,
    sellerStory: firstProduct.sellerStory,
    products,
  };
};
