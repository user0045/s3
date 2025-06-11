import { useState, useEffect } from "react";
import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import InfoCard from "./InfoCard";

interface HeroContent {
  id: number;
  title: string;
  description: string;
  genre: string;
  rating: string;
  year: string;
  duration: string;
  background: string;
}

const HeroSlider = () => {
  const [location, setLocation] = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showInfoCard, setShowInfoCard] = useState(false);

  const allHeroContents: HeroContent[] = [
    {
      id: 1,
      title: "The Crown",
      description: "A biographical drama that chronicles the reign of Queen Elizabeth II, from the 1940s to modern times. Experience the political rivalries and romance of the events that shaped the second half of the 20th century.",
      genre: "Drama • Biography • History",
      rating: "TV-MA",
      year: "2022",
      duration: "4 Seasons",
      background: "from-emerald-900/40 via-green-800/20 to-background"
    },
    {
      id: 2,
      title: "Stranger Things",
      description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
      genre: "Sci-Fi • Horror • Drama",
      rating: "TV-14",
      year: "2023",
      duration: "4 Seasons",
      background: "from-red-900/40 via-orange-800/20 to-background"
    },
    {
      id: 3,
      title: "The Witcher",
      description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
      genre: "Fantasy • Adventure • Action",
      rating: "TV-MA",
      year: "2023",
      duration: "3 Seasons",
      background: "from-purple-900/40 via-indigo-800/20 to-background"
    },
    {
      id: 4,
      title: "Money Heist",
      description: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
      genre: "Crime • Thriller • Drama",
      rating: "TV-MA",
      year: "2021",
      duration: "5 Seasons",
      background: "from-yellow-900/40 via-amber-800/20 to-background"
    },
    {
      id: 5,
      title: "Dark",
      description: "A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families.",
      genre: "Sci-Fi • Mystery • Thriller",
      rating: "TV-MA",
      year: "2020",
      duration: "3 Seasons",
      background: "from-gray-900/40 via-slate-800/20 to-background"
    },
    {
      id: 6,
      title: "Oppenheimer",
      description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
      genre: "Biography • Drama • History",
      rating: "R",
      year: "2023",
      duration: "3h 0m",
      background: "from-orange-900/40 via-red-800/20 to-background"
    },
    {
      id: 7,
      title: "Dune",
      description: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe.",
      genre: "Sci-Fi • Adventure • Drama",
      rating: "PG-13",
      year: "2021",
      duration: "2h 35m",
      background: "from-blue-900/40 via-cyan-800/20 to-background"
    }
  ];

  // Determine how many slides to show based on current page
  const isHomePage = location === '/';
  const heroContents = isHomePage ? allHeroContents : allHeroContents.slice(0, 5);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroContents.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroContents.length) % heroContents.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [heroContents.length]);

  const currentContent = heroContents[currentSlide];

  const handlePlay = () => {
    setLocation('/player');
    // Store the content data in sessionStorage for the player page
    sessionStorage.setItem('playerContent', JSON.stringify({
      title: currentContent.title,
      description: currentContent.description,
      duration: currentContent.duration
    }));
  };

  const handleMoreInfo = () => {
    setShowInfoCard(true);
  };

  return (
    <>
      <div className="relative h-[75vh] flex items-center justify-center overflow-hidden mb-16">
        {/* Background gradient with smooth transitions */}
        <div className={`absolute inset-0 bg-gradient-to-r ${currentContent.background} transition-all duration-1000 ease-in-out`}></div>
        
        {/* Navigation arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-background/10 hover:bg-background/20 backdrop-blur-sm transition-all duration-300"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-background/10 hover:bg-background/20 backdrop-blur-sm transition-all duration-300"
          onClick={nextSlide}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-6">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground leading-tight">
              {currentContent.title}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed max-w-xl">
              {currentContent.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button 
                size="lg" 
                onClick={handlePlay}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-2xl"
              >
                <Play className="mr-2 h-5 w-5" />
                Play Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleMoreInfo}
                className="border-2 border-foreground/30 hover:border-primary hover:bg-primary/10 px-8 py-3 rounded-lg transition-all duration-300 backdrop-blur-sm"
              >
                <Info className="mr-2 h-5 w-5" />
                More Info
              </Button>
            </div>

            {/* Meta information */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="bg-accent/80 px-3 py-1 rounded-lg backdrop-blur-sm">{currentContent.rating}</span>
              <span>{currentContent.duration}</span>
              <span>{currentContent.genre}</span>
              <span className="text-primary font-semibold">★ {(8.1 + Math.random() * 1.8).toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {heroContents.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "bg-primary shadow-lg shadow-primary/50" 
                  : "bg-foreground/30 hover:bg-foreground/50"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
        
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent z-10"></div>
      </div>

      <InfoCard
        isOpen={showInfoCard}
        onClose={() => setShowInfoCard(false)}
        content={{
          title: currentContent.title,
          genre: currentContent.genre,
          rating: currentContent.rating,
          year: currentContent.year,
          description: currentContent.description,
          duration: currentContent.duration
        }}
      />
    </>
  );
};

export default HeroSlider;
