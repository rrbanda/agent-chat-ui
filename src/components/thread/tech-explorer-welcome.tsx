"use client";

import { useConfig } from '@/hooks/use-config';
import { QuestionnaireProvider, useQuestionnaire } from '@/providers/QuestionnaireContext';
import { NavigationBar } from '@/components/tech-explorer/NavigationBar';
import { ProgressSidebar } from '@/components/tech-explorer/ProgressSidebar';
import { LandingPage } from '@/components/tech-explorer/LandingPage';
import { SectorSelection } from '@/components/tech-explorer/SectorSelection';
import { LocationSelection } from '@/components/tech-explorer/LocationSelection';
import { RoleSelection } from '@/components/tech-explorer/RoleSelection';
import { CardsDashboard } from '@/components/tech-explorer/CardsDashboard';
import type { PersonaCard } from '@/lib/config-loader';
import { WelcomeScreen } from './welcome-screen';

interface TechExplorerWelcomeInnerProps {
  onQuickStart: (prompt: string) => void;
  onNewChat: () => void;
}

function TechExplorerWelcomeInner({ onQuickStart, onNewChat }: TechExplorerWelcomeInnerProps) {
  const { config, loading, error } = useConfig();
  const { state } = useQuestionnaire();

  const handleCardClick = (card: PersonaCard) => {
    // Simply pass the clean prompt from YAML to the chat
    onQuickStart(card.prompt);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DC143C] mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading Citi Tech Explorer...</p>
        </div>
      </div>
    );
  }

  // Show error fallback
  if (error || !config) {
    return <WelcomeScreen onQuickStart={onQuickStart} onNewChat={onNewChat} />;
  }

  // Find questions by ID
  const q1 = config.questions.find(q => q.id === 'q1');
  const q2 = config.questions.find(q => q.id === 'q2');
  const q3 = config.questions.find(q => q.id === 'q3');

  // Get cards for current role
  const cards = state.role ? config.personaCards[state.role] : [];

  return (
    <div className="flex flex-col w-full min-h-[80vh] bg-white dark:bg-transparent">
      {/* Navigation Bar */}
      <NavigationBar />

      {/* Progress Sidebar - Hidden */}
      {/* <div className="hidden md:block">
        <ProgressSidebar steps={config.progressSteps} />
      </div> */}

      {/* Main Content Area with conditional top padding for fixed nav */}
      <div className={`flex-1 w-full ${state.currentStep !== 'intro' ? 'pt-[72px]' : ''}`}>
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

export function TechExplorerWelcome({ onQuickStart, onNewChat }: { onQuickStart: (prompt: string) => void; onNewChat: () => void }) {
  return (
    <QuestionnaireProvider>
      <TechExplorerWelcomeInner onQuickStart={onQuickStart} onNewChat={onNewChat} />
    </QuestionnaireProvider>
  );
}

