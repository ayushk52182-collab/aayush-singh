import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
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
  Sparkles,
  Laptop,
  Smartphone,
  CheckCircle2,
  Terminal,
  Cpu,
  BookOpen
} from 'lucide-react';
import { TEMP_USERNAME, TEMP_PASSWORD } from '../utils/constants';

const LoginPage = ({ onLogin }) => {
  const [isMobileDevice, setIsMobileDevice] = useState(() => {
    return typeof window !== 'undefined' && (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
      window.innerWidth <= 768
    );
  });

  const [desktopCodeTab, setDesktopCodeTab] = useState('c'); // 'c' | 'python' | 'dsa'

  const codeSnippets = {
    c: `// 🚀 High-Speed Quicksort in C
#include <stdio.h>

void quickSort(int *a, int low, int high) {
    if (low < high) {
        int pi = partition(a, low, high);
        quickSort(a, low, pi - 1);
        quickSort(a, pi + 1, high);
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    printf("Array sorted in 0.4ms\n");
    return 0;
}`,
    python: `# 🐍 Python 3.12+ Modern Algorithm
def solve_two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []

# Direct execution in-browser
print("Optimal O(N) Two Sum ready")`,
    dsa: `// ⚡ Striver A2Z Sheet Problem 4.2
#include <iostream>
#include <vector>
using namespace std;

// Maximum Subarray Sum (Kadane's Algorithm)
long long maxSubarraySum(vector<int>& arr) {
    long long maxi = arr[0], sum = 0;
    for (int x : arr) {
        sum += x;
        maxi = max(maxi, sum);
        if (sum < 0) sum = 0;
    }
    return maxi;
}`
  };

  useEffect(() => {
    const checkDevice = () => {
      const isMob = (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
        window.innerWidth <= 768
      );
      setIsMobileDevice(isMob);
      if (isMob) {
        document.documentElement.classList.add('is-mobile-browser');
        document.documentElement.classList.remove('is-desktop-browser');
      } else {
        document.documentElement.classList.add('is-desktop-browser');
        document.documentElement.classList.remove('is-mobile-browser');
      }
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

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
      let list = JSON.parse(localStorage.getItem('roadmap_registered_users') || '[]');
      if (!Array.isArray(list) || list.length === 0) {
        list = [
          { name: "Aayush Singh", fullName: "Aayush Singh", email: "aayushsingh@gmail.com", username: "aayushsingh", provider: "google" },
          { name: "Priya Patel", fullName: "Priya Patel", email: "priyapatel@gmail.com", username: "priyapatel", provider: "google" },
          { name: "Rahul Sharma", fullName: "Rahul Sharma", email: "rahulsharma@gmail.com", username: "rahulsharma", provider: "google" }
        ];
        try {
          localStorage.setItem('roadmap_registered_users', JSON.stringify(list));
        } catch (_) {}
      }
      return list;
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
    const chosenName = savedUser.fullName || savedUser.name || savedUser.username || (savedUser.email ? savedUser.email.split('@')[0] : 'Learner');
    setSuccess(`Google Authentication verified! Welcome back, ${chosenName}!`);
    setIsGoogleModalOpen(false);
    sessionStorage.setItem('roadmap_user', chosenName);
    sessionStorage.setItem('roadmap_user_provider', 'google');
    localStorage.setItem('roadmap_user', chosenName);
    const chosenEmail = savedUser.email || `${(savedUser.username || 'learner')}@gmail.com`;
    sessionStorage.setItem('roadmap_user_email', chosenEmail);
    localStorage.setItem('roadmap_user_email', chosenEmail);
    setTimeout(() => {
      onLogin(chosenName);
    }, 250);
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
    const existingName = existingWithEmail ? (existingWithEmail.fullName || existingWithEmail.name || existingWithEmail.username) : null;
    if (
      existingWithEmail &&
      existingName &&
      existingName.toLowerCase() !== trimmedName.toLowerCase()
    ) {
      setGoogleModalError(
        `This email address is already registered to "${existingName}". Each email belongs to only one account holder.`
      );
      return;
    }

    // Save if new user
    if (!existingWithEmail) {
      const newUser = {
        name: trimmedName,
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
    }, 300);
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

    try {
      const registered = getSavedUsers();
      const matchedUser = registered.find(
        (u) =>
          u.username &&
          (u.username.toLowerCase() === trimmedUsername.toLowerCase() ||
           (u.email && u.email.toLowerCase() === trimmedUsername.toLowerCase()))
      );

      if (matchedUser) {
        if (matchedUser.password && matchedUser.password !== password) {
          setError('Invalid password for this account.');
          return;
        }
        const displayName = matchedUser.fullName || matchedUser.username;
        setSuccess(`Welcome back, ${displayName}! Preparing your learning path...`);
        sessionStorage.setItem('roadmap_user', displayName);
        if (matchedUser.email) sessionStorage.setItem('roadmap_user_email', matchedUser.email);
        localStorage.setItem('roadmap_user', displayName);
        setTimeout(() => {
          onLogin(displayName);
        }, 400);
        return;
      }

      if (
        (trimmedUsername.toLowerCase() === TEMP_USERNAME.toLowerCase() ||
         trimmedUsername.toLowerCase() === 'aayush' ||
         trimmedUsername.toLowerCase() === 'guest') &&
        password === TEMP_PASSWORD
      ) {
        const displayName = trimmedUsername.toLowerCase() === 'guest' ? 'Guest Learner' : 'Aayush Singh';
        setSuccess(`Welcome, ${displayName}! Launching dashboard...`);
        sessionStorage.setItem('roadmap_user', displayName);
        localStorage.setItem('roadmap_user', displayName);
        setTimeout(() => {
          onLogin(displayName);
        }, 400);
        return;
      }

      if (password.length >= 4) {
        setSuccess(`Welcome, ${trimmedUsername}! Launching your workspace...`);
        sessionStorage.setItem('roadmap_user', trimmedUsername);
        localStorage.setItem('roadmap_user', trimmedUsername);
        setTimeout(() => {
          onLogin(trimmedUsername);
        }, 400);
        return;
      }

      setError('Account not found. Please check your credentials or create a new account.');
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred. Please try again.');
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const trimmedName = fullName.trim();
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName || !trimmedUsername || !trimmedEmail || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const registered = getSavedUsers();

      if (registered.some((u) => u.username && u.username.toLowerCase() === trimmedUsername.toLowerCase())) {
        setError('This username is already taken. Please pick another.');
        return;
      }

      if (registered.some((u) => u.email && u.email.toLowerCase() === trimmedEmail)) {
        setError('An account with this email already exists. Please log in instead.');
        return;
      }

      const newUser = {
        name: trimmedName,
        fullName: trimmedName,
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
    <div className={`login-overlay ${isMobileDevice ? 'mobile-browser-mode' : 'desktop-browser-mode'}`}>
      
      {/* ========================================================================= */}
      {/* 1. DESKTOP WEB BROWSER INTERFACE (Wide Dual-Pane Architecture)             */}
      {/* ========================================================================= */}
      {!isMobileDevice && (
        <div className="login-desktop-layout">
          {/* Left Panel: Elite Academy Showcase & Interactive Terminal */}
          <div className="login-desktop-showcase">
            <div className="desktop-showcase-header">
              <div className="academy-brand-pill">
                <span className="brand-dot-pulse"></span>
                <span>LEARN WITH AAYUSH • CODE ACADEMY</span>
                <span className="badge-chip-desktop">
                  <Laptop size={12} /> Desktop Mode
                </span>
              </div>

              <h1 className="desktop-hero-heading">
                Master C, Python 3.12+ & <span className="gradient-text">Striver A2Z DSA</span>
              </h1>

              <p className="desktop-hero-subtext">
                An immersive interactive learning ecosystem. Structured curriculum roadmap, live in-browser compiler, 46+ video masterclasses, and 474+ curated problems.
              </p>
            </div>

            {/* Interactive Desktop Code Terminal */}
            <div className="desktop-terminal-card glass-card">
              <div className="terminal-header-bar">
                <div className="terminal-window-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>

                <div className="terminal-file-tabs">
                  <button
                    type="button"
                    className={`terminal-tab-btn ${desktopCodeTab === 'c' ? 'active' : ''}`}
                    onClick={() => setDesktopCodeTab('c')}
                  >
                    <Code2 size={13} />
                    <span>quick_sort.c</span>
                  </button>
                  <button
                    type="button"
                    className={`terminal-tab-btn ${desktopCodeTab === 'python' ? 'active' : ''}`}
                    onClick={() => setDesktopCodeTab('python')}
                  >
                    <Terminal size={13} />
                    <span>two_sum.py</span>
                  </button>
                  <button
                    type="button"
                    className={`terminal-tab-btn ${desktopCodeTab === 'dsa' ? 'active' : ''}`}
                    onClick={() => setDesktopCodeTab('dsa')}
                  >
                    <Cpu size={13} />
                    <span>kadane_dsa.cpp</span>
                  </button>
                </div>

                <span className="terminal-status-tag">● Compiler Live</span>
              </div>

              <pre className="terminal-code-body">
                <code>{codeSnippets[desktopCodeTab]}</code>
              </pre>

              <div className="terminal-footer-meta">
                <div className="terminal-meta-left">
                  <CheckCircle2 size={13} color="#22c55e" />
                  <span>Target: GCC 13.2 / Python 3.12.3 • Zero Local Setup</span>
                </div>
                <div className="terminal-meta-right">
                  <span>Interactive Playground</span>
                </div>
              </div>
            </div>

            {/* Desktop Metrics Row */}
            <div className="desktop-features-grid">
              <div className="desktop-feature-pill">
                <div className="feature-icon-box">⚡</div>
                <div>
                  <strong>474+ Curated Problems</strong>
                  <span>Striver A2Z DSA Tracker</span>
                </div>
              </div>
              <div className="desktop-feature-pill">
                <div className="feature-icon-box">🎥</div>
                <div>
                  <strong>46+ Video Masterclasses</strong>
                  <span>Direct YouTube Integration</span>
                </div>
              </div>
              <div className="desktop-feature-pill">
                <div className="feature-icon-box">🚀</div>
                <div>
                  <strong>In-Browser Simulator</strong>
                  <span>C & Python High-Performance</span>
                </div>
              </div>
            </div>

            {/* Desktop Shortcuts Hint */}
            <div className="desktop-shortcuts-footer">
              <span>Shortcuts: <strong>⌘K</strong> Quick Search • <strong>Enter ↵</strong> Submit</span>
              <span className="desktop-engine-tag">Engine v2.0 • Online</span>
            </div>
          </div>

          {/* Right Panel: Desktop Authentication Card */}
          <div className="login-desktop-auth-column">
            <motion.div
              className="glass-card login-card desktop-card"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', damping: 20, delay: 0.15 }}
            >
              <div className="login-header">
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
                    <span>Desktop Edition</span>
                  </div>
                </div>

                {/* Unified Brand Logo & Title Alignment Group */}
                <div className="login-brand-header-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: '100%', margin: '0 auto 0.85rem' }}>
                  <div className="brand-crest-emblem" style={{ width: '44px', height: '44px', borderRadius: '13px', background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', boxShadow: '0 8px 20px rgba(249, 115, 22, 0.45)', margin: '0 auto 8px' }}>
                    <GraduationCap size={24} />
                  </div>

                  <div className="top-badge-row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', margin: '0 auto 8px', textAlign: 'center' }}>
                    <span className="badge-cyber brand-badge-pill" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '4px 14px', borderRadius: '9999px', background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.3)', color: 'var(--orange-primary, #f97316)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.01em', textTransform: 'none', margin: '0 auto' }}>
                      {mode === 'login' ? <Sparkles size={13} /> : <UserPlus size={13} />}
                      <span>Learn with Aayush • {mode === 'login' ? 'Sign In' : 'Sign Up'}</span>
                    </span>
                  </div>

                  <h2 className="login-title" style={{ textAlign: 'center', width: '100%', margin: '0 auto 4px', fontSize: '1.45rem', fontWeight: 800, display: 'block', letterSpacing: '-0.01em' }}>
                    {mode === 'login' ? (
                      <>Welcome Back, <span className="gradient-text">Learner</span></>
                    ) : (
                      <>Create <span className="gradient-text">Learner Account</span></>
                    )}
                  </h2>
                  <p className="login-subtitle" style={{ textAlign: 'center', width: '100%', margin: '0 auto', fontSize: '0.82rem', color: 'var(--text-secondary, #73738a)', lineHeight: 1.45, display: 'block' }}>
                    {mode === 'login'
                      ? 'Enter your credentials or continue with Google to resume your progress.'
                      : 'Register to unlock isolated milestone tracking and interactive visualizers.'}
                  </p>
                </div>
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

              {/* Google Auth Primary Button */}
              <button
                type="button"
                className="btn-google-cyber"
                onClick={handleGoogleAuth}
                id="googleAuthBtnCyber"
                title="Sign in with your Google account"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="auth-cyber-divider">
                <span>{mode === 'login' ? 'OR SIGN IN WITH USERNAME' : 'OR SIGN UP MANUALLY'}</span>
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
                          className="login-input"
                          placeholder="Enter your password"
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
                    className="login-form signup-compact-form"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="signup-fields-grid">
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
                        <label>Username</label>
                        <input
                          type="text"
                          className="login-input"
                          placeholder="e.g. rahul_coder"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        className="login-input"
                        placeholder="e.g. rahul@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="signup-fields-grid">
                      <div className="form-group">
                        <label>Password (min 6 chars)</label>
                        <div className="password-input-wrapper">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            className="login-input"
                            placeholder="Password"
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
                            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Confirm Password</label>
                        <div className="password-input-wrapper">
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            className="login-input"
                            placeholder="Confirm"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                          <button
                            type="button"
                            className="toggle-password-btn"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                          >
                            {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                        </div>
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
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MOBILE WEB BROWSER INTERFACE (Native-App Styled Mobile Flow)            */}
      {/* ========================================================================= */}
      {isMobileDevice && (
        <div className="login-mobile-layout">
          {/* Mobile Top App Bar */}
          <div className="mobile-app-header">
            <div className="mobile-brand-group">
              <div className="mobile-brand-emblem">
                <span>A</span>
              </div>
              <div className="mobile-brand-texts">
                <span className="mobile-brand-title">Learn with Aayush</span>
                <span className="mobile-brand-edition">Mobile Edition • v2.0</span>
              </div>
            </div>

            <div className="mobile-header-actions">
              <button
                type="button"
                onClick={() => onLogin('Guest Learner')}
                className="mobile-guest-header-btn"
                title="Explore as Guest"
              >
                <Compass size={14} />
                <span>Guest</span>
              </button>

              <a
                href="/c-roadmap.html"
                className="mobile-html-header-btn"
                title="Full HTML"
              >
                <Code2 size={14} />
              </a>
            </div>
          </div>

          {/* Mobile Main Auth Card */}
          <motion.div
            className="mobile-auth-card glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 22 }}
          >
            <div className="mobile-card-intro" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: '100%', margin: '0 auto 0.9rem' }}>
              <div className="brand-crest-emblem" style={{ width: '40px', height: '40px', borderRadius: '11px', background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', boxShadow: '0 6px 16px rgba(249, 115, 22, 0.4)', margin: '0 auto 8px' }}>
                <GraduationCap size={22} />
              </div>

              <div className="brand-badge-pill" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '4px 12px', borderRadius: '9999px', background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.3)', color: 'var(--orange-primary, #f97316)', fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.01em', margin: '0 auto 8px' }}>
                <Sparkles size={12} />
                <span>Learn with Aayush • {mode === 'login' ? 'Sign In' : 'Sign Up'}</span>
              </div>

              <h2 className="mobile-auth-title" style={{ textAlign: 'center', width: '100%', margin: '0 auto 4px', fontSize: '1.35rem', fontWeight: 800 }}>
                {mode === 'login' ? <>Welcome Back, <span className="gradient-text">Learner</span></> : <>Create <span className="gradient-text">Account</span></>}
              </h2>
              <p className="mobile-auth-desc" style={{ textAlign: 'center', width: '100%', margin: '0 auto', fontSize: '0.8rem' }}>
                {mode === 'login'
                  ? 'Sign in with Google to resume your learning progress.'
                  : 'Join thousands of learners tracking their coding roadmap.'}
              </p>
            </div>

            {/* Mobile Segmented Switcher */}
            <div className="mobile-auth-segmented">
              <button
                type="button"
                className={`mobile-segmented-btn ${mode === 'login' ? 'active' : ''}`}
                onClick={() => handleSwitchMode('login')}
              >
                <LogIn size={15} />
                <span>Sign In</span>
              </button>
              <button
                type="button"
                className={`mobile-segmented-btn ${mode === 'signup' ? 'active' : ''}`}
                onClick={() => handleSwitchMode('signup')}
              >
                <UserPlus size={15} />
                <span>Sign Up</span>
              </button>
            </div>

            {/* Mobile Touch-Optimized Google Auth Button */}
            <button
              type="button"
              className="mobile-btn-google"
              onClick={handleGoogleAuth}
              title="Continue with Google"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="mobile-divider">
              <span>OR ENTER CREDENTIALS</span>
            </div>

            {error && <div className="mobile-login-error">{error}</div>}
            {success && <div className="mobile-login-success">{success}</div>}

            {mode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="mobile-form">
                <div className="mobile-input-group">
                  <label>Username or Email</label>
                  <input
                    type="text"
                    className="mobile-input"
                    placeholder="Enter username or email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="mobile-input-group">
                  <label>Password</label>
                  <div className="mobile-password-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="mobile-input"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="mobile-password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="mobile-submit-btn">
                  Initialize Session →
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit} className="mobile-form signup-compact-mobile">
                <div className="signup-fields-grid">
                  <div className="mobile-input-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="mobile-input"
                      placeholder="Priya Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mobile-input-group">
                    <label>Username</label>
                    <input
                      type="text"
                      className="mobile-input"
                      placeholder="priya_coder"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mobile-input-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="mobile-input"
                    placeholder="priya@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="signup-fields-grid">
                  <div className="mobile-input-group">
                    <label>Password</label>
                    <div className="mobile-password-wrapper">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="mobile-input"
                        placeholder="Min 6 chars"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="mobile-password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="mobile-input-group">
                    <label>Confirm</label>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="mobile-input"
                      placeholder="Confirm"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="mobile-submit-btn" style={{ height: '46px', marginTop: '4px' }}>
                  Create Account →
                </button>
              </form>
            )}

            {/* Quick Guest Explorer Strip */}
            <div className="mobile-guest-direct-box">
              <span>Just browsing?</span>
              <button
                type="button"
                onClick={() => onLogin('Guest Learner')}
                className="mobile-guest-direct-link"
              >
                Instant Guest Preview →
              </button>
            </div>
          </motion.div>

          {/* Mobile Horizontal Feature Chips Carousel */}
          <div className="mobile-features-scroll-strip">
            <span className="mobile-feature-chip">⚡ 474+ Striver Problems</span>
            <span className="mobile-feature-chip">📘 20 C Chapters</span>
            <span className="mobile-feature-chip">🐍 Python 3.12+</span>
            <span className="mobile-feature-chip">🎥 46+ Masterclasses</span>
          </div>

          <div className="mobile-footer-note">
            <ShieldCheck size={13} />
            <span>Progress automatically synchronized • Academy v2.0</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GOOGLE AUTHENTICATION DIALOG (Desktop Modal / Mobile Bottom Sheet)        */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isGoogleModalOpen && (
          <div className="google-auth-modal-overlay" onClick={() => setIsGoogleModalOpen(false)}>
            <motion.div
              className={`google-auth-modal-card glass-card ${isMobileDevice ? 'mobile-bottom-sheet' : 'desktop-modal-card'}`}
              onClick={(e) => e.stopPropagation()}
              initial={isMobileDevice ? { y: '100%' } : { opacity: 0, scale: 0.92, y: 20 }}
              animate={isMobileDevice ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
              exit={isMobileDevice ? { y: '100%' } : { opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Mobile Drag Handle Bar */}
              {isMobileDevice && <div className="mobile-sheet-drag-handle"></div>}

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
                  Sign In with Google
                </h3>
                <p className="google-auth-subtitle">
                  Choose a saved account or enter your name to initialize your personalized learning session.
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
                      const uName = u.fullName || u.name || u.username || (u.email ? u.email.split('@')[0] : 'Learner');
                      const uInitials = (uName || 'User').trim().split(/\s+/).filter(Boolean).map((n) => n[0]).join('').slice(0, 2).toUpperCase() || 'GL';
                      const uEmail = u.email || `${(u.username || 'learner')}@gmail.com`;
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
                            <span className="google-account-email">{uEmail}</span>
                          </div>
                          <span className="google-account-tag">Instant Login</span>
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

                  <button type="submit" className="google-modal-submit-btn" id="googleModalSubmitBtn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>Continue with Google as {googleName.trim() || 'User'}</span>
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
