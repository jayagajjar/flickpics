
type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string; // Add more fields as needed
};

async function getData() {
  const link = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
  const res = await fetch(link)
  console.log('res',res)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Home() {
  const data = await getData()
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl font-bold">Popular Movies</h1>
      <div className="grid grid-cols-3 gap-4">
      {data.results.map((movie:Movie) => (
          <div key={movie.id} className="card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={750}
            />
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p>{movie.overview}</p>
          </div>
        ))}

      </div>
    </main>
  );
}
