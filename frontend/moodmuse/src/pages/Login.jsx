import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Email/password login/signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const url = isLogin ? "http://localhost:5050/api/login" : "http://localhost:5050/api/signup";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);

        const userData = isLogin
          ? data.user
          : { name: formData.name, email: formData.email };

        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

        if (isLogin) {
          navigate("/"); // ✅ redirect after login
        } else {
          setIsLogin(true); // after signup, go back to login
        }
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const response = await fetch("http://localhost:5050/api/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      if (response.ok) {
        const userData = { name: data.name, email: data.email };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setMessage(data.message);

        navigate("/"); // ✅ redirect after Google login
      } else {
        setMessage(data.message || "Google login failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error connecting to server");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {isLogin && (
          <div style={{ margin: "20px 0" }}>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => setMessage("Google login failed")}
            />
          </div>
        )}

        {message && <p className="message">{message}</p>}

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
