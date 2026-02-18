"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { clearCart, useCartItems } from "@/lib/use-cart";
import { notifyAuthChange, useCurrentUser } from "@/lib/use-current-user";

export default function CheckoutPage() {
  const currentUser = useCurrentUser();
  const cartItems = useCartItems();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentUser");
    notifyAuthChange();
    window.location.href = "/";
  };

  const placeOrder = () => {
    clearCart();
    setOrderPlaced(true);
  };

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
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h1 style={{ color: "var(--primary-dark)", marginBottom: "0.75rem" }}>
            Checkout
          </h1>

          {orderPlaced ? (
            <div
              style={{
                backgroundColor: "white",
                border: "1px solid var(--primary)",
                borderRadius: "8px",
                padding: "1.5rem",
              }}
            >
              <p
                style={{
                  color: "var(--primary-dark)",
                  fontWeight: "700",
                  marginBottom: "0.75rem",
                }}
              >
                Your order has been placed successfully.
              </p>
              <Link href="/browse" style={{ color: "var(--primary)", fontWeight: "600" }}>
                Continue shopping
              </Link>
            </div>
          ) : cartItems.length === 0 ? (
            <div
              style={{
                backgroundColor: "white",
                border: "1px solid var(--primary)",
                borderRadius: "8px",
                padding: "1.5rem",
              }}
            >
              <p style={{ color: "var(--text-light)", marginBottom: "0.75rem" }}>
                Your cart is empty. Add items before checkout.
              </p>
              <Link href="/browse" style={{ color: "var(--primary)", fontWeight: "600" }}>
                Browse products
              </Link>
            </div>
          ) : (
            <div
              style={{
                backgroundColor: "white",
                border: "1px solid var(--primary)",
                borderRadius: "8px",
                padding: "1.5rem",
              }}
            >
              <h2 style={{ color: "var(--primary-dark)", marginBottom: "1rem" }}>
                Order Summary
              </h2>
              <div style={{ display: "grid", gap: "0.75rem", marginBottom: "1rem" }}>
                {cartItems.map((item) => (
                  <div
                    key={item.productId}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid var(--accent)",
                      paddingBottom: "0.5rem",
                    }}
                  >
                    <span style={{ color: "var(--text-light)" }}>
                      {item.name} × {item.quantity}
                    </span>
                    <span style={{ color: "var(--primary-dark)", fontWeight: "600" }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <p style={{ color: "var(--text-light)", marginBottom: "0.25rem" }}>
                Items: {totalItems}
              </p>
              <p
                style={{
                  fontSize: "1.8rem",
                  color: "var(--primary)",
                  fontWeight: "700",
                  marginBottom: "1rem",
                }}
              >
                Total: ${subtotal.toFixed(2)}
              </p>

              <button
                type="button"
                onClick={placeOrder}
                style={{
                  backgroundColor: "var(--primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "0.75rem 1rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  marginRight: "0.75rem",
                }}
              >
                Place Order
              </button>
              <Link href="/cart" style={{ color: "var(--primary)", fontWeight: "600" }}>
                Back to Cart
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
