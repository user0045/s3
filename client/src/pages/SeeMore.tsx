
import { useLocation, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PremiumNavbar from "@/components/PremiumNavbar";
import SimpleMovieCard from "@/components/SimpleMovieCard";

interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: string;
  year: string;
  type?: "movie" | "tv";
}

const SeeMore = () => {
  const [, setLocation] = useLocation();
  
  // Parse query parameters from URL
  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get('title') || "";
  const contentType = urlParams.get('type') || "all";
  const movies: any[] = []; // Will be fetched from API

  // Get content from admin uploads if movies array is empty
  const getContentFromAdmin = (): Movie[] => {
    const storedContent = JSON.parse(localStorage.getItem("contentLibrary") || "[]");
    return storedContent.map((item: any) => ({
      id: item.id,
      title: item.title,
      genre: item.genre,
      rating: item.rating,
      year: item.uploadDate ? new Date(item.uploadDate).getFullYear().toString() : "2024",
      type: item.type === "Movie" ? "movie" as const : "tv" as const
    })).filter((item: Movie) => item.title);
  };

  const contentToUse = movies.length > 0 ? movies : getContentFromAdmin();

  // Filter movies based on content type
  const filteredMovies = contentType === "all" 
    ? contentToUse 
    : contentToUse.filter((movie: Movie) => {
        if (!movie.type) {
          const isMovie = (movie.id >= 1 && movie.id <= 6) || 
                          (movie.id >= 13 && movie.id <= 18) || 
                          (movie.id >= 24 && movie.id <= 35) ||
                          (movie.id >= 36 && movie.id <= 45);
          return contentType === "movie" ? isMovie : !isMovie;
        }
        return movie.type === contentType;
      });

  const handleMovieAction = (movieId: number, action: string) => {
    console.log(`${action} movie with ID: ${movieId}`);
  };

  const formatTitle = (text: string) => {
    return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const getDisplayTitle = () => {
    let displayTitle = formatTitle(title);
    if (contentType === "movie") {
      displayTitle += " - Movies";
    } else if (contentType === "tv") {
      displayTitle += " - TV Shows";
    }
    return displayTitle;
  };

  return (
    <div className="min-h-screen bg-background">
      <PremiumNavbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/")}
              className="hover:bg-primary/20"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-thin uppercase tracking-[0.3em] text-foreground font-mono">
              {getDisplayTitle()}
            </h1>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMovies.map((movie: Movie) => (
              <SimpleMovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                genre={movie.genre}
                rating={movie.rating}
                year={movie.year}
                onPlay={() => handleMovieAction(movie.id, "Play")}
                onMoreInfo={() => handleMovieAction(movie.id, "More info")}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeMore;
