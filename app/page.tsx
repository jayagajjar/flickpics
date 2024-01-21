

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string; // Add more fields as needed
  release_date: string;
};

async function getData() {
  const link = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
  const res = await fetch(link)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

function formatDate(inputDate:string) {
  const date = new Date(inputDate);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).replace(/ /g, ' ');
}

export default async function Home() {
  const data = await getData()
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24" >
      <h1 className="text-2xl font-bold">Trending</h1>
      <div className="grid grid-cols-6">
      {data.results.map((movie:Movie) => (
          <div key={movie.id} className="card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={160}
              className="rounded-lg"
            />
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            {/* <p>{movie.overview}</p> */}
            <p className="text-base font-light">{formatDate(movie.release_date)}</p>
          </div>
        ))}

      </div>
    </main>
  );
}
