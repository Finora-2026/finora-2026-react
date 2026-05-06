import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.scss";

export default function NotFound() {

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>404 - Page Not Found</h1>

      <button
        className={styles.counter}
        onClick={() => navigate("/")}
        style={{ marginTop: "20px" }}
      >
        Go Back Home
      </button>
    </div>
  );
}