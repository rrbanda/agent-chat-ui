"use client";

import { useQuestionnaire } from '@/providers/QuestionnaireContext';
import type { Landing } from '@/lib/config-loader';

interface LandingPageProps {
  content: Landing;
}

export function LandingPage({ content }: LandingPageProps) {
  const { goToStep } = useQuestionnaire();

  const handleGetStarted = () => {
    goToStep('question1');
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8 relative">
      <div className="max-w-5xl text-center space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {/* Title with gradient */}
        <div className="space-y-4">
          <h1 className="text-7xl font-bold bg-gradient-to-r from-[#0066CC] to-[#003D82] bg-clip-text text-transparent tracking-tight">
            {content.title}
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-[#0066CC] to-[#003D82] rounded-full" />
        </div>

        {/* Main tagline */}
        <div className="space-y-6">
          <h2 className="text-4xl font-semibold text-gray-900 dark:text-white leading-tight">
            {content.description}
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {content.longDescription}
          </p>
        </div>

        {/* Features/Benefits */}
        <div className="flex items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#0066CC]" />
            <span>Simple</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#0066CC]" />
            <span>Quick</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#0066CC]" />
            <span>Fast</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-6">
          <button
            onClick={handleGetStarted}
            className="
              inline-flex items-center gap-3 px-12 py-5
              bg-white/60 dark:bg-gray-800/80
              backdrop-blur-xl
              rounded-full
              border border-gray-200 dark:border-gray-600/50
              shadow-xl hover:shadow-2xl dark:shadow-xl dark:shadow-black/40
              dark:ring-1 dark:ring-white/10
              transition-all duration-300
              hover:scale-105
              hover:bg-white/80 dark:hover:bg-gray-800/90
              hover:border-[#0066CC] dark:hover:border-[#4D94E3]
              cursor-pointer
            "
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0066CC] to-[#003D82] flex items-center justify-center shadow-lg dark:shadow-blue-500/50 flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-200">
              {content.ctaButton}
            </span>
          </button>
        </div>

      </div>

      {/* Powered by - Bottom Right */}
      <div className="fixed bottom-6 right-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Powered by CTS@Citi
        </p>
      </div>
    </div>
  );
}

