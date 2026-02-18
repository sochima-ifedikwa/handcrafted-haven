"use client";

import Link from "next/link";
import { notifyAuthChange, useCurrentUser } from "@/lib/use-current-user";

export default function BrowsePage() {
  const currentUser = useCurrentUser();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentUser");
    notifyAuthChange();
    window.location.href = "/";
  };

  const products = [
    {
      id: 1,
      name: "Artisan Leather Bag",
      artist: "Sarah Crafts",
      price: "$89",
      category: "accessories",
      emoji: "👜",
    },
    {
      id: 2,
      name: "Hand-Thrown Ceramic Bowl",
      artist: "Clay Studio",
      price: "$65",
      category: "pottery",
      emoji: "🏺",
    },
    {
      id: 3,
      name: "Knitted Wool Sweater",
      artist: "Yarn & Thread",
      price: "$120",
      category: "textiles",
      emoji: "🧶",
    },
    {
      id: 4,
      name: "Wooden Jewelry Box",
      artist: "Timber & Gold",
      price: "$75",
      category: "home",
      emoji: "📦",
    },
    {
      id: 5,
      name: "Silver Pendant Necklace",
      artist: "Luna Designs",
      price: "$120",
      category: "jewelry",
      emoji: "💎",
    },
    {
      id: 6,
      name: "Macramé Wall Hanging",
      artist: "Fiber Arts Co",
      price: "$45",
      category: "home",
      emoji: "🌿",
    },
    {
      id: 7,
      name: "Hand-Painted Ceramic Tiles",
      artist: "Clay Studio",
      price: "$55",
      category: "pottery",
      emoji: "🎨",
    },
    {
      id: 8,
      name: "Leather Bookmarks Set",
      artist: "Sarah Crafts",
      price: "$25",
      category: "accessories",
      emoji: "📖",
    },
  ];

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
            <button
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
              All
            </button>
            {["Jewelry", "Pottery", "Textiles", "Home"].map((cat) => (
              <button
                key={cat}
                style={{
                  backgroundColor: "white",
                  color: "var(--primary)",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "4px",
                  border: "2px solid var(--primary)",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {products.map((product) => (
              <div
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
                  {product.emoji}
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
                    {product.artist}
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
                      {product.price}
                    </span>
                    <button
                      style={{
                        backgroundColor: "var(--primary)",
                        color: "white",
                        padding: "0.5rem 1rem",
                        borderRadius: "4px",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "0.9rem",
                      }}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
