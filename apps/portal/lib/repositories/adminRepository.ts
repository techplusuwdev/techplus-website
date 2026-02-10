import { supabase } from '../supabase/client';
import type { UserRole } from './authRepository';

export interface AdminStats {
  totalMembers: number;
  mentors: number;
  mentees: number;
  execs: number;
}

export interface UserSearchResult {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
}

class AdminRepository {
  async getStats(): Promise<AdminStats> {
    // Get total members
    const { count: totalCount, error: countError } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      if (countError.code === 'PGRST301' || countError.message.includes('permission denied')) {
        throw new Error('Permission denied. Make sure you have admin access and the admin policies are set up correctly.');
      }
      throw new Error(countError.message);
    }

    // Get counts by role
    const { data: roleCounts, error } = await supabase
      .from('profiles')
      .select('role');

    if (error) {
      if (error.code === 'PGRST301' || error.message.includes('permission denied')) {
        throw new Error('Permission denied. Make sure you have admin access and the admin policies are set up correctly.');
      }
      throw new Error(error.message);
    }

    const mentors = roleCounts?.filter((p) => p.role === 'mentor').length || 0;
    const mentees = roleCounts?.filter((p) => p.role === 'mentee').length || 0;
    const execs = roleCounts?.filter((p) => p.role === 'admin').length || 0;

    return {
      totalMembers: totalCount || 0,
      mentors,
      mentees,
      execs,
    };
  }

  async searchUserByEmail(email: string): Promise<UserSearchResult | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, first_name, last_name, role')
      .ilike('email', email)
      .limit(1)
      .maybeSingle();

    if (error) {
      // Handle RLS errors more gracefully
      if (error.code === 'PGRST301' || error.message.includes('permission denied')) {
        throw new Error('Permission denied. Make sure you have admin access and the admin policies are set up correctly.');
      }
      throw new Error(error.message);
    }

    return data as UserSearchResult | null;
  }

  async updateUserRole(userId: string, newRole: UserRole): Promise<void> {
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId);

    if (error) {
      throw new Error(error.message);
    }
  }

  async getAllUsers(): Promise<UserSearchResult[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, first_name, last_name, role')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data as UserSearchResult[];
  }

  async getAllApplications() {
    const [mentorApplications, menteeApplications] = await Promise.all([
      supabase.from('mentor_applications').select('*, profiles(first_name, last_name, email)'),
      supabase.from('mentee_applications').select('*, profiles(first_name, last_name, email)'),
    ]);

    if (mentorApplications.error) {
      throw new Error(mentorApplications.error.message);
    }

    if (menteeApplications.error) {
      throw new Error(menteeApplications.error.message);
    }

    return {
      mentor: mentorApplications.data || [],
      mentee: menteeApplications.data || [],
    };
  }

  async updateApplicationStatus(
    id: string,
    type: 'mentor' | 'mentee',
    status: 'pending' | 'approved' | 'rejected'
  ): Promise<void> {
    const table = type === 'mentor' ? 'mentor_applications' : 'mentee_applications';
    
    const { error } = await supabase
      .from(table)
      .update({ status })
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
  }
}

export const adminRepository = new AdminRepository();
