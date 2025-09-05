import { useState, useEffect, createContext} from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../integrations/supabase/client';
import { Outlet, useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  getIsAdmin: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<{ error?: string }>;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  updatePassword: (password: string) => Promise<{ error?: string }>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export const AuthProvider = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const getIsAdmin = async() => {
    if (!user) return;
    const { data } = await supabase.from('admin_profiles').select('*').eq('user_id', user.id);
    setIsAdmin(data?.length ? true : false)
  }

  const register = async (email: string, password: string, name: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name: name,
            display_name: name
          }
        }
      });

      if (error) {
        return { error: error.message };
      }

      alert('Conta criada! Verifique seu email para confirmar a conta.')

      return {};
    } catch {
      return { error: 'Erro inesperado ao criar conta' };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password});

      if (error) {
        alert(error.message);
        return { error: error.message };
      }

      return {};
    } catch {
      return { error: 'Erro inesperado ao fazer login' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        return { error: error.message };
      }

      alert('Email enviado! Verifique seu email para redefinir a senha.')

      return {};
    } catch {
      return { error: 'Erro inesperado ao enviar email de redefinição' };
    }
  };

  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        alert(error.message);
        return { error: error.message };
      }

      alert('Senha atualizada com sucesso.');

      return {};
    } catch {
      return { error: 'Erro inesperado ao atualizar senha' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, getIsAdmin, register, login, logout, resetPassword, updatePassword, loading }}>
      { !loading && <Outlet /> }
    </AuthContext.Provider>
  );
};
