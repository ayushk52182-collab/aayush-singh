/* =============================================================
   SUPABASE & GOOGLE AUTH CLIENT
   Supports: Live Google OAuth, Google Identity Services,
             Unique Emails, Account Holder Name Display & Online Pill
   ============================================================= */

// ⚠️ Optional: Live Supabase project credentials (from supabase.com)
const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// ⚠️ Optional: Google Cloud OAuth Client ID (from console.cloud.google.com)
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';

(function () {
  'use strict';

  // Check if live Supabase is configured
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
  }

  // Storage keys for profiles & sessions
  const USERS_KEY = 'supabase_registered_profiles';
  const SESSION_KEY = 'supabase_active_session';

  function getStoredUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveStoredUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function getStoredSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    } catch (e) {
      return null;
    }
  }

  function setStoredSession(session) {
    if (session) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }

  // ─────────────────────────────────────────────
  //  Email Uniqueness Checker
  // ─────────────────────────────────────────────
  async function isEmailRegistered(email) {
    const cleanEmail = email.trim().toLowerCase();
    if (supabase) {
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', cleanEmail)
        .maybeSingle();
      if (!error && data) return true;
      return false;
    }

    const users = getStoredUsers();
    return users.some(u => u.email && u.email.toLowerCase() === cleanEmail);
  }

  // ─────────────────────────────────────────────
  //  Manual Sign Up & Sign In
  // ─────────────────────────────────────────────
  async function signUp(email, password, fullName) {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = fullName.trim();

    if (supabase) {
      const alreadyExists = await isEmailRegistered(cleanEmail);
      if (alreadyExists) {
        return {
          data: null,
          error: { message: 'This email address is already registered. Each email address can be used only once. Please log in.' }
        };
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: { full_name: cleanName }
        }
      });

      if (authError) {
        if (authError.message.toLowerCase().includes('already') || authError.message.toLowerCase().includes('exists')) {
          return {
            data: null,
            error: { message: 'This email address is already registered. Each email address can be used only once.' }
          };
        }
        return { data: null, error: authError };
      }

      if (authData.user && Array.isArray(authData.user.identities) && authData.user.identities.length === 0) {
        return {
          data: null,
          error: { message: 'This email address is already registered. Each email address can be used only once. Please log in.' }
        };
      }

      if (authData.user) {
        await supabase
          .from('profiles')
          .upsert({
            id: authData.user.id,
            full_name: cleanName,
            email: cleanEmail,
            created_at: new Date().toISOString()
          }, { onConflict: 'id' });
      }

      return { data: authData, error: null };
    }

    // Local Storage Flow (Enforces unique email)
    const users = getStoredUsers();
    const existing = users.find(u => u.email && u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return {
        data: null,
        error: { message: 'This email address is already registered. Each email address can be used only once.' }
      };
    }

    const newUser = {
      id: 'user-' + Math.random().toString(36).substr(2, 9),
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
    saveStoredUsers(users);

    const session = {
      access_token: 'token-' + Date.now(),
      user: newUser
    };
    setStoredSession(session);

    return { data: { user: newUser, session }, error: null };
  }

  async function signIn(email, password) {
    const cleanEmail = email.trim().toLowerCase();

    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password
      });
      return { data, error };
    }

    const users = getStoredUsers();
    const userMatch = users.find(
      u => u.email && u.email.toLowerCase() === cleanEmail && u.password === password
    );

    if (userMatch) {
      const session = {
        access_token: 'token-' + Date.now(),
        user: userMatch
      };
      setStoredSession(session);
      return { data: { user: userMatch, session }, error: null };
    }

    return { data: null, error: { message: 'Invalid email or password.' } };
  }

  // ─────────────────────────────────────────────
  //  Google Authentication
  // ─────────────────────────────────────────────
  /**
   * Prompts user for their actual Google account credentials
   * so their real name & email are displayed on the portal
   */
  function openGoogleAccountModal(callback) {
    // Remove existing modal if any
    const existing = document.getElementById('googleConnectModalOverlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'googleConnectModalOverlay';
    overlay.className = 'google-modal-overlay';
    overlay.innerHTML = `
      <div class="google-modal-card">
        <button type="button" class="google-modal-close" id="closeGoogleModalBtn" aria-label="Close">✕</button>
        <div class="google-modal-header">
          <div class="google-modal-icon">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
          </div>
          <h3 class="google-modal-title">Sign In with Google</h3>
          <p class="google-modal-subtitle">
            Enter your Google account details to log in as yourself and display your name on the website portal.
          </p>
        </div>

        <div id="googleModalError" style="display:none; padding:10px 14px; background:#fef2f2; color:#dc2626; border:1px solid #fecaca; border-radius:8px; font-size:13px; font-weight:600; margin-bottom:14px; text-align:center;"></div>

        <form id="googleConnectForm">
          <div class="form-group" style="margin-bottom:14px;">
            <label class="form-label" for="googleUserRealName" style="font-size:13px; font-weight:700;">Google Account Holder Name</label>
            <input type="text" class="form-input" id="googleUserRealName" placeholder="e.g. Aayush Singh" required style="width:100%; padding:10px 14px; border:1.5px solid var(--border); border-radius:10px; font-size:14px; outline:none;" />
          </div>

          <div class="form-group" style="margin-bottom:18px;">
            <label class="form-label" for="googleUserRealEmail" style="font-size:13px; font-weight:700;">Google Email Address (@gmail.com)</label>
            <input type="email" class="form-input" id="googleUserRealEmail" placeholder="e.g. aayushsingh@gmail.com" required style="width:100%; padding:10px 14px; border:1.5px solid var(--border); border-radius:10px; font-size:14px; outline:none;" />
          </div>

          <button type="submit" class="google-modal-btn" id="googleSubmitRealBtn">
            Continue with this Google Account →
          </button>
        </form>
      </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('closeGoogleModalBtn').addEventListener('click', () => {
      overlay.remove();
      callback({ error: { message: 'Google sign-in cancelled.' } });
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.remove();
        callback({ error: { message: 'Google sign-in cancelled.' } });
      }
    });

    document.getElementById('googleConnectForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('googleUserRealName').value.trim();
      const email = document.getElementById('googleUserRealEmail').value.trim().toLowerCase();
      const errBox = document.getElementById('googleModalError');

      if (!name || !email) {
        errBox.textContent = 'Please provide both your name and Google email address.';
        errBox.style.display = 'block';
        return;
      }

      // Check unique email
      const users = getStoredUsers();
      const existing = users.find(u => u.email.toLowerCase() === email);
      if (existing && existing.user_metadata?.full_name !== name) {
        // If account exists with another name
        errBox.textContent = 'This email address is already registered to another account holder.';
        errBox.style.display = 'block';
        return;
      }

      const googleUser = {
        id: existing ? existing.id : 'google-' + Math.random().toString(36).substr(2, 9),
        email: email,
        user_metadata: {
          full_name: name,
          name: name,
          avatar_url: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=f97316&color=fff',
          provider: 'google'
        },
        created_at: existing ? existing.created_at : new Date().toISOString()
      };

      if (!existing) {
        users.push({
          ...googleUser,
          profile: {
            id: googleUser.id,
            full_name: name,
            email: email,
            created_at: googleUser.created_at
          }
        });
        saveStoredUsers(users);
      }

      const session = {
        access_token: 'google-session-' + Date.now(),
        user: googleUser
      };
      setStoredSession(session);

      overlay.remove();
      callback({ data: { user: googleUser, session }, error: null });
    });
  }

  async function signInWithGoogle() {
    // 1. If Live Supabase is configured
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + window.location.pathname.replace(/[^/]*$/, '') + 'dashboard.html'
        }
      });
      return { data, error };
    }

    // 2. If Google Identity Services Client ID is set
    if (window.google && window.google.accounts && GOOGLE_CLIENT_ID && !GOOGLE_CLIENT_ID.includes('YOUR_GOOGLE_CLIENT_ID')) {
      return new Promise((resolve) => {
        const client = google.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: 'email profile openid',
          callback: async (tokenResponse) => {
            if (tokenResponse && tokenResponse.access_token) {
              try {
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
                });
                const gUser = await res.json();
                const sessionUser = {
                  id: gUser.sub,
                  email: gUser.email,
                  user_metadata: {
                    full_name: gUser.name,
                    avatar_url: gUser.picture
                  },
                  created_at: new Date().toISOString()
                };
                const session = { access_token: tokenResponse.access_token, user: sessionUser };
                setStoredSession(session);
                resolve({ data: { user: sessionUser, session }, error: null });
              } catch (err) {
                resolve({ data: null, error: err });
              }
            } else {
              resolve({ data: null, error: { message: 'Google authentication failed.' } });
            }
          }
        });
        client.requestAccessToken();
      });
    }

    // 3. Clean Google Account Connection Modal (Asks for user's real Google name and email)
    return new Promise((resolve) => {
      openGoogleAccountModal(resolve);
    });
  }

  async function signOut() {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setStoredSession(null);
    return { error: null };
  }

  async function getSession() {
    if (supabase) {
      const { data, error } = await supabase.auth.getSession();
      if (data && data.session) return { data, error };
    }
    const session = getStoredSession();
    return { data: { session }, error: null };
  }

  async function getUser() {
    if (supabase) {
      const { data, error } = await supabase.auth.getUser();
      if (data && data.user) return { data, error };
    }
    const session = getStoredSession();
    return { data: { user: session ? session.user : null }, error: null };
  }

  async function getProfile(userId) {
    if (supabase) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      if (!error && data) return { data, error };
    }

    const users = getStoredUsers();
    const match = users.find(u => u.id === userId);
    if (match && match.profile) {
      return { data: match.profile, error: null };
    }

    const session = getStoredSession();
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

  function getInitials(name) {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  }

  /**
   * Updates website navigation bar to show account holder's name & online status
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
                         'Account Holder';

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

        if (authNavLink) {
          authNavLink.textContent = '📊 Dashboard';
          authNavLink.href = './dashboard.html';
          authNavLink.style.color = '#10b981';
          authNavLink.style.display = 'inline-block';
        }
        if (signupNavLink) {
          signupNavLink.style.display = 'none';
        }
      } else {
        if (userOnlinePill) userOnlinePill.style.display = 'none';
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
    updateNavAuth
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateNavAuth);
  } else {
    updateNavAuth();
  }
})();
