"use client";

import Link from "next/link";
import { notifyAuthChange, useCurrentUser } from "@/lib/use-current-user";

export default function ProductPage() {
  const currentUser = useCurrentUser();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentUser");
    notifyAuthChange();
    window.location.href = "/";
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
              👜
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
                Accessories
              </div>

              <h1
                style={{
                  fontSize: "2.5rem",
                  color: "var(--primary-dark)",
                  marginBottom: "1rem",
                }}
              >
                Artisan Leather Bag
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
                <span style={{ color: "var(--text-light)" }}>45 reviews</span>
              </div>

              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "var(--primary)",
                  marginBottom: "2rem",
                }}
              >
                $89.00
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
                  Handcrafted with premium leather, this artisan bag features
                  traditional techniques passed down through generations. Each
                  piece is unique with its own character and patina. Perfect for
                  daily use or as a treasured accessory.
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
                      Sarah Crafts
                    </p>
                    <p
                      style={{ fontSize: "0.9rem", color: "var(--text-light)" }}
                    >
                      Master leatherworker with 15 years of experience
                    </p>
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

          {/* Similar Products */}
          <div style={{ marginTop: "5rem" }}>
            <h2
              style={{
                fontSize: "2rem",
                color: "var(--primary-dark)",
                marginBottom: "2rem",
              }}
            >
              Similar Products
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "2rem",
              }}
            >
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: "1px solid var(--primary)",
                    padding: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "var(--accent)",
                      padding: "2rem",
                      textAlign: "center",
                      fontSize: "2.5rem",
                      marginBottom: "1rem",
                      borderRadius: "4px",
                    }}
                  >
                    👜
                  </div>
                  <p style={{ fontWeight: "600", marginBottom: "0.5rem" }}>
                    Similar Item {i}
                  </p>
                  <p
                    style={{
                      color: "var(--text-light)",
                      fontSize: "0.9rem",
                      marginBottom: "1rem",
                    }}
                  >
                    by Sarah Crafts
                  </p>
                  <p
                    style={{
                      fontSize: "1.2rem",
                      color: "var(--primary)",
                      fontWeight: "bold",
                    }}
                  >
                    $69 - $99
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
