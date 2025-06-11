
import { User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlayingCardProfileProps {
  userName: string;
  userStats: {
    moviesWatched: number;
    showsWatched: number;
    hoursWatched: number;
    favoritesCount: number;
  };
}

const PlayingCardProfile = ({ userName, userStats }: PlayingCardProfileProps) => {
  const firstLetter = userName.charAt(0).toUpperCase();
  
  return (
    <div className="max-w-sm mx-auto">
      {/* Playing Card Design */}
      <div className="relative bg-gradient-to-br from-card via-card/90 to-background border-2 border-primary/30 rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
        {/* Corner decorations */}
        <div className="absolute top-4 left-4 text-primary font-bold text-lg">♠</div>
        <div className="absolute top-4 right-4 text-primary font-bold text-lg">♠</div>
        <div className="absolute bottom-4 left-4 text-primary font-bold text-lg rotate-180">♠</div>
        <div className="absolute bottom-4 right-4 text-primary font-bold text-lg rotate-180">♠</div>
        
        {/* Center content */}
        <div className="text-center space-y-6">
          {/* User Initial */}
          <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center border-4 border-primary/40">
            <span className="text-4xl font-bold text-primary">{firstLetter}</span>
          </div>
          
          {/* User Name */}
          <h2 className="text-2xl font-bold text-foreground">{userName}</h2>
          
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-lg font-bold text-primary">{userStats.moviesWatched}</div>
              <div className="text-xs text-muted-foreground">Movies</div>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-bold text-primary">{userStats.showsWatched}</div>
              <div className="text-xs text-muted-foreground">Shows</div>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-bold text-primary">{userStats.hoursWatched}</div>
              <div className="text-xs text-muted-foreground">Hours</div>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-bold text-primary">{userStats.favoritesCount}</div>
              <div className="text-xs text-muted-foreground">Favorites</div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-center text-sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-center text-sm text-destructive hover:text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayingCardProfile;
