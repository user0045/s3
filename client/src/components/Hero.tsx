
import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent z-10"></div>
      
      {/* Hero background image placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-emerald-800/10 to-background"></div>
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-4">
        <div className="max-w-2xl animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground">
            The Crown
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            A biographical drama that chronicles the reign of Queen Elizabeth II, from the 1940s to modern times. 
            Experience the political rivalries and romance of the events that shaped the second half of the 20th century.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-md transition-all duration-200 hover:scale-105"
            >
              <Play className="mr-2 h-5 w-5" />
              Play Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-foreground/20 hover:border-primary hover:bg-accent px-8 py-3 rounded-md transition-all duration-200"
            >
              <Info className="mr-2 h-5 w-5" />
              More Info
            </Button>
          </div>

          {/* Meta information */}
          <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground">
            <span className="bg-accent px-3 py-1 rounded">TV-MA</span>
            <span>4 Seasons</span>
            <span>Drama • Biography • History</span>
            <span className="text-primary">★ 8.7</span>
          </div>
        </div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10"></div>
    </div>
  );
};

export default Hero;
