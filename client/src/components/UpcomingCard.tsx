
import { Calendar, Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useLocation } from "wouter";
import InfoCard from "./InfoCard";

interface UpcomingCardProps {
  title: string;
  genre: string;
  releaseDate: string;
  description: string;
  type: "movie" | "tv";
  thumbnailUrl?: string;
  trailerUrl?: string;
}

const UpcomingCard = ({
  title,
  genre,
  releaseDate,
  description,
  type,
  thumbnailUrl,
  trailerUrl
}: UpcomingCardProps) => {
  const [showInfoCard, setShowInfoCard] = useState(false);
  const [location, setLocation] = useLocation();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilRelease = (dateString: string) => {
    const releaseDate = new Date(dateString);
    const today = new Date();
    const diffTime = releaseDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleTrailer = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Trailer button clicked for:", title);
    setLocation('/player');
    // Store the content data in sessionStorage for the player page
    sessionStorage.setItem('playerContent', JSON.stringify({
      videoUrl: trailerUrl || "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      title: `${title} - Trailer`,
      description: `Official trailer for ${title}. ${description}`,
      duration: "2h 30m"
    }));
  };

  const handleMoreInfo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("More Info button clicked for:", title);
    setShowInfoCard(true);
  };

  const releaseYear = new Date(releaseDate).getFullYear().toString();

  return (
    <>
      <div className="group relative bg-gradient-to-r from-green-950/40 to-green-900/20 rounded-lg overflow-hidden border border-green-800/30 hover:border-green-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20">
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-shimmer"></div>
        
        <div className="flex">
          {/* Thumbnail - Left 1/3 */}
          <div className="w-1/3 h-48 bg-gradient-to-br from-green-800/50 to-green-900/50 flex items-center justify-center relative overflow-hidden">
            {thumbnailUrl ? (
              <img 
                src={thumbnailUrl} 
                alt={title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`absolute inset-0 bg-gradient-to-t from-green-950/80 to-transparent flex items-center justify-center ${thumbnailUrl ? 'hidden' : ''}`}>
              <div className="text-green-400 z-10">
                <Play className="h-12 w-12" />
              </div>
            </div>
            <Badge 
              variant="secondary" 
              className="absolute top-3 left-3 bg-green-800/80 text-green-100 hover:bg-green-700/80"
            >
              {type === "movie" ? "Movie" : "TV Show"}
            </Badge>
          </div>
          
          {/* Content - Right 2/3 */}
          <div className="w-2/3 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-2xl font-bold text-green-100 group-hover:text-green-300 transition-colors duration-300">
                  {title}
                </h3>
              </div>
              
              <p className="text-green-300/80 text-sm mb-3">{genre}</p>
              
              <div className="flex items-center gap-2 mb-4 text-green-400">
                <Calendar className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {formatDate(releaseDate)}
                </span>
                <span className="text-green-300/60 text-xs">
                  ({getDaysUntilRelease(releaseDate)} days left)
                </span>
              </div>
              
              <p className="text-green-100/80 text-sm leading-relaxed mb-4">
                {description}
              </p>
            </div>
            
            <div className="flex gap-3 relative z-10">
              <Button 
                type="button"
                size="sm" 
                onClick={handleTrailer}
                className="bg-green-700 hover:bg-green-600 text-white border-0 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 cursor-pointer relative z-20"
              >
                <Play className="h-4 w-4 mr-2" />
                Trailer
              </Button>
              <Button 
                type="button"
                variant="outline" 
                size="sm"
                onClick={handleMoreInfo}
                className="border-green-600 text-green-400 hover:bg-green-800/50 hover:text-green-300 hover:border-green-500 transition-all duration-300 cursor-pointer relative z-20"
              >
                <Info className="h-4 w-4 mr-2" />
                More Info
              </Button>
            </div>
          </div>
        </div>
      </div>

      <InfoCard
        isOpen={showInfoCard}
        onClose={() => setShowInfoCard(false)}
        content={{
          title,
          genre,
          rating: type === "movie" ? "PG-13" : "TV-MA",
          year: releaseYear,
          description,
          thumbnailUrl,
          videoUrl: trailerUrl || "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        }}
      />
    </>
  );
};

export default UpcomingCard;
