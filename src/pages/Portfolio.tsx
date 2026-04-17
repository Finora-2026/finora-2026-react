import {useEffect} from "react";

export default function Portfolio() {

  useEffect(() => {
    document.title = 'Bellamy Phan | Portfolio'
  }, [])

  return (
    <section>
      <h1>My Portfolio</h1>

      <p>Portfolio content is being rebuilt.</p>

      <p>
        Legacy link:{" "}
        <a
          href="https://bellamyphan.space/"
          target="_blank"
          rel="noopener noreferrer"
        >
          bellamyphan.space
        </a>
      </p>
    </section>
  )
}