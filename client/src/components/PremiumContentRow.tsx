
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import EnhancedMovieCard from "./EnhancedMovieCard";

interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: string;
  year: string;
}

interface PremiumContentRowProps {
  title: string;
  movies: Movie[];
  onMoviePlay?: (movieId: number) => void;
  onMovieAddToList?: (movieId: number) => void;
  onMovieLike?: (movieId: number) => void;
  onMovieMoreInfo?: (movieId: number) => void;
}

const PremiumContentRow = ({ 
  title, 
  movies, 
  onMoviePlay, 
  onMovieAddToList, 
  onMovieLike, 
  onMovieMoreInfo 
}: PremiumContentRowProps) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const checkScrollButtons = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <div className="mb-16 animate-fade-in">
      <h2 className="text-xl font-bold text-foreground mb-6 px-6">{title}</h2>
      
      <div className="relative group/row">
        {/* Left scroll button */}
        {canScrollLeft && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-background/90 hover:bg-background backdrop-blur-md opacity-0 group-hover/row:opacity-100 transition-all duration-300 shadow-xl border border-primary/20"
            onClick={scrollLeft}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}
        
        {/* Right scroll button */}
        {canScrollRight && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-background/90 hover:bg-background backdrop-blur-md opacity-0 group-hover/row:opacity-100 transition-all duration-300 shadow-xl border border-primary/20"
            onClick={scrollRight}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
        
        {/* Scrollable container */}
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-6 py-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={checkScrollButtons}
        >
          {movies.map((movie) => (
            <EnhancedMovieCard
              key={movie.id}
              title={movie.title}
              genre={movie.genre}
              rating={movie.rating}
              year={movie.year}
              onPlay={() => onMoviePlay?.(movie.id)}
              onAddToList={() => onMovieAddToList?.(movie.id)}
              onLike={() => onMovieLike?.(movie.id)}
              onMoreInfo={() => onMovieMoreInfo?.(movie.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumContentRow;
