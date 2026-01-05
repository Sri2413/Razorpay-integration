import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Failure() {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #1f1f1f, #000)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "40px",
          borderRadius: "16px",
          width: "360px",
          textAlign: "center",
          boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
          transform: animate ? "scale(1)" : "scale(0.85)",
          opacity: animate ? 1 : 0,
          transition: "all 0.5s ease",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "64px",
            height: "64px",
            margin: "0 auto 16px",
            borderRadius: "50%",
            background: "#ff4d4f",
            color: "#fff",
            fontSize: "32px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✕
        </div>

        <h1 style={{ marginBottom: "10px", color: "#222" }}>
          Payment Failed
        </h1>

        <p
          style={{
            fontSize: "14px",
            color: "#555",
            lineHeight: "1.6",
            marginBottom: "24px",
          }}
        >
          Unfortunately, your payment could not be completed.
          <br />
          Please try again or use a different payment method.
        </p>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: "#f1f1f1",
              color: "#333",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Go Home
          </button>

          <button
            onClick={() => navigate("/cart")}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: "#ff4d4f",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
