import axios from "axios"

const tmdbToken = import.meta.env.VITE_TMDB_TOKEN

export interface TmdbMovie {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
}

export interface TmdbMoviesResponse {
  page: number
  results: TmdbMovie[]
  total_pages: number
  total_results: number
}

export const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${tmdbToken}`,
    "Content-Type": "application/json",
  },
})

export async function getNowPlayingMovies() {
  const { data } = await tmdbApi.get<TmdbMoviesResponse>("/movie/now_playing", {
    params: {
      language: "es-PE",
      page: 1,
    },
  })

  return data
}
