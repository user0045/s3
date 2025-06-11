import { useState, useEffect, useRef } from "react";
import { Search, Menu, X, Home, Play, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "wouter";

const PremiumNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [, setLocation] = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Movies", path: "/movies", icon: Play },
    { name: "TV Shows", path: "/tv-shows", icon: Play },
    { name: "Upcoming", path: "/upcoming", icon: Calendar },
  ];

  // Sample content for search
  const allContent = [
    { title: "Dune: Part Two", type: "movie", genre: "Sci-Fi", path: "/movies" },
    { title: "The Batman", type: "movie", genre: "Action", path: "/movies" },
    { title: "Spider-Man: No Way Home", type: "movie", genre: "Action", path: "/movies" },
    { title: "House of the Dragon", type: "tv", genre: "Fantasy", path: "/tv-shows" },
    { title: "The Witcher", type: "tv", genre: "Fantasy", path: "/tv-shows" },
    { title: "Stranger Things", type: "tv", genre: "Sci-Fi", path: "/tv-shows" },
    { title: "Avatar: The Way of Water Extended", type: "upcoming", genre: "Sci-Fi", path: "/upcoming" },
    { title: "Dune: Part Three", type: "upcoming", genre: "Sci-Fi", path: "/upcoming" },
  ];

  // Handle search
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = allContent.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 5)); // Limit to 5 results
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Handle click outside search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  const handleSearchResultClick = (result: any) => {
    setLocation(result.path);
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-primary/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-10">
            <Link href="/">
              <h1 className="text-3xl font-bold text-primary animate-glow cursor-pointer bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                StreamFlix
              </h1>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-8">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link key={item.name} href={item.path}>
                    <div className="flex items-center gap-2 text-foreground hover:text-primary transition-all duration-300 relative group px-3 py-2 rounded-lg hover:bg-primary/10">
                      <IconComponent className="h-4 w-4" />
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right side controls */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-primary/20 transition-all duration-300"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>
              {isSearchOpen && (
                <div className="absolute right-0 top-12 w-96 bg-background/95 backdrop-blur-xl border border-primary/20 rounded-xl shadow-2xl animate-fade-in">
                  <div className="p-4">
                    <input
                      type="text"
                      placeholder="Search movies, shows..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-3 bg-accent/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      autoFocus
                    />
                  </div>
                  
                  {searchResults.length > 0 && (
                    <div className="border-t border-border max-h-64 overflow-y-auto">
                      {searchResults.map((result, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearchResultClick(result)}
                          className="w-full px-4 py-3 text-left hover:bg-accent/50 transition-colors border-b border-border/50 last:border-b-0"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-foreground">{result.title}</p>
                              <p className="text-sm text-muted-foreground">{result.genre} • {result.type}</p>
                            </div>
                            <Play className="h-4 w-4 text-primary" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {searchQuery.trim() && searchResults.length === 0 && (
                    <div className="p-4 border-t border-border">
                      <p className="text-muted-foreground text-center">No results found</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-primary/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-primary/20 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link key={item.name} href={item.path}>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 text-foreground hover:text-primary transition-all duration-300 py-3 px-2 rounded-lg hover:bg-primary/10 w-full text-left"
                    >
                      <IconComponent className="h-5 w-5" />
                      {item.name}
                    </button>
                  </Link>
                );
              })}
              
              <div className="flex items-center space-x-4 pt-4 border-t border-primary/20">
                <Button variant="ghost" size="icon" className="hover:bg-primary/20">
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PremiumNavbar;
