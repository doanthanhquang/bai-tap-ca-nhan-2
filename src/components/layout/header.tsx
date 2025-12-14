import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/theme-context";

export function Header() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="w-full bg-gradient-to-r from-rose-100 to-pink-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Title */}
          <div className="text-lg text-gray-500 dark:text-gray-400 hidden sm:inline font-bold">
            18120525
          </div>

          {/* Center - Title */}
          <div className="flex items-center">
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Movies info
            </p>
          </div>

          {/* Right side - Icons */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:bg-white/50 dark:hover:bg-gray-700 bg-white"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
