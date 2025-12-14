import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Handle search functionality here
    console.log("Searching for:", searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="w-full bg-blue-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 mt-2 rounded-lg">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex w-full h-14 items-center justify-between gap-4">
          {/* Home Icon */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 hover:bg-white/50 dark:hover:bg-gray-700 bg-white"
            aria-label="Home"
          >
            <Home className="h-6 w-6 text-gray-700" />
          </Button>

          {/* Search Bar */}
          <div className="flex items-center justify-center gap-2 ml-auto">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="h-9 px-4 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <Button
              onClick={handleSearch}
              variant="outline"
              className="h-9 px-6 bg-blue-200 dark:bg-gray-600 hover:bg-blue-300 dark:hover:bg-gray-500 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200"
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
