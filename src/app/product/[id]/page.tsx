"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { notifyAuthChange, useCurrentUser } from "@/lib/use-current-user";

type ProductReview = {
  id: number;
  reviewerName: string;
  rating: number;
  review: string;
  createdAt: string;
};

type ProductItem = {
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
  reviews: ProductReview[];
};

export default function ProductPage() {
  const currentUser = useCurrentUser();
  const params = useParams<{ id: string }>();
  const productId = Number(params.id);
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewMessage, setReviewMessage] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentUser");
    notifyAuthChange();
    window.location.href = "/";
  };

  const loadProduct = async () => {
    if (Number.isNaN(productId)) {
      setErrorMessage("Invalid product id.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`/api/products/${productId}`);
      const payload = (await response.json()) as {
        product?: ProductItem;
        message?: string;
      };

      if (!response.ok || !payload.product) {
        throw new Error(payload.message || "Unable to load product.");
      }

      setProduct(payload.product);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to load product.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadProduct();
  }, [params.id]);

  const averageRating = useMemo(() => {
    if (!product || product.reviews.length === 0) {
      return 0;
    }
    const total = product.reviews.reduce((sum, item) => sum + item.rating, 0);
    return total / product.reviews.length;
  }, [product]);

  const submitReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!currentUser) {
      setReviewMessage("Please log in to leave a review.");
      return;
    }

    if (!reviewText.trim()) {
      setReviewMessage("Review text is required.");
      return;
    }

    setIsSubmittingReview(true);
    setReviewMessage("");

    try {
      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewerEmail: currentUser.email,
          rating,
          review: reviewText.trim(),
        }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Could not submit review.");
      }

      setReviewText("");
      setRating(5);
      setReviewMessage("Thanks! Your review has been added.");
      await loadProduct();
    } catch (error) {
      setReviewMessage(
        error instanceof Error ? error.message : "Could not submit review.",
      );
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <>
      {/* Header */}
      <header
        style={{
          backgroundColor: "var(--accent)",
          borderBottom: "1px solid var(--primary)",
          padding: "1rem 2rem",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <nav
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "var(--primary)",
            }}
          >
            🎨 Handcrafted Haven
          </Link>
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <Link href="/browse">Browse</Link>
            {currentUser ? (
              <Link href="/welcome">Welcome, {currentUser.firstName}</Link>
            ) : (
              <Link href="/login">Login</Link>
            )}
            {currentUser ? (
              <button
                type="button"
                onClick={handleLogout}
                style={{
                  backgroundColor: "var(--primary)",
                  color: "white",
                  padding: "0.45rem 0.95rem",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Logout
              </button>
            ) : null}
          </div>
        </nav>
      </header>

      {/* Product Detail */}
      <section
        style={{
          padding: "3rem 2rem",
          backgroundColor: "var(--background)",
          minHeight: "calc(100vh - 60px)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {isLoading ? (
            <p style={{ color: "var(--text-light)" }}>Loading product...</p>
          ) : errorMessage ? (
            <p style={{ color: "var(--primary-dark)", fontWeight: "600" }}>
              {errorMessage}
            </p>
          ) : product ? (
            <>
          <Link
            href="/browse"
            style={{
              color: "var(--primary)",
              fontWeight: "600",
              marginBottom: "2rem",
              display: "inline-block",
            }}
          >
            ← Back to Browse
          </Link>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              marginTop: "2rem",
            }}
          >
            {/* Product Image */}
            <div
              style={{
                backgroundColor: "var(--accent)",
                borderRadius: "8px",
                border: "2px solid var(--primary)",
                padding: "3rem",
                textAlign: "center",
                fontSize: "8rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {product.imageUrl || "🧵"}
            </div>

            {/* Product Details */}
            <div>
              <div
                style={{
                  backgroundColor: "var(--primary)",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  display: "inline-block",
                  marginBottom: "1rem",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                }}
              >
                {product.category[0]?.toUpperCase() + product.category.slice(1)}
              </div>

              <h1
                style={{
                  fontSize: "2.5rem",
                  color: "var(--primary-dark)",
                  marginBottom: "1rem",
                }}
              >
                {product.name}
              </h1>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "2rem",
                }}
              >
                <span style={{ fontSize: "1.3rem" }}>⭐⭐⭐⭐⭐</span>
                <span style={{ color: "var(--text-light)" }}>
                  {product.reviews.length} reviews
                  {product.reviews.length > 0
                    ? ` • Avg ${averageRating.toFixed(1)}/5`
                    : ""}
                </span>
              </div>

              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "var(--primary)",
                  marginBottom: "2rem",
                }}
              >
                ${product.price.toFixed(2)}
              </div>

              <div
                style={{
                  backgroundColor: "var(--accent)",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  marginBottom: "2rem",
                }}
              >
                <h3
                  style={{
                    marginBottom: "1rem",
                    color: "var(--primary-dark)",
                  }}
                >
                  About This Item
                </h3>
                <p
                  style={{
                    lineHeight: "1.7",
                    color: "var(--text-light)",
                  }}
                >
                  {product.description}
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "var(--accent)",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  marginBottom: "2rem",
                }}
              >
                <h3
                  style={{
                    marginBottom: "1rem",
                    color: "var(--primary-dark)",
                  }}
                >
                  Details
                </h3>
                <ul style={{ lineHeight: "2", color: "var(--text-light)" }}>
                  <li>
                    <strong>Material:</strong> Genuine leather
                  </li>
                  <li>
                    <strong>Dimensions:</strong> 12&quot; W &times; 10&quot; H
                    &times; 5&quot; D
                  </li>
                  <li>
                    <strong>Closure:</strong> Magnetic snap
                  </li>
                  <li>
                    <strong>Interior:</strong> Lined with cotton
                  </li>
                </ul>
              </div>

              <div
                style={{
                  backgroundColor: "var(--accent)",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  marginBottom: "2rem",
                }}
              >
                <h3
                  style={{
                    marginBottom: "1rem",
                    color: "var(--primary-dark)",
                  }}
                >
                  About the Artisan
                </h3>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: "var(--primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "1.5rem",
                    }}
                  >
                    👩
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: "600",
                        color: "var(--primary-dark)",
                      }}
                    >
                      {product.sellerBusinessName || product.sellerName}
                    </p>
                    <p
                      style={{ fontSize: "0.9rem", color: "var(--text-light)" }}
                    >
                      {product.sellerStory || "Passionate artisan creating handmade work."}
                    </p>
                    <Link
                      href={`/seller/${encodeURIComponent(product.sellerEmail)}`}
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--primary)",
                        textDecoration: "underline",
                        display: "inline-block",
                        marginTop: "0.5rem",
                      }}
                    >
                      View seller profile
                    </Link>
                  </div>
                </div>
              </div>

              {/* Add to Cart */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                <input
                  type="number"
                  defaultValue="1"
                  min="1"
                  style={{
                    padding: "0.75rem",
                    borderRadius: "4px",
                    border: "1px solid var(--primary)",
                    fontSize: "1rem",
                  }}
                />
                <button
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "white",
                    padding: "0.75rem",
                    borderRadius: "4px",
                    border: "none",
                    fontSize: "1rem",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "4rem" }}>
            <h2
              style={{
                fontSize: "2rem",
                color: "var(--primary-dark)",
                marginBottom: "2rem",
              }}
            >
              Ratings & Reviews
            </h2>

            <form
              onSubmit={submitReview}
              style={{
                backgroundColor: "white",
                border: "1px solid var(--primary)",
                borderRadius: "8px",
                padding: "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <h3 style={{ color: "var(--primary-dark)", marginBottom: "0.75rem" }}>
                Leave a Review
              </h3>
              <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <label style={{ color: "var(--text-light)" }}>Rating:</label>
                <select
                  value={rating}
                  onChange={(event) => setRating(Number(event.target.value))}
                  style={{ border: "1px solid var(--primary)", borderRadius: "4px", padding: "0.3rem" }}
                >
                  {[5, 4, 3, 2, 1].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                rows={3}
                placeholder="Share your experience with this product"
                value={reviewText}
                onChange={(event) => setReviewText(event.target.value)}
                style={{
                  width: "100%",
                  border: "1px solid var(--primary)",
                  borderRadius: "4px",
                  padding: "0.75rem",
                  fontFamily: "inherit",
                  marginBottom: "0.75rem",
                }}
              />
              <button
                type="submit"
                disabled={isSubmittingReview}
                style={{
                  backgroundColor: "var(--primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "0.6rem 1rem",
                  fontWeight: "600",
                  cursor: isSubmittingReview ? "not-allowed" : "pointer",
                  opacity: isSubmittingReview ? 0.7 : 1,
                }}
              >
                {isSubmittingReview ? "Submitting..." : "Submit Review"}
              </button>
              {reviewMessage && (
                <p style={{ marginTop: "0.75rem", color: "var(--primary-dark)" }}>
                  {reviewMessage}
                </p>
              )}
            </form>

            <div style={{ display: "grid", gap: "1rem" }}>
              {product.reviews.map((review) => (
                <div
                  key={review.id}
                  style={{
                    backgroundColor: "white",
                    border: "1px solid var(--primary)",
                    borderRadius: "8px",
                    padding: "1rem",
                  }}
                >
                  <p style={{ fontWeight: "700", color: "var(--primary-dark)" }}>
                    {review.reviewerName} • {"⭐".repeat(review.rating)}
                  </p>
                  <p style={{ color: "var(--text-light)", marginTop: "0.4rem" }}>
                    {review.review}
                  </p>
                </div>
              ))}
              {product.reviews.length === 0 && (
                <p style={{ color: "var(--text-light)" }}>
                  No reviews yet. Be the first to leave one.
                </p>
              )}
            </div>
          </div>
          </>
          ) : null}
        </div>
      </section>
    </>
  );
}
