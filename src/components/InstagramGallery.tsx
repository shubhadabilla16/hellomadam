import React from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../data/testimonialsData';

export const InstagramGallery: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-[#ebdccd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-[#e03e1a] text-xs uppercase tracking-wider font-bold mb-2">
              <Instagram className="w-4 h-4" />
              <span>Instagram Community</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Follow Our Beauty Journey
            </h2>
            <p className="mt-2 text-sm text-stone-600 max-w-xl">
              Real moments, client transformations, and at-home parlour updates from across Solapur. Follow our official account.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <span className="text-sm font-semibold text-stone-800 hidden sm:inline">
              @hello_madam_solapur5
            </span>
            <a
              href="https://www.instagram.com/hello_madam_solapur5/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-purple-700 via-pink-600 to-[#e03e1a] hover:opacity-90 rounded-full shadow-xs hover:shadow-md transition-all duration-200"
            >
              <Instagram className="w-4 h-4" />
              <span>FOLLOW US ON INSTAGRAM</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>

        {/* 6-Photo Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href="https://www.instagram.com/hello_madam_solapur5/"
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-[#ebdccd]/80 block"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
                loading="lazy"
              />

              {/* Hover Overlay with Caption */}
              <div className="absolute inset-0 bg-stone-950/75 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3.5 text-white">
                <div className="text-[11px] font-semibold text-amber-200">
                  {post.tag}
                </div>
                
                <p className="text-[11px] text-stone-200 line-clamp-3 leading-snug">
                  {post.caption}
                </p>

                <div className="flex items-center justify-between text-xs font-semibold text-stone-300">
                  <span className="flex items-center gap-1 text-pink-300">
                    <Instagram className="w-3.5 h-3.5" />
                    <span>View Post</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Solapur Instagram Tagline */}
        <div className="mt-8 text-center text-xs text-stone-500">
          Tag <span className="font-bold text-[#e03e1a]">#HelloMadamSolapur</span> or visit{' '}
          <a
            href="https://www.instagram.com/hello_madam_solapur5/"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-stone-900 font-semibold"
          >
            instagram.com/hello_madam_solapur5
          </a>
        </div>

      </div>
    </section>
  );
};
