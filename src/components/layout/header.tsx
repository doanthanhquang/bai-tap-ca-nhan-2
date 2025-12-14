import { useState, useEffect } from "react";
import { LogOut, Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/theme-context";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    // Check on mount
    checkAuth();

    // Listen for storage changes (e.g., when token is set/removed in other tabs)
    window.addEventListener("storage", checkAuth);

    // Custom event listener for same-tab token changes
    const handleAuthChange = () => checkAuth();
    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  return (
    <header className="w-full bg-gradient-to-r from-rose-100 to-pink-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700 rounded-lg">
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
              className="rounded-md hover:bg-white/50 dark:hover:bg-gray-700 bg-white"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </Button>

            {/* Show Login button when NOT authenticated */}
            {!isAuthenticated && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/login")}
                className="rounded-md hover:bg-white/50 dark:text-black bg-white min-w-20"
                aria-label="Login"
              >
                Login
              </Button>
            )}

            {isAuthenticated && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/profile")}
                  className="rounded-md hover:bg-white/50 dark:hover:bg-gray-700 bg-white"
                  aria-label="Profile"
                >
                  <User className="h-5 w-5 text-gray-700" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="rounded-md hover:bg-white/50 dark:hover:bg-gray-700 bg-white"
                  aria-label="Logout"
                >
                  <LogOut className="h-5 w-5 text-gray-700" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
