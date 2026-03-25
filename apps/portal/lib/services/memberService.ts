import { memberRepository } from '../repositories/memberRepository';

class MemberService {
  async getAllMembers() {
    try {
      const data = await memberRepository.getAllMembers();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  async getMembersByDepartment(department: string) {
    try {
      const data = await memberRepository.getMembersByDepartment(department);
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }
}

export const memberService = new MemberService();
