import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../utils/authService.ts";
import styles from "./AuthPage.module.scss";

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const res = await authService.login({ email, password });

      if (res.success) {
        window.dispatchEvent(new Event("auth-change"));
        navigate("/");
      } else {
        setError("Login failed");
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Welcome Back</h2>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.field}>
            <input
              type="email"
              className={styles.input}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <input
              type="password"
              className={styles.input}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <div className={styles.error}>{error}</div>}
        </form>

        <div className={styles.linksRow}>
          <Link to="/login-otp-request" className={styles.link}>
            Login with Email OTP
          </Link>

          <Link to="/forgot-password" className={styles.link}>
            Forgot password?
          </Link>
        </div>

        <p className={styles.footer}>
          Don't have an account?{" "}
          <Link to="/sign-up" className={styles.link}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}