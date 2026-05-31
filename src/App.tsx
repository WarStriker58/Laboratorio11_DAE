import { useEffect, useState } from "react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getNowPlayingMovies, type TmdbMovie } from "@/services/api"

const posterBaseUrl = "https://image.tmdb.org/t/p/w500"

function App() {
  const [movies, setMovies] = useState<TmdbMovie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await getNowPlayingMovies()

        console.log(data)
        setMovies(data.results)
      } catch (error) {
        console.error("Error fetching TMDB movies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  return (
    <div className="min-h-screen bg-background px-5 py-8 text-foreground sm:px-8 lg:px-12">
      <main className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="flex flex-col gap-3 border-b border-border pb-8">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Tickets y estrenos
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Cartelera de CineSpoilerS
          </h1>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="animate-pulse bg-card/70 p-0">
                <div className="aspect-[2/3] bg-muted" />
                <CardContent className="space-y-3 p-4">
                  <div className="h-4 rounded bg-muted" />
                  <div className="h-3 w-20 rounded bg-muted" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {movies.map((movie) => (
              <Card
                key={movie.id}
                className="group bg-card/80 p-0 transition duration-300 hover:-translate-y-1 hover:bg-card"
              >
                {movie.poster_path ? (
                  <img
                    src={`${posterBaseUrl}${movie.poster_path}`}
                    alt={`Poster de ${movie.title}`}
                    className="aspect-[2/3] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[2/3] items-center justify-center bg-muted px-6 text-center text-sm text-muted-foreground">
                    Poster no disponible
                  </div>
                )}

                <CardHeader className="px-4">
                  <CardTitle className="line-clamp-2 min-h-12">
                    {movie.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between px-4 pb-4">
                  <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    Puntaje {movie.vote_average.toFixed(1)}
                  </span>
                </CardContent>
              </Card>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}

export default App
