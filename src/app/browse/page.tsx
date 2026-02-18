"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { notifyAuthChange, useCurrentUser } from "@/lib/use-current-user";

type ProductItem = {
  id: number;
  sellerEmail: string;
  sellerName: string;
  sellerBusinessName?: string;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl?: string;
  reviews: { rating: number }[];
};

export default function BrowsePage() {
  const currentUser = useCurrentUser();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentUser");
    notifyAuthChange();
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const query = new URLSearchParams();
        if (category !== "all") {
          query.set("category", category);
        }
        if (minPrice) {
          query.set("minPrice", minPrice);
        }
        if (maxPrice) {
          query.set("maxPrice", maxPrice);
        }

        const response = await fetch(`/api/products?${query.toString()}`);
        const payload = (await response.json()) as {
          products?: ProductItem[];
          message?: string;
        };

        if (!response.ok) {
          throw new Error(payload.message || "Could not load products.");
        }

        setProducts(payload.products ?? []);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "Something went wrong.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void fetchProducts();
  }, [category, minPrice, maxPrice]);

  const categories = useMemo(
    () => ["all", "jewelry", "pottery", "textiles", "home", "accessories"],
    [],
  );

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
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <Link href="/">Home</Link>
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
                  padding: "0.5rem 1.25rem",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            ) : (
              <Link
                href="/register"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "white",
                  padding: "0.5rem 1.25rem",
                  borderRadius: "4px",
                }}
              >
                Join
              </Link>
            )}
          </div>
        </nav>
      </header>

      {/* Browse Section */}
      <section
        style={{
          padding: "3rem 2rem",
          backgroundColor: "var(--background)",
          minHeight: "calc(100vh - 60px)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              marginBottom: "0.5rem",
              color: "var(--primary-dark)",
            }}
          >
            Browse Our Collections
          </h1>
          <p
            style={{
              color: "var(--text-light)",
              marginBottom: "2rem",
              fontSize: "1.1rem",
            }}
          >
            Discover handcrafted treasures from talented artisans
          </p>

          {/* Filters */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginBottom: "3rem",
              flexWrap: "wrap",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  backgroundColor:
                    category === cat ? "var(--primary)" : "white",
                  color: category === cat ? "white" : "var(--primary)",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "4px",
                  border:
                    category === cat
                      ? "1px solid var(--primary)"
                      : "2px solid var(--primary)",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                {cat === "all" ? "All" : cat[0].toUpperCase() + cat.slice(1)}
              </button>
            ))}
            <input
              type="number"
              placeholder="Min $"
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
              style={{
                padding: "0.6rem 0.8rem",
                borderRadius: "4px",
                border: "1px solid var(--primary)",
                width: "100px",
              }}
            />
            <input
              type="number"
              placeholder="Max $"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              style={{
                padding: "0.6rem 0.8rem",
                borderRadius: "4px",
                border: "1px solid var(--primary)",
                width: "100px",
              }}
            />
          </div>

          {errorMessage && (
            <p
              style={{
                marginBottom: "1rem",
                color: "var(--primary-dark)",
                fontWeight: "600",
              }}
            >
              {errorMessage}
            </p>
          )}

          {isLoading && (
            <p style={{ marginBottom: "2rem", color: "var(--text-light)" }}>
              Loading products...
            </p>
          )}

          {/* Products Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {products.map((product) => (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: "1px solid var(--primary)",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 30px rgba(166, 124, 82, 0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    backgroundColor: "var(--accent)",
                    padding: "3rem 1rem",
                    textAlign: "center",
                    fontSize: "3rem",
                  }}
                >
                  {product.imageUrl || "🧵"}
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <h3
                    style={{
                      marginBottom: "0.5rem",
                      color: "var(--primary-dark)",
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    style={{
                      color: "var(--text-light)",
                      fontSize: "0.9rem",
                      marginBottom: "1rem",
                    }}
                  >
                    by {product.sellerBusinessName || product.sellerName}
                  </p>
                  <p
                    style={{
                      color: "var(--text-light)",
                      fontSize: "0.9rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {product.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "bold",
                        color: "var(--primary)",
                      }}
                    >
                      ${product.price.toFixed(2)}
                    </span>
                    <span
                      style={{
                        backgroundColor: "var(--primary)",
                        color: "white",
                        padding: "0.5rem 1rem",
                        borderRadius: "4px",
                        border: "none",
                        fontWeight: "600",
                        fontSize: "0.9rem",
                      }}
                    >
                      View
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {!isLoading && products.length === 0 && (
            <p style={{ marginTop: "1.5rem", color: "var(--text-light)" }}>
              No products match your current filters.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
