
import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useState } from "react";
import InfoCard from "./InfoCard";

interface MovieCardProps {
  id?: number;
  title: string;
  genre: string;
  rating: string;
  year: string;
  image?: string;
  videoUrl?: string;
}

const MovieCard = ({ id, title, genre, rating, year, videoUrl }: MovieCardProps) => {
  const [, setLocation] = useLocation();
  const [showInfoCard, setShowInfoCard] = useState(false);

  const handlePlay = () => {
    const params = new URLSearchParams({
      videoUrl: videoUrl || '',
      title: title,
      description: `Experience the thrilling journey of ${title}. This ${genre.toLowerCase()} masterpiece delivers exceptional storytelling.`,
      duration: "2h 30m"
    });
    setLocation(`/player?${params.toString()}`);
  };

  const handleMoreInfo = () => {
    setShowInfoCard(true);
  };

  return (
    <>
      <div className="group relative min-w-[280px] h-[157px] bg-card rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10">
        {/* Placeholder image with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent to-secondary"></div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
          {/* Top section */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{genre}</p>
          </div>
          
          {/* Bottom section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="bg-accent px-2 py-1 rounded">{rating}</span>
                <span>{year}</span>
              </div>
              <div className="text-primary text-sm">★ {(8.1 + Math.random() * 1.8).toFixed(1)}</div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={handlePlay} className="bg-primary hover:bg-primary/90 px-4">
                <Play className="mr-1 h-3 w-3" />
                Play
              </Button>
              <Button variant="ghost" size="sm" onClick={handleMoreInfo} className="hover:bg-accent">
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Default content visible when not hovering */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent group-hover:opacity-0 transition-opacity duration-300">
          <h3 className="text-sm font-medium text-foreground">{title}</h3>
        </div>
      </div>

      <InfoCard
        isOpen={showInfoCard}
        onClose={() => setShowInfoCard(false)}
        content={{
          id,
          title,
          genre,
          rating,
          year,
          videoUrl
        }}
      />
    </>
  );
};

export default MovieCard;
