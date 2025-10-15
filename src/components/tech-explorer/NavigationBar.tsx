"use client";

import { useQuestionnaire } from '@/providers/QuestionnaireContext';
import { ArrowLeft, RotateCcw } from 'lucide-react';

export function NavigationBar() {
  const { state, goBack, reset } = useQuestionnaire();

  const canGoBack = state.currentStep !== 'intro';
  const showNav = state.currentStep !== 'intro';

  if (!showNav) {
    return null;
  }

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-transparent backdrop-blur-xl border-b border-gray-200 dark:border-gray-700/30 shadow-sm dark:shadow-none">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left: Empty space for symmetry */}
          <div className="w-32" />

          {/* Center: Selections breadcrumbs */}
          <div className="flex items-center gap-2">
            {(state.sector || state.location || state.role) && (
              <div className="flex items-center gap-2 text-xs">
                {state.sector && (
                  <span className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/40 backdrop-blur-xl text-blue-700 dark:text-blue-300 rounded-full font-medium shadow-sm dark:shadow-md dark:shadow-blue-500/20 dark:ring-1 dark:ring-blue-400/20">
                    {state.sector.toUpperCase()}
                  </span>
                )}
                {state.location && (
                  <span className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/40 backdrop-blur-xl text-purple-700 dark:text-purple-300 rounded-full font-medium shadow-sm dark:shadow-md dark:shadow-purple-500/20 dark:ring-1 dark:ring-purple-400/20">
                    {state.location}
                  </span>
                )}
                {state.role && (
                  <span className="px-3 py-1.5 bg-green-100 dark:bg-green-900/40 backdrop-blur-xl text-green-700 dark:text-green-300 rounded-full font-medium capitalize shadow-sm dark:shadow-md dark:shadow-green-500/20 dark:ring-1 dark:ring-green-400/20">
                    {state.role}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Right: Start Over Button */}
          <div className="w-32 flex justify-end">
            {state.currentStep !== 'intro' && (
              <button
                onClick={reset}
                className="
                  flex items-center gap-2 px-3 py-2
                  text-sm font-medium
                  text-gray-600 dark:text-gray-400
                  hover:text-[#0066CC] dark:hover:text-[#0066CC]
                  transition-colors duration-200
                "
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Start Over</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Right Back Button */}
      {canGoBack && (
        <button
          onClick={goBack}
          className="
            fixed bottom-8 right-8 z-50
            flex items-center gap-2 px-6 py-3.5
            text-sm font-semibold
            text-white
            bg-gradient-to-r from-[#0066CC] to-[#003D82]
            hover:from-[#003D82] hover:to-[#0066CC]
            rounded-full
            shadow-2xl shadow-blue-500/50
            hover:shadow-blue-500/70
            transition-all duration-300
            hover:scale-110
            backdrop-blur-xl
            ring-2 ring-white/20
            hover:ring-white/30
          "
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      )}
    </>
  );
}

