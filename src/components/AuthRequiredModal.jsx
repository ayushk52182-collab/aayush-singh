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
  ArrowRight,
  ShieldCheck
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
        const defaults = [
          { name: "Aayush Singh", email: "aayushsingh@gmail.com" },
          { name: "Priya Patel", email: "priyapatel@gmail.com" },
          { name: "Rahul Sharma", email: "rahulsharma@gmail.com" }
        ];
        localStorage.setItem('roadmap_registered_users', JSON.stringify(defaults));
        setSavedUsers(defaults);
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

    const newUser = { name: trimmedName, fullName: trimmedName, username: trimmedEmail.split('@')[0], email: trimmedEmail, provider: 'google' };
    const updated = [...savedUsers.filter(u => u.email !== trimmedEmail), newUser];
    localStorage.setItem('roadmap_registered_users', JSON.stringify(updated));

    handleSelectAccount(newUser);
  };

  return (
    <div
      className="google-auth-modal-overlay google-modal-overlay auth-required-modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(6, 6, 14, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 9999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        boxSizing: 'border-box'
      }}
    >
      <motion.div
        className="google-auth-modal-card google-modal-card glass-card"
        style={{
          maxWidth: '460px',
          width: '100%',
          padding: '2.25rem 2rem',
          position: 'relative',
          borderRadius: '24px',
          background: 'var(--card-bg-elevated, #ffffff)',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(249, 115, 22, 0.25)',
          border: '1px solid rgba(249, 115, 22, 0.3)'
        }}
        initial={{ opacity: 0, scale: 0.9, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 25 }}
        transition={{ type: 'spring', damping: 25, stiffness: 320 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          className="google-modal-close-btn"
          onClick={onClose}
          aria-label="Close"
          title="Continue exploring without video"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(249, 115, 22, 0.08)',
            border: '1px solid rgba(249, 115, 22, 0.2)',
            color: 'var(--text-secondary, #73738a)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <X size={16} />
        </button>

        {/* Header with Emblem */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(234, 88, 12, 0.1))',
              border: '1.5px solid rgba(249, 115, 22, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--orange-primary, #f97316)',
              margin: '0 auto 0.9rem',
              boxShadow: '0 8px 24px rgba(249, 115, 22, 0.3)'
            }}
          >
            {videoTitle ? <Lock size={26} /> : <ShieldCheck size={28} />}
          </div>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '9999px',
              background: videoTitle ? 'rgba(239, 68, 68, 0.12)' : 'rgba(249, 115, 22, 0.12)',
              border: videoTitle ? '1px solid rgba(239, 68, 68, 0.35)' : '1px solid rgba(249, 115, 22, 0.35)',
              color: videoTitle ? '#ef4444' : 'var(--orange-primary, #f97316)',
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: '0.6rem'
            }}
          >
            {videoTitle ? '🔒 Video Playback Locked' : '⚡ Academy Sign In'}
          </span>

          <h3
            style={{
              margin: '0 0 0.45rem',
              fontFamily: 'var(--font-heading, "Syne", sans-serif)',
              fontSize: '1.4rem',
              fontWeight: 800,
              color: 'var(--text-primary, #1c1917)'
            }}
          >
            {videoTitle ? 'Sign In to Play Video' : 'Sign In to Your Account'}
          </h3>

          <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary, #57534e)', lineHeight: 1.55 }}>
            {videoTitle ? (
              <>
                To play <strong style={{ color: 'var(--orange-primary, #f97316)' }}>"{videoTitle}"</strong> and track your milestones, please sign in with your account.
              </>
            ) : (
              <>
                Sign in to save your progress, unlock all video masterclasses, and solve Striver A2Z DSA problems.
              </>
            )}
          </p>
        </div>

        {error && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0.65rem 1rem',
              background: '#fff1f2',
              border: '1px solid rgba(225, 29, 72, 0.3)',
              borderRadius: '10px',
              color: '#e11d48',
              fontSize: '0.8rem',
              fontWeight: 600,
              marginBottom: '1rem'
            }}
          >
            <AlertCircle size={15} />
            <span>{error}</span>
          </div>
        )}

        {/* Quick Account Switcher Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '6px',
            background: 'rgba(249, 115, 22, 0.08)',
            padding: '4px',
            borderRadius: '12px',
            marginBottom: '1.15rem'
          }}
        >
          <button
            type="button"
            onClick={() => { setActiveTab('select'); setError(''); }}
            style={{
              flex: 1,
              padding: '7px 12px',
              borderRadius: '9px',
              border: 'none',
              background: activeTab === 'select' ? 'var(--card-bg, #ffffff)' : 'transparent',
              color: activeTab === 'select' ? 'var(--orange-primary, #f97316)' : 'var(--text-secondary, #73738a)',
              fontWeight: 800,
              fontSize: '0.8rem',
              cursor: 'pointer',
              boxShadow: activeTab === 'select' ? '0 2px 10px rgba(249, 115, 22, 0.15)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            Saved Accounts ({savedUsers.length})
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('new'); setError(''); }}
            style={{
              flex: 1,
              padding: '7px 12px',
              borderRadius: '9px',
              border: 'none',
              background: activeTab === 'new' ? 'var(--card-bg, #ffffff)' : 'transparent',
              color: activeTab === 'new' ? 'var(--orange-primary, #f97316)' : 'var(--text-secondary, #73738a)',
              fontWeight: 800,
              fontSize: '0.8rem',
              cursor: 'pointer',
              boxShadow: activeTab === 'new' ? '0 2px 10px rgba(249, 115, 22, 0.15)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            Google Account
          </button>
        </div>

        {activeTab === 'select' ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '9px',
              maxHeight: '190px',
              overflowY: 'auto',
              marginBottom: '1.25rem',
              paddingRight: '4px'
            }}
          >
            {savedUsers.map((u, i) => {
              const name = u.fullName || u.name || u.username;
              const email = u.email || 'student@academy.local';
              const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectAccount(u)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    background: 'var(--card-bg-elevated, rgba(249, 115, 22, 0.04))',
                    border: '1px solid var(--card-border, rgba(249, 115, 22, 0.2))',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--orange-primary, #f97316)';
                    e.currentTarget.style.transform = 'translateX(3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--card-border, rgba(249, 115, 22, 0.2))';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #f97316, #ea580c)',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(249, 115, 22, 0.35)'
                    }}
                  >
                    {initials}
                  </div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <strong style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-primary, #1c1917)' }}>{name}</strong>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary, #57534e)' }}>{email}</span>
                  </div>
                  <ArrowRight size={15} color="var(--orange-primary, #f97316)" />
                </button>
              );
            })}
          </div>
        ) : (
          <form onSubmit={handleNewAccountSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '11px', marginBottom: '1.25rem' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <User size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted, #a8a29e)' }} />
              <input
                type="text"
                placeholder="Full Name (e.g. Priya Sharma)"
                value={googleName}
                onChange={(e) => setGoogleName(e.target.value)}
                className="login-input"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 38px',
                  borderRadius: '12px',
                  border: '1px solid rgba(249, 115, 22, 0.25)',
                  fontSize: '0.88rem',
                  background: 'var(--card-bg, #fffbf7)',
                  color: 'var(--text-primary, #1c1917)',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Mail size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted, #a8a29e)' }} />
              <input
                type="email"
                placeholder="Google Email (e.g. yourname@gmail.com)"
                value={googleEmail}
                onChange={(e) => setGoogleEmail(e.target.value)}
                className="login-input"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 38px',
                  borderRadius: '12px',
                  border: '1px solid rgba(249, 115, 22, 0.25)',
                  fontSize: '0.88rem',
                  background: 'var(--card-bg, #fffbf7)',
                  color: 'var(--text-primary, #1c1917)',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn-hero-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '0.8rem',
                borderRadius: '12px',
                fontSize: '0.88rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>{videoTitle ? 'Continue with Google & Play Video' : 'Continue with Google'}</span>
            </button>
          </form>
        )}

        {/* Footer Actions */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '9px',
            borderTop: '1px solid rgba(249, 115, 22, 0.18)',
            paddingTop: '1rem'
          }}
        >
          <button
            type="button"
            onClick={onSwitchToFullLogin}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--orange-primary, #f97316)',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '6px'
            }}
          >
            <LogIn size={14} />
            <span>Login with Password / Create New Account →</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted, #73738a)',
              fontSize: '0.78rem',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            Continue Exploring Without Video
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthRequiredModal;
