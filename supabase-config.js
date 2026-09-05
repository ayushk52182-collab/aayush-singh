/* =============================================================
   SUPABASE CONFIG — Authentication & Database Client
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
    console.info('⚡ Supabase running in Local Demo Mode. Configure SUPABASE_URL & SUPABASE_ANON_KEY in supabase-config.js to connect to live Supabase.');
  }

  // Local demo storage helpers (fallback when credentials not yet set)
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
   * Sign up a new user with email/password and save profile to database
   * @param {string} email
   * @param {string} password
   * @param {string} fullName
   * @returns {Promise<{data, error}>}
   */
  async function signUp(email, password, fullName) {
    if (supabase) {
      // 1. Create auth user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      });

      if (authError) return { data: null, error: authError };

      // 2. Insert profile into the 'profiles' database table
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: authData.user.id,
            full_name: fullName,
            email: email,
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
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { data: null, error: { message: 'User already registered with this email.' } };
    }

    const newUser = {
      id: 'demo-user-' + Math.random().toString(36).substr(2, 9),
      email: email,
      password: password,
      user_metadata: { full_name: fullName },
      created_at: new Date().toISOString()
    };

    const newProfile = {
      id: newUser.id,
      full_name: fullName,
      email: email,
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
   * Sign in with email and password
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{data, error}>}
   */
  async function signIn(email, password) {
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      return { data, error };
    }

    // --- Fallback Demo Mode ---
    const users = getDemoUsers();
    const userMatch = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (userMatch) {
      const session = {
        access_token: 'demo-token-' + Date.now(),
        user: userMatch
      };
      setDemoSession(session);
      return { data: { user: userMatch, session: session }, error: null };
    }

    // Also support default demo account if no users created yet
    if (email === 'demo@paruluniversity.ac.in' && password === 'Demo@1234') {
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
          full_name: session.user.user_metadata?.full_name || 'User',
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
   * Update the navbar based on auth state
   */
  async function updateNavAuth() {
    const authNavLink = document.getElementById('authNavLink');
    const signupNavLink = document.getElementById('signupNavLink');
    if (!authNavLink) return;

    const { data } = await getSession();
    if (data && data.session) {
      authNavLink.textContent = '📊 Dashboard';
      authNavLink.href = './dashboard.html';
      authNavLink.style.color = '#68b29b';
      if (signupNavLink) signupNavLink.style.display = 'none';
    } else {
      authNavLink.textContent = '🔐 Login';
      authNavLink.href = './login.html';
      authNavLink.style.color = '#c084fc';
      if (signupNavLink) signupNavLink.style.display = 'inline-block';
    }
  }

  // Check if live or demo mode
  function isLiveMode() {
    return isLive;
  }

  // ─────────────────────────────────────────────
  //  Expose as global namespace
  // ─────────────────────────────────────────────
  window.SupabaseAuth = {
    client: supabase,
    isLiveMode,
    signUp,
    signIn,
    signOut,
    getSession,
    getUser,
    getProfile,
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
