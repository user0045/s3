
import PremiumNavbar from "@/components/PremiumNavbar";
import SimplePremiumContentRow from "@/components/SimplePremiumContentRow";
import HeroSlider from "@/components/HeroSlider";

const TVShows = () => {
  // All TV show content
  const allTVShows = [
    {
      id: 19,
      title: "The Bear Season 3",
      genre: "Comedy • Drama",
      rating: "TV-MA",
      year: "2023"
    }, {
      id: 20,
      title: "House of the Dragon S2",
      genre: "Fantasy • Drama",
      rating: "TV-MA",
      year: "2024"
    }, {
      id: 21,
      title: "Wednesday Season 2",
      genre: "Comedy • Horror",
      rating: "TV-14",
      year: "2024"
    }, {
      id: 22,
      title: "Stranger Things S5",
      genre: "Sci-Fi • Horror",
      rating: "TV-14",
      year: "2024"
    }, {
      id: 23,
      title: "The Last of Us S2",
      genre: "Drama • Horror",
      rating: "TV-MA",
      year: "2024"
    }, {
      id: 7,
      title: "The Last of Us",
      genre: "Drama • Horror",
      rating: "TV-MA",
      year: "2023"
    }, {
      id: 8,
      title: "Wednesday",
      genre: "Comedy • Horror",
      rating: "TV-14",
      year: "2022"
    }, {
      id: 9,
      title: "House of the Dragon",
      genre: "Fantasy • Drama",
      rating: "TV-MA",
      year: "2022"
    }, {
      id: 10,
      title: "Stranger Things",
      genre: "Sci-Fi • Horror",
      rating: "TV-14",
      year: "2022"
    }, {
      id: 11,
      title: "The Bear",
      genre: "Comedy • Drama",
      rating: "TV-MA",
      year: "2022"
    }, {
      id: 12,
      title: "Euphoria",
      genre: "Drama",
      rating: "TV-MA",
      year: "2022"
    }, {
      id: 36,
      title: "Ted Lasso",
      genre: "Comedy • Sport",
      rating: "TV-MA",
      year: "2023"
    }, {
      id: 37,
      title: "Abbott Elementary",
      genre: "Comedy",
      rating: "TV-14",
      year: "2023"
    }, {
      id: 38,
      title: "Breaking Bad",
      genre: "Crime • Drama",
      rating: "TV-MA",
      year: "2013"
    }, {
      id: 39,
      title: "True Detective",
      genre: "Crime • Mystery",
      rating: "TV-MA",
      year: "2023"
    }, {
      id: 40,
      title: "The Haunting of Hill House",
      genre: "Horror • Drama",
      rating: "TV-MA",
      year: "2022"
    }, {
      id: 41,
      title: "Mindhunter",
      genre: "Crime • Thriller",
      rating: "TV-MA",
      year: "2019"
    }, {
      id: 42,
      title: "Ozark",
      genre: "Crime • Drama",
      rating: "TV-MA",
      year: "2022"
    }, {
      id: 43,
      title: "Better Call Saul",
      genre: "Crime • Drama",
      rating: "TV-MA",
      year: "2022"
    }, {
      id: 44,
      title: "The Crown",
      genre: "Drama • Biography",
      rating: "TV-MA",
      year: "2023"
    }, {
      id: 45,
      title: "Succession",
      genre: "Drama • Comedy",
      rating: "TV-MA",
      year: "2023"
    }, {
      id: 46,
      title: "The Handmaid's Tale",
      genre: "Drama • Thriller",
      rating: "TV-MA",
      year: "2022"
    }, {
      id: 47,
      title: "American Horror Story",
      genre: "Horror • Thriller",
      rating: "TV-MA",
      year: "2023"
    }, {
      id: 48,
      title: "The Walking Dead",
      genre: "Horror • Drama",
      rating: "TV-MA",
      year: "2022"
    }, {
      id: 49,
      title: "Sherlock",
      genre: "Mystery • Crime",
      rating: "TV-14",
      year: "2017"
    }, {
      id: 50,
      title: "Westworld",
      genre: "Sci-Fi • Drama",
      rating: "TV-MA",
      year: "2022"
    }, {
      id: 51,
      title: "Black Mirror",
      genre: "Sci-Fi • Thriller",
      rating: "TV-MA",
      year: "2023"
    }, {
      id: 52,
      title: "The Mandalorian",
      genre: "Sci-Fi • Adventure",
      rating: "TV-14",
      year: "2023"
    }, {
      id: 53,
      title: "Foundation",
      genre: "Sci-Fi • Drama",
      rating: "TV-14",
      year: "2023"
    }, {
      id: 54,
      title: "For All Mankind",
      genre: "Sci-Fi • Drama",
      rating: "TV-MA",
      year: "2023"
    }
  ];

  // Get latest 11 items for each category
  const getLatest11 = (filterFn: (item: any) => boolean) => {
    return allTVShows.filter(filterFn).sort((a, b) => parseInt(b.year) - parseInt(a.year)).slice(0, 11);
  };

  const newReleases = getLatest11(() => true);
  const popular = getLatest11(() => true);
  const actionAdventure = getLatest11(item => item.genre.toLowerCase().includes('action') || item.genre.toLowerCase().includes('adventure'));
  const comedy = getLatest11(item => item.genre.toLowerCase().includes('comedy'));
  const crime = getLatest11(item => item.genre.toLowerCase().includes('crime'));
  const drama = getLatest11(item => item.genre.toLowerCase().includes('drama'));
  const horror = getLatest11(item => item.genre.toLowerCase().includes('horror'));
  const mysteryThriller = getLatest11(item => item.genre.toLowerCase().includes('mystery') || item.genre.toLowerCase().includes('thriller'));
  const sciFi = getLatest11(item => item.genre.toLowerCase().includes('sci-fi'));

  return (
    <div className="min-h-screen bg-background">
      <PremiumNavbar />
      
      <div className="pt-20">
        <HeroSlider />
        
        <div className="container mx-auto pb-12">
          <SimplePremiumContentRow 
            title="New Releases" 
            movies={newReleases}
            contentType="tv"
          />
          
          <SimplePremiumContentRow 
            title="Popular" 
            movies={popular}
            contentType="tv"
          />
          
          <SimplePremiumContentRow 
            title="Action & Adventure" 
            movies={actionAdventure}
            contentType="tv"
          />
          
          <SimplePremiumContentRow 
            title="Comedy" 
            movies={comedy}
            contentType="tv"
          />
          
          <SimplePremiumContentRow 
            title="Crime" 
            movies={crime}
            contentType="tv"
          />
          
          <SimplePremiumContentRow 
            title="Drama" 
            movies={drama}
            contentType="tv"
          />
          
          <SimplePremiumContentRow 
            title="Horror" 
            movies={horror}
            contentType="tv"
          />
          
          <SimplePremiumContentRow 
            title="Mystery & Thriller" 
            movies={mysteryThriller}
            contentType="tv"
          />
          
          <SimplePremiumContentRow 
            title="Sci-Fi" 
            movies={sciFi}
            contentType="tv"
          />
        </div>
      </div>
    </div>
  );
};

export default TVShows;
