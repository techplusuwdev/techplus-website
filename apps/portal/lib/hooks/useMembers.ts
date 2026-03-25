'use client';

import { useState, useEffect } from 'react';
import type { MemberData } from '@/lib/repositories/memberRepository';

interface UseMembersOptions {
  department?: string;
}

interface UseMembersResult {
  members: MemberData[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useMembers(options: UseMembersOptions = {}): UseMembersResult {
  const [members, setMembers] = useState<MemberData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchKey, setFetchKey] = useState(0);

  const { department } = options;

  useEffect(() => {
    let cancelled = false;

    async function fetchMembers() {
      setIsLoading(true);
      setError(null);

      try {
        const url = new URL('/api/members', window.location.origin);
        if (department) url.searchParams.set('department', department);

        const response = await fetch(url.toString());
        const json = await response.json();

        if (cancelled) return;

        if (!response.ok || !json.success) {
          setError(json.error ?? 'Failed to fetch members');
        } else {
          setMembers(json.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch members');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchMembers();
    return () => { cancelled = true; };
  }, [department, fetchKey]);

  return {
    members,
    isLoading,
    error,
    refetch: () => setFetchKey((k) => k + 1),
  };
}
