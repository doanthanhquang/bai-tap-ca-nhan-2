import { useNavigate } from "react-router-dom";
import type { Movie } from "@/api/types";
import { Card } from "@/components/ui/card";

const TopRevenue = (item: Movie) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${item.id}`);
  };

  return (
    <Card
      className="relative w-90 border-0 shadow-none bg-transparent rounded-none p-0 cursor-pointer hover:opacity-90 transition-opacity"
      onClick={handleClick}
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-80">
        <span className="text-2xl font-bold text-white">{item.title}</span>
        <span className="text-2xl text-white">⭐ {item.rate}</span>
        <span className="text-2xl text-white">{item.genres.join(", ")}</span>
      </div>
    </Card>
  );
};

export default TopRevenue;
