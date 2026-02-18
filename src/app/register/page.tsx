"use client";

import Link from "next/link";

export default function RegisterPage() {
  return (
    <>
      {/* Header */}
      <header
        style={{
          backgroundColor: "var(--accent)",
          borderBottom: "1px solid var(--primary)",
          padding: "1rem 2rem",
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
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/">Home</Link>
            <a href="/login">Sign In</a>
          </div>
        </nav>
      </header>

      {/* Register Section */}
      <section
        style={{
          minHeight: "calc(100vh - 60px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          backgroundColor: "var(--background)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            backgroundColor: "white",
            padding: "2.5rem",
            borderRadius: "8px",
            border: "2px solid var(--primary)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              marginBottom: "0.5rem",
              color: "var(--primary-dark)",
              textAlign: "center",
            }}
          >
            Join Handcrafted Haven
          </h1>
          <p
            style={{
              textAlign: "center",
              color: "var(--text-light)",
              marginBottom: "2rem",
            }}
          >
            Create your account to start shopping or selling
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            {/* Account Type */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.75rem",
                  color: "var(--primary-dark)",
                  fontWeight: "600",
                }}
              >
                I am a...
              </label>
              <div style={{ display: "flex", gap: "1rem" }}>
                <label
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    border: "1px solid var(--primary)",
                    borderRadius: "4px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <input
                    type="radio"
                    name="accountType"
                    value="buyer"
                    defaultChecked
                  />
                  <span>Buyer</span>
                </label>
                <label
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    border: "1px solid var(--primary)",
                    borderRadius: "4px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <input type="radio" name="accountType" value="artisan" />
                  <span>Artisan</span>
                </label>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "var(--primary-dark)",
                    fontWeight: "600",
                  }}
                >
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "4px",
                    border: "1px solid var(--primary)",
                    fontSize: "1rem",
                    fontFamily: "inherit",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "var(--primary-dark)",
                    fontWeight: "600",
                  }}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "4px",
                    border: "1px solid var(--primary)",
                    fontSize: "1rem",
                    fontFamily: "inherit",
                  }}
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "var(--primary-dark)",
                  fontWeight: "600",
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "4px",
                  border: "1px solid var(--primary)",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "var(--primary-dark)",
                  fontWeight: "600",
                }}
              >
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "4px",
                  border: "1px solid var(--primary)",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "var(--primary-dark)",
                  fontWeight: "600",
                }}
              >
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "4px",
                  border: "1px solid var(--primary)",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.5rem",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                style={{
                  cursor: "pointer",
                  marginTop: "0.3rem",
                }}
              />
              <span style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
                I agree to the Terms of Service and Privacy Policy
              </span>
            </label>

            <button
              style={{
                backgroundColor: "var(--primary)",
                color: "white",
                padding: "0.85rem",
                borderRadius: "4px",
                border: "none",
                fontSize: "1rem",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "var(--primary-dark)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "var(--primary)";
              }}
            >
              Create Account
            </button>
          </form>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid var(--primary)",
              margin: "2rem 0",
            }}
          />

          <p style={{ textAlign: "center", color: "var(--text-light)" }}>
            Already have an account?{" "}
            <a
              href="/login"
              style={{
                color: "var(--primary)",
                fontWeight: "700",
                textDecoration: "underline",
              }}
            >
              Sign in here
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
