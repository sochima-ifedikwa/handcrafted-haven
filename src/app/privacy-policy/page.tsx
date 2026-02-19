import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <section
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--background)",
        padding: "3rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "white",
          border: "1px solid var(--primary)",
          borderRadius: "8px",
          padding: "2rem",
        }}
      >
        <h1 style={{ color: "var(--primary-dark)", marginBottom: "1rem" }}>
          Privacy Policy
        </h1>
        <p style={{ color: "var(--text-light)", marginBottom: "1rem" }}>
          We only use your information to support your account, orders, and
          marketplace communication.
        </p>
        <p style={{ color: "var(--text-light)", marginBottom: "1.5rem" }}>
          We do not sell your personal data.
        </p>
        <Link href="/" style={{ color: "var(--primary)", fontWeight: "600" }}>
          Back to Home
        </Link>
      </div>
    </section>
  );
}
