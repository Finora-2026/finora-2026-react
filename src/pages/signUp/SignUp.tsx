import { useState } from "react";
import { Link } from "react-router-dom";
import { userService } from "../../utils/userService";

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
    <div className="d-flex justify-content-center align-items-start py-5">
      <div
        className="card p-4 shadow-lg rounded-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4 fw-bold text-primary">
          Create Account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-lg rounded-3"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control form-control-lg rounded-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control form-control-lg rounded-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mb-3 btn-lg fw-semibold shadow-sm"
            disabled={loading}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>

          {error && (
            <div className="text-danger text-center mb-2">
              {error}
            </div>
          )}

          {success && (
            <div className="text-success text-center mb-2">
              {success}
            </div>
          )}
        </form>

        <p className="text-center text-muted small mt-3">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-decoration-none fw-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}