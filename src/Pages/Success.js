// frontend/src/Success.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Optional: Simple confetti animation
import Confetti from "react-confetti";

export default function Success() {
  const navigate = useNavigate();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Update dimensions on resize
  useEffect(() => {
    const handleResize = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        color: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {/* Confetti */}
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        numberOfPieces={200}
      />

      {/* Success Card */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "20px",
          padding: "40px 60px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          backdropFilter: "blur(10px)",
          maxWidth: "500px",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>
          🎉 Payment Successful!
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
          Your course access has been activated. Start learning and enjoy your
          journey!
        </p>
        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#33cc8f",
            color: "#fff",
            border: "none",
            padding: "15px 30px",
            borderRadius: "10px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#28a76b")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#33cc8f")}
        >
          Back to Courses
        </button>
      </div>
    </div>
  );
}
