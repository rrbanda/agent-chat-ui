"use client";

import { useQuestionnaire } from '@/providers/QuestionnaireContext';
import type { PersonaCard } from '@/lib/config-loader';
import { useState, useEffect } from 'react';
import { 
  Laptop, 
  Cloud, 
  Code, 
  Network, 
  FileText, 
  Container, 
  ArrowRightLeft,
  Bot,
  TestTube,
  Puzzle,
  LayoutGrid,
  CloudCog,
  Info
} from 'lucide-react';

interface CardsDashboardProps {
  cards: PersonaCard[];
  onCardClick: (card: PersonaCard) => void;
}

const iconMap: Record<string, any> = {
  laptop: Laptop,
  cloud: Cloud,
  code: Code,
  network: Network,
  blueprint: FileText,
  container: Container,
  transfer: ArrowRightLeft,
  bot: Bot,
  test: TestTube,
  patch: Puzzle,
  compare: LayoutGrid,
  template: FileText,
  'cloud-native': CloudCog,
};

export function CardsDashboard({ cards, onCardClick }: CardsDashboardProps) {
  const { state } = useQuestionnaire();
  const [showInfoFor, setShowInfoFor] = useState<string | null>(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowInfoFor(null);
    if (showInfoFor) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showInfoFor]);

  // Define card colors based on index
  const cardColors = [
    { bg: 'bg-blue-500', icon: 'bg-blue-500' },
    { bg: 'bg-purple-500', icon: 'bg-purple-500' },
    { bg: 'bg-cyan-500', icon: 'bg-cyan-500' },
    { bg: 'bg-green-500', icon: 'bg-green-500' },
    { bg: 'bg-orange-500', icon: 'bg-orange-500' },
    { bg: 'bg-pink-500', icon: 'bg-pink-500' },
    { bg: 'bg-indigo-500', icon: 'bg-indigo-500' },
    { bg: 'bg-teal-500', icon: 'bg-teal-500' },
  ];

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <span className="text-yellow-500">✨</span>
              Choose Your Next Step
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
              Based on your selections, here are personalized recommendations. Click any card below to start exploring.
            </p>
          </div>
          
          {/* Context Summary */}
          <div className="flex items-center gap-3 flex-wrap">
            {state.role && (
              <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium">
                <span className="text-green-600 dark:text-green-400">👤</span>
                {state.role.charAt(0).toUpperCase() + state.role.slice(1)}
              </div>
            )}
            {state.sector && (
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
                <span className="text-blue-600 dark:text-blue-400">🏢</span>
                {state.sector}
              </div>
            )}
            {state.location && (
              <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium">
                <span className="text-purple-600 dark:text-purple-400">📍</span>
                {state.location}
              </div>
            )}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cards.map((card, index) => {
            const Icon = iconMap[card.icon] || Cloud;
            const isAICard = card.id.includes('ai_assistant');
            const colors = cardColors[index % cardColors.length];

            return (
              <div
                key={card.id}
                onClick={() => onCardClick(card)}
                className={`
                  group relative
                  cursor-pointer
                  rounded-xl
                  p-5
                  backdrop-blur-xl
                  transition-all duration-300
                  hover:shadow-xl dark:hover:shadow-blue-500/30
                  hover:-translate-y-1
                  hover:scale-[1.02]
                  flex flex-col
                  h-[200px]
                  w-full
                  dark:ring-1 dark:ring-white/10
                  ${
                    isAICard
                      ? 'border-2 border-dashed border-gray-300 dark:border-gray-500/60 bg-white dark:bg-gradient-to-br dark:from-gray-800/80 dark:to-gray-900/80 dark:shadow-xl dark:shadow-black/40'
                      : 'bg-white dark:bg-gradient-to-br dark:from-gray-800/90 dark:to-gray-900/90 border border-gray-200 dark:border-gray-600/50 dark:shadow-lg dark:shadow-black/40'
                  }
                `}
              >
                {/* Info Icon Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowInfoFor(showInfoFor === card.id ? null : card.id);
                  }}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-[#0066CC] hover:dark:bg-[#0066CC] flex items-center justify-center transition-all duration-200 z-10 group/info"
                >
                  <Info className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover/info:text-white transition-colors duration-200" />
                </button>

                {/* Info Tooltip */}
                {showInfoFor === card.id && (
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-12 right-0 w-72 bg-white dark:bg-gray-800 border-2 border-[#0066CC] rounded-xl p-4 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {card.title}
                      </h4>
                      <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                    <div className="absolute -top-2 right-3 w-4 h-4 bg-white dark:bg-gray-800 border-t-2 border-l-2 border-[#0066CC] transform rotate-45"></div>
                  </div>
                )}

                {/* Icon */}
                <div className={`
                  w-11 h-11 rounded-lg flex items-center justify-center mb-3 flex-shrink-0
                  ${isAICard ? 'bg-gray-500' : colors.icon}
                `}>
                  <Icon className="w-5 h-5 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-base font-bold mb-2 text-gray-900 dark:text-white leading-snug line-clamp-2 pr-8">
                  {card.title}
                </h3>

                {/* Spacer */}
                <div className="flex-grow"></div>

                {/* Badge/Tag */}
                {card.relatedTech.length > 0 && !isAICard && (
                  <div className="mt-auto flex-shrink-0">
                    <span className={`
                      inline-block text-xs px-2.5 py-1 rounded-full font-semibold text-white capitalize truncate max-w-full
                      ${colors.bg}
                    `}>
                      {card.relatedTech[0].replace(/_/g, ' ')}
                    </span>
                  </div>
                )}
                
                {isAICard && (
                  <div className="mt-auto flex-shrink-0">
                    <span className="inline-block text-xs px-2.5 py-1 rounded-full font-semibold text-white bg-gray-500 capitalize">
                      AI Assistant
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

