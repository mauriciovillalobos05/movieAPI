import { useState } from 'react'
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async () => {
    if (!query) return

    setLoading(true)
    setError(null)
    setMovies([])

    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=37f7c2c9&s=${encodeURIComponent(query)}`)
      const data = await res.json()

      if (data.Response === 'True') {
        setMovies(data.Search)
      } else {
        setError(data.Error)
      }
    } catch (err) {
      setError('Error al cargar las películas.')
    } finally {
      setLoading(false)
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault() // evita recarga
    handleSearch()
  }

  return (
    <div>
      <header>
        <h1>Buscador de Películas</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            placeholder="Escribe el nombre de la película"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </header>

      <main>
        {loading && <div></div>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div>
          {movies.map((movie) => (
            <div key={movie.imdbID}>
              <img src={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.jpg'} alt={movie.Title} />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App