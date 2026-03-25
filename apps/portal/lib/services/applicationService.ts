import {
  applicationRepository,
  MentorApplicationData,
  MenteeApplicationData,
} from '../repositories/applicationRepository';

class ApplicationService {
  async submitMentorApplication(data: MentorApplicationData) {
    try {
      // Create application first so we don't update profile role if insert fails
      const result = await applicationRepository.createMentorApplication(data);
      await applicationRepository.updateProfileRole(data.user_id, 'mentor');
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  async submitMenteeApplication(data: MenteeApplicationData) {
    try {
      // Create application first so we don't update profile role if insert fails
      const result = await applicationRepository.createMenteeApplication(data);
      await applicationRepository.updateProfileRole(data.user_id, 'mentee');
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  async getMentorApplication(userId: string) {
    try {
      const result = await applicationRepository.getMentorApplication(userId);
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  async getMenteeApplication(userId: string) {
    try {
      const result = await applicationRepository.getMenteeApplication(userId);
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }
}

export const applicationService = new ApplicationService();
