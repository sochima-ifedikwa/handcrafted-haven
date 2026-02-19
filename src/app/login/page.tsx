"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { notifyAuthChange, useCurrentUser } from "@/lib/use-current-user";
import { useCartItems } from "@/lib/use-cart";

type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const initialFormData: LoginFormData = {
  email: "",
  password: "",
  rememberMe: false,
};

export default function LoginPage() {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const cartItems = useCartItems();
  const [formData, setFormData] = useState<LoginFormData>(initialFormData);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalCartItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value } = event.target;
    const nextValue = type === "checkbox" ? event.target.checked : value;

    setFormData((previous) => ({
      ...previous,
      [name]: nextValue,
    }));

    if (formError) {
      setFormError("");
    }
  };

  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email.trim().toLowerCase())) {
      return "Enter a valid email address.";
    }

    if (!formData.password) {
      return "Password is required.";
    }

    return "";
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setIsSubmitting(true);
    setFormError("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      const responseText = await response.text();
      let payload: {
        message?: string;
        user?: {
          firstName: string;
          lastName: string;
          email: string;
          accountType: "buyer" | "artisan";
        };
      } = {};

      if (responseText) {
        try {
          payload = JSON.parse(responseText) as {
            message?: string;
            user?: {
              firstName: string;
              lastName: string;
              email: string;
              accountType: "buyer" | "artisan";
            };
          };
        } catch {
          payload = {};
        }
      }

      if (!response.ok) {
        throw new Error(payload.message || "Unable to sign in right now.");
      }

      if (payload.user) {
        const storage = formData.rememberMe ? localStorage : sessionStorage;
        storage.setItem("currentUser", JSON.stringify(payload.user));
        notifyAuthChange();
      }

      setSuccessMessage(payload.message || "Login successful! Redirecting...");
      setFormData(initialFormData);

      setTimeout(() => {
        router.push("/welcome");
      }, 1000);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentUser");
    notifyAuthChange();
    router.push("/");
  };

  return (
    <>
      {/* Header */}
      <header
        className="responsive-header"
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
            style={{ display: "flex", gap: "1.5rem" }}
          >
            <Link href="/">Home</Link>
            <Link href="/cart">Cart ({totalCartItems})</Link>
            {currentUser ? (
              <>
                <Link href="/welcome">Welcome, {currentUser.firstName}</Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    border: "none",
                    background: "none",
                    color: "var(--text-light)",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontFamily: "inherit",
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/register">Create Account</Link>
            )}
          </div>
        </nav>
      </header>

      {/* Login Section */}
      <section
        className="responsive-section"
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
          className="responsive-card"
          style={{
            width: "100%",
            maxWidth: "450px",
            backgroundColor: "white",
            padding: "2.5rem",
            borderRadius: "8px",
            border: "2px solid var(--primary)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1
            className="responsive-page-title"
            style={{
              fontSize: "2rem",
              marginBottom: "0.5rem",
              color: "var(--primary-dark)",
              textAlign: "center",
            }}
          >
            Welcome Back
          </h1>
          <p
            style={{
              textAlign: "center",
              color: "var(--text-light)",
              marginBottom: "2rem",
            }}
          >
            Sign in to your Handcrafted Haven account
          </p>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
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
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
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
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
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
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
              }}
            >
              <input
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                style={{ cursor: "pointer" }}
              />
              <span style={{ color: "var(--text-light)" }}>Remember me</span>
            </label>

            {formError && (
              <p
                role="alert"
                style={{
                  color: "var(--primary-dark)",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                }}
              >
                {formError}
              </p>
            )}

            {successMessage && (
              <p
                style={{
                  color: "var(--primary)",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                }}
              >
                {successMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                backgroundColor: "var(--primary)",
                color: "white",
                padding: "0.85rem",
                borderRadius: "4px",
                border: "none",
                fontSize: "1rem",
                fontWeight: "700",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                opacity: isSubmitting ? 0.7 : 1,
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = "var(--primary-dark)";
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "var(--primary)";
              }}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>

            <div style={{ textAlign: "center" }}>
              <a
                href="#forgot"
                style={{
                  color: "var(--primary)",
                  fontSize: "0.9rem",
                  textDecoration: "underline",
                }}
              >
                Forgot your password?
              </a>
            </div>
          </form>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid var(--primary)",
              margin: "2rem 0",
            }}
          />

          <p style={{ textAlign: "center", color: "var(--text-light)" }}>
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              style={{
                color: "var(--primary)",
                fontWeight: "700",
                textDecoration: "underline",
              }}
            >
              Create one here
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
