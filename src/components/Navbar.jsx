import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  LayoutDashboard,
  Flame,
  Code2,
  Terminal as TerminalIcon,
  BrainCircuit,
  Boxes,
  LogOut,
  LogIn,
  Search,
  Sun,
  Moon,
  ChevronDown
} from 'lucide-react';

const mobileNavItems = [
  { key: 'dashboard', label: 'Home', icon: LayoutDashboard },
  { key: 'c', label: 'C Roadmap', icon: Code2 },
  { key: 'dsa', label: 'DSA', icon: Boxes },
  { key: 'python', label: 'Python', icon: TerminalIcon },
  { key: 'practice', label: 'C IDE', icon: TerminalIcon },
];

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'dsa', label: 'DSA Roadmap', icon: Boxes },
  { key: 'dsa-problems', label: 'DSA Problems', icon: BrainCircuit },
  { key: 'c', label: 'C Roadmap', icon: Code2 },
  { key: 'python', label: 'Python', icon: TerminalIcon },
  { key: 'oneshot', label: 'One-Shot', icon: Flame },
  { key: 'practice', label: 'C IDE', icon: TerminalIcon },
];

const Navbar = ({ activeTab, onSelectTab, user, onLogout, theme, toggleTheme, onOpenSearch, onOpenSignIn }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isGuest = !user || user === 'Guest Learner' || user === 'Guest';
  const displayName = typeof user === 'string' && user.trim().length > 0 ? user.trim() : 'Aayush Singh';
  const initials = isGuest ? 'GL' : (displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'AS');

  const handleExit = (e) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }
    setShowProfileMenu(false);
    onLogout();
  };

  return (
    <>
    <motion.nav
      className="nav-bar"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 20, delay: 0.1 }}
    >
      <div className="nav-logo" onClick={() => onSelectTab('dashboard')}>
        <div className="logo-icon-wrapper">
          <GraduationCap size={22} />
        </div>
        <span className="logo-text">Learn with Aayush</span>
      </div>

      <div className="nav-links">
        {navItems.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            className={`nav-btn ${activeTab === key ? 'active' : ''}`}
            onClick={() => onSelectTab(key)}
          >
            <Icon size={15} />
            <span>{label}</span>
            {activeTab === key && (
              <motion.div
                className="nav-active-indicator"
                layoutId="navIndicator"
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="nav-user-area">
        {/* Global Search Trigger */}
        <button
          className="nav-search-trigger"
          onClick={onOpenSearch}
          title="Search DSA topics and problems (Cmd+K / Ctrl+K)"
          aria-label="Search"
        >
          <Search size={15} />
          <span className="search-shortcut">⌘K</span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          className="nav-theme-toggle"
          onClick={toggleTheme}
          title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={17} color="var(--amber-gold)" /> : <Moon size={17} color="var(--orange-primary)" />}
        </button>

        {/* Guest Sign-In CTA Button */}
        {isGuest && (
          <button
            type="button"
            className="nav-signin-cta-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (typeof onOpenSignIn === 'function') {
                onOpenSignIn();
              }
            }}
            title="Sign in with your Google or Student account to unlock videos"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.8rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(249, 115, 22, 0.45)',
              transition: 'all 0.2s ease',
              marginRight: '8px'
            }}
          >
                        <svg width="15" height="15" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Continue with Google</span>
          </button>
        )}

        {/* Profile Chip & Dropdown */}
        <div className="nav-profile-container" ref={profileRef} style={{ position: 'relative' }}>
          <div
            className="nav-profile-chip"
            onClick={() => setShowProfileMenu(prev => !prev)}
            title="Account Holder (Click for profile menu)"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowProfileMenu(prev => !prev); }}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            <div className="avatar-circle">
              {initials}
            </div>
            <div className="user-details">
              <span className="user-profile-name">{isGuest ? 'Guest Explorer' : displayName}</span>
              <span className="user-role" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: isGuest ? '#f59e0b' : '#10b981', fontWeight: '700', fontSize: '0.72rem' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: isGuest ? '#f59e0b' : '#10b981', display: 'inline-block', boxShadow: isGuest ? '0 0 6px #f59e0b' : '0 0 6px #10b981' }}></span>
                {isGuest ? 'Guest Mode' : 'Online'}
              </span>
            </div>
            <ChevronDown
              size={13}
              style={{
                marginLeft: 2,
                opacity: 0.6,
                transform: showProfileMenu ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s ease'
              }}
            />
          </div>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                className="nav-profile-dropdown glass-card"
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                <div className="profile-dropdown-header">
                  <div className="dropdown-avatar">{initials}</div>
                  <div className="dropdown-user-info">
                    <span className="dropdown-user-name">{displayName}</span>
                    <span className="dropdown-user-status">
                      <span className="status-dot"></span> Online (Active)
                    </span>
                  </div>
                </div>

                <div className="profile-dropdown-divider"></div>

                {isGuest && (
                  <>
                    <button
                      type="button"
                      className="profile-dropdown-item"
                      style={{ color: 'var(--orange-primary, #f97316)', fontWeight: 700 }}
                      onClick={() => {
                        setShowProfileMenu(false);
                        if (typeof onOpenSignIn === 'function') onOpenSignIn();
                      }}
                    >
                      <LogIn size={14} />
                      <span>Continue with Google</span>
                    </button>
                    <div className="profile-dropdown-divider"></div>
                  </>
                )}

                <button
                  type="button"
                  className="profile-dropdown-item danger"
                  onClick={handleExit}
                  id="profileDropdownExitBtn"
                >
                  <LogOut size={15} />
                  <span>Exit Session / Sign Out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dedicated Quick Exit Button */}
        <button
          type="button"
          className="nav-logout-btn"
          onClick={handleExit}
          aria-label="Exit Session"
          title="Exit Session / Sign Out"
          id="navQuickExitBtn"
        >
          <LogOut size={15} />
        </button>
      </div>
    </motion.nav>

    {/* Mobile Bottom Navigation Bar */}
    <nav className="mobile-app-bottom-bar" aria-label="Mobile Navigation">
      {mobileNavItems.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          type="button"
          className={`mobile-bottom-nav-btn ${activeTab === key ? 'active' : ''}`}
          onClick={() => onSelectTab(key)}
        >
          <Icon size={18} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
    </>
  );
};

export default Navbar;
