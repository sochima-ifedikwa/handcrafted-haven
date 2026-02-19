"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { notifyAuthChange, useCurrentUser } from "@/lib/use-current-user";
import { useCartItems } from "@/lib/use-cart";

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

export default function SellerDashboard() {
  const currentUser = useCurrentUser();
  const cartItems = useCartItems();
  const [profile, setProfile] = useState<SellerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [story, setStory] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "accessories",
    price: "",
    imageUrl: "",
  });

  const totalCartItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentUser");
    notifyAuthChange();
    window.location.href = "/login";
  };

  const loadProfile = async () => {
    if (!currentUser) {
      return;
    }

    setIsLoading(true);
    setStatusMessage("");

    try {
      const response = await fetch(
        `/api/sellers/${encodeURIComponent(currentUser.email)}`,
      );
      const payload = (await response.json()) as {
        profile?: SellerProfile;
        message?: string;
      };

      if (!response.ok || !payload.profile) {
        throw new Error(payload.message || "Unable to load seller profile.");
      }

      setProfile(payload.profile);
      setStory(payload.profile.sellerStory || "");
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : "Unable to load profile.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.accountType === "artisan") {
      void loadProfile();
    }
  }, [currentUser?.email, currentUser?.accountType]);

  const saveStory = async () => {
    if (!currentUser) {
      return;
    }

    const response = await fetch(
      `/api/sellers/${encodeURIComponent(currentUser.email)}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requesterEmail: currentUser.email, story }),
      },
    );

    const payload = (await response.json()) as { message?: string };

    if (!response.ok) {
      setStatusMessage(payload.message || "Unable to update seller story.");
      return;
    }

    setStatusMessage("Seller story updated.");
    await loadProfile();
  };

  const createListing = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!currentUser) {
      return;
    }

    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sellerEmail: currentUser.email,
        name: newProduct.name,
        description: newProduct.description,
        category: newProduct.category,
        price: Number(newProduct.price),
        imageUrl: newProduct.imageUrl || undefined,
      }),
    });

    const payload = (await response.json()) as { message?: string };

    if (!response.ok) {
      setStatusMessage(payload.message || "Unable to create product listing.");
      return;
    }

    setNewProduct({
      name: "",
      description: "",
      category: "accessories",
      price: "",
      imageUrl: "",
    });
    setStatusMessage("Product listing created.");
    await loadProfile();
  };

  if (!currentUser) {
    return (
      <section
        className="responsive-section"
        style={{ padding: "3rem", textAlign: "center" }}
      >
        <p style={{ marginBottom: "1rem" }}>
          Please sign in to access seller tools.
        </p>
        <Link href="/login">Go to Login</Link>
      </section>
    );
  }

  if (currentUser.accountType !== "artisan") {
    return (
      <section
        className="responsive-section"
        style={{ padding: "3rem", textAlign: "center" }}
      >
        <p style={{ marginBottom: "1rem" }}>
          Seller profiles are available for artisan accounts only.
        </p>
        <Link href="/">Go Home</Link>
      </section>
    );
  }

  return (
    <>
      {/* Header */}
      <header
        className="responsive-header"
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
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            href="/"
            className="responsive-brand"
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "var(--primary)",
            }}
          >
            🎨 Handcrafted Haven
          </Link>
          <div
            className="responsive-nav-links"
            style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}
          >
            <Link href="/cart">Cart ({totalCartItems})</Link>
            <span style={{ color: "var(--text-light)" }}>📱 Messages</span>
            <span style={{ color: "var(--text-light)" }}>
              👤 {currentUser ? currentUser.firstName : "Profile"}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              style={{
                backgroundColor: "var(--primary)",
                color: "white",
                padding: "0.6rem 1.2rem",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Sign Out
            </button>
          </div>
        </nav>
      </header>

      <main
        className="responsive-section"
        style={{
          minHeight: "calc(100vh - 70px)",
          padding: "2rem",
          backgroundColor: "var(--background)",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gap: "1.5rem",
          }}
        >
          <section
            className="responsive-card"
            style={{
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "8px",
              border: "1px solid var(--primary)",
            }}
          >
            <h1
              className="responsive-page-title"
              style={{ color: "var(--primary-dark)", marginBottom: "0.5rem" }}
            >
              Seller Profile:{" "}
              {profile?.sellerBusinessName ||
                `${currentUser.firstName} ${currentUser.lastName}`}
            </h1>
            <p style={{ color: "var(--text-light)", marginBottom: "1rem" }}>
              Share your story and showcase your handcrafted collection.
            </p>
            <textarea
              value={story}
              onChange={(event) => setStory(event.target.value)}
              rows={4}
              placeholder="Tell customers about your craft journey"
              style={{
                width: "100%",
                border: "1px solid var(--primary)",
                borderRadius: "4px",
                padding: "0.75rem",
                fontFamily: "inherit",
              }}
            />
            <button
              type="button"
              onClick={saveStory}
              style={{
                marginTop: "0.75rem",
                backgroundColor: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "0.6rem 1rem",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Save Story
            </button>
          </section>

          <section
            className="responsive-card"
            style={{
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "8px",
              border: "1px solid var(--primary)",
            }}
          >
            <h2
              style={{ color: "var(--primary-dark)", marginBottom: "0.75rem" }}
            >
              Add Product Listing
            </h2>
            <form
              onSubmit={createListing}
              style={{ display: "grid", gap: "0.75rem" }}
            >
              <input
                value={newProduct.name}
                onChange={(event) =>
                  setNewProduct((previous) => ({
                    ...previous,
                    name: event.target.value,
                  }))
                }
                placeholder="Product name"
                required
                style={{
                  padding: "0.65rem",
                  border: "1px solid var(--primary)",
                  borderRadius: "4px",
                }}
              />
              <textarea
                value={newProduct.description}
                onChange={(event) =>
                  setNewProduct((previous) => ({
                    ...previous,
                    description: event.target.value,
                  }))
                }
                placeholder="Product description"
                required
                rows={3}
                style={{
                  padding: "0.65rem",
                  border: "1px solid var(--primary)",
                  borderRadius: "4px",
                  fontFamily: "inherit",
                }}
              />
              <div
                className="responsive-form-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "0.75rem",
                }}
              >
                <select
                  value={newProduct.category}
                  onChange={(event) =>
                    setNewProduct((previous) => ({
                      ...previous,
                      category: event.target.value,
                    }))
                  }
                  style={{
                    padding: "0.65rem",
                    border: "1px solid var(--primary)",
                    borderRadius: "4px",
                  }}
                >
                  {[
                    "accessories",
                    "pottery",
                    "textiles",
                    "home",
                    "jewelry",
                  ].map((option) => (
                    <option key={option} value={option}>
                      {option[0].toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={newProduct.price}
                  onChange={(event) =>
                    setNewProduct((previous) => ({
                      ...previous,
                      price: event.target.value,
                    }))
                  }
                  placeholder="Price"
                  required
                  style={{
                    padding: "0.65rem",
                    border: "1px solid var(--primary)",
                    borderRadius: "4px",
                  }}
                />
                <input
                  value={newProduct.imageUrl}
                  onChange={(event) =>
                    setNewProduct((previous) => ({
                      ...previous,
                      imageUrl: event.target.value,
                    }))
                  }
                  placeholder="Image URL or emoji"
                  style={{
                    padding: "0.65rem",
                    border: "1px solid var(--primary)",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "0.7rem 1rem",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Create Listing
              </button>
            </form>
          </section>

          <section
            className="responsive-card"
            style={{
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "8px",
              border: "1px solid var(--primary)",
            }}
          >
            <h2
              style={{ color: "var(--primary-dark)", marginBottom: "0.75rem" }}
            >
              My Curated Collection
            </h2>
            {isLoading ? (
              <p style={{ color: "var(--text-light)" }}>Loading listings...</p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
                  gap: "1rem",
                }}
              >
                {(profile?.products ?? []).map((item) => (
                  <Link
                    key={item.id}
                    href={`/product/${item.id}`}
                    style={{
                      border: "1px solid var(--primary)",
                      borderRadius: "8px",
                      padding: "1rem",
                      backgroundColor: "var(--accent)",
                    }}
                  >
                    <p style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                      {item.imageUrl || "🧵"}
                    </p>
                    <p
                      style={{
                        fontWeight: "700",
                        color: "var(--primary-dark)",
                      }}
                    >
                      {item.name}
                    </p>
                    <p
                      style={{ color: "var(--text-light)", fontSize: "0.9rem" }}
                    >
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
                {!profile || profile.products.length === 0 ? (
                  <p style={{ color: "var(--text-light)" }}>
                    No products yet. Add your first listing above.
                  </p>
                ) : null}
              </div>
            )}
          </section>

          {statusMessage && (
            <p style={{ color: "var(--primary-dark)", fontWeight: "600" }}>
              {statusMessage}
            </p>
          )}
        </div>
      </main>
    </>
  );
}
