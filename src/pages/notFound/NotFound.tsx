import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.scss";
import {useEffect} from "react";

export default function NotFound() {

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Bellamy Phan | Error Page'
  }, [])

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