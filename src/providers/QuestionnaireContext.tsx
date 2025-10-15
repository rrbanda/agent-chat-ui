"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface QuestionnaireState {
  sector?: string;
  location?: string;
  role?: 'developer' | 'engineer' | 'architect';
  selectedCard?: string;
  currentStep: 'intro' | 'question1' | 'question2' | 'question3' | 'results';
}

interface QuestionnaireContextType {
  state: QuestionnaireState;
  updateSector: (sector: string) => void;
  updateLocation: (location: string) => void;
  updateRole: (role: 'developer' | 'engineer' | 'architect') => void;
  updateSelectedCard: (cardId: string, chatContext: string) => void;
  goToStep: (step: QuestionnaireState['currentStep']) => void;
  goBack: () => void;
  reset: () => void;
}

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);

const initialState: QuestionnaireState = {
  currentStep: 'intro',
};

export function QuestionnaireProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<QuestionnaireState>(initialState);

  const updateSector = (sector: string) => {
    setState(prev => ({ ...prev, sector, currentStep: 'question2' }));
  };

  const updateLocation = (location: string) => {
    setState(prev => ({ ...prev, location, currentStep: 'question3' }));
  };

  const updateRole = (role: 'developer' | 'engineer' | 'architect') => {
    setState(prev => ({ ...prev, role, currentStep: 'results' }));
  };

  const updateSelectedCard = (cardId: string, chatContext: string) => {
    setState(prev => ({ ...prev, selectedCard: cardId }));
    // Will be used to pass context to AI chat
  };

  const goToStep = (step: QuestionnaireState['currentStep']) => {
    setState(prev => ({ ...prev, currentStep: step }));
  };

  const goBack = () => {
    setState(prev => {
      const stepOrder: QuestionnaireState['currentStep'][] = ['intro', 'question1', 'question2', 'question3', 'results'];
      const currentIndex = stepOrder.indexOf(prev.currentStep);
      if (currentIndex > 0) {
        return { ...prev, currentStep: stepOrder[currentIndex - 1] };
      }
      return prev;
    });
  };

  const reset = () => {
    setState(initialState);
  };

  return (
    <QuestionnaireContext.Provider
      value={{
        state,
        updateSector,
        updateLocation,
        updateRole,
        updateSelectedCard,
        goToStep,
        goBack,
        reset,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
}

export function useQuestionnaire() {
  const context = useContext(QuestionnaireContext);
  if (context === undefined) {
    throw new Error('useQuestionnaire must be used within a QuestionnaireProvider');
  }
  return context;
}

