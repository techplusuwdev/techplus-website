import { supabase } from '../supabase/client';

export interface MentorApplicationData {
  user_id: string;
  profile_id: string;

  // Page 1 — basic info
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

  // Page 2 — optional diversity info
  race_ethnic_origin?: string;
  gender?: string;
  sexual_orientation?: string;
  is_indigenous?: string;

  // Page 3 — profile / interests
  contact_methods?: string[];
  ask_me_about?: string;
  freetime_interests?: string;

  // Page 4 — profile picture
  profile_picture_url?: string;

  // Legacy fields (kept for schema compatibility)
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

  // Page 1 — basic info
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
  is_returning?: string;

  // Page 2 — mentee-specific
  mentorship_goals?: string;
  dei_agreement?: string;
  portfolio_link?: string;

  // Page 3 — profile / interests
  contact_methods?: string[];
  ask_me_about?: string;
  freetime_interests?: string;

  // Page 4 — profile picture
  profile_picture_url?: string;

  // Legacy fields (kept for schema compatibility)
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
