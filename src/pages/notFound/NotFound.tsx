import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.scss";
import { useEffect } from "react";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Bellamy Phan | Error Page";
  }, []);

  return (
    <div className={styles.container}>
      <h1>404 - Page Not Found</h1>
      <h2>Or this page is under construction</h2>

      <div className={styles.buttonGroup}>

        <button
          className={styles.counter}
          onClick={() => navigate(-1)}
        >
          Previous Page
        </button>

        <button
          className={styles.counter}
          onClick={() => navigate("/")}
        >
          Go Back Home
        </button>

      </div>
    </div>
  );
}