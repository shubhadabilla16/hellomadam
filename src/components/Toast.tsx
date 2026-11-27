import React from 'react';
import { CheckCircle2, Sparkles, X } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const Toast: React.FC = () => {
  const { toastMessage, showToast } = useBooking();

  if (!toastMessage) return null;

  return (
    <aside
      aria-label="Notifications"
      className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[90vw] sm:max-w-md w-auto"
    >
      <div className="flex items-center gap-3 px-4 py-3 bg-stone-900/95 text-white backdrop-blur-md rounded-2xl shadow-2xl border border-stone-800 text-sm font-medium animate-in fade-in slide-in-from-bottom-3 duration-200">
        <div className="w-6 h-6 rounded-full bg-[#e03e1a] flex items-center justify-center shrink-0 text-white">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-2 pr-1 truncate">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
        <button
          onClick={() => showToast('')}
          className="p-1 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800/80 transition-colors ml-auto cursor-pointer"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
