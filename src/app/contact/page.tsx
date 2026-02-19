import Link from "next/link";

export default function ContactPage() {
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
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "white",
          border: "1px solid var(--primary)",
          borderRadius: "8px",
          padding: "2rem",
        }}
      >
        <h1 style={{ color: "var(--primary-dark)", marginBottom: "1rem" }}>
          Contact Us
        </h1>
        <p style={{ color: "var(--text-light)", marginBottom: "0.75rem" }}>
          Email: support@handcraftedhaven.com
        </p>
        <p style={{ color: "var(--text-light)", marginBottom: "1.5rem" }}>
          We usually respond within 1-2 business days.
        </p>
        <Link href="/" style={{ color: "var(--primary)", fontWeight: "600" }}>
          Back to Home
        </Link>
      </div>
    </section>
  );
}
