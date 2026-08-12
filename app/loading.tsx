"use client";

export default function PremiumLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/5 backdrop-blur-xl dark:bg-black/40 transition-all">
      {/* Premium Glass Container */}
      <div className="relative flex flex-col items-center justify-center gap-6 rounded-[2rem] border border-white/20 bg-white/20 px-12 py-10 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        
        {/* Animated Rings & Glow */}
        <div className="relative flex h-24 w-24 items-center justify-center">
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 animate-pulse rounded-full bg-primary/30 blur-2xl"></div>
          
          {/* Outer Ring (Spins normally) */}
          <div className="absolute h-full w-full animate-[spin_3s_linear_infinite] rounded-full border-y-2 border-transparent border-t-primary border-b-primary/30"></div>
          
          {/* Middle Ring (Spins in reverse) */}
          <div className="absolute h-16 w-16 animate-[spin_2s_linear_infinite_reverse] rounded-full border-x-2 border-transparent border-l-sky-500 border-r-sky-500/40"></div>
          
          {/* Inner Ring (Fast spin) */}
          <div className="absolute h-8 w-8 animate-[spin_1s_linear_infinite] rounded-full border-y-2 border-transparent border-t-indigo-500 border-b-indigo-500/50"></div>
          
          {/* Center Pulsing Dot */}
          <div className="absolute h-2 w-2 animate-ping rounded-full bg-primary"></div>
          <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_15px_rgba(var(--primary))]"></div>
        </div>

        {/* Premium Text Reveal */}
        <div className="flex flex-col items-center gap-1.5">
          <h3 className="bg-gradient-to-r from-primary via-sky-500 to-indigo-500 bg-clip-text text-lg font-extrabold tracking-[0.2em] text-transparent">
            LOADING
          </h3>
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60 [animation-delay:-0.3s]"></span>
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-500/60 [animation-delay:-0.15s]"></span>
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500/60"></span>
          </div>
        </div>
        
      </div>
    </div>
  );
}