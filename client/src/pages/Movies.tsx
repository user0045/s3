
import PremiumNavbar from "@/components/PremiumNavbar";
import SimplePremiumContentRow from "@/components/SimplePremiumContentRow";
import HeroSlider from "@/components/HeroSlider";

const Movies = () => {
  // All movie content
  const allMovies = [
    {
      id: 13,
      title: "Indiana Jones 5",
      genre: "Action • Adventure",
      rating: "PG-13",
      year: "2023"
    }, {
      id: 14,
      title: "Transformers: Rise of the Beasts",
      genre: "Action • Sci-Fi",
      rating: "PG-13",
      year: "2023"
    }, {
      id: 15,
      title: "The Flash",
      genre: "Action • Adventure",
      rating: "PG-13",
      year: "2023"
    }, {
      id: 16,
      title: "Elemental",
      genre: "Animation • Family",
      rating: "PG",
      year: "2023"
    }, {
      id: 17,
      title: "Spider-Man: No Way Home",
      genre: "Action • Adventure",
      rating: "PG-13",
      year: "2021"
    }, {
      id: 18,
      title: "Top Gun: Maverick",
      genre: "Action • Drama",
      rating: "PG-13",
      year: "2022"
    }, {
      id: 1,
      title: "Oppenheimer",
      genre: "Biography • Drama",
      rating: "R",
      year: "2023"
    }, {
      id: 2,
      title: "Barbie",
      genre: "Comedy • Adventure",
      rating: "PG-13",
      year: "2023"
    }, {
      id: 3,
      title: "Spider-Man: Across the Spider-Verse",
      genre: "Animation • Action",
      rating: "PG",
      year: "2023"
    }, {
      id: 4,
      title: "Guardians of the Galaxy Vol. 3",
      genre: "Action • Adventure",
      rating: "PG-13",
      year: "2023"
    }, {
      id: 5,
      title: "Fast X",
      genre: "Action • Crime",
      rating: "PG-13",
      year: "2023"
    }, {
      id: 6,
      title: "The Little Mermaid",
      genre: "Family • Musical",
      rating: "PG",
      year: "2023"
    }, {
      id: 24,
      title: "John Wick 4",
      genre: "Action • Thriller",
      rating: "R",
      year: "2023"
    }, {
      id: 25,
      title: "Mission Impossible 7",
      genre: "Action • Adventure",
      rating: "PG-13",
      year: "2023"
    }, {
      id: 26,
      title: "The Batman",
      genre: "Action • Crime",
      rating: "PG-13",
      year: "2022"
    }, {
      id: 27,
      title: "Dune",
      genre: "Sci-Fi • Adventure",
      rating: "PG-13",
      year: "2021"
    }, {
      id: 28,
      title: "Everything Everywhere All at Once",
      genre: "Sci-Fi • Comedy",
      rating: "R",
      year: "2022"
    }, {
      id: 29,
      title: "Knives Out",
      genre: "Comedy • Mystery",
      rating: "PG-13",
      year: "2019"
    }, {
      id: 30,
      title: "The Power of the Dog",
      genre: "Drama",
      rating: "R",
      year: "2021"
    }, {
      id: 31,
      title: "Scream VI",
      genre: "Horror • Thriller",
      rating: "R",
      year: "2023"
    }, {
      id: 32,
      title: "Gone Girl",
      genre: "Mystery • Thriller",
      rating: "R",
      year: "2014"
    }, {
      id: 33,
      title: "Zodiac",
      genre: "Crime • Mystery",
      rating: "R",
      year: "2007"
    }, {
      id: 34,
      title: "Heat",
      genre: "Crime • Drama",
      rating: "R",
      year: "1995"
    }, {
      id: 35,
      title: "The Departed",
      genre: "Crime • Thriller",
      rating: "R",
      year: "2006"
    }, {
      id: 36,
      title: "Casino",
      genre: "Crime • Drama",
      rating: "R",
      year: "1995"
    }, {
      id: 37,
      title: "Goodfellas",
      genre: "Crime • Drama",
      rating: "R",
      year: "1990"
    }, {
      id: 38,
      title: "The Conjuring",
      genre: "Horror • Thriller",
      rating: "R",
      year: "2013"
    }, {
      id: 39,
      title: "Hereditary",
      genre: "Horror • Drama",
      rating: "R",
      year: "2018"
    }, {
      id: 40,
      title: "A Quiet Place",
      genre: "Horror • Thriller",
      rating: "PG-13",
      year: "2018"
    }, {
      id: 41,
      title: "Interstellar",
      genre: "Sci-Fi • Drama",
      rating: "PG-13",
      year: "2014"
    }, {
      id: 42,
      title: "Blade Runner 2049",
      genre: "Sci-Fi • Thriller",
      rating: "R",
      year: "2017"
    }, {
      id: 43,
      title: "The Martian",
      genre: "Sci-Fi • Adventure",
      rating: "PG-13",
      year: "2015"
    }, {
      id: 44,
      title: "Arrival",
      genre: "Sci-Fi • Drama",
      rating: "PG-13",
      year: "2016"
    }, {
      id: 45,
      title: "Ex Machina",
      genre: "Sci-Fi • Thriller",
      rating: "R",
      year: "2014"
    }
  ];

  // Get latest 11 items for each category
  const getLatest11 = (filterFn: (item: any) => boolean) => {
    return allMovies.filter(filterFn).sort((a, b) => parseInt(b.year) - parseInt(a.year)).slice(0, 11);
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
            contentType="movie"
          />
          
          <SimplePremiumContentRow 
            title="Popular" 
            movies={popular}
            contentType="movie"
          />
          
          <SimplePremiumContentRow 
            title="Action & Adventure" 
            movies={actionAdventure}
            contentType="movie"
          />
          
          <SimplePremiumContentRow 
            title="Comedy" 
            movies={comedy}
            contentType="movie"
          />
          
          <SimplePremiumContentRow 
            title="Crime" 
            movies={crime}
            contentType="movie"
          />
          
          <SimplePremiumContentRow 
            title="Drama" 
            movies={drama}
            contentType="movie"
          />
          
          <SimplePremiumContentRow 
            title="Horror" 
            movies={horror}
            contentType="movie"
          />
          
          <SimplePremiumContentRow 
            title="Mystery & Thriller" 
            movies={mysteryThriller}
            contentType="movie"
          />
          
          <SimplePremiumContentRow 
            title="Sci-Fi" 
            movies={sciFi}
            contentType="movie"
          />
        </div>
      </div>
    </div>
  );
};

export default Movies;
