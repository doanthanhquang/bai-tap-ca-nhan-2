import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import type { Movie } from "@/api/types";
import { Star, Heart } from "lucide-react";
import { userApi } from "@/api/user";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
  isFavorite?: boolean;
  onFavoriteChange?: (movieId: string, isFavorite: boolean) => void;
}

const MovieCard = ({
  movie,
  isFavorite: initialIsFavorite,
  onFavoriteChange,
}: MovieCardProps) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite || false);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    setIsFavorite(initialIsFavorite || false);
  }, [initialIsFavorite]);

  const handleClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on the heart icon
    if ((e.target as HTMLElement).closest(".favorite-button")) {
      return;
    }
    navigate(`/movies/${movie.id}`);
  };

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    if (isToggling) return;

    try {
      setIsToggling(true);
      const newFavoriteState = !isFavorite;

      if (newFavoriteState) {
        await userApi.addFavorite(movie.id);
      } else {
        await userApi.removeFavorite(movie.id);
      }

      setIsFavorite(newFavoriteState);
      onFavoriteChange?.(movie.id, newFavoriteState);
    } catch (error) {
      console.error("Error toggling favorite:", error);
      // Optionally show error message
    } finally {
      setIsToggling(false);
    }
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

        {/* Favorite Heart Icon */}
        <button
          className={cn(
            "favorite-button absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-all",
            isFavorite ? "text-red-500" : "text-white",
            isToggling ? "opacity-50 cursor-not-allowed" : ""
          )}
          onClick={handleFavoriteToggle}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={cn("h-5 w-5", isFavorite ? "fill-red-500" : "")} />
        </button>
      </div>

      {/* Movie Info */}
      <div className="p-4 space-y-2">
        {/* Title */}
        <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 line-clamp-2 min-h-[3rem]">
          {movie.title}
        </h3>

        {/* Year & Rating */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">{movie.year}</span>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {movie.rate}
            </span>
          </div>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1">
          {movie.genres &&
            movie.genres.map((genre) => (
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
