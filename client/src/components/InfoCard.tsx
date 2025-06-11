
import { X, Play, Calendar, Star, User, Clapperboard, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { createPortal } from "react-dom";

interface InfoCardProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    id?: number;
    title: string;
    genre: string;
    rating: string;
    year: string;
    description?: string;
    duration?: string;
    thumbnailUrl?: string;
    director?: string;
    writer?: string;
    cast?: string[];
    videoUrl?: string;
  };
}

const InfoCard = ({ isOpen, onClose, content }: InfoCardProps) => {
  const [location, setLocation] = useLocation();

  if (!isOpen) return null;

  const randomRating = (8.1 + Math.random() * 1.8).toFixed(1);
  const randomDescription = content.description || `Experience the thrilling journey of ${content.title}. This ${content.genre.toLowerCase()} masterpiece delivers exceptional storytelling and unforgettable moments that will keep you on the edge of your seat.`;
  const randomDirector = content.director || "Christopher Nolan";
  const randomWriter = content.writer || "Jonathan Nolan";
  const randomCast = content.cast || ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"];

  const handlePlay = () => {
    setLocation('/player');
    // Store the content data in sessionStorage for the player page
    sessionStorage.setItem('playerContent', JSON.stringify({
      videoUrl: content.videoUrl, 
      title: content.title,
      description: randomDescription,
      duration: content.duration || "2h 30m"
    }));
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-background/98 backdrop-blur-md rounded-xl border border-primary/20 overflow-hidden animate-scale-in shadow-2xl">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 hover:bg-background/80 rounded-full bg-background/60 backdrop-blur-sm"
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Scrollable content */}
        <div className="max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            {/* Header with basic info */}
            <div className="mb-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">{content.title}</h2>
              
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <Badge variant="secondary" className="bg-accent/80 text-foreground">
                  {content.rating}
                </Badge>
                <span className="text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {content.year}
                </span>
                {content.duration && (
                  <span className="text-muted-foreground">{content.duration}</span>
                )}
                <span className="text-primary font-semibold flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current" />
                  {randomRating}
                </span>
              </div>

              <p className="text-primary/80 text-lg mb-6 font-medium">{content.genre}</p>

              {/* Action button - only Play Now */}
              <div className="flex gap-4 mb-6">
                <Button 
                  size="lg"
                  onClick={handlePlay}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Play Now
                </Button>
              </div>
            </div>

            {/* Detailed information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Overview</h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {randomDescription}
                </p>
              </div>

              {/* Director */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clapperboard className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-foreground">Director</h4>
                </div>
                <p className="text-muted-foreground ml-6">{randomDirector}</p>
              </div>

              {/* Writer */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-foreground">Writer</h4>
                </div>
                <p className="text-muted-foreground ml-6">{randomWriter}</p>
              </div>

              {/* Cast */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-foreground">Cast</h4>
                </div>
                <div className="ml-6 flex flex-wrap gap-2">
                  {randomCast.map((actor, index) => (
                    <Badge key={index} variant="outline" className="bg-secondary/50">
                      {actor}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Use createPortal to render the modal at the document body level
  return createPortal(modalContent, document.body);
};

export default InfoCard;
