"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { notifyAuthChange, useCurrentUser } from "@/lib/use-current-user";

export default function WelcomePage() {
  const router = useRouter();
  const currentUser = useCurrentUser();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentUser");
    notifyAuthChange();
    router.push("/login");
  };

  useEffect(() => {
    if (!currentUser) {
      router.replace("/login");
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null;
  }

  return (
    <section
      style={{
        minHeight: "100vh",
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
          maxWidth: "560px",
          backgroundColor: "white",
          padding: "2.5rem",
          borderRadius: "8px",
          border: "2px solid var(--primary)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            color: "var(--primary-dark)",
            marginBottom: "1rem",
          }}
        >
          Welcome, {currentUser.firstName}
        </h1>
        <p style={{ color: "var(--text-light)", marginBottom: "1.75rem" }}>
          You are now logged in to Handcrafted Haven.
        </p>
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              display: "inline-block",
              backgroundColor: "var(--primary)",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "4px",
              fontWeight: "700",
            }}
          >
            Go to Home
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--primary-dark)",
              padding: "0.75rem 1.5rem",
              borderRadius: "4px",
              border: "1px solid var(--primary)",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}
