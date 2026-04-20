import { useEffect, useState } from "react";
import { fetchMovies, type Movie } from "../utils/movieApi";

export default function Movie() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  useEffect(() => {
    document.title = "Finora | Movies";
    
    const loadMovies = async () => {
      setLoading(true);
      setError("");
      
      try {
        const data = await fetchMovies();
        setMovies(data);
      } catch (err) {
        setError("Failed to load movies");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadMovies();
  }, []);
  
  return (
    <div className="container py-4">
      <h1 className="mb-4">Movies</h1>
      
      {loading && <p>Loading movies...</p>}
      {error && <p className="text-danger">{error}</p>}
      
      <div className="row g-3">
        {movies.map((movie) => (
          <div key={movie.imdbId} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm">
              
              <img
                src={movie.poster}
                className="card-img-top"
                alt={movie.title}
                style={{ height: "300px", objectFit: "cover" }}
              />
              
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{movie.title}</h5>
                
                <p className="card-text mb-1">
                  {movie.releaseDate}
                </p>
                
                <p className="card-text text-muted small">
                  {movie.genres?.join(", ")}
                </p>
                
                <a
                  href={movie.trailerLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary mt-auto"
                >
                  Watch Trailer
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}