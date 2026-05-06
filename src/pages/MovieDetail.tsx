import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieByImdbId, type Movie } from "../utils/movieApi";
import { useNavigate } from "react-router-dom";

export default function MovieDetail() {
  const { imdbId } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!imdbId) return;

    const loadMovie = async () => {
      setLoading(true);
      try {
        const data = await fetchMovieByImdbId(imdbId);
        setMovie(data);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [imdbId]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${movie.poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.7)",
          minHeight: "100vh",
          color: "white",
          padding: "40px",
        }}
      >
        <h1 className="text-white">{movie.title}</h1>
        <p className="text-white">{movie.releaseDate}</p>
        <p className="text-white">{movie.genres.join(", ")}</p>

        <div className="mt-3 d-flex gap-2 justify-content-center">
          <a
            href={movie.trailerLink}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Watch Trailer
          </a>

          <button
            className="btn btn-secondary"
            onClick={() => navigate("/movies")}
          >
            Back to Movies
          </button>
        </div>
      </div>
    </div>
  );
}