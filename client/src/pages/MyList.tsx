
import { useState } from "react";
import PremiumNavbar from "@/components/PremiumNavbar";
import PremiumContentRow from "@/components/PremiumContentRow";

const MyList = () => {
  const [watchlist] = useState([
    { id: 1, title: "The Crown", genre: "Drama • Biography", rating: "TV-MA", year: "2022" },
    { id: 2, title: "Stranger Things", genre: "Sci-Fi • Horror", rating: "TV-14", year: "2022" },
    { id: 3, title: "The Witcher", genre: "Fantasy • Adventure", rating: "TV-MA", year: "2023" },
    { id: 4, title: "Dune", genre: "Sci-Fi • Adventure", rating: "PG-13", year: "2021" },
    { id: 5, title: "House of the Dragon", genre: "Fantasy • Drama", rating: "TV-MA", year: "2022" },
  ]);

  const [recentlyWatched] = useState([
    { id: 6, title: "The Last of Us", genre: "Drama • Horror", rating: "TV-MA", year: "2023" },
    { id: 7, title: "Wednesday", genre: "Comedy • Horror", rating: "TV-14", year: "2022" },
    { id: 8, title: "Top Gun: Maverick", genre: "Action • Drama", rating: "PG-13", year: "2022" },
  ]);

  const [favorites] = useState([
    { id: 9, title: "Breaking Bad", genre: "Crime • Drama", rating: "TV-MA", year: "2013" },
    { id: 10, title: "The Dark Knight", genre: "Action • Crime", rating: "PG-13", year: "2008" },
    { id: 11, title: "Interstellar", genre: "Sci-Fi • Drama", rating: "PG-13", year: "2014" },
    { id: 12, title: "Game of Thrones", genre: "Fantasy • Drama", rating: "TV-MA", year: "2019" },
  ]);

  const handleContentAction = (contentId: number, action: string) => {
    console.log(`${action} content with ID: ${contentId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <PremiumNavbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-12 px-6">My List</h1>
          
          {watchlist.length > 0 && (
            <PremiumContentRow 
              title="My Watchlist" 
              movies={watchlist}
              onMoviePlay={(id) => handleContentAction(id, "Play")}
              onMovieAddToList={(id) => handleContentAction(id, "Remove from list")}
              onMovieLike={(id) => handleContentAction(id, "Like")}
              onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
            />
          )}
          
          {recentlyWatched.length > 0 && (
            <PremiumContentRow 
              title="Recently Watched" 
              movies={recentlyWatched}
              onMoviePlay={(id) => handleContentAction(id, "Continue watching")}
              onMovieAddToList={(id) => handleContentAction(id, "Add to list")}
              onMovieLike={(id) => handleContentAction(id, "Like")}
              onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
            />
          )}
          
          {favorites.length > 0 && (
            <PremiumContentRow 
              title="My Favorites" 
              movies={favorites}
              onMoviePlay={(id) => handleContentAction(id, "Play")}
              onMovieAddToList={(id) => handleContentAction(id, "Add to list")}
              onMovieLike={(id) => handleContentAction(id, "Unlike")}
              onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
            />
          )}
          
          {watchlist.length === 0 && recentlyWatched.length === 0 && favorites.length === 0 && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-muted-foreground mb-4">Your list is empty</h2>
              <p className="text-muted-foreground">Start adding movies and shows to build your personal collection</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyList;
