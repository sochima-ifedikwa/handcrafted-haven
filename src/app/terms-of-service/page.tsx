import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <section
      className="responsive-section"
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--background)",
        padding: "3rem 2rem",
      }}
    >
      <div
        className="responsive-card"
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "white",
          border: "1px solid var(--primary)",
          borderRadius: "8px",
          padding: "2rem",
        }}
      >
        <h1
          className="responsive-page-title"
          style={{ color: "var(--primary-dark)", marginBottom: "1rem" }}
        >
          Terms of Service
        </h1>
        <p style={{ color: "var(--text-light)", marginBottom: "1rem" }}>
          By using Handcrafted Haven, you agree to respectful marketplace
          behavior and accurate listing details.
        </p>
        <p style={{ color: "var(--text-light)", marginBottom: "1.5rem" }}>
          Orders and communications should follow platform policies and local
          laws.
        </p>
        <Link href="/" style={{ color: "var(--primary)", fontWeight: "600" }}>
          Back to Home
        </Link>
      </div>
    </section>
  );
}
