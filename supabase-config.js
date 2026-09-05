/* =============================================================
   SUPABASE CONFIG — Authentication & Database Client
   Supports: Email/Password, Google OAuth, Unique Emails & Online Status
   ============================================================= */

// ⚠️ REPLACE THESE with your actual Supabase project credentials
// Find them at: https://supabase.com/dashboard → Project Settings → API
const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Load Supabase client library from CDN
// This script should be loaded AFTER the Supabase CDN script in HTML:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

(function () {
  'use strict';

  // Check if live Supabase credentials have been configured
  const isLive = Boolean(
    window.supabase &&
    SUPABASE_URL &&
    SUPABASE_URL.startsWith('https://') &&
    !SUPABASE_URL.includes('YOUR_SUPABASE_PROJECT_URL') &&
    SUPABASE_ANON_KEY &&
    !SUPABASE_ANON_KEY.includes('YOUR_SUPABASE_ANON_KEY')
  );

  let supabase = null;
  if (isLive) {
    try {
      supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      console.log('✅ Supabase initialized in Live Cloud Mode');
    } catch (err) {
      console.error('❌ Failed to initialize Supabase client:', err);
    }
  } else {
    console.info('⚡ Supabase running in Local Demo Mode. Configure SUPABASE_URL & SUPABASE_ANON_KEY in supabase-config.js to connect live.');
  }

  // Local demo storage keys
  const DEMO_USERS_KEY = 'supabase_demo_profiles';
  const DEMO_SESSION_KEY = 'supabase_demo_session';

  function getDemoUsers() {
    try {
      return JSON.parse(localStorage.getItem(DEMO_USERS_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveDemoUsers(users) {
    localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(users));
  }

  function getDemoSession() {
    try {
      return JSON.parse(localStorage.getItem(DEMO_SESSION_KEY) || 'null');
    } catch (e) {
      return null;
    }
  }

  function setDemoSession(session) {
    if (session) {
      localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(DEMO_SESSION_KEY);
    }
  }

  // ─────────────────────────────────────────────
  //  Auth Helper Functions
  // ─────────────────────────────────────────────

  /**
   * Check if an email is already registered
   * Ensures each email address can only be used once!
   * @param {string} email
   * @returns {Promise<boolean>}
   */
  async function isEmailRegistered(email) {
    const cleanEmail = email.trim().toLowerCase();
    if (supabase) {
      // Check in profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', cleanEmail)
        .maybeSingle();

      if (!error && data) return true;
      return false;
    }

    const users = getDemoUsers();
    return users.some(u => u.email.toLowerCase() === cleanEmail);
  }

  /**
   * Sign up manually with email, password, and full name
   * Enforces: Each email address can be used only once!
   * @param {string} email
   * @param {string} password
   * @param {string} fullName
   * @returns {Promise<{data, error}>}
   */
  async function signUp(email, password, fullName) {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = fullName.trim();

    if (supabase) {
      // 1. Check if email already registered in profiles
      const alreadyExists = await isEmailRegistered(cleanEmail);
      if (alreadyExists) {
        return {
          data: null,
          error: { message: 'This email address is already registered. Each email address can be used only once. Please log in.' }
        };
      }

      // 2. Create auth user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: { full_name: cleanName }
        }
      });

      if (authError) {
        if (authError.message.toLowerCase().includes('already') || authError.message.toLowerCase().includes('registered')) {
          return {
            data: null,
            error: { message: 'This email address is already registered. Each email address can be used only once.' }
          };
        }
        return { data: null, error: authError };
      }

      // Supabase email identity check: if identities is empty array, user was already registered
      if (authData.user && Array.isArray(authData.user.identities) && authData.user.identities.length === 0) {
        return {
          data: null,
          error: { message: 'This email address is already registered. Each email address can be used only once. Please log in.' }
        };
      }

      // 3. Insert or update profile into the 'profiles' table
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: authData.user.id,
            full_name: cleanName,
            email: cleanEmail,
            created_at: new Date().toISOString()
          }, { onConflict: 'id' });

        if (profileError) {
          console.warn('Profile upsert notice:', profileError.message);
        }
      }

      return { data: authData, error: null };
    }

    // --- Fallback Demo Mode ---
    const users = getDemoUsers();
    const existing = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return {
        data: null,
        error: { message: 'This email address is already registered. Each email address can be used only once.' }
      };
    }

    const newUser = {
      id: 'demo-user-' + Math.random().toString(36).substr(2, 9),
      email: cleanEmail,
      password: password,
      user_metadata: { full_name: cleanName },
      created_at: new Date().toISOString()
    };

    const newProfile = {
      id: newUser.id,
      full_name: cleanName,
      email: cleanEmail,
      created_at: newUser.created_at
    };

    users.push({ ...newUser, profile: newProfile });
    saveDemoUsers(users);

    const session = {
      access_token: 'demo-token-' + Date.now(),
      user: newUser
    };
    setDemoSession(session);

    return {
      data: { user: newUser, session: session },
      error: null
    };
  }

  /**
   * Sign in manually with email and password
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{data, error}>}
   */
  async function signIn(email, password) {
    const cleanEmail = email.trim().toLowerCase();

    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password
      });
      return { data, error };
    }

    // --- Fallback Demo Mode ---
    const users = getDemoUsers();
    const userMatch = users.find(
      u => u.email.toLowerCase() === cleanEmail && u.password === password
    );

    if (userMatch) {
      const session = {
        access_token: 'demo-token-' + Date.now(),
        user: userMatch
      };
      setDemoSession(session);
      return { data: { user: userMatch, session: session }, error: null };
    }

    // Default demo account
    if (cleanEmail === 'demo@paruluniversity.ac.in' && password === 'Demo@1234') {
      const defaultUser = {
        id: 'demo-admin-id',
        email: 'demo@paruluniversity.ac.in',
        user_metadata: { full_name: 'Aayush Singh' },
        created_at: '2026-01-15T09:00:00.000Z'
      };
      const session = { access_token: 'demo-token', user: defaultUser };
      setDemoSession(session);
      return { data: { user: defaultUser, session: session }, error: null };
    }

    return { data: null, error: { message: 'Invalid email or password.' } };
  }

  /**
   * Sign in / Sign up with Google OAuth
   * @returns {Promise<{data, error}>}
   */
  async function signInWithGoogle() {
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/dashboard.html'
        }
      });
      return { data, error };
    }

    // --- Fallback Demo Google OAuth Simulation ---
    const demoGoogleUser = {
      id: 'google-user-' + Date.now(),
      email: 'aayush.google@gmail.com',
      user_metadata: {
        full_name: 'Aayush Singh (Google)',
        avatar_url: 'https://lh3.googleusercontent.com/a/default-user'
      },
      created_at: new Date().toISOString()
    };

    const session = {
      access_token: 'google-demo-token-' + Date.now(),
      user: demoGoogleUser
    };
    setDemoSession(session);

    // Save profile to demo list if not already present
    const users = getDemoUsers();
    const existing = users.find(u => u.email === demoGoogleUser.email);
    if (!existing) {
      users.push({
        ...demoGoogleUser,
        profile: {
          id: demoGoogleUser.id,
          full_name: demoGoogleUser.user_metadata.full_name,
          email: demoGoogleUser.email,
          created_at: demoGoogleUser.created_at
        }
      });
      saveDemoUsers(users);
    }

    return { data: { user: demoGoogleUser, session }, error: null };
  }

  /**
   * Sign out the current user
   */
  async function signOut() {
    if (supabase) {
      const { error } = await supabase.auth.signOut();
      return { error };
    }
    setDemoSession(null);
    return { error: null };
  }

  /**
   * Get current session
   */
  async function getSession() {
    if (supabase) {
      const { data, error } = await supabase.auth.getSession();
      return { data, error };
    }
    const session = getDemoSession();
    return { data: { session }, error: null };
  }

  /**
   * Get current user
   */
  async function getUser() {
    if (supabase) {
      const { data, error } = await supabase.auth.getUser();
      return { data, error };
    }
    const session = getDemoSession();
    return { data: { user: session ? session.user : null }, error: null };
  }

  /**
   * Get user profile from database table
   */
  async function getProfile(userId) {
    if (supabase) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      return { data, error };
    }

    const users = getDemoUsers();
    const match = users.find(u => u.id === userId);
    if (match && match.profile) {
      return { data: match.profile, error: null };
    }
    const session = getDemoSession();
    if (session && session.user && session.user.id === userId) {
      return {
        data: {
          id: userId,
          full_name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || 'User',
          email: session.user.email,
          created_at: session.user.created_at
        },
        error: null
      };
    }
    return { data: null, error: { message: 'Profile not found' } };
  }

  /**
   * Listen for auth state changes
   */
  function onAuthStateChange(callback) {
    if (supabase) {
      return supabase.auth.onAuthStateChange(callback);
    }
    return { data: { subscription: { unsubscribe: () => {} } } };
  }

  /**
   * Get user initials for avatars
   */
  function getInitials(name) {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  }

  /**
   * Update the website navigation once user is online
   * Displays the account holder's name with an active online badge!
   */
  async function updateNavAuth() {
    const authNavLink = document.getElementById('authNavLink');
    const signupNavLink = document.getElementById('signupNavLink');
    const userOnlinePill = document.getElementById('userOnlinePill');
    const navUserName = document.getElementById('navUserName');
    const navUserAvatar = document.getElementById('navUserAvatar');

    try {
      const { data } = await getSession();
      if (data && data.session && data.session.user) {
        const user = data.session.user;
        const { data: profile } = await getProfile(user.id);
        const fullName = profile?.full_name ||
                         user.user_metadata?.full_name ||
                         user.user_metadata?.name ||
                         user.email?.split('@')[0] ||
                         'Learner';

        // 1. Display the account holder's name and avatar in the online pill
        if (userOnlinePill) {
          userOnlinePill.style.display = 'inline-flex';
          userOnlinePill.href = './dashboard.html';
        }
        if (navUserName) {
          navUserName.textContent = fullName;
        }
        if (navUserAvatar) {
          navUserAvatar.textContent = getInitials(fullName);
        }

        // 2. Convert Login link to Dashboard link
        if (authNavLink) {
          authNavLink.textContent = '📊 Dashboard';
          authNavLink.href = './dashboard.html';
          authNavLink.style.color = '#10b981';
          authNavLink.style.display = 'inline-block';
        }

        // 3. Hide Sign Up link since user is already online
        if (signupNavLink) {
          signupNavLink.style.display = 'none';
        }
      } else {
        // User is offline / logged out
        if (userOnlinePill) {
          userOnlinePill.style.display = 'none';
        }
        if (authNavLink) {
          authNavLink.textContent = '🔐 Login';
          authNavLink.href = './login.html';
          authNavLink.style.color = '#c084fc';
          authNavLink.style.display = 'inline-block';
        }
        if (signupNavLink) {
          signupNavLink.style.display = 'inline-block';
        }
      }
    } catch (e) {
      console.error('Nav auth update error:', e);
    }
  }

  function isLiveMode() {
    return isLive;
  }

  // ─────────────────────────────────────────────
  //  Expose as global namespace
  // ─────────────────────────────────────────────
  window.SupabaseAuth = {
    client: supabase,
    isLiveMode,
    isEmailRegistered,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    getSession,
    getUser,
    getProfile,
    getInitials,
    onAuthStateChange,
    updateNavAuth
  };

  // Auto-update nav on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateNavAuth);
  } else {
    updateNavAuth();
  }
})();
