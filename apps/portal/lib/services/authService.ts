import { authRepository, SignUpData, SignInData } from '../repositories/authRepository';

const DEBUG_SIGNUP = true; // set to false to disable signup debug logs

class AuthService {
  async signUp(data: SignUpData) {
    if (DEBUG_SIGNUP) {
      console.debug('[signup] authService.signUp called', { email: data.email });
    }
    try {
      const result = await authRepository.signUp(data);
      if (DEBUG_SIGNUP) {
        console.debug('[signup] authService.signUp success', {
          userId: result.user?.id,
          hasSession: !!result.session,
        });
      }
      return { success: true, data: result };
    } catch (error) {
      if (DEBUG_SIGNUP) {
        console.error('[signup] authService.signUp caught error', {
          error,
          message: error instanceof Error ? error.message : String(error),
          name: error instanceof Error ? error.name : undefined,
          stack: error instanceof Error ? error.stack : undefined,
        });
      }
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  async signIn(data: SignInData) {
    try {
      const result = await authRepository.signIn(data);
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  async signOut() {
    try {
      await authRepository.signOut();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  async resetPassword(email: string) {
    try {
      await authRepository.resetPassword(email);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  async updatePassword(newPassword: string) {
    try {
      await authRepository.updatePassword(newPassword);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }
}

export const authService = new AuthService();
