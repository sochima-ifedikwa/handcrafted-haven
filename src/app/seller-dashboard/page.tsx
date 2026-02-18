"use client";

import Link from "next/link";

export default function SellerDashboard() {
  return (
    <>
      {/* Header */}
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
            maxWidth: "1400px",
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
            <span style={{ color: "var(--text-light)" }}>📱 Messages</span>
            <span style={{ color: "var(--text-light)" }}>👤 Profile</span>
            <button
              style={{
                backgroundColor: "var(--primary)",
                color: "white",
                padding: "0.6rem 1.2rem",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Sign Out
            </button>
          </div>
        </nav>
      </header>

      <div style={{ display: "flex", minHeight: "calc(100vh - 70px)" }}>
        {/* Sidebar */}
        <aside
          style={{
            width: "250px",
            backgroundColor: "var(--accent)",
            borderRight: "1px solid var(--primary)",
            padding: "2rem 0",
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column" }}>
            {[
              { label: "Dashboard", icon: "📊" },
              { label: "My Products", icon: "📦" },
              { label: "Orders", icon: "🛒" },
              { label: "Sales Analytics", icon: "📈" },
              { label: "Shop Settings", icon: "⚙️" },
              { label: "Help & Support", icon: "❓" },
            ].map((item) => (
              <a
                key={item.label}
                href="#"
                style={{
                  padding: "1rem 1.5rem",
                  color: "var(--primary-dark)",
                  fontWeight: "600",
                  borderLeft: "4px solid transparent",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--primary)";
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.borderLeftColor = "var(--secondary)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--primary-dark)";
                  e.currentTarget.style.borderLeftColor = "transparent";
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main
          style={{
            flex: 1,
            padding: "2rem",
            backgroundColor: "var(--background)",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {/* Welcome Section */}
            <div
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "8px",
                border: "1px solid var(--primary)",
                marginBottom: "2rem",
              }}
            >
              <h1
                style={{
                  fontSize: "2rem",
                  color: "var(--primary-dark)",
                  marginBottom: "0.5rem",
                }}
              >
                Welcome back, Sarah! 👋
              </h1>
              <p style={{ color: "var(--text-light)" }}>
                Here&apos;s your shop performance for this month
              </p>
            </div>

            {/* Stats Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1.5rem",
                marginBottom: "2rem",
              }}
            >
              {[
                {
                  label: "Total Sales",
                  value: "$4,230",
                  change: "+12%",
                  icon: "💰",
                },
                {
                  label: "Orders This Month",
                  value: "24",
                  change: "+8%",
                  icon: "📦",
                },
                {
                  label: "Total Revenue",
                  value: "$12,840",
                  change: "+15%",
                  icon: "💵",
                },
                {
                  label: "Avg Rating",
                  value: "4.8/5",
                  change: "⭐",
                  icon: "⭐",
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "white",
                    padding: "1.5rem",
                    borderRadius: "8px",
                    border: "1px solid var(--primary)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {stat.icon}
                  </div>
                  <p
                    style={{
                      color: "var(--text-light)",
                      fontSize: "0.9rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {stat.label}
                  </p>
                  <p
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: "bold",
                      color: "var(--primary-dark)",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p style={{ fontSize: "0.85rem", color: "var(--secondary)" }}>
                    {stat.change}
                  </p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "8px",
                border: "1px solid var(--primary)",
                marginBottom: "2rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  color: "var(--primary-dark)",
                  marginBottom: "1rem",
                }}
              >
                Recent Orders
              </h2>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--primary)" }}>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "1rem",
                        color: "var(--primary-dark)",
                      }}
                    >
                      Order ID
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "1rem",
                        color: "var(--primary-dark)",
                      }}
                    >
                      Customer
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "1rem",
                        color: "var(--primary-dark)",
                      }}
                    >
                      Amount
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "1rem",
                        color: "var(--primary-dark)",
                      }}
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: "1px solid var(--accent)",
                      }}
                    >
                      <td style={{ padding: "1rem" }}>#{10001 + i}</td>
                      <td
                        style={{ padding: "1rem", color: "var(--text-light)" }}
                      >
                        Customer {i}
                      </td>
                      <td style={{ padding: "1rem", fontWeight: "600" }}>
                        ${89 + i * 10}
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <span
                          style={{
                            backgroundColor: "var(--secondary)",
                            color: "var(--primary-dark)",
                            padding: "0.4rem 0.8rem",
                            borderRadius: "4px",
                            fontSize: "0.85rem",
                            fontWeight: "600",
                          }}
                        >
                          {i % 2 === 0 ? "Delivered" : "Processing"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick Actions */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {[
                {
                  label: "Add New Product",
                  icon: "➕",
                  color: "var(--primary)",
                },
                { label: "View Shop", icon: "👁️", color: "var(--secondary)" },
                {
                  label: "Download Report",
                  icon: "📊",
                  color: "var(--primary-dark)",
                },
              ].map((action, idx) => (
                <button
                  key={idx}
                  style={{
                    backgroundColor: action.color,
                    color: "white",
                    padding: "1.5rem",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 16px rgba(0,0,0,0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span>{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
