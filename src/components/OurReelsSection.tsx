import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Maximize2, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ReelData {
  id: string;
  videoSrc: string;
  posterSrc: string;
  title: string;
  titleHi: string;
  subtitle: string;
  subtitleHi: string;
  tag: string;
  tagHi: string;
}

const REELS: ReelData[] = [
  {
    id: 'reel-treatment-action',
    videoSrc: '/assets/aistudio/WhatsApp_Video_2026-11-03_at_2.22.17_PM_d4ea3547.mp4',
    posterSrc: '/assets/aistudio/hello_madam_team_arrival.jpg',
    title: 'Doorstep Facial & Skin Prep',
    titleHi: 'घर पर फेशियल और स्किन प्रेप',
    subtitle: 'Watch our beautician set up the sanitized parlour station',
    subtitleHi: 'सैनिटाइज्ड स्टेशन और ब्यूटीशियन का वास्तविक काम',
    tag: 'Treatment Demo',
    tagHi: 'ट्रीटमेंट डेमो',
  },
  {
    id: 'reel-client-testimonial',
    videoSrc: '/assets/aistudio/WhatsApp_Video_2026-11-03_at_2.22.18_PM_1c3a4ff6.mp4',
    posterSrc: '/assets/aistudio/hello_madam_team_group.jpg',
    title: 'Client Review · Solapur',
    titleHi: 'ग्राहक अनुभव · सोलापूर',
    subtitle: 'Mrs. Pranita Amar Pompawar shares her at-home experience',
    subtitleHi: 'श्रीमती प्रणीता अमर पोमपवार का सच्चा अनुभव',
    tag: 'Real Testimonial',
    tagHi: 'सच्चा अनुभव',
  },
];

export const OurReelsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeReel, setActiveReel] = useState<ReelData | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [muted, setMuted] = useState<boolean>(true);

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const toggleInlinePlay = (id: string) => {
    const video = videoRefs.current[id];
    if (!video) return;

    if (playingId === id) {
      video.pause();
      setPlayingId(null);
    } else {
      // Pause others
      Object.keys(videoRefs.current).forEach((key) => {
        if (key !== id && videoRefs.current[key]) {
          videoRefs.current[key]?.pause();
        }
      });
      video.play().catch(() => {});
      setPlayingId(id);
    }
  };

  return (
    <section className="bg-white py-12 sm:py-16 border-b border-[#ebdccd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#e03e1a] uppercase font-serif">
              <Sparkles className="w-3.5 h-3.5 text-[#e03e1a]" />
              <span>{t('section.reels_title', 'Our Reels & Real Moments')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight mt-1">
              {language === 'hi' ? 'सोलापूर में देखिए हेलो मैडम की लाइव सेवा' : 'Beauty in Action Across Solapur'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
              {t('section.reels_sub', 'Watch our certified beauticians in action and hear genuine feedback from Solapur residents.')}
            </p>
          </div>

          <div className="text-xs text-stone-400 italic">
            {language === 'hi' ? 'ग्राहकों व टीम के वास्तविक वीडियो' : 'Official client footage · Solapur, Maharashtra'}
          </div>
        </div>

        {/* Reels Horizontal Grid / Carousel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {REELS.map((reel) => {
            const isPlaying = playingId === reel.id;

            return (
              <div
                key={reel.id}
                className="group relative bg-stone-900 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-stone-800 flex flex-col aspect-9/14 sm:aspect-9/14 max-h-[520px]"
              >
                {/* Reel Video Player */}
                <video
                  ref={(el) => {
                    videoRefs.current[reel.id] = el;
                  }}
                  src={reel.videoSrc}
                  poster={reel.posterSrc}
                  loop
                  playsInline
                  muted={muted}
                  className="w-full h-full object-cover"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-stone-950/40 pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="text-[11px] font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider">
                    {language === 'hi' ? reel.tagHi : reel.tag}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMuted(!muted);
                      }}
                      className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all cursor-pointer"
                      title={muted ? 'Unmute' : 'Mute'}
                    >
                      {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => setActiveReel(reel)}
                      className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all cursor-pointer"
                      title="Full Screen Reel"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Big Center Play / Pause Button */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <button
                    onClick={() => toggleInlinePlay(reel.id)}
                    className={`w-14 h-14 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-md text-white flex items-center justify-center transition-all duration-200 pointer-events-auto transform group-hover:scale-105 shadow-lg ${
                      isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
                    }`}
                    aria-label={isPlaying ? 'Pause Reel' : 'Play Reel'}
                  >
                    {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-1" />}
                  </button>
                </div>

                {/* Bottom Content & Title */}
                <div className="absolute bottom-5 left-5 right-5 z-10 text-white space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white leading-snug drop-shadow-sm">
                    {language === 'hi' ? reel.titleHi : reel.title}
                  </h3>
                  <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed drop-shadow-xs">
                    {language === 'hi' ? reel.subtitleHi : reel.subtitle}
                  </p>
                  
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => toggleInlinePlay(reel.id)}
                      className="text-xs font-bold text-amber-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{isPlaying ? 'Pause Video' : 'Watch Video'}</span>
                      <Play className="w-3 h-3 fill-current" />
                    </button>
                    <span className="text-stone-500">·</span>
                    <span className="text-[11px] text-stone-400">Solapur, MH</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Reel Modal Player */}
      {activeReel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-stone-950 rounded-3xl overflow-hidden shadow-2xl border border-stone-800 flex flex-col aspect-9/16 max-h-[88vh]">
            <button
              onClick={() => setActiveReel(null)}
              className="absolute top-4 right-4 z-20 p-2 text-white bg-black/70 hover:bg-black rounded-full transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <video
              src={activeReel.videoSrc}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

    </section>
  );
};
