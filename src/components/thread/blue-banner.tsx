import React from 'react';

export function BlueBanner() {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-blue-700 dark:via-blue-800 dark:to-blue-900 px-6 py-5 shadow-lg">
      {/* Animated background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" 
           style={{
             backgroundSize: '200% 100%',
             animation: 'shimmer 8s ease-in-out infinite'
           }} />
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
           }} />
      
      {/* Radial glow effect from center */}
      <div className="absolute inset-0 bg-radial-gradient opacity-20" 
           style={{
             background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 70%)'
           }} />
      
      <div className="relative flex items-center justify-center gap-3 max-w-4xl mx-auto">
        {/* Enhanced icon container with multi-layer depth */}
        <div className="relative flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0 group">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-xl bg-white/20 blur-md group-hover:bg-white/30 transition-all duration-300" />
          
          {/* Icon background with glassmorphism */}
          <div className="relative flex items-center justify-center w-full h-full rounded-xl bg-white/15 backdrop-blur-md border border-white/25 shadow-xl group-hover:bg-white/20 group-hover:border-white/35 group-hover:scale-105 transition-all duration-300">
            {/* Inner subtle gradient */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent" />
            
            {/* Icon with drop shadow */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="22" 
              height="22" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="relative z-10 group-hover:scale-110 transition-transform duration-300"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
            >
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M9 3v18"/>
              <path d="M14 8l3 3-3 3"/>
            </svg>
          </div>
        </div>
        
        {/* Enhanced title with layered text effects */}
        <h2 className="relative text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {/* Background glow effect */}
          <span className="absolute inset-0 blur-sm opacity-50">Tech Explorer</span>
          
          {/* Main text with enhanced shadow */}
          <span className="relative" style={{ 
            textShadow: '0 2px 4px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.2), 0 0 20px rgba(255,255,255,0.1)' 
          }}>
            Tech Explorer
          </span>
        </h2>
      </div>
      
      {/* Bottom edge highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}