
import { useState, useEffect } from "react";
import PremiumNavbar from "@/components/PremiumNavbar";
import UpcomingCard from "@/components/UpcomingCard";

interface UpcomingContent {
  id: number;
  title: string;
  genre: string;
  releaseDate: string;
  description: string;
  type: "movie" | "tv";
  thumbnailUrl: string;
  trailerUrl: string;
  sectionOrder: number;
}

const UpcomingContentDisplay = () => {
  const [upcomingContent, setUpcomingContent] = useState<UpcomingContent[]>([]);

  useEffect(() => {
    loadUpcomingContent();
  }, []);

  const loadUpcomingContent = () => {
    const storedContent = JSON.parse(localStorage.getItem("upcomingContent") || "[]");
    const sortedContent = storedContent.sort((a: UpcomingContent, b: UpcomingContent) => a.sectionOrder - b.sectionOrder);
    setUpcomingContent(sortedContent);
  };

  // Fallback content if no admin content exists
  const fallbackContent: UpcomingContent[] = [
    {
      id: 1,
      title: "Avatar 3",
      genre: "Sci-Fi • Adventure",
      releaseDate: "2025-12-20",
      description: "The third installment in James Cameron's epic Avatar saga continues the journey of Jake Sully and his family as they explore new regions of Pandora.",
      type: "movie",
      thumbnailUrl: "",
      trailerUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      sectionOrder: 1
    },
    {
      id: 2,
      title: "Stranger Things Season 5",
      genre: "Sci-Fi • Horror",
      releaseDate: "2025-07-15",
      description: "The final season of the hit Netflix series promises to conclude the epic battle between Hawkins and the Upside Down.",
      type: "tv",
      thumbnailUrl: "",
      trailerUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      sectionOrder: 2
    }
  ];

  const contentToDisplay = upcomingContent.length > 0 ? upcomingContent : fallbackContent;

  return (
    <div className="min-h-screen bg-background">
      <PremiumNavbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-thin uppercase tracking-[0.3em] text-foreground font-mono mb-4">
              Coming Soon
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get ready for the most anticipated movies and TV shows coming to StreamFlix. 
              Don't miss out on the biggest releases of the year.
            </p>
          </div>
          
          <div className="space-y-8">
            {contentToDisplay.map((content) => (
              <UpcomingCard
                key={content.id}
                title={content.title}
                genre={content.genre}
                releaseDate={content.releaseDate}
                description={content.description}
                type={content.type}
                thumbnailUrl={content.thumbnailUrl}
                trailerUrl={content.trailerUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingContentDisplay;
