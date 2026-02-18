"use client";

import Link from "next/link";
import { useMemo } from "react";
import { notifyAuthChange, useCurrentUser } from "@/lib/use-current-user";
import {
  clearCart,
  removeFromCart,
  updateCartItemQuantity,
  useCartItems,
} from "@/lib/use-cart";

export default function CartPage() {
  const currentUser = useCurrentUser();
  const cartItems = useCartItems();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentUser");
    notifyAuthChange();
    window.location.href = "/";
  };

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  return (
    <>
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
            <Link href="/cart">Cart ({totalItems})</Link>
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

      <section
        style={{
          minHeight: "calc(100vh - 68px)",
          backgroundColor: "var(--background)",
          padding: "2.5rem 2rem",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h1 style={{ color: "var(--primary-dark)", marginBottom: "0.75rem" }}>
            Your Cart
          </h1>
          <p style={{ color: "var(--text-light)", marginBottom: "1.5rem" }}>
            Review your items before checkout.
          </p>

          {cartItems.length === 0 ? (
            <div
              style={{
                backgroundColor: "white",
                border: "1px solid var(--primary)",
                borderRadius: "8px",
                padding: "1.5rem",
              }}
            >
              <p style={{ color: "var(--text-light)", marginBottom: "0.75rem" }}>
                Your cart is empty.
              </p>
              <Link href="/browse" style={{ color: "var(--primary)", fontWeight: "600" }}>
                Continue shopping
              </Link>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "1.5rem",
                alignItems: "start",
              }}
            >
              <div style={{ display: "grid", gap: "1rem" }}>
                {cartItems.map((item) => (
                  <div
                    key={item.productId}
                    style={{
                      backgroundColor: "white",
                      border: "1px solid var(--primary)",
                      borderRadius: "8px",
                      padding: "1rem",
                      display: "grid",
                      gridTemplateColumns: "auto 1fr auto",
                      gap: "1rem",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ fontSize: "2rem" }}>{item.imageUrl || "🧵"}</div>
                    <div>
                      <p style={{ fontWeight: "700", color: "var(--primary-dark)" }}>{item.name}</p>
                      <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(event) =>
                          updateCartItemQuantity(
                            item.productId,
                            Math.max(1, Number(event.target.value) || 1),
                          )
                        }
                        style={{
                          width: "70px",
                          padding: "0.35rem",
                          borderRadius: "4px",
                          border: "1px solid var(--primary)",
                          marginBottom: "0.5rem",
                        }}
                      />
                      <p style={{ fontWeight: "700", color: "var(--primary)" }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.productId)}
                        style={{
                          marginTop: "0.35rem",
                          border: "none",
                          background: "none",
                          color: "var(--primary-dark)",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <aside
                style={{
                  backgroundColor: "white",
                  border: "1px solid var(--primary)",
                  borderRadius: "8px",
                  padding: "1.25rem",
                }}
              >
                <h2 style={{ color: "var(--primary-dark)", marginBottom: "1rem" }}>
                  Checkout Summary
                </h2>
                <p style={{ color: "var(--text-light)", marginBottom: "0.5rem" }}>
                  Items: {totalItems}
                </p>
                <p style={{ color: "var(--text-light)", marginBottom: "1rem" }}>
                  Subtotal:
                </p>
                <p
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: "700",
                    color: "var(--primary)",
                    marginBottom: "1rem",
                  }}
                >
                  ${subtotal.toFixed(2)}
                </p>
                <button
                  type="button"
                  style={{
                    width: "100%",
                    backgroundColor: "var(--primary)",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "0.7rem 1rem",
                    fontWeight: "700",
                    cursor: "pointer",
                    marginBottom: "0.75rem",
                  }}
                >
                  Proceed to Checkout
                </button>
                <button
                  type="button"
                  onClick={clearCart}
                  style={{
                    width: "100%",
                    backgroundColor: "var(--accent)",
                    color: "var(--primary-dark)",
                    border: "1px solid var(--primary)",
                    borderRadius: "4px",
                    padding: "0.65rem 1rem",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  Clear Cart
                </button>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
