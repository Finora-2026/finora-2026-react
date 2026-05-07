import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userService } from "../../utils/userService.ts";
import { authService } from "../../utils/authService.ts";
import { useToast } from "../../components/ToastProvider/ToastProvider.tsx";
import styles from "./AuthPage.module.scss";

export default function SignUp() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      // 1. Create account
      await userService({ name, email, password });

      // 2. Auto login
      const loginRes = await authService.login({ email, password });

      if (loginRes.success) {
        window.dispatchEvent(new Event("auth-change"));

        showToast(
          "Account created! Signing you in...",
          "success"
        );

        // 3. Redirect after toast delay
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 5000);

      } else {
        showToast("Account created but login failed", "error");
      }

    } catch (err) {
      setError("Failed to create account: " + err);

      showToast(
        "Something went wrong during signup",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Create Account</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <input
              className={styles.input}
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          {error && <div className={styles.error}>{error}</div>}
        </form>

        <p className={styles.footer}>
          Already have an account?{" "}
          <Link to="/sign-in" className={styles.link}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}