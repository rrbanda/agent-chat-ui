"use client";

import { useEffect, useState } from 'react';
import type { TechExplorerConfig } from '@/lib/config-loader';

/**
 * Hook to load and use the Tech Explorer configuration
 * Fetches config from API route on mount
 */
export function useConfig() {
  const [config, setConfig] = useState<TechExplorerConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const response = await fetch('/api/config');
        if (!response.ok) {
          throw new Error('Failed to fetch configuration');
        }
        const data = await response.json();
        setConfig(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchConfig();
  }, []);

  return { config, loading, error };
}

