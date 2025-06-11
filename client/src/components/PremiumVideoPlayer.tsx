
import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Settings, 
  Captions,
  SkipBack,
  SkipForward,
  Rewind,
  FastForward,
  Download,
  Shield,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface VideoPlayerProps {
  src: string;
  title: string;
  duration?: string;
  onClose?: () => void;
}

const PremiumVideoPlayer = ({ src, title, duration, onClose }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [quality, setQuality] = useState('1080p');
  const [showCaptions, setShowCaptions] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [antiPiracyMode, setAntiPiracyMode] = useState(true);

  // Anti-piracy protection
  useEffect(() => {
    if (!antiPiracyMode) return;

    const preventRightClick = (e: MouseEvent) => e.preventDefault();
    const preventKeyboard = (e: KeyboardEvent) => {
      // Prevent common shortcuts for recording/downloading
      if (
        e.ctrlKey && (e.key === 's' || e.key === 'S') || // Save
        e.key === 'F12' || // Dev tools
        (e.ctrlKey && e.shiftKey && e.key === 'I') || // Dev tools
        (e.ctrlKey && e.key === 'u') || // View source
        e.key === 'PrintScreen' // Screenshot
      ) {
        e.preventDefault();
        return false;
      }
    };

    const preventDragDrop = (e: DragEvent) => e.preventDefault();
    
    // Add protection layers
    document.addEventListener('contextmenu', preventRightClick);
    document.addEventListener('keydown', preventKeyboard);
    document.addEventListener('dragstart', preventDragDrop);
    document.addEventListener('selectstart', preventRightClick);

    // Prevent dev tools detection
    const devtools = {
      open: false,
      orientation: null as string | null
    };

    const threshold = 160;
    setInterval(() => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
          devtools.open = true;
          console.clear();
          console.log('%cContent Protected', 'color: red; font-size: 50px; font-weight: bold;');
        }
      } else {
        devtools.open = false;
      }
    }, 500);

    return () => {
      document.removeEventListener('contextmenu', preventRightClick);
      document.removeEventListener('keydown', preventKeyboard);
      document.removeEventListener('dragstart', preventDragDrop);
      document.removeEventListener('selectstart', preventRightClick);
    };
  }, [antiPiracyMode]);

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setVideoDuration(video.duration);
    const handleBuffering = () => setIsBuffering(video.readyState < 3);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('waiting', () => setIsBuffering(true));
    video.addEventListener('canplay', () => setIsBuffering(false));

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    const newVolume = value[0] / 100;
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!isFullscreen) {
      container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const changePlaybackSpeed = (speed: string) => {
    const video = videoRef.current;
    if (!video) return;
    const speedValue = parseFloat(speed);
    video.playbackRate = speedValue;
    setPlaybackSpeed(speedValue);
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, Math.min(video.currentTime + seconds, videoDuration));
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-black group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Anti-piracy overlay */}
      {antiPiracyMode && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute top-4 right-4 text-primary/30 text-sm font-mono">
            PROTECTED CONTENT
          </div>
          <div className="absolute bottom-4 left-4 text-primary/20 text-xs font-mono">
            ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </div>
        </div>
      )}

      {/* Main video element */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        src={src}
        onContextMenu={(e) => e.preventDefault()}
        controlsList="nodownload"
        disablePictureInPicture
        style={{ 
          userSelect: 'none',
          WebkitUserSelect: 'none',
          msUserSelect: 'none',
          MozUserSelect: 'none'
        }}
      />

      {/* Loading spinner */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      )}

      {/* Play/Pause overlay */}
      <div 
        className="absolute inset-0 flex items-center justify-center cursor-pointer"
        onClick={togglePlay}
      >
        {!isPlaying && !isBuffering && (
          <div className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Play className="w-8 h-8 text-white ml-1" />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        {/* Progress bar */}
        <div className="mb-4">
          <Slider
            value={[currentTime]}
            max={videoDuration}
            step={1}
            onValueChange={handleSeek}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-white/70 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(videoDuration)}</span>
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="text-white hover:bg-white/20"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => skip(-10)}
              className="text-white hover:bg-white/20"
            >
              <SkipBack className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => skip(10)}
              className="text-white hover:bg-white/20"
            >
              <SkipForward className="w-5 h-5" />
            </Button>

            {/* Volume control */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="text-white hover:bg-white/20"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
              <div className="w-20">
                <Slider
                  value={[isMuted ? 0 : volume * 100]}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                />
              </div>
            </div>

            <span className="text-white/70 text-sm">{title}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Captions */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowCaptions(!showCaptions)}
              className={`text-white hover:bg-white/20 ${showCaptions ? 'bg-primary/30' : ''}`}
            >
              <Captions className="w-5 h-5" />
            </Button>

            {/* Playback speed */}
            <Select value={playbackSpeed.toString()} onValueChange={changePlaybackSpeed}>
              <SelectTrigger className="w-16 bg-transparent border-white/30 text-white text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.5">0.5x</SelectItem>
                <SelectItem value="0.75">0.75x</SelectItem>
                <SelectItem value="1">1x</SelectItem>
                <SelectItem value="1.25">1.25x</SelectItem>
                <SelectItem value="1.5">1.5x</SelectItem>
                <SelectItem value="2">2x</SelectItem>
              </SelectContent>
            </Select>

            {/* Quality */}
            <Select value={quality} onValueChange={setQuality}>
              <SelectTrigger className="w-20 bg-transparent border-white/30 text-white text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4K">4K</SelectItem>
                <SelectItem value="1440p">1440p</SelectItem>
                <SelectItem value="1080p">1080p</SelectItem>
                <SelectItem value="720p">720p</SelectItem>
                <SelectItem value="480p">480p</SelectItem>
                <SelectItem value="360p">360p</SelectItem>
              </SelectContent>
            </Select>

            {/* Anti-piracy toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setAntiPiracyMode(!antiPiracyMode)}
              className={`text-white hover:bg-white/20 ${antiPiracyMode ? 'bg-red-500/30' : ''}`}
            >
              <Shield className="w-5 h-5" />
            </Button>

            {/* Settings */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <Settings className="w-5 h-5" />
            </Button>

            {/* Fullscreen */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20"
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </Button>

            {/* Close */}
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                ×
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Captions overlay */}
      {showCaptions && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded text-center">
          [Sample Caption Text]
        </div>
      )}

      {/* Protection watermark */}
      {antiPiracyMode && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 text-6xl font-bold text-primary rotate-45 select-none">
            PROTECTED
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumVideoPlayer;
