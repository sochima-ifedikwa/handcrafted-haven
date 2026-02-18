"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { notifyAuthChange, useCurrentUser } from "@/lib/use-current-user";
import { useCartItems } from "@/lib/use-cart";

type AccountType = "buyer" | "artisan";

type RegisterFormData = {
  accountType: AccountType;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  businessName: string;
  bio: string;
  agreeToTerms: boolean;
};

const initialFormData: RegisterFormData = {
  accountType: "buyer",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  businessName: "",
  bio: "",
  agreeToTerms: false,
};

export default function RegisterPage() {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const cartItems = useCartItems();
  const [formData, setFormData] = useState<RegisterFormData>(initialFormData);
  const [formError, setFormError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalCartItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, type, value } = event.target;
    const nextValue =
      type === "checkbox" ? (event.target as HTMLInputElement).checked : value;

    setFormData((previous) => ({
      ...previous,
      [name]: nextValue,
    }));

    if (formError) {
      setFormError("");
    }
  };

  const validateForm = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      return "First and last name are required.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      return "Enter a valid email address.";
    }

    if (formData.password.length < 8) {
      return "Password must be at least 8 characters long.";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }

    if (!formData.agreeToTerms) {
      return "You must agree to the Terms of Service and Privacy Policy.";
    }

    if (formData.accountType === "artisan" && !formData.businessName.trim()) {
      return "Business name is required for artisan accounts.";
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
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          accountType: formData.accountType,
          businessName:
            formData.accountType === "artisan"
              ? formData.businessName.trim()
              : undefined,
          bio:
            formData.accountType === "artisan"
              ? formData.bio.trim() || undefined
              : undefined,
        }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(
          payload.message || "Unable to create account right now.",
        );
      }

      setSuccessMessage(
        payload.message || "Account created! Redirecting to sign in...",
      );
      setFormData(initialFormData);

      setTimeout(() => {
        router.push("/login");
      }, 1200);
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
              <Link href="/login">Sign In</Link>
            )}
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
            onSubmit={handleSubmit}
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
                    checked={formData.accountType === "buyer"}
                    onChange={handleInputChange}
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
                  <input
                    type="radio"
                    name="accountType"
                    value="artisan"
                    checked={formData.accountType === "artisan"}
                    onChange={handleInputChange}
                  />
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
                  name="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
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
                  Last Name
                </label>
                <input
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
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
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
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

            {formData.accountType === "artisan" && (
              <>
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      color: "var(--primary-dark)",
                      fontWeight: "600",
                    }}
                  >
                    Business Name
                  </label>
                  <input
                    name="businessName"
                    type="text"
                    placeholder="Your Craft Studio"
                    value={formData.businessName}
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
                    Short Bio (Optional)
                  </label>
                  <textarea
                    name="bio"
                    placeholder="Tell customers about your craft..."
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "4px",
                      border: "1px solid var(--primary)",
                      fontSize: "1rem",
                      fontFamily: "inherit",
                      resize: "vertical",
                    }}
                  />
                </div>
              </>
            )}

            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.5rem",
                cursor: "pointer",
              }}
            >
              <input
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                style={{
                  cursor: "pointer",
                  marginTop: "0.3rem",
                }}
              />
              <span style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
                I agree to the Terms of Service and Privacy Policy
              </span>
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
              {isSubmitting ? "Creating Account..." : "Create Account"}
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
            <Link
              href="/login"
              style={{
                color: "var(--primary)",
                fontWeight: "700",
                textDecoration: "underline",
              }}
            >
              Sign in here
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
