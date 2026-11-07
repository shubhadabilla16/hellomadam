import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { VideoItem } from '../data/testimonialsData';

interface VideoCardProps {
  video: VideoItem;
  priority?: boolean;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }).catch((err) => {
        console.warn('Video play prevented:', err);
      });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#ebdccd] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
      
      {/* Video Container (Responsive, vertical/portrait aspect ratio ~ 9:16 or centered container) */}
      <div 
        className="relative bg-stone-950 aspect-[9/14] sm:aspect-[9/12] w-full flex items-center justify-center cursor-pointer overflow-hidden"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={video.videoUrl}
          className="w-full h-full object-cover"
          playsInline
          preload="metadata"
          onEnded={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Ambient Dark Scrim */}
        <div className={`absolute inset-0 bg-stone-950/30 transition-opacity duration-300 ${isPlaying ? 'opacity-0 hover:opacity-40' : 'opacity-60'}`} />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold rounded-full border border-white/20">
            {video.category}
          </span>
          <span className="px-2.5 py-1 bg-[#e03e1a] text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow-xs">
            Real Solapur Video
          </span>
        </div>

        {/* Big Center Play / Pause Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          {!isPlaying ? (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#e03e1a]/95 text-white flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110 pointer-events-auto">
              <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-white ml-1" />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto">
              <Pause className="w-6 h-6 fill-white" />
            </div>
          )}
        </div>

        {/* Bottom Video Controls Strip */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white z-10 pointer-events-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="p-2 bg-black/60 backdrop-blur-md hover:bg-black/80 rounded-full transition-colors"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
            </button>

            <button
              onClick={toggleMute}
              className="p-2 bg-black/60 backdrop-blur-md hover:bg-black/80 rounded-full transition-colors"
              aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[11px] font-mono">
              {video.duration}
            </span>
            <button
              onClick={handleFullScreen}
              className="p-2 bg-black/60 backdrop-blur-md hover:bg-black/80 rounded-full transition-colors"
              aria-label="View Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Video Content & Explanations */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5 bg-[#fffdf9]">
        
        <div className="space-y-3">
          {/* Marathi Subtitle */}
          <div className="text-xs font-semibold text-[#e03e1a] font-serif tracking-wide">
            {video.marathiTitle}
          </div>

          {/* Main Title */}
          <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 leading-snug">
            {video.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {video.description}
          </p>
        </div>

        {/* Highlights Checklist */}
        <div className="pt-4 border-t border-[#ebdccd] space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block font-serif">
            Key Features Shown
          </span>
          <div className="grid grid-cols-1 gap-1.5">
            {video.highlights.map((h, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#e03e1a] shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
