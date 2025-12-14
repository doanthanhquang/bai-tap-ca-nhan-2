import { useNavigate } from "react-router-dom";
import type { MovieDetail } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

interface MovieDetailViewProps {
  movie: MovieDetail;
}

const MovieDetailView = ({ movie }: MovieDetailViewProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      {/* Hero Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Movie Poster - Hình ảnh */}
        <div className="col-span-1 max-sm:flex max-sm:justify-center">
          <img
            src={movie.image}
            alt={movie.title}
            className="max-sm:w-50 rounded-lg shadow-xl"
          />
        </div>

        {/* Movie Info */}
        <div className="col-span-2 space-y-6">
          {/* Tiêu đề */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              {movie.title}
            </h1>
          </div>

          {/* Năm sản xuất */}
          <div>
            <span className="text-lg text-gray-600 dark:text-gray-400">
              Năm sản xuất:{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {movie.year}
              </span>
            </span>
          </div>

          {/* Thể loại */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Thể loại
            </h2>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Tóm tắt */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Tóm tắt
            </h2>
            <div
              className="text-gray-700 dark:text-gray-300 
                leading-relaxed prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: movie.plot_full }}
            />
          </div>
        </div>
      </div>

      {/* Đạo diễn */}
      {movie.directors && movie.directors.length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Đạo diễn
          </h2>
          <div className="flex gap-4">
            {movie.directors.map((director) => (
              <div key={director.id} className="text-center">
                <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                  {director.name}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Diễn viên */}
      {movie.actors && movie.actors.length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Diễn viên
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movie.actors.map((actor) => (
              <div key={actor.id} className="text-center">
                <img
                  src={actor.image}
                  alt={actor.name}
                  className="w-full aspect-square object-cover rounded-lg mb-2"
                />
                <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                  {actor.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {actor.character}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default MovieDetailView;
