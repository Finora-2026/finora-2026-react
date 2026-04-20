import { BackendConfig } from "../config/BackendConfig";

export type Movie = {
  imdbId: string;
  title: string;
  releaseDate: string;
  trailerLink: string;
  poster: string;
  genres: string[];
};

export const fetchMovies = async (): Promise<Movie[]> => {
  const res = await fetch(`${BackendConfig.springApiUrl}/movies`);
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
};

export const fetchMovieByImdbId = async (imdbId: string): Promise<Movie> => {
  const res = await fetch(`${BackendConfig.springApiUrl}/movies/${imdbId}`);
  if (!res.ok) throw new Error("Failed to fetch movie");
  return res.json();
};