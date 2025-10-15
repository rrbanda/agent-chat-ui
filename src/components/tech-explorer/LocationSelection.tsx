"use client";

import { useQuestionnaire } from '@/providers/QuestionnaireContext';
import type { Question } from '@/lib/config-loader';
import { Globe3D } from './Globe3D';

interface LocationSelectionProps {
  question: Question;
}

export function LocationSelection({ question }: LocationSelectionProps) {
  const { updateLocation } = useQuestionnaire();

  const handleSelectRegion = (regionId: string, regionLabel: string) => {
    updateLocation(regionLabel);
  };

  return (
    <div className="flex-1 flex flex-col p-4 pt-6 overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto flex flex-col h-full min-h-0">
        {/* Question Title - Fixed at top */}
        <div className="text-center space-y-1 mb-4 flex-shrink-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            {question.title}
          </h1>
          {question.subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {question.subtitle}
            </p>
          )}
        </div>

        {/* Interactive 3D Globe - Scrollable if needed */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="h-full animate-in fade-in slide-in-from-bottom-2 duration-500">
            {question.regions && (
              <Globe3D
                regions={question.regions}
                onRegionSelect={handleSelectRegion}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

