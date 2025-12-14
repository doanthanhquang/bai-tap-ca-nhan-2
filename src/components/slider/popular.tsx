import type { Movie } from "@/api/types";
import { Card } from "@/components/ui/card";

const Popular = (item: Movie) => {
  return (
    <Card className="group relative w-full cursor-pointer transition-all duration-300 ease-in-out hover:z-50 hover:scale-120 py-8 border-0 shadow-none bg-transparent">
      {/* Image Container with aspect ratio */}
      <div className="relative w-full aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />

        {/* Information Section - Shows on hover below the image */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/90 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <h3 className="text-white font-bold text-sm mb-1">
            {item.title} {item.year ? `(${item.year})` : ""}
          </h3>
        </div>
      </div>
    </Card>
  );
};

export default Popular;
