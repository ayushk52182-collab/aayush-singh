import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  ShieldCheck,
  Eye,
  EyeOff,
  UserPlus,
  LogIn,
  ArrowLeft,
  X,
  User,
  Mail,
  AlertCircle,
  Plus,
  Compass,
  Code2,
  Sparkles
} from 'lucide-react';
import { TEMP_USERNAME, TEMP_PASSWORD } from '../utils/constants';

const LoginPage = ({ onLogin }) => {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Google Auth Dialog states for other users
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [googleName, setGoogleName] = useState('');
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleModalError, setGoogleModalError] = useState('');
  const [googleFormTab, setGoogleFormTab] = useState('select'); // 'select' | 'new'

  const handleSwitchMode = (newMode) => {
    setMode(newMode);
    setError('');
    setSuccess('');
  };

  const getSavedUsers = () => {
    try {
      const list = JSON.parse(localStorage.getItem('roadmap_registered_users') || '[]');
      return Array.isArray(list) ? list : [];
    } catch {
      return [];
    }
  };

  // Open Google Dialog
  const handleGoogleAuth = () => {
    setError('');
    setGoogleModalError('');
    const saved = getSavedUsers();
    if (saved.length > 0) {
      setGoogleFormTab('select');
    } else {
      setGoogleFormTab('new');
    }
    setIsGoogleModalOpen(true);
  };

  // Select an existing Google account
  const handleSelectGoogleAccount = (savedUser) => {
    const chosenName = savedUser.fullName || savedUser.username;
    setSuccess(`Google Authentication verified! Welcome back, ${chosenName}!`);
    setIsGoogleModalOpen(false);
    sessionStorage.setItem('roadmap_user', chosenName);
    localStorage.setItem('roadmap_user', chosenName);
    if (savedUser.email) {
      sessionStorage.setItem('roadmap_user_email', savedUser.email);
      localStorage.setItem('roadmap_user_email', savedUser.email);
    }
    setTimeout(() => {
      onLogin(chosenName);
    }, 400);
  };

  // Submit new/other Google account
  const handleGoogleSubmit = (e) => {
    e.preventDefault();
    setGoogleModalError('');

    const trimmedName = googleName.trim();
    const trimmedEmail = googleEmail.trim().toLowerCase();

    if (!trimmedName) {
      setGoogleModalError('Please enter your full name.');
      return;
    }

    if (!trimmedEmail || !trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setGoogleModalError('Please enter a valid Google email address (@gmail.com).');
      return;
    }

    const registered = getSavedUsers();

    // Unique email enforcement: verify email doesn't belong to another different person
    const existingWithEmail = registered.find(
      (u) => u.email && u.email.toLowerCase() === trimmedEmail
    );
    if (
      existingWithEmail &&
      existingWithEmail.fullName &&
      existingWithEmail.fullName.toLowerCase() !== trimmedName.toLowerCase()
    ) {
      setGoogleModalError(
        `This email address is already registered to "${existingWithEmail.fullName}". Each email belongs to only one account holder.`
      );
      return;
    }

    // Save if new user
    if (!existingWithEmail) {
      const newUser = {
        fullName: trimmedName,
        username: trimmedEmail.split('@')[0],
        email: trimmedEmail,
        provider: 'google',
        createdAt: new Date().toISOString()
      };
      registered.push(newUser);
      try {
        localStorage.setItem('roadmap_registered_users', JSON.stringify(registered));
      } catch (err) {
        console.error('Error saving Google user:', err);
      }
    }

    // Save session
    sessionStorage.setItem('roadmap_user', trimmedName);
    sessionStorage.setItem('roadmap_user_email', trimmedEmail);
    sessionStorage.setItem('roadmap_user_provider', 'google');
    localStorage.setItem('roadmap_user', trimmedName);
    localStorage.setItem('roadmap_user_email', trimmedEmail);

    setIsGoogleModalOpen(false);
    setSuccess(`Google session verified! Launching dashboard as ${trimmedName}...`);
    setTimeout(() => {
      onLogin(trimmedName);
    }, 450);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const trimmedUsername = username.trim();
    if (!trimmedUsername || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // 1. Check default credentials
    if (trimmedUsername === TEMP_USERNAME && password === TEMP_PASSWORD) {
      setSuccess('Session verified! Launching dashboard...');
      setTimeout(() => onLogin(trimmedUsername), 400);
      return;
    }

    // 2. Check registered users in localStorage
    try {
      const registered = JSON.parse(localStorage.getItem('roadmap_registered_users') || '[]');
      const match = registered.find(
        (u) =>
          (u.username.toLowerCase() === trimmedUsername.toLowerCase() ||
            (u.email && u.email.toLowerCase() === trimmedUsername.toLowerCase())) &&
          u.password === password
      );

      if (match) {
        setSuccess(`Welcome back, ${match.fullName || match.username}! Launching dashboard...`);
        setTimeout(() => onLogin(match.fullName || match.username), 400);
        return;
      }
    } catch (err) {
      console.error('Error reading registered users:', err);
    }

    setError('Incorrect username or password. Default demo is aayush / 1234, or create an account via Sign Up.');
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const trimmedUsername = username.trim();
    const trimmedFullName = fullName.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedFullName || !trimmedUsername || !trimmedEmail || !password || !confirmPassword) {
      setError('Please fill in all fields (Full Name, Username, Email, and Password).');
      return;
    }

    if (trimmedUsername.length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Strict Email Uniqueness Check: Each email address can be used only once!
    try {
      const registered = JSON.parse(localStorage.getItem('roadmap_registered_users') || '[]');

      const emailExists = registered.some(
        (u) => u.email && u.email.toLowerCase() === trimmedEmail
      );
      if (emailExists) {
        setError('This email address is already registered. Each email address can be used only once.');
        return;
      }

      const usernameExists = registered.some(
        (u) => u.username.toLowerCase() === trimmedUsername.toLowerCase()
      );
      if (usernameExists || trimmedUsername.toLowerCase() === TEMP_USERNAME.toLowerCase()) {
        setError('Username already taken. Please choose another username.');
        return;
      }

      const newUser = {
        fullName: trimmedFullName,
        username: trimmedUsername,
        email: trimmedEmail,
        password: password,
        createdAt: new Date().toISOString()
      };

      registered.push(newUser);
      localStorage.setItem('roadmap_registered_users', JSON.stringify(registered));

      setSuccess('Account created successfully! Initializing your session...');
      setTimeout(() => {
        onLogin(newUser.fullName || newUser.username);
      }, 700);
    } catch (err) {
      console.error('Error saving new user:', err);
      setError('Failed to create account. Please try again.');
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-3d-bg-container">
        <div className="bg-floating-code-window glass-card">
          <div className="window-bar">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span className="window-title">python_demo.py</span>
          </div>
          <pre className="code-block">
            <code>
              <span className="code-keyword">def</span> <span className="code-func">solve_problem</span>():<br/>
              &nbsp;&nbsp;<span className="code-comment"># Striver A2Z DSA Sheet</span><br/>
              &nbsp;&nbsp;arr = [1, 2, 3, 4, 5]<br/>
              &nbsp;&nbsp;<span className="code-keyword">return</span> sum(arr) * 2<br/>
            </code>
          </pre>
        </div>

        <div className="bg-floating-c-card glass-card">
          <div className="window-bar">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span className="window-title">quick_sort.c</span>
          </div>
          <pre className="code-block">
            <code>
              <span className="code-keyword">void</span> <span className="code-func">quickSort</span>(<span className="code-keyword">int</span> *a, <span className="code-keyword">int</span> low, <span className="code-keyword">int</span> high) &#123;<br/>
              &nbsp;&nbsp;<span className="code-keyword">if</span> (low &lt; high) &#123;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">int</span> pi = partition(a, low, high);<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;quickSort(a, low, pi - 1);<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;quickSort(a, pi + 1, high);<br/>
              &nbsp;&nbsp;&#125;<br/>
              &#125;
            </code>
          </pre>
        </div>

        <div className="bg-badge bg-c">C</div>
        <div className="bg-badge bg-py">PY</div>
        <div className="bg-learning-ring"></div>
      </div>

      <motion.div
        className="glass-card login-card"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 20, delay: 0.2 }}
      >
        <div className="login-header">
          {/* Redesigned Upper Utility Bar */}
          <div className="login-top-actions-bar">
            <button
              type="button"
              onClick={() => onLogin('Guest Learner')}
              className="login-action-btn-pill"
              title="Explore the Interactive Roadmap directly as a Guest"
            >
              <Compass size={13} />
              <span>Explore as Guest</span>
            </button>

            <a
              href="/c-roadmap.html"
              className="login-action-btn-pill"
              title="View Standalone Full HTML Roadmap"
            >
              <Code2 size={13} />
              <span>Full HTML</span>
            </a>

            <div className="login-live-status-pill">
              <span className="live-status-pulse"></span>
              <span>Academy v2.0</span>
            </div>
          </div>

          {/* Redesigned Glowing Brand Emblem */}
          <div className="login-brand-crest">
            <div className="brand-crest-emblem">
              <span>A</span>
            </div>
          </div>

          <div className="top-badge-row">
            <span className="badge-cyber">
              {mode === 'login' ? <Sparkles size={13} /> : <UserPlus size={13} />}
              {mode === 'login' ? 'LEARN WITH AAYUSH • CODE ACADEMY' : 'NEW LEARNER PROTOCOL'}
            </span>
          </div>

          <h2 className="login-title">
            {mode === 'login' ? (
              <>Welcome Back, <span className="gradient-text">Learner</span></>
            ) : (
              <>Create <span className="gradient-text">Learner Account</span></>
            )}
          </h2>
          <p className="login-subtitle">
            {mode === 'login'
              ? 'Enter your credentials or continue with Google to resume your C, Python & Striver DSA Sheet progress.'
              : 'Register your account to unlock personalized milestone tracking and interactive 3D visualizers.'}
          </p>
        </div>

        {/* Auth Mode Switcher Tabs */}
        <div className="auth-tab-row">
          <button
            type="button"
            className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
            onClick={() => handleSwitchMode('login')}
            id="loginTabBtn"
          >
            <LogIn size={14} />
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => handleSwitchMode('signup')}
            id="signupTabBtn"
          >
            <UserPlus size={14} />
            Sign Up
          </button>
        </div>

        {/* Google Auth Button - Opens full dialog for other users */}
        <button
          type="button"
          className="btn-google-cyber"
          onClick={handleGoogleAuth}
          id="googleAuthBtnCyber"
          title="Sign in with your Google account"
        >
          <svg width="17" height="17" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>{mode === 'login' ? 'Continue with Google' : 'Sign Up with Google'}</span>
        </button>

        <div className="auth-cyber-divider">
          <span>{mode === 'login' ? 'OR SIGN IN MANUALLY' : 'OR SIGN UP MANUALLY'}</span>
        </div>

        {error && <div className="login-error">{error}</div>}
        {success && <div className="login-success">{success}</div>}

        <AnimatePresence mode="wait">
          {mode === 'login' ? (
            <motion.form
              key="login-form"
              onSubmit={handleLoginSubmit}
              className="login-form"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.2 }}
            >
              <div className="form-group">
                <label>Username or Email</label>
                <input
                  type="text"
                  className="login-input"
                  placeholder="e.g. your_username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="login-input password-field"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="login-submit-btn" id="loginSubmitBtn">
                Initialize Session →
              </button>

              <div className="switch-auth-mode">
                Don't have an account?
                <button
                  type="button"
                  className="switch-auth-btn"
                  onClick={() => handleSwitchMode('signup')}
                >
                  Sign Up Free →
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.form
              key="signup-form"
              onSubmit={handleSignupSubmit}
              className="login-form"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
            >
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className="login-input"
                  placeholder="e.g. Rahul Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label>Choose Username</label>
                <input
                  type="text"
                  className="login-input"
                  placeholder="e.g. rahul_coder"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address (Required — 1 account per email)</label>
                <input
                  type="email"
                  className="login-input"
                  placeholder="e.g. rahul@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Create Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="login-input password-field"
                    placeholder="At least 4 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={4}
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="login-input password-field"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={4}
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="login-submit-btn" id="signupSubmitBtn">
                Create Account & Initialize →
              </button>

              <div className="switch-auth-mode">
                Already registered?
                <button
                  type="button"
                  className="switch-auth-btn"
                  onClick={() => handleSwitchMode('login')}
                >
                  Log In Here →
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="login-footer-info">
          <p className="progress-note">
            <ShieldCheck size={14} />
            Your learning progress is saved automatically.
          </p>
          <p className="login-credit">Designed & Engineered by Aayush Singh</p>
        </div>
      </motion.div>

      {/* Google Authentication Dialog for ALL users */}
      <AnimatePresence>
        {isGoogleModalOpen && (
          <div className="google-auth-modal-overlay" onClick={() => setIsGoogleModalOpen(false)}>
            <motion.div
              className="google-auth-modal-card glass-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.2 }}
            >
              <button
                type="button"
                className="google-modal-close-btn"
                onClick={() => setIsGoogleModalOpen(false)}
                aria-label="Close Google Dialog"
              >
                <X size={16} />
              </button>

              <div className="google-auth-header">
                <div className="google-auth-logo-badge">
                  <svg width="26" height="26" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                </div>
                <h3 className="google-auth-title">
                  {mode === 'login' ? 'Sign In with Google' : 'Sign Up with Google'}
                </h3>
                <p className="google-auth-subtitle">
                  Choose an account or enter your real name and email to initialize your personalized learning session.
                </p>
              </div>

              {googleModalError && (
                <div className="google-modal-error-box">
                  <AlertCircle size={15} />
                  <span>{googleModalError}</span>
                </div>
              )}

              {/* Saved accounts section */}
              {getSavedUsers().length > 0 && googleFormTab === 'select' && (
                <div className="google-saved-accounts-section">
                  <p className="google-section-label">Choose an account:</p>
                  <div className="google-accounts-list">
                    {getSavedUsers().map((u, idx) => {
                      const uName = u.fullName || u.username;
                      const uInitials = uName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || 'U';
                      return (
                        <div
                          key={idx}
                          className="google-account-card"
                          onClick={() => handleSelectGoogleAccount(u)}
                          role="button"
                          tabIndex={0}
                        >
                          <div className="google-account-avatar">
                            {uInitials}
                          </div>
                          <div className="google-account-details">
                            <span className="google-account-name">{uName}</span>
                            <span className="google-account-email">{u.email || `${u.username}@gmail.com`}</span>
                          </div>
                          <span className="google-account-tag">Saved</span>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    className="google-use-another-btn"
                    onClick={() => {
                      setGoogleFormTab('new');
                      setGoogleModalError('');
                    }}
                  >
                    <Plus size={15} />
                    <span>Use another Google account</span>
                  </button>
                </div>
              )}

              {/* New/Other Google Account Form */}
              {(getSavedUsers().length === 0 || googleFormTab === 'new') && (
                <form onSubmit={handleGoogleSubmit} className="google-modal-form">
                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="google-form-label">Account Holder Full Name</label>
                    <div className="google-input-wrapper">
                      <User size={15} className="google-input-icon" />
                      <input
                        type="text"
                        className="google-input"
                        placeholder="e.g. Rahul Sharma or Jane Doe"
                        value={googleName}
                        onChange={(e) => setGoogleName(e.target.value)}
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '18px' }}>
                    <label className="google-form-label">Google Email Address (@gmail.com)</label>
                    <div className="google-input-wrapper">
                      <Mail size={15} className="google-input-icon" />
                      <input
                        type="email"
                        className="google-input"
                        placeholder="e.g. rahul.sharma@gmail.com"
                        value={googleEmail}
                        onChange={(e) => setGoogleEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="google-modal-submit-btn" id="googleModalSubmitBtn">
                    Continue as {googleName.trim() || 'this User'} →
                  </button>

                  {getSavedUsers().length > 0 && (
                    <button
                      type="button"
                      className="google-back-to-list-btn"
                      onClick={() => {
                        setGoogleFormTab('select');
                        setGoogleModalError('');
                      }}
                    >
                      ← Back to saved accounts
                    </button>
                  )}
                </form>
              )}

              <div className="google-modal-privacy-footer">
                <p>
                  To continue, Google shares your name and email with Learn with Aayush. Each email address belongs to 1 account holder only.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginPage;
