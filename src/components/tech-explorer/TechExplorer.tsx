"use client";

import { useConfig } from '@/hooks/use-config';
import { useQuestionnaire } from '@/providers/QuestionnaireContext';
import { NavigationBar } from './NavigationBar';
import { ProgressSidebar } from './ProgressSidebar';
import { LandingPage } from './LandingPage';
import { SectorSelection } from './SectorSelection';
import { LocationSelection } from './LocationSelection';
import { RoleSelection } from './RoleSelection';
import { CardsDashboard } from './CardsDashboard';
import type { PersonaCard } from '@/lib/config-loader';

interface TechExplorerProps {
  onStartChat: (context: {
    sector?: string;
    location?: string;
    role?: string;
    cardContext: string;
  }) => void;
}

export function TechExplorer({ onStartChat }: TechExplorerProps) {
  const { config, loading, error } = useConfig();
  const { state } = useQuestionnaire();

  const handleCardClick = (card: PersonaCard) => {
    // Pass context to chat interface
    onStartChat({
      sector: state.sector,
      location: state.location,
      role: state.role,
      cardContext: card.prompt,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DC143C] mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading Citi Tech Explorer...</p>
        </div>
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <p className="text-red-600">Failed to load configuration</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {error?.message || 'Unknown error'}
          </p>
        </div>
      </div>
    );
  }

  // Find questions by ID
  const q1 = config.questions.find(q => q.id === 'q1');
  const q2 = config.questions.find(q => q.id === 'q2');
  const q3 = config.questions.find(q => q.id === 'q3');

  // Get cards for current role
  const cards = state.role ? config.personaCards[state.role] : [];

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-transparent">
      {/* Navigation Bar */}
      <NavigationBar />

      {/* Progress Sidebar - Hidden */}
      {/* <ProgressSidebar steps={config.progressSteps} /> */}

      {/* Main Content Area with conditional top padding for fixed nav */}
      <div className={`flex-1 ${state.currentStep !== 'intro' ? 'pt-[72px]' : ''}`}>
        {state.currentStep === 'intro' && (
          <LandingPage content={config.landing} />
        )}

        {state.currentStep === 'question1' && q1 && (
          <SectorSelection question={q1} />
        )}

        {state.currentStep === 'question2' && q2 && (
          <LocationSelection question={q2} />
        )}

        {state.currentStep === 'question3' && q3 && (
          <RoleSelection question={q3} />
        )}

        {state.currentStep === 'results' && (
          <CardsDashboard cards={cards} onCardClick={handleCardClick} />
        )}
      </div>
    </div>
  );
}

