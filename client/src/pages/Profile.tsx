
import PremiumNavbar from "@/components/PremiumNavbar";
import PlayingCardProfile from "@/components/PlayingCardProfile";

const Profile = () => {
  const userStats = {
    moviesWatched: 142,
    showsWatched: 28,
    hoursWatched: 1250,
    favoritesCount: 35
  };

  return (
    <div className="min-h-screen bg-background">
      <PremiumNavbar />
      
      <div className="pt-32 pb-12">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">Your Profile</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>

          <div className="flex justify-center">
            <PlayingCardProfile 
              userName="John Doe"
              userStats={userStats}
            />
          </div>

          {/* Additional profile sections can be added here */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last watched</span>
                  <span className="text-foreground">The Crown S4</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Currently watching</span>
                  <span className="text-foreground">3 series</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Watch time today</span>
                  <span className="text-foreground">2h 15m</span>
                </div>
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Preferences</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Video quality</span>
                  <span className="text-foreground">4K Ultra HD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Audio</span>
                  <span className="text-foreground">Surround 5.1</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtitles</span>
                  <span className="text-foreground">English</span>
                </div>
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Subscription</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="text-primary font-semibold">Premium</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Next billing</span>
                  <span className="text-foreground">Jan 15, 2024</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Devices</span>
                  <span className="text-foreground">4 of 6</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
