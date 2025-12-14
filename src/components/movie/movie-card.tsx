import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import type { Movie } from "@/api/types";
import { Star } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden group"
      onClick={handleClick}
    >
      {/* Poster Image */}
      <div className="relative w-full aspect-[2/3] overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Movie Info */}
      <div className="p-4 space-y-2">
        {/* Title */}
        <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 line-clamp-2 min-h-[3rem]">
          {movie.title}
        </h3>

        {/* Year & Rating */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            {movie.year}
          </span>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {movie.rate}
            </span>
          </div>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1">
          {movie.genres.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="px-2 py-0.5 text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MovieCard;
