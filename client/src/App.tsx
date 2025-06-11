
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { queryClient } from "@/lib/queryClient";
import Index from "./pages/Index";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import Upcoming from "./pages/Upcoming";
import SeeMore from "./pages/SeeMore";
import VideoPlayer from "./pages/VideoPlayer";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import MyList from "./pages/MyList";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Switch>
          <Route path="/" component={Index} />
          <Route path="/movies" component={Movies} />
          <Route path="/tv-shows" component={TVShows} />
          <Route path="/upcoming" component={Upcoming} />
          <Route path="/see-more" component={SeeMore} />
          <Route path="/admin" component={Admin} />
          <Route path="/player" component={VideoPlayer} />
          <Route path="/profile" component={Profile} />
          <Route path="/my-list" component={MyList} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
