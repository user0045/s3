
import { useQuery } from "@tanstack/react-query";
import PremiumNavbar from "@/components/PremiumNavbar";
import UpcomingCard from "@/components/UpcomingCard";

interface UpcomingContent {
  id: number;
  title: string;
  genres: string[];
  episodes: number | null;
  releaseDate: string;
  description: string;
  type: "movie" | "tv_show";
  thumbnailUrl: string | null;
  trailerUrl: string | null;
  sectionOrder: number;
}

const Upcoming = () => {
  const { data: upcomingContent = [] } = useQuery({
    queryKey: ['/api/upcoming-content']
  });

  const sortedContent = upcomingContent
    .filter((item: any) => new Date(item.releaseDate) >= new Date())
    .sort((a: any, b: any) => a.sectionOrder - b.sectionOrder);

  return (
    <div className="min-h-screen bg-background">
      <PremiumNavbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <h1 className="text-2xl font-thin uppercase tracking-[0.3em] text-foreground mb-12 font-mono">Coming Soon</h1>
          
          <div className="space-y-6">
            {sortedContent.map((content: any) => (
              <UpcomingCard
                key={content.id}
                title={content.title}
                genre={Array.isArray(content.genres) ? content.genres.join(" • ") : "Drama"}
                releaseDate={new Date(content.releaseDate).toLocaleDateString()}
                description={content.description}
                type={content.type === "tv_show" ? "tv" : "movie"}
                thumbnailUrl={content.thumbnailUrl || undefined}
                trailerUrl={content.trailerUrl || undefined}
              />
            ))}
            
            {sortedContent.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No upcoming content available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
