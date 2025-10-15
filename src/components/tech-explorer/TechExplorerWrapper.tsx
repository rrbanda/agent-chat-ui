"use client";

import { useState } from 'react';
import { Thread } from '@/components/thread';
import { TechExplorer } from './TechExplorer';
import { QuestionnaireProvider } from '@/providers/QuestionnaireContext';

interface ChatContext {
  sector?: string;
  location?: string;
  role?: string;
  cardContext: string;
}

export function TechExplorerWrapper() {
  const [showChat, setShowChat] = useState(false);
  const [chatContext, setChatContext] = useState<ChatContext | null>(null);

  const handleStartChat = (context: ChatContext) => {
    setChatContext(context);
    setShowChat(true);
  };

  const handleBackToQuestionnaire = () => {
    setShowChat(false);
    // Optionally reset context
  };

  if (showChat) {
    return (
      <div className="relative h-screen">
        {/* Back button to return to questionnaire */}
        <button
          onClick={handleBackToQuestionnaire}
          className="absolute top-4 left-4 z-10 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          ← Back to Explorer
        </button>
        
        {/* Chat Interface with context */}
        <Thread />
      </div>
    );
  }

  return (
    <QuestionnaireProvider>
      <TechExplorer onStartChat={handleStartChat} />
    </QuestionnaireProvider>
  );
}

