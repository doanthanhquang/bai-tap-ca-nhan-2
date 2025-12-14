import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import type { PersonMovie } from "@/api/types";

interface PersonMoviesProps {
  movies: (PersonMovie & { roles: string[] })[];
}

const PersonMovies = ({ movies }: PersonMoviesProps) => {
  const navigate = useNavigate();

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Known For ({movies.length}{" "}
        {movies.length === 1 ? "movie" : "movies"})
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
            onClick={() => navigate(`/movies/${movie.id}`)}
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full aspect-[2/3] object-cover"
            />
            <div className="p-3">
              <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 line-clamp-2 min-h-[2.5rem]">
                {movie.title}
              </h3>
              <div className="mt-2 space-y-1">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {movie.year}
                </div>
                <div className="flex flex-wrap gap-1">
                  {movie.roles.map((role) => (
                    <span
                      key={role}
                      className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PersonMovies;
