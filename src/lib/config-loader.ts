import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

// TypeScript types for the configuration
export interface Theme {
  brandName: string;
  primaryColor: string;
  accentColor: string;
  tagline: string;
  subtitle: string;
  callToAction: string;
}

export interface Landing {
  title: string;
  description: string;
  longDescription: string;
  tagline: string;
  ctaButton: string;
}

export interface ProgressStep {
  id: string;
  label: string;
}

export interface QuestionOption {
  id: string;
  label: string;
  fullName?: string;
  description?: string;
}

export interface Region {
  id: string;
  label: string;
  countries: string[];
}

export interface Question {
  id: string;
  type: string;
  title: string;
  subtitle?: string;
  stepId: string;
  options?: QuestionOption[];
  regions?: Region[];
}

export interface PersonaCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  relatedTech: string[];
  prompt: string;
}

export interface Technology {
  id: string;
  name: string;
  shortName: string;
  category: string;
  formerlyKnown?: string;
  description: string;
  keyBenefits: string[];
  dependency: string;
  cost: string;
  learnMoreUrl: string;
  requestAccessUrl: string;
  videoUrl?: string;
}

export interface AIAgentConfig {
  greeting: {
    developer: string;
    engineer: string;
    architect: string;
  };
  systemPrompt: string;
}

export interface TechExplorerConfig {
  theme: Theme;
  landing: Landing;
  progressSteps: ProgressStep[];
  questions: Question[];
  personaCards: {
    developer: PersonaCard[];
    engineer: PersonaCard[];
    architect: PersonaCard[];
  };
  technologies: Record<string, Technology>;
  aiAgent: AIAgentConfig;
}

let cachedConfig: TechExplorerConfig | null = null;

/**
 * Load and parse the tech-explorer.yaml configuration file
 * Uses caching to avoid multiple file reads
 */
export function loadConfig(): TechExplorerConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  const configPath = path.join(process.cwd(), 'config', 'tech-explorer.yaml');
  
  try {
    const fileContents = fs.readFileSync(configPath, 'utf8');
    const config = YAML.parse(fileContents) as TechExplorerConfig;
    cachedConfig = config;
    return config;
  } catch (error) {
    console.error('Error loading tech-explorer.yaml:', error);
    throw new Error('Failed to load configuration file');
  }
}

/**
 * Get configuration in a client-safe format (for API routes)
 */
export function getClientConfig(): TechExplorerConfig {
  return loadConfig();
}

/**
 * Get cards for a specific persona/role
 */
export function getCardsForRole(role: 'developer' | 'engineer' | 'architect'): PersonaCard[] {
  const config = loadConfig();
  return config.personaCards[role] || [];
}

/**
 * Get technology by ID
 */
export function getTechnology(techId: string): Technology | undefined {
  const config = loadConfig();
  return config.technologies[techId];
}

/**
 * Get multiple technologies by IDs
 */
export function getTechnologies(techIds: string[]): Technology[] {
  const config = loadConfig();
  return techIds
    .map(id => config.technologies[id])
    .filter(tech => tech !== undefined);
}

/**
 * Get AI agent greeting for a role with context
 */
export function getAIGreeting(
  role: 'developer' | 'engineer' | 'architect',
  sector?: string,
  location?: string
): string {
  const config = loadConfig();
  let greeting = config.aiAgent.greeting[role];
  
  // Replace placeholders
  if (sector) {
    greeting = greeting.replace('{sector}', ` in ${sector.toUpperCase()}`);
  } else {
    greeting = greeting.replace('{sector}', '');
  }
  
  if (location) {
    greeting = greeting.replace('{location}', ` based in ${location}`);
  } else {
    greeting = greeting.replace('{location}', '');
  }
  
  return greeting;
}

/**
 * Get AI system prompt with context
 */
export function getAISystemPrompt(context: {
  sector?: string;
  location?: string;
  role?: string;
  cardContext?: string;
}): string {
  const config = loadConfig();
  let prompt = config.aiAgent.systemPrompt;
  
  // Replace placeholders
  prompt = prompt.replace('{sector}', context.sector || 'Not specified');
  prompt = prompt.replace('{location}', context.location || 'Not specified');
  prompt = prompt.replace('{role}', context.role || 'Not specified');
  prompt = prompt.replace('{cardContext}', context.cardContext || 'General inquiry');
  
  // Add available technologies list
  const techList = Object.values(config.technologies)
    .map(tech => `- ${tech.name}: ${tech.description.substring(0, 100)}...`)
    .join('\n');
  prompt = prompt.replace('{availableTech}', techList);
  
  return prompt;
}

