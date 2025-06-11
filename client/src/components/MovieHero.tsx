
import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MovieHeroProps {
  title: string;
  description: string;
  genre: string;
  rating: string;
  year: string;
  duration: string;
  background: string;
}

const MovieHero = ({ title, description, genre, rating, year, duration, background }: MovieHeroProps) => {
  return (
    <div className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-12">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${background}`}></div>
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-6">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground leading-tight">
            {title}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mb-5 leading-relaxed max-w-lg">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-2.5 rounded-lg transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              <Play className="mr-2 h-4 w-4" />
              Play Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-foreground/30 hover:border-primary hover:bg-primary/10 px-6 py-2.5 rounded-lg transition-all duration-300 backdrop-blur-sm"
            >
              <Info className="mr-2 h-4 w-4" />
              More Info
            </Button>
          </div>

          {/* Meta information */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="bg-accent/80 px-3 py-1 rounded-lg backdrop-blur-sm">{rating}</span>
            <span>{duration}</span>
            <span>{genre}</span>
            <span className="text-primary font-semibold">★ {(8.1 + Math.random() * 1.8).toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent z-10"></div>
    </div>
  );
};

export default MovieHero;
