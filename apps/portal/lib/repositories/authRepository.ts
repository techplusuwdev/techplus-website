import { supabase } from '../supabase/client';

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export type UserRole = 'default' | 'mentor' | 'mentee' | 'admin';

export interface ProfileData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  created_at?: string;
  updated_at?: string;
}

const DEBUG_SIGNUP = true; // set to false to disable signup debug logs

/** Log every property on an error so we don't miss anything Supabase attaches */
function logFullError(label: string, err: unknown) {
  if (!DEBUG_SIGNUP || err == null) return;
  const o = err as Record<string, unknown>;
  const keys = [...new Set([...Object.keys(o), ...Object.getOwnPropertyNames(o)])];
  const dump: Record<string, unknown> = {};
  for (const k of keys) {
    try {
      dump[k] = (o as Record<string, unknown>)[k];
    } catch {
      dump[k] = '(getter threw)';
    }
  }
  console.error(`[signup] ${label}`, dump);
  try {
    console.error(`[signup] ${label} (JSON):`, JSON.stringify(dump, null, 2));
  } catch {
    console.error(`[signup] ${label} (JSON failed, see object above)`);
  }
  console.error('[signup] Real cause is server-side. Check: Supabase Dashboard → Logs → Postgres (or Auth) for the actual DB/trigger error.');
}

class AuthRepository {
  async signUp(data: SignUpData) {
    const { email, password, firstName, lastName } = data;

    if (DEBUG_SIGNUP) {
      console.debug('[signup] Starting signUp', {
        email,
        hasFirstName: !!firstName,
        hasLastName: !!lastName,
      });
    }

    // Sign up user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (DEBUG_SIGNUP) {
      console.debug('[signup] auth.signUp result', {
        userId: authData?.user?.id,
        hasSession: !!authData?.session,
        authError: authError
          ? {
            message: authError.message,
            name: authError.name,
            status: authError.status,
            code: (authError as { code?: string })?.code,
          }
          : null,
      });
    }

    if (authError) {
      if (DEBUG_SIGNUP) {
        logFullError('auth.signUp failed – full error', authError);
      }
      throw new Error(authError.message);
    }

    if (!authData.user) {
      if (DEBUG_SIGNUP) {
        console.error('[signup] auth.signUp returned no user', { authData });
      }
      throw new Error('Failed to create user');
    }

    // Create profile - only if user is confirmed (or if email confirmation is disabled)
    // If email confirmation is required, profile will be created via database trigger or after confirmation
    if (authData.session) {
      const profilePayload = {
        id: authData.user.id,
        email,
        first_name: firstName,
        last_name: lastName,
      };
      if (DEBUG_SIGNUP) {
        console.debug('[signup] Inserting profile (session present)', {
          userId: profilePayload.id,
          email: profilePayload.email,
        });
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .insert(profilePayload);

      if (DEBUG_SIGNUP) {
        console.debug('[signup] profiles insert result', {
          profileError: profileError
            ? {
              message: profileError.message,
              code: profileError.code,
              details: profileError.details,
              hint: profileError.hint,
            }
            : null,
        });
      }

      if (profileError) {
        // Log error but don't fail signup - profile can be created later
        console.error('[signup] Profile creation error (full)', profileError);
      }
    } else if (DEBUG_SIGNUP) {
      console.debug('[signup] No session after signUp – profile may be created by DB trigger on confirm');
    }

    return authData;
  }

  async signIn(data: SignInData) {
    const { email, password } = data;
    
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return authData;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }

  async resetPassword(email: string) {
    const redirectTo = typeof window !== 'undefined' 
      ? `${window.location.origin}/reset-password`
      : '/reset-password';
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      throw new Error(error.message);
    }
    return user;
  }

  async getProfile(userId: string): Promise<ProfileData | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(error.message);
    }

    return data;
  }

  async updateProfile(userId: string, updates: Partial<ProfileData>) {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}

export const authRepository = new AuthRepository();
