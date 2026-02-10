import { supabase } from '../supabase/client';

export interface MentorApplicationData {
  // Required fields
  // NEW: Basic info fields
  first_name?: string;
  last_name?: string;
  email?: string;
  
  // NEW: Pronouns (array)
  pronouns?: string[];
  
  // NEW: Dropdown fields
  study_term?: string;
  academic_program?: string;
  how_did_you_hear?: string;
  
  // NEW: Radio button fields
  commitment?: string;
  interested_in_events?: string;
  timezone?: string;
  in_waterloo?: string;
  is_international?: string;
  mentees_count?: string;
  was_mentee?: string;
  is_returning?: string;

  user_id: string;
  profile_id: string;
  program?: string;
  year_of_study?: number;
  company?: string;
  role?: string;
  experience_years?: number;
  bio?: string;
  availability?: string;
  preferred_communication?: string;
  additional_info?: string;
}

export interface MenteeApplicationData {
  user_id: string;
  profile_id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  pronouns?: string[];
  study_term?: string;
  academic_program?: string;
  how_did_you_hear?: string;
  commitment?: string;
  interested_in_events?: string;
  timezone?: string;
  in_waterloo?: string;
  is_international?: string;
  mentees_count?: string;
  was_mentee?: string;
  is_returning?: string;
  program?: string;
  year_of_study?: number;
  career_goals?: string;
  areas_of_interest?: string;
  preferred_mentor_characteristics?: string;
  availability?: string;
  preferred_communication?: string;
  additional_info?: string;
}

class ApplicationRepository {
  async createMentorApplication(data: MentorApplicationData) {
    const { data: application, error } = await supabase
      .from('mentor_applications')
      .insert(data)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return application;
  }

  async createMenteeApplication(data: MenteeApplicationData) {
    const { data: application, error } = await supabase
      .from('mentee_applications')
      .insert(data)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return application;
  }

  async getMentorApplication(userId: string) {
    const { data, error } = await supabase
      .from('mentor_applications')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(error.message);
    }

    return data;
  }

  async getMenteeApplication(userId: string) {
    const { data, error } = await supabase
      .from('mentee_applications')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(error.message);
    }

    return data;
  }

  async updateProfileRole(userId: string, role: 'mentor' | 'mentee') {
    const { error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', userId);

    if (error) {
      throw new Error(error.message);
    }
  }
}

export const applicationRepository = new ApplicationRepository();
