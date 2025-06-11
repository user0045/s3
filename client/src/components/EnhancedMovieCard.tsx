
import { Play, Plus, ThumbsUp, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface EnhancedMovieCardProps {
  title: string;
  genre: string;
  rating: string;
  year: string;
  onPlay?: () => void;
  onAddToList?: () => void;
  onLike?: () => void;
  onMoreInfo?: () => void;
}

const EnhancedMovieCard = ({ 
  title, 
  genre, 
  rating, 
  year, 
  onPlay, 
  onAddToList, 
  onLike, 
  onMoreInfo 
}: EnhancedMovieCardProps) => {
  const [, setLocation] = useLocation();

  const handlePlay = () => {
    if (onPlay) {
      onPlay();
    } else {
      setLocation('/player');
    }
  };

  return (
    <div className="group relative min-w-[280px] h-[157px] bg-gradient-to-br from-primary/10 via-accent/20 to-secondary/30 rounded-lg overflow-hidden cursor-pointer transition-all duration-500 hover:scale-110 hover:z-30 hover:shadow-2xl hover:shadow-primary/20">
      {/* Base content always visible */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/95 via-background/60 to-transparent">
        <h3 className="text-sm font-medium text-foreground truncate">{title}</h3>
        <p className="text-xs text-muted-foreground truncate">{genre}</p>
      </div>
      
      {/* Hover overlay - only shows on THIS card hover */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4 border border-primary/20">
        {/* Top section */}
        <div>
          <h3 className="text-base font-semibold text-foreground mb-1 line-clamp-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{genre}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <span className="bg-accent/80 px-2 py-1 rounded text-xs">{rating}</span>
            <span>{year}</span>
            <span className="text-primary font-semibold">★ {(8.1 + Math.random() * 1.8).toFixed(1)}</span>
          </div>
        </div>
        
        {/* Bottom section with controls */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Button 
              size="sm" 
              onClick={handlePlay}
              className="bg-primary hover:bg-primary/90 px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-200 hover:scale-105"
            >
              <Play className="mr-1 h-3 w-3" />
              Play
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onAddToList}
              className="hover:bg-accent p-1.5 rounded-md transition-all duration-200 hover:scale-110"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onLike}
              className="hover:bg-accent p-1.5 rounded-md transition-all duration-200 hover:scale-110"
            >
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onMoreInfo}
              className="hover:bg-accent p-1.5 rounded-md transition-all duration-200 hover:scale-110"
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Premium glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 animate-shimmer"></div>
      </div>
    </div>
  );
};

export default EnhancedMovieCard;
