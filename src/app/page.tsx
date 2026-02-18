"use client";

export default function Home() {
  return (
    <>
      {/* Header/Navigation */}
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
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "var(--primary)",
            }}
          >
            🎨 Handcrafted Haven
          </div>
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <a href="#featured">Featured</a>
            <a href="#about">About</a>
            <a href="/browse">Browse</a>
            <a href="/login" style={{ color: "var(--text-light)" }}>
              Login
            </a>
            <a
              href="/register"
              style={{
                backgroundColor: "var(--primary)",
                color: "white",
                padding: "0.5rem 1.25rem",
                borderRadius: "4px",
                fontWeight: "600",
              }}
            >
              Join
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        style={{
          backgroundColor: "var(--background)",
          padding: "5rem 2rem",
          textAlign: "center",
          borderBottom: "2px solid var(--primary)",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "3.5rem",
              marginBottom: "1rem",
              color: "var(--primary-dark)",
              fontWeight: "700",
              letterSpacing: "-1px",
            }}
          >
            Discover Artisan-Crafted Beauty
          </h1>
          <p
            style={{
              fontSize: "1.3rem",
              color: "var(--text-light)",
              marginBottom: "3rem",
              lineHeight: "1.7",
            }}
          >
            Every piece tells a story. Support local artisans and find unique,
            handmade treasures that bring warmth and character to your life.
          </p>
          <div
            style={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}
          >
            <a
              href="/register"
              className="btn-primary"
              style={{
                backgroundColor: "var(--primary)",
                color: "white",
                padding: "0.85rem 2rem",
                borderRadius: "4px",
                fontSize: "1rem",
                fontWeight: "700",
              }}
            >
              Explore Now
            </a>
            <a
              href="#featured"
              className="btn-secondary"
              style={{
                backgroundColor: "white",
                color: "var(--primary)",
                padding: "0.85rem 2rem",
                borderRadius: "4px",
                fontSize: "1rem",
                fontWeight: "700",
                border: "2px solid var(--primary)",
              }}
            >
              View Collections
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        style={{
          backgroundColor: "var(--primary)",
          color: "white",
          padding: "3rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            textAlign: "center",
          }}
        >
          {[
            { number: "2,500+", label: "Artisans" },
            { number: "15,000+", label: "Products" },
            { number: "50,000+", label: "Happy Customers" },
            { number: "100%", label: "Handmade" },
          ].map((stat, idx) => (
            <div key={idx}>
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                {stat.number}
              </div>
              <div style={{ fontSize: "1rem", opacity: 0.9 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section
        id="featured"
        style={{
          padding: "4rem 2rem",
          backgroundColor: "var(--accent)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              marginBottom: "0.5rem",
              textAlign: "center",
              color: "var(--primary-dark)",
            }}
          >
            Featured Collections
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "var(--text-light)",
              marginBottom: "3rem",
              fontSize: "1.1rem",
            }}
          >
            Discover this week&apos;s most loved handcrafted items
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                name: "Artisan Leather Bag",
                artist: "by Sarah Crafts",
                price: "$89",
                emoji: "👜",
              },
              {
                name: "Hand-Thrown Ceramic Bowl",
                artist: "by Clay Studio",
                price: "$65",
                emoji: "🏺",
              },
              {
                name: "Knitted Wool Sweater",
                artist: "by Yarn & Thread",
                price: "$120",
                emoji: "🧶",
              },
              {
                name: "Wooden Jewelry Box",
                artist: "by Timber & Gold",
                price: "$75",
                emoji: "📦",
              },
            ].map((product, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "white",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  textAlign: "center",
                  border: "1px solid var(--primary)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(166, 124, 82, 0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                  {product.emoji}
                </div>
                <h3
                  style={{
                    marginBottom: "0.5rem",
                    fontSize: "1.2rem",
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
                <p
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                    color: "var(--primary)",
                    marginBottom: "1rem",
                  }}
                >
                  {product.price}
                </p>
                <button
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "white",
                    padding: "0.6rem 1.2rem",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                  }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <a
              href="/browse"
              style={{
                backgroundColor: "var(--primary-dark)",
                color: "white",
                padding: "0.85rem 2.5rem",
                borderRadius: "4px",
                fontSize: "1rem",
                fontWeight: "700",
                display: "inline-block",
              }}
            >
              Browse All Products
            </a>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section
        style={{
          padding: "4rem 2rem",
          backgroundColor: "white",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              marginBottom: "3rem",
              textAlign: "center",
              color: "var(--primary-dark)",
            }}
          >
            Shop by Category
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                title: "Jewelry",
                emoji: "💎",
                desc: "Artisan earrings, necklaces & accessories",
              },
              {
                title: "Home Decor",
                emoji: "🏠",
                desc: "Beautiful pieces for every room",
              },
              {
                title: "Textiles",
                emoji: "🧶",
                desc: "Handwoven and hand-knitted treasures",
              },
              {
                title: "Pottery",
                emoji: "🏺",
                desc: "Hand-thrown ceramics and stoneware",
              },
            ].map((cat, idx) => (
              <a
                key={idx}
                href="/browse"
                style={{
                  padding: "2rem",
                  border: "2px solid var(--primary)",
                  borderRadius: "8px",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  backgroundColor: "var(--accent)",
                  display: "block",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--primary)";
                  e.currentTarget.style.color = "white";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--accent)";
                  e.currentTarget.style.color = "inherit";
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                  {cat.emoji}
                </div>
                <h3 style={{ marginBottom: "0.5rem" }}>{cat.title}</h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-light)" }}>
                  {cat.desc}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        style={{
          padding: "4rem 2rem",
          backgroundColor: "var(--accent)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              marginBottom: "3rem",
              textAlign: "center",
              color: "var(--primary-dark)",
            }}
          >
            Loved by Our Community
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                name: "Emma Johnson",
                role: "Customer",
                text: "I found the most beautiful handwoven tapestry here. The quality and craftsmanship are outstanding!",
                rating: "⭐⭐⭐⭐⭐",
              },
              {
                name: "Marcus Chen",
                role: "Artisan",
                text: "Handcrafted Haven has been a game-changer for my pottery business. The platform connects me with customers who truly appreciate my work.",
                rating: "⭐⭐⭐⭐⭐",
              },
              {
                name: "Sofia Rodriguez",
                role: "Customer",
                text: "Every purchase feels special knowing it directly supports a talented artist. I've become a repeat customer!",
                rating: "⭐⭐⭐⭐⭐",
              },
            ].map((review, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "white",
                  padding: "2rem",
                  borderRadius: "8px",
                  border: "1px solid var(--primary)",
                }}
              >
                <div style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
                  {review.rating}
                </div>
                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.6",
                    marginBottom: "1.5rem",
                    color: "var(--text-light)",
                    fontStyle: "italic",
                  }}
                >
                  &quot;{review.text}&quot;
                </p>
                <p style={{ fontWeight: "bold", color: "var(--primary-dark)" }}>
                  {review.name}
                </p>
                <p style={{ fontSize: "0.9rem", color: "var(--text-light)" }}>
                  {review.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        id="about"
        style={{
          padding: "4rem 2rem",
          backgroundColor: "white",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              marginBottom: "3rem",
              textAlign: "center",
              color: "var(--primary-dark)",
            }}
          >
            Why Choose Handcrafted Haven?
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                icon: "❤️",
                title: "Support Artisans",
                desc: "Every purchase directly supports independent creators worldwide.",
              },
              {
                icon: "✨",
                title: "Unique & Authentic",
                desc: "One-of-a-kind items handcrafted with passion and skill.",
              },
              {
                icon: "✅",
                title: "Quality Assured",
                desc: "All items meet our standards for craftsmanship and materials.",
              },
              {
                icon: "🔒",
                title: "Secure Shopping",
                desc: "Protected transactions and buyer guarantees for peace of mind.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                style={{
                  padding: "2rem",
                  backgroundColor: "var(--accent)",
                  borderRadius: "8px",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                  {feature.icon}
                </div>
                <h3
                  style={{
                    marginBottom: "0.5rem",
                    color: "var(--primary-dark)",
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: "var(--text-light)", lineHeight: "1.6" }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section
        style={{
          padding: "3rem 2rem",
          backgroundColor: "var(--primary-dark)",
          color: "white",
        }}
      >
        <div
          style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}
        >
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            Stay Inspired
          </h2>
          <p
            style={{ marginBottom: "2rem", fontSize: "1.1rem", opacity: 0.95 }}
          >
            Subscribe to receive curated collections, artisan spotlights, and
            exclusive offers delivered to your inbox.
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              marginTop: "1.5rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                padding: "0.85rem 1rem",
                borderRadius: "4px",
                border: "none",
                flex: 1,
                minWidth: "250px",
                fontSize: "1rem",
              }}
            />
            <button
              style={{
                backgroundColor: "var(--secondary)",
                color: "var(--primary-dark)",
                padding: "0.85rem 2rem",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "1rem",
              }}
            >
              Subscribe
            </button>
          </div>
          <p style={{ fontSize: "0.8rem", opacity: 0.8, marginTop: "1rem" }}>
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "var(--foreground)",
          color: "var(--accent)",
          padding: "3rem 2rem",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "2rem",
              marginBottom: "2rem",
            }}
          >
            <div>
              <h4
                style={{
                  color: "var(--secondary)",
                  marginBottom: "1rem",
                  fontSize: "1.1rem",
                }}
              >
                Handcrafted Haven
              </h4>
              <p style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
                A marketplace celebrating artisans and handmade creation
                worldwide.
              </p>
            </div>
            <div>
              <h4
                style={{
                  color: "var(--secondary)",
                  marginBottom: "1rem",
                  fontSize: "1.1rem",
                }}
              >
                Shop
              </h4>
              <ul style={{ listStyle: "none" }}>
                <li>
                  <a href="/browse">Browse All</a>
                </li>
                <li>
                  <a href="/browse?category=jewelry">Jewelry</a>
                </li>
                <li>
                  <a href="/browse?category=home">Home Decor</a>
                </li>
              </ul>
            </div>
            <div>
              <h4
                style={{
                  color: "var(--secondary)",
                  marginBottom: "1rem",
                  fontSize: "1.1rem",
                }}
              >
                For Artisans
              </h4>
              <ul style={{ listStyle: "none" }}>
                <li>
                  <a href="/register">Sell With Us</a>
                </li>
                <li>
                  <a href="/seller-dashboard">Dashboard</a>
                </li>
              </ul>
            </div>
            <div>
              <h4
                style={{
                  color: "var(--secondary)",
                  marginBottom: "1rem",
                  fontSize: "1.1rem",
                }}
              >
                Support
              </h4>
              <ul style={{ listStyle: "none" }}>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Service</a>
                </li>
              </ul>
            </div>
          </div>
          <div
            style={{
              borderTop: "1px solid var(--accent)",
              paddingTop: "2rem",
              textAlign: "center",
              opacity: 0.8,
            }}
          >
            <p>
              &copy; 2026 Handcrafted Haven. All rights reserved. | Handmade
              with love.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
