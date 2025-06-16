import React, { useState, useEffect } from "react";

function Header() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div
      style={{
        width: "100%",
        background: "#1976d2",
        color: "white",
        padding: "16px 0",
        textAlign: "center",
        fontSize: "1.2rem",
        fontWeight: "bold",
        marginBottom: 32,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      {now.toLocaleDateString()} {now.toLocaleTimeString()}
    </div>
  );
}

export default Header;