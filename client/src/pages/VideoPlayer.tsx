import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import PremiumNavbar from '@/components/PremiumNavbar';
import PremiumVideoPlayer from '@/components/PremiumVideoPlayer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

const VideoPlayer = () => {
  const [location, setLocation] = useLocation();
  const [isWatching, setIsWatching] = useState(false);

  // Parse URL parameters for video data
  const urlParams = new URLSearchParams(window.location.search);
  const videoData = {
    videoUrl: urlParams.get('videoUrl'),
    title: urlParams.get('title'),
    description: urlParams.get('description'),
    duration: urlParams.get('duration'),
    contentId: urlParams.get('contentId')
  };

  // Track analytics when video is played
  const trackAnalyticsMutation = useMutation({
    mutationFn: async (data: { contentId: number; eventType: string }) => {
      return apiRequest('/api/analytics', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
    }
  });

  useEffect(() => {
    // Track view event when component mounts
    if (videoData.contentId) {
      trackAnalyticsMutation.mutate({
        contentId: parseInt(videoData.contentId),
        eventType: 'view'
      });
    }
  }, [videoData.contentId]);

  const handlePlay = () => {
    setIsWatching(true);
    // Track play event
    if (videoData.contentId) {
      trackAnalyticsMutation.mutate({
        contentId: parseInt(videoData.contentId),
        eventType: 'play'
      });
    }
  };

  const handleBack = () => {
    setLocation('/');
  };
  
  const sampleVideo = {
    src: videoData.videoUrl || "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    title: videoData.title || "Dune: Part Two",
    description: videoData.description || "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    duration: videoData.duration || "2h 46m"
  };

  if (isWatching) {
    return (
      <div className="fixed inset-0 bg-black z-50">
        <PremiumVideoPlayer
          src={sampleVideo.src}
          title={sampleVideo.title}
          duration={sampleVideo.duration}
          onClose={() => setIsWatching(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PremiumNavbar />
      
      <div className="pt-20 container mx-auto px-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="mb-4"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Video preview */}
          <div className="relative aspect-video bg-gradient-to-br from-orange-900/40 via-amber-800/20 to-background rounded-xl overflow-hidden mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="lg"
                onClick={() => setIsWatching(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-2xl"
              >
                <div className="w-6 h-6 mr-3 bg-white rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-4 border-l-black border-y-2 border-y-transparent ml-0.5"></div>
                </div>
                Watch {sampleVideo.title}
              </Button>
            </div>
            
            {/* Preview overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
              <h1 className="text-2xl font-bold text-foreground mb-2">{sampleVideo.title}</h1>
              <p className="text-muted-foreground">{sampleVideo.description}</p>
              <div className="flex items-center gap-4 mt-4 text-sm">
                <span className="bg-accent/80 px-3 py-1 rounded-lg">PG-13</span>
                <span>{sampleVideo.duration}</span>
                <span>Sci-Fi • Adventure • Drama</span>
                <span className="text-primary font-semibold">★ 8.7</span>
              </div>
            </div>
          </div>

          {/* Player features */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Premium Features</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  4K Ultra HD with HDR support
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Dolby Atmos surround sound
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Multi-language subtitles
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Variable playback speeds
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Picture-in-picture mode
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Offline downloads (Premium)
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Security Features</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Anti-piracy protection
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Screen recording prevention
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Download protection
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  DevTools detection
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Content watermarking
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Right-click protection
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
