import { Sparkles, ArrowRight, Shield, Cloud, TestTube, Workflow, Lightbulb, MessageSquarePlus } from "lucide-react";
import { BlueBanner } from "./blue-banner";

const quickStartItems = [
  {
    icon: ArrowRight,
    title: "Platform Migration",
    subtitle: "PCF to Modern Containers",
    tag: "Migration",
    gradient: "from-blue-500 to-blue-600",
    prompt: "I need help migrating from PCF (Pivotal Cloud Foundry) to modern container platforms. What are my options?",
  },
  {
    icon: Shield,
    title: "Application Containerization",
    subtitle: "Docker & Kubernetes",
    tag: "Modernization",
    gradient: "from-purple-500 to-purple-600",
    prompt: "I want to containerize my applications using Docker and Kubernetes. What technologies and best practices should I follow?",
  },
  {
    icon: Cloud,
    title: "Cloud-Native Development",
    subtitle: "Microservices Architecture",
    tag: "Development",
    gradient: "from-cyan-500 to-cyan-600",
    prompt: "I'm building cloud-native applications with microservices architecture. What platforms and tools do you recommend?",
  },
  {
    icon: TestTube,
    title: "Testing & QA Environment",
    subtitle: "Automated Testing Platforms",
    tag: "Quality Assurance",
    gradient: "from-green-500 to-green-600",
    prompt: "I need to set up automated testing and QA environments. What platforms and frameworks are available?",
  },
  {
    icon: Workflow,
    title: "Microservices Architecture",
    subtitle: "Service Mesh & API Gateway",
    tag: "Architecture",
    gradient: "from-orange-500 to-orange-600",
    prompt: "I'm implementing a microservices architecture. What service mesh and API gateway solutions should I consider?",
  },
  {
    icon: Lightbulb,
    title: "AI/ML Integration",
    subtitle: "Machine Learning Platforms",
    tag: "Innovation",
    gradient: "from-pink-500 to-pink-600",
    prompt: "I want to integrate AI and machine learning into my applications. What platforms and tools are available?",
  },
];

export function WelcomeScreen({ onQuickStart, onNewChat }: { onQuickStart: (prompt: string) => void; onNewChat: () => void }) {
  return (
    <div className="flex flex-col items-center w-full pb-24">
      {/* Blue Banner Section */}
      <div className="w-full max-w-6xl mb-12 px-6">
        <BlueBanner />
      </div>

      {/* Quick Start Section */}
      <div className="w-full max-w-6xl px-6 space-y-5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          <h2 className="text-lg font-semibold text-foreground">Quick Start</h2>
        </div>

        {/* Cards Grid - Horizontal layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Start New Conversation - FIRST CARD */}
          <button
            onClick={onNewChat}
            className="group relative rounded-lg p-4 text-left transition-all duration-200 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <MessageSquarePlus className="h-5 w-5" />
              </div>
              
              <div className="flex-1 min-w-0 pt-0.5">
                <h3 className="font-semibold text-[15px] text-foreground mb-0.5 leading-tight">
                  Start New Conversation
                </h3>
                <p className="text-[13px] text-muted-foreground leading-tight">
                  Begin a fresh chat
                </p>
              </div>
            </div>
          </button>

          {/* Other Quick Start Cards */}
          {quickStartItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => onQuickStart(item.prompt)}
                className="group relative rounded-lg p-4 text-left transition-all duration-200 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-lg bg-gradient-to-br ${item.gradient} text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0 pt-0.5">
                    <h3 className="font-semibold text-[15px] text-foreground mb-0.5 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-muted-foreground mb-2 leading-tight">
                      {item.subtitle}
                    </p>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                      {item.tag}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
