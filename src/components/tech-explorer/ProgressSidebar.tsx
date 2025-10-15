"use client";

import { Check } from 'lucide-react';
import { useQuestionnaire } from '@/providers/QuestionnaireContext';
import type { ProgressStep } from '@/lib/config-loader';

interface ProgressSidebarProps {
  steps: ProgressStep[];
}

export function ProgressSidebar({ steps }: ProgressSidebarProps) {
  const { state } = useQuestionnaire();

  const getStepStatus = (stepId: string): 'completed' | 'current' | 'upcoming' => {
    const stepOrder = ['intro', 'question1', 'question2', 'question3', 'results'];
    const currentIndex = stepOrder.indexOf(state.currentStep);
    const stepIndex = stepOrder.indexOf(stepId);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col items-center py-12">
      {steps.map((step, index) => {
        const status = getStepStatus(step.id);
        const isCompleted = status === 'completed';
        const isCurrent = status === 'current';

        return (
          <div key={step.id} className="flex flex-col items-center mb-8">
            {/* Circle indicator */}
            <div
              className={`
                w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all
                ${
                  isCompleted
                    ? 'bg-green-500 border-green-500'
                    : isCurrent
                      ? 'bg-[#0066CC] border-[#0066CC]'
                      : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700'
                }
              `}
            >
              {isCompleted ? (
                <Check className="w-6 h-6 text-white" />
              ) : (
                <span
                  className={`
                    text-sm font-medium
                    ${isCurrent ? 'text-white' : 'text-gray-400 dark:text-gray-600'}
                  `}
                >
                  {index === 0 ? '' : index}
                </span>
              )}
            </div>

            {/* Label */}
            <p
              className={`
                mt-2 text-xs text-center font-medium
                ${
                  isCurrent
                    ? 'text-[#0066CC]'
                    : isCompleted
                      ? 'text-gray-700 dark:text-gray-300'
                      : 'text-gray-400 dark:text-gray-600'
                }
              `}
            >
              {step.label}
            </p>

            {/* Connecting line */}
            {index < steps.length - 1 && (
              <div
                className={`
                  w-0.5 h-8 mt-4
                  ${isCompleted ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-800'}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

