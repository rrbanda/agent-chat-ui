"use client";

import { useQuestionnaire } from '@/providers/QuestionnaireContext';
import type { Question } from '@/lib/config-loader';
import { Building2, ChevronRight, Info } from 'lucide-react';
import { useState } from 'react';

interface SectorSelectionProps {
  question: Question;
}

export function SectorSelection({ question }: SectorSelectionProps) {
  const { updateSector } = useQuestionnaire();
  const [hoveredInfo, setHoveredInfo] = useState<string | null>(null);

  const handleSelect = (sectorId: string) => {
    updateSector(sectorId);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-7xl w-full space-y-12">
        {/* Question Title */}
        <div className="text-center space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            {question.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {question.subtitle || 'Select your business sector to begin'}
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {question.options?.map((option, index) => (
            <div key={option.id} className="aspect-square w-full">
              <div
                onClick={() => handleSelect(option.id)}
                style={{ animationDelay: `${index * 100}ms` }}
                className="
                  group relative
                  cursor-pointer
                  bg-white dark:bg-gradient-to-br dark:from-gray-800/90 dark:to-gray-900/90
                  backdrop-blur-xl
                  rounded-2xl
                  p-8
                  border-2 border-gray-200 dark:border-gray-600/50
                  hover:border-[#0066CC] dark:hover:border-[#4D94E3]
                  shadow-md dark:shadow-2xl dark:shadow-black/50
                  hover:shadow-2xl dark:hover:shadow-blue-500/40
                  transition-all duration-300
                  animate-in fade-in slide-in-from-bottom-2
                  hover:scale-[1.02]
                  hover:-translate-y-2
                  flex flex-col items-center justify-center
                  w-full
                  h-full
                  dark:ring-1 dark:ring-white/10
                "
              >
                {/* Info Icon */}
                {option.fullName && (
                  <div 
                    className="absolute top-4 right-4 z-10"
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      setHoveredInfo(option.id);
                    }}
                    onMouseLeave={(e) => {
                      e.stopPropagation();
                      setHoveredInfo(null);
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-[#0066CC] hover:dark:bg-[#0066CC] flex items-center justify-center transition-all duration-200 cursor-help">
                        <Info className="w-4 h-4 text-gray-600 dark:text-gray-300 hover:text-white transition-colors duration-200" />
                      </div>
                      
                      {/* Tooltip */}
                      {hoveredInfo === option.id && (
                        <div className="absolute top-10 right-0 w-64 bg-white dark:bg-gray-800 border-2 border-[#0066CC] rounded-xl p-3 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                          <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                            {option.fullName}
                          </p>
                          <div className="absolute -top-2 right-3 w-4 h-4 bg-white dark:bg-gray-800 border-t-2 border-l-2 border-[#0066CC] transform rotate-45"></div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Icon Background */}
                <div className="
                  w-12 h-12
                  rounded-xl
                  bg-gradient-to-br from-[#0066CC] to-[#003D82]
                  flex items-center justify-center
                  transition-transform duration-300 group-hover:scale-110
                  shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/30
                  mb-4
                  flex-shrink-0
                ">
                  <Building2 className="w-6 h-6 text-white" />
                </div>

                {/* Text Content */}
                <div className="text-center w-full px-2">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex-shrink-0">
                    {option.label}
                  </h3>
                </div>

                {/* Hover Arrow */}
                <div className="
                  absolute bottom-4 right-4
                  opacity-0 group-hover:opacity-100
                  transform translate-x-2 group-hover:translate-x-0
                  transition-all duration-300
                ">
                  <div className="w-7 h-7 rounded-full bg-[#0066CC] flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="
                  absolute inset-0 rounded-2xl
                  bg-gradient-to-br from-[#0066CC]/0 to-[#003D82]/0
                  group-hover:from-[#0066CC]/5 group-hover:to-[#003D82]/5
                  transition-all duration-300
                  pointer-events-none
                " />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

