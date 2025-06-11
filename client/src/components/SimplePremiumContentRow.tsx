
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import SimpleMovieCard from "./SimpleMovieCard";

interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: string;
  year: string;
  type?: "movie" | "tv";
}

interface SimplePremiumContentRowProps {
  title: string;
  movies: Movie[];
  contentType?: "movie" | "tv" | "all";
  onMoviePlay?: (id: number) => void;
  onMovieMoreInfo?: (id: number) => void;
  onSeeMore?: () => void;
}

const SimplePremiumContentRow = ({ 
  title, 
  movies, 
  contentType = "all",
  onMoviePlay, 
  onMovieMoreInfo,
  onSeeMore 
}: SimplePremiumContentRowProps) => {
  const [location, setLocation] = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [showSeeMore, setShowSeeMore] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const cardWidth = 290;
  const visibleCards = 4;
  const maxScroll = Math.max(0, (movies.length * cardWidth) - (visibleCards * cardWidth));

  useEffect(() => {
    const updateScrollState = () => {
      setCanScrollLeft(scrollPosition > 0);
      setCanScrollRight(scrollPosition < maxScroll);
      
      const nearEnd = scrollPosition >= maxScroll * 0.7;
      setShowSeeMore(nearEnd && movies.length > visibleCards);
    };

    updateScrollState();
  }, [scrollPosition, maxScroll, movies.length, visibleCards]);

  const scroll = (direction: 'left' | 'right') => {
    const scrollAmount = cardWidth * 2;
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount)
      : Math.min(maxScroll, scrollPosition + scrollAmount);
    
    setScrollPosition(newPosition);
  };

  const handleSeeMore = () => {
    setLocation('/see-more');
    // Store the content data in sessionStorage for the see more page
    sessionStorage.setItem('seeMoreContent', JSON.stringify({
      title,
      movies,
      contentType
    }));
  };

  // Don't render if no movies
  if (movies.length === 0) {
    return null;
  }

  return (
    <div className="mb-12 px-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <div className="flex gap-2 items-center">
          {(showSeeMore || movies.length > visibleCards) && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSeeMore}
              className="hover:bg-primary/20 mr-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              See More
            </Button>
          )}
          {movies.length > visibleCards && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className="hover:bg-primary/20 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className="hover:bg-primary/20 disabled:opacity-50"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
      
      <div className="relative overflow-hidden" ref={scrollContainerRef}>
        <div 
          className="flex gap-4 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${scrollPosition}px)` }}
        >
          {movies.map((movie) => (
            <SimpleMovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              genre={movie.genre}
              rating={movie.rating}
              year={movie.year}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimplePremiumContentRow;
