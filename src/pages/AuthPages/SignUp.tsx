import { useState } from "react";
import { Link } from "react-router-dom";
import { userService } from "../../utils/userService.ts";
import styles from "./SignUp.module.scss";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await userService({
        name,
        email,
        password,
      });

      setSuccess(`User created: ${result.email}`);
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Failed to create account: " + err);
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
            {loading ? "Creating..." : "Sign Up"}
          </button>

          {error && <div className={styles.error}>{error}</div>}
          {success && <div className={styles.success}>{success}</div>}
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