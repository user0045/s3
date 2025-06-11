
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MovieCard from "./MovieCard";

interface ContentRowProps {
  title: string;
  movies: Array<{
    id?: number;
    title: string;
    genre: string;
    rating: string;
    year: string;
    videoUrl?: string;
  }>;
}

const ContentRow = ({ title, movies }: ContentRowProps) => {
  const scrollLeft = () => {
    const container = document.getElementById(`scroll-${title.replace(/\s+/g, '-')}`);
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById(`scroll-${title.replace(/\s+/g, '-')}`);
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground mb-4 px-4">{title}</h2>
      
      <div className="relative group">
        {/* Left scroll button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        {/* Right scroll button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={scrollRight}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
        
        {/* Scrollable container */}
        <div
          id={`scroll-${title.replace(/\s+/g, '-')}`}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 py-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie, index) => (
            <MovieCard
              key={index}
              id={movie.id}
              title={movie.title}
              genre={movie.genre}
              rating={movie.rating}
              year={movie.year}
              videoUrl={movie.videoUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentRow;
