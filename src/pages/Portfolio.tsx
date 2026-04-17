import {useEffect} from "react";

export default function Portfolio() {

  useEffect(() => {
    document.title = 'Bellamy Phan | Portfolio'
  }, [])

  return (
    <section>
      <h1>My Portfolio</h1>
      <p>Projects will go here</p>
    </section>
  )
}