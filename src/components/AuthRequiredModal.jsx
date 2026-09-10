import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  X,
  LogIn,
  User,
  Mail,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const AuthRequiredModal = ({
  isOpen,
  onClose,
  onLogin,
  onSwitchToFullLogin,
  videoTitle
}) => {
  const [googleName, setGoogleName] = useState('');
  const [googleEmail, setGoogleEmail] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('select'); // 'select' | 'new'
  const [savedUsers, setSavedUsers] = useState([]);

  useEffect(() => {
    try {
      const list = JSON.parse(localStorage.getItem('roadmap_registered_users') || '[]');
      if (Array.isArray(list) && list.length > 0) {
        setSavedUsers(list);
        setActiveTab('select');
      } else {
        setSavedUsers([
          { name: "Aayush Singh", email: "aayushsingh@gmail.com" },
          { name: "Priya Patel", email: "priyapatel@gmail.com" },
          { name: "Rahul Sharma", email: "rahulsharma@gmail.com" }
        ]);
        setActiveTab('select');
      }
    } catch {
      setActiveTab('new');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectAccount = (user) => {
    const chosenName = user.fullName || user.name || user.username || 'Learner';
    sessionStorage.setItem('roadmap_user', chosenName);
    localStorage.setItem('roadmap_user', chosenName);
    if (user.email) {
      sessionStorage.setItem('roadmap_user_email', user.email);
      localStorage.setItem('roadmap_user_email', user.email);
    }
    onLogin(chosenName);
  };

  const handleNewAccountSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimmedName = googleName.trim();
    const trimmedEmail = googleEmail.trim().toLowerCase();

    if (!trimmedName) {
      setError('Please enter your full name.');
      return;
    }

    if (!trimmedEmail || !trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setError('Please enter a valid Google email address (@gmail.com).');
      return;
    }

    // Unique email verification
    const existing = savedUsers.find(
      (u) => (u.email && u.email.toLowerCase() === trimmedEmail)
    );
    if (existing && existing.name && existing.name.toLowerCase() !== trimmedName.toLowerCase()) {
      setError(`This email is already registered to "${existing.name}". Each email belongs to only one account holder.`);
      return;
    }

    const newUser = { name: trimmedName, email: trimmedEmail };
    const updated = [...savedUsers.filter(u => u.email !== trimmedEmail), newUser];
    localStorage.setItem('roadmap_registered_users', JSON.stringify(updated));

    handleSelectAccount(newUser);
  };

  return (
    <AnimatePresence>
      <div className="google-modal-overlay" onClick={onClose}>
        <motion.div
          className="google-modal-card glass-card"
          style={{ maxWidth: '440px', width: '100%', padding: '2rem' }}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 24 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            className="google-modal-close"
            onClick={onClose}
            aria-label="Close"
            title="Continue exploring as guest"
          >
            <X size={18} />
          </button>

          {/* Header with Lock Emblem */}
          <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(234, 88, 12, 0.1))',
                border: '1.5px solid rgba(249, 115, 22, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--orange-primary, #f97316)',
                margin: '0 auto 0.85rem',
                boxShadow: '0 8px 24px rgba(249, 115, 22, 0.25)'
              }}
            >
              <Lock size={24} />
            </div>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '3px 10px',
                borderRadius: '9999px',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#ef4444',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                marginBottom: '0.5rem'
              }}
            >
              🔒 Video Playback Locked
            </span>

            <h3 style={{ margin: '0 0 0.4rem', fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800 }}>
              Sign In to Watch Video
            </h3>

            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {videoTitle ? (
                <>To play <strong style={{ color: 'var(--text-primary)' }}>"{videoTitle}"</strong> and track your progress, please sign in with your account.</>
              ) : (
                <>You can freely explore all roadmaps and problem sets in Guest Mode. Please sign in to play masterclass videos.</>
              )}
            </p>
          </div>

          {error && (
            <div className="google-modal-alert error" style={{ marginBottom: '1rem' }}>
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Account Switcher Tabs */}
          <div style={{ display: 'flex', gap: '6px', background: 'rgba(249, 115, 22, 0.08)', padding: '4px', borderRadius: '10px', marginBottom: '1rem' }}>
            <button
              type="button"
              onClick={() => { setActiveTab('select'); setError(''); }}
              style={{
                flex: 1,
                padding: '6px 10px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'select' ? 'var(--card-bg, #ffffff)' : 'transparent',
                color: activeTab === 'select' ? 'var(--orange-primary, #f97316)' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'select' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              Quick Sign In ({savedUsers.length})
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('new'); setError(''); }}
              style={{
                flex: 1,
                padding: '6px 10px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'new' ? 'var(--card-bg, #ffffff)' : 'transparent',
                color: activeTab === 'new' ? 'var(--orange-primary, #f97316)' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'new' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              Google Account
            </button>
          </div>

          {activeTab === 'select' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto', marginBottom: '1rem' }}>
              {savedUsers.map((u, i) => {
                const name = u.fullName || u.name || u.username;
                const email = u.email || 'student@academy.local';
                const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectAccount(u)}
                    className="google-user-item"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 12px',
                      borderRadius: '10px',
                      background: 'var(--card-bg-elevated, rgba(249, 115, 22, 0.04))',
                      border: '1px solid var(--card-border, rgba(249, 115, 22, 0.2))',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #f97316, #ea580c)',
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {initials}
                    </div>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <strong style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-primary)' }}>{name}</strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{email}</span>
                    </div>
                    <ArrowRight size={14} color="var(--orange-primary, #f97316)" />
                  </button>
                );
              })}
            </div>
          ) : (
            <form onSubmit={handleNewAccountSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1rem' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <User size={15} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Full Name (e.g. Priya Sharma)"
                  value={googleName}
                  onChange={(e) => setGoogleName(e.target.value)}
                  className="login-input"
                  style={{ width: '100%', paddingLeft: '34px' }}
                />
              </div>

              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Mail size={15} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  placeholder="Google Email (e.g. yourname@gmail.com)"
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  className="login-input"
                  style={{ width: '100%', paddingLeft: '34px' }}
                />
              </div>

              <button
                type="submit"
                className="btn-hero-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
              >
                <Sparkles size={15} />
                <span>Sign In & Play Video</span>
              </button>
            </form>
          )}

          {/* Footer Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--card-border)', paddingTop: '0.85rem' }}>
            <button
              type="button"
              onClick={onSwitchToFullLogin}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--orange-primary, #f97316)',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <LogIn size={13} />
              <span>Login with Password / Create New Account →</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              Continue Exploring Without Video
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthRequiredModal;
