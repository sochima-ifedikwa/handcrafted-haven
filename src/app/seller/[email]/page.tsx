"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type ProductItem = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl?: string;
};

type SellerProfile = {
  sellerEmail: string;
  sellerName: string;
  sellerBusinessName?: string;
  sellerStory: string;
  products: ProductItem[];
};

export default function SellerProfilePage() {
  const params = useParams<{ email: string }>();
  const sellerEmail = decodeURIComponent(params.email);
  const [profile, setProfile] = useState<SellerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await fetch(
          `/api/sellers/${encodeURIComponent(sellerEmail)}`,
        );
        const payload = (await response.json()) as {
          profile?: SellerProfile;
          message?: string;
        };

        if (!response.ok || !payload.profile) {
          throw new Error(payload.message || "Unable to load seller profile.");
        }

        setProfile(payload.profile);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to load seller profile.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadProfile();
  }, [sellerEmail]);

  return (
    <section
      className="responsive-section"
      style={{
        minHeight: "100vh",
        padding: "2rem",
        backgroundColor: "var(--background)",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <Link
          href="/browse"
          style={{
            color: "var(--primary)",
            fontWeight: "600",
            display: "inline-block",
            marginBottom: "1rem",
          }}
        >
          ← Back to Browse
        </Link>

        {isLoading ? (
          <p style={{ color: "var(--text-light)" }}>
            Loading seller profile...
          </p>
        ) : errorMessage ? (
          <p style={{ color: "var(--primary-dark)", fontWeight: "600" }}>
            {errorMessage}
          </p>
        ) : profile ? (
          <>
            <div
              className="responsive-card"
              style={{
                backgroundColor: "white",
                border: "1px solid var(--primary)",
                borderRadius: "8px",
                padding: "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <h1
                className="responsive-page-title"
                style={{ color: "var(--primary-dark)", marginBottom: "0.5rem" }}
              >
                {profile.sellerBusinessName || profile.sellerName}
              </h1>
              <p style={{ color: "var(--text-light)" }}>
                {profile.sellerStory ||
                  "This artisan has not added a story yet."}
              </p>
            </div>

            <h2
              style={{ color: "var(--primary-dark)", marginBottom: "0.8rem" }}
            >
              Curated Collection
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "1rem",
              }}
            >
              {profile.products.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  style={{
                    backgroundColor: "white",
                    border: "1px solid var(--primary)",
                    borderRadius: "8px",
                    padding: "1rem",
                  }}
                >
                  <p style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                    {item.imageUrl || "🧵"}
                  </p>
                  <p
                    style={{ fontWeight: "700", color: "var(--primary-dark)" }}
                  >
                    {item.name}
                  </p>
                  <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
                    {item.description}
                  </p>
                  <p
                    style={{
                      marginTop: "0.5rem",
                      color: "var(--primary)",
                      fontWeight: "700",
                    }}
                  >
                    ${item.price.toFixed(2)}
                  </p>
                </Link>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
