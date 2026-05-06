import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

import {BackendConfig} from "../config/BackendConfig.ts";

export default function FinoraLogin() {

  useEffect(() => {
    document.title = 'Bellamy Phan | Finora Login'
  }, [])

  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [dbStatus, setDbStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testBackend = async () => {
    setLoading(true)
    setDbStatus('')

    try {
      const res = await fetch(`${BackendConfig.springApiUrl}/test-db`)
      const text = await res.text()
      setDbStatus(text)
    } catch (err) {
      console.error(err)
      setDbStatus('Error connecting to backend')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section>
        <h1>Finora App</h1>
        <p>Login page - Will coming soon</p>
      </section>

      <section id="center">

        <button
          className="counter"
          onClick={() => navigate("/sign-up")}
        >
          Go to Sign Up
        </button>

        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>

        <button
          className="counter"
          onClick={testBackend}
          disabled={loading}
        >
          {loading ? 'Testing backend...' : 'Test Backend API'}
        </button>

        {dbStatus && (
          <p style={{ marginTop: '12px' }}>
            {dbStatus}
          </p>
        )}
      </section>
    </>
  )
}