const { useState, useEffect, useRef } = React;

const TEMP_USERNAME = "aayush";
const TEMP_PASSWORD = "1234";

// Helper to extract YouTube video ID from URL
const getYouTubeVideoId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Lucide Icon Helper using SVG rendering fallback for smooth standalone UMD compatibility
const Icon = ({ name, size = 18, className = "" }) => {
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [name]);

  return <i data-lucide={name} style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} className={className}></i>;
};

// C Language Structured Data
const C_ROADMAP_DATA = [
  {
    id: "01",
    badge: "PHASE 01",
    title: "Foundations & I/O",
    icon: "terminal",
    bottomLabel: "WEEK 1 TARGET",
    bottomIcon: "zap",
    isActive: false,
    topics: [
      {
        title: "Setup: GCC, MinGW & VS Code",
        url: "https://youtu.be/z2jDamkbBF0?si=k0dKMuofXYDSuY0B"
      },
      {
        title: "Types: int, float, char, specifiers",
        url: "https://youtu.be/neLud9ah2hQ?si=0y3rJjYUIdhHTVua"
      },
      {
        title: "I/O: printf / scanf tricks",
        url: "https://youtu.be/bm1rFiuXGDc?si=lrRxUoo1v9yXctvj"
      },
      {
        title: "Operators: Bitwise & Ternary",
        url: "https://youtu.be/_yU4vi6JhPk?si=aoOB5XtJVrnERHsw"
      }
    ]
  },
  {
    id: "02",
    badge: "PHASE 02",
    title: "Control & Loops",
    icon: "git-fork",
    bottomLabel: "LOGIC BUILDING",
    bottomIcon: "code-2",
    isActive: false,
    topics: [
      {
        title: "Decisions: if-else & switch",
        url: "https://youtu.be/7PSfRdeY5qE?si=QPvhiVD1X-VxcTaC"
      },
      {
        title: "Loops: for, while, do-while",
        url: "https://youtu.be/wYvrBXUfFfw?si=aDhmtBPpH7xmWnO4"
      },
      {
        title: "Patterns: Star, Pyramid & Number",
        url: "https://youtu.be/WxXZk5t2BAA?si=cD_BkEMdBe0dqoH_"
      },
      {
        title: "Math: Prime, Armstrong, Fib",
        url: "https://youtu.be/VVt6uHpTTcs?si=z26XybfD7s0pirFB"
      }
    ]
  },
  {
    id: "03",
    badge: "PHASE 03",
    title: "Functions & Arrays",
    icon: "boxes",
    bottomLabel: "CORE MODULARITY",
    bottomIcon: "git-branch",
    isActive: false,
    topics: [
      {
        title: "Modularity: Prototyping & Scope",
        url: "https://youtu.be/RFLFX1boGwo?si=rBfb98DMquG0fqUD"
      },
      {
        title: "Recursion: Call Stack & Base",
        url: "https://youtu.be/r2yHEW8HmBE?si=faBvqp9F3PX0-Z3t"
      },
      {
        title: "Arrays: 1D, 2D & Matrix Ops",
        url: "https://youtu.be/h7tQ4u56njY?si=hJK78_QVYJuaXvYh"
      },
      {
        title: "Strings: char[] manipulation",
        url: "https://youtu.be/8qKp63Ox3vQ?si=k_UIbmXGJ5g0B-Jg"
      }
    ]
  },
  {
    id: "04",
    badge: "PHASE 04",
    title: "Pointers & Memory",
    icon: "cpu",
    bottomLabel: "HEART OF C",
    bottomIcon: "flame",
    isActive: false,
    topics: [
      { title: "Pointers: Address & & deref *", url: null },
      { title: "Passing: Value vs Reference", url: null },
      { title: "DMA: malloc() & free()", url: null },
      { title: "Structs: struct, union", url: null }
    ]
  },
  {
    id: "05",
    badge: "PHASE 05",
    title: "Files & PPS Pro",
    icon: "rocket",
    bottomLabel: "EXAM MASTERY",
    bottomIcon: "trophy",
    isActive: false,
    topics: [
      { title: "Files: fopen, fprintf, fread", url: null },
      { title: "Sorting: Bubble, Selection", url: null },
      { title: "Searching: Linear vs Binary", url: null },
      { title: "Project: Student / Bank Mini-app", url: null }
    ]
  }
];

// Python Structured Data
const PYTHON_ROADMAP_DATA = [
  {
    id: "01",
    badge: "PHASE 01",
    title: "Python Foundations & I/O",
    icon: "terminal",
    bottomLabel: "WEEK 1 TARGET",
    bottomIcon: "zap",
    isActive: false,
    topics: [
      { title: "Python setup, interpreter & VS Code", url: null },
      { title: "Variables, data types & type conversion", url: null },
      { title: "input(), print() & formatted output", url: null },
      { title: "Operators and expressions", url: null }
    ]
  },
  {
    id: "02",
    badge: "PHASE 02",
    title: "Control Flow & Loops",
    icon: "git-fork",
    bottomLabel: "LOGIC BUILDING",
    bottomIcon: "code-2",
    isActive: false,
    topics: [
      { title: "if, elif, else conditions", url: null },
      { title: "for and while loops", url: null },
      { title: "break, continue and pass", url: null },
      { title: "Pattern and number problems", url: null }
    ]
  },
  {
    id: "03",
    badge: "PHASE 03",
    title: "Functions & Data Structures",
    icon: "boxes",
    bottomLabel: "CORE MODULARITY",
    bottomIcon: "git-branch",
    isActive: false,
    topics: [
      { title: "Functions, parameters and return values", url: null },
      { title: "Recursion and call stack", url: null },
      { title: "Lists, tuples and dictionaries", url: null },
      { title: "Strings and common operations", url: null }
    ]
  },
  {
    id: "04",
    badge: "PHASE 04",
    title: "Object-Oriented Python",
    icon: "cpu",
    bottomLabel: "HEART OF PYTHON",
    bottomIcon: "flame",
    isActive: false,
    topics: [
      { title: "Classes and objects", url: null },
      { title: "Constructors and methods", url: null },
      { title: "Inheritance and polymorphism", url: null },
      { title: "Encapsulation and abstraction", url: null }
    ]
  },
  {
    id: "05",
    badge: "PHASE 05",
    title: "Files, Modules & Projects",
    icon: "rocket",
    bottomLabel: "EXAM MASTERY",
    bottomIcon: "trophy",
    isActive: false,
    topics: [
      { title: "File handling and exception handling", url: null },
      { title: "Modules and packages", url: null },
      { title: "Sorting and searching", url: null },
      { title: "Python mini-project", url: null }
    ]
  }
];

// Helper to get all topics array with index for Next Unit navigation
const getAllTopicsList = () => {
  const cTopics = C_ROADMAP_DATA.flatMap(p => p.topics.map(t => ({ ...t, lang: "C", phase: p.badge })));
  const pyTopics = PYTHON_ROADMAP_DATA.flatMap(p => p.topics.map(t => ({ ...t, lang: "Python", phase: p.badge })));
  return [...cTopics, ...pyTopics];
};

// Sample Achievements Data
const SAMPLE_ACHIEVEMENTS = [
  { id: 1, title: "First Login", desc: "Welcome to Student Portal", unlocked: true, icon: "award" },
  { id: 2, title: "3-Day Streak", desc: "Maintained daily study momentum", unlocked: true, icon: "flame" },
  { id: 3, title: "C Basics Started", desc: "Explored Phase 01 Foundations", unlocked: true, icon: "code" },
  { id: 4, title: "First Video Watched", desc: "Completed GCC/VS Code Setup", unlocked: true, icon: "play-circle" },
  { id: 5, title: "Pointers Mastery", desc: "Unlock Phase 04 Memory concepts", unlocked: false, icon: "cpu" },
  { id: 6, title: "Python Explorer", desc: "Start Python & Data Structures", unlocked: false, icon: "terminal" }
];

// Video 3D Icon helper
const Video3DIcon = ({ active = true }) => {
  return (
    <span className={`video-3d-symbol ${active ? "video-active" : "video-muted"}`} title={active ? "Video Available" : "Upcoming Video"}>
      <span className="video-depth">▶</span>
    </span>
  );
};

// Premium Student Login & Registration Component with 3D Coding Background
const LoginPage = ({ onLogin }) => {
  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSwitchMode = (newMode) => {
    setMode(newMode);
    setError("");
    setSuccess("");
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const trimmedUsername = username.trim();

    if (!trimmedUsername || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // 1. Check default credentials
    if (trimmedUsername === TEMP_USERNAME && password === TEMP_PASSWORD) {
      setSuccess("Session verified! Launching dashboard...");
      setTimeout(() => onLogin(trimmedUsername), 400);
      return;
    }

    // 2. Check registered users in localStorage
    try {
      const registered = JSON.parse(localStorage.getItem("roadmap_registered_users") || "[]");
      const match = registered.find(
        (u) =>
          (u.username.toLowerCase() === trimmedUsername.toLowerCase() ||
            (u.email && u.email.toLowerCase() === trimmedUsername.toLowerCase())) &&
          u.password === password
      );

      if (match) {
        setSuccess();
        setTimeout(() => onLogin(match.username), 400);
        return;
      }
    } catch (err) {
      console.error("Error reading registered users:", err);
    }

    setError("Incorrect username or password. Default demo is aayush / 1234, or create an account via Sign Up.");
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const trimmedUsername = username.trim();
    const trimmedFullName = fullName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedFullName || !trimmedUsername || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (trimmedUsername.length < 3) {
      setError("Username must be at least 3 characters long.");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const registered = JSON.parse(localStorage.getItem("roadmap_registered_users") || "[]");
      const exists = registered.some(
        (u) => u.username.toLowerCase() === trimmedUsername.toLowerCase()
      );

      if (exists || trimmedUsername.toLowerCase() === TEMP_USERNAME.toLowerCase()) {
        setError("Username already taken. Please choose another username or log in.");
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
      localStorage.setItem("roadmap_registered_users", JSON.stringify(registered));

      setSuccess("Account created successfully! Initializing your session...");
      setTimeout(() => {
        onLogin(newUser.username);
      }, 700);
    } catch (err) {
      console.error("Error saving new user:", err);
      setError("Failed to create account. Please try again.");
    }
  };

  return (
    <div className="login-overlay">
      {/* 3D Background Illustration for Login Screen */}
      <div className="login-3d-bg-container">
        <div className="bg-floating-code-window glass-panel">
          <div className="window-bar">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span className="window-title">python_demo.py</span>
          </div>
          <pre className="code-block">
            <code>
              <span className="code-keyword">def</span> <span className="code-func">solve_problem</span>():<br/>
              &nbsp;&nbsp;points = [<span className="code-num">100</span>, <span className="code-num">200</span>, <span className="code-num">300</span>]<br/>
              &nbsp;&nbsp;<span className="code-keyword">return</span> <span className="code-func">sum</span>(points)<br/><br/>
              <span className="code-func">print</span>(<span className="code-str">"Mastering Python 3D!"</span>)
            </code>
          </pre>
        </div>
        <div className="bg-symbol sym-a">&#123; &#125;</div>
        <div className="bg-symbol sym-b">&lt;/&gt;</div>
        <div className="bg-symbol sym-c">01</div>
        <div className="bg-symbol sym-d">101</div>
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

      <div className="glass-panel login-card 3d-login-card">
        <div className="login-header">
          <div className="login-top-actions-bar">
            <button
              type="button"
              onClick={() => onLogin('Guest Learner')}
              className="login-action-btn-pill"
              title="Explore the Roadmap directly as a Guest"
            >
              <Icon name="compass" size={13} />
              <span>Explore as Guest</span>
            </button>

            <a
              href="/c-roadmap.html"
              className="login-action-btn-pill"
              title="View Standalone Full HTML Roadmap"
            >
              <Icon name="code-2" size={13} />
              <span>Full HTML</span>
            </a>

            <div className="login-live-status-pill">
              <span className="live-status-pulse"></span>
              <span>Academy v2.0</span>
            </div>
          </div>

          <div className="login-brand-crest">
            <div className="brand-crest-emblem">
              <span>A</span>
            </div>
          </div>

          <div className="top-badge-row">
            <span className="badge-3d">
              <Icon name={mode === 'login' ? 'sparkles' : 'user-plus'} size={13} />
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
              : 'Register your account to unlock personalized milestone tracking and 3D visualizers.'}
          </p>
        </div>

        {/* Auth Switcher Tabs */}
        <div className="auth-tab-row">
          <button
            type="button"
            className={}
            onClick={() => handleSwitchMode('login')}
          >
            <Icon name="log-in" size={14} />
            Sign In
          </button>
          <button
            type="button"
            className={}
            onClick={() => handleSwitchMode('signup')}
          >
            <Icon name="user-plus" size={14} />
            Sign Up
          </button>
        </div>

        {error && <div className="login-error">{error}</div>}
        {success && <div className="login-success">{success}</div>}

        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="login-form">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="login-input"
                placeholder="e.g. aayush"
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
                  type={showPassword ? "text" : "password"}
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
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <Icon name={showPassword ? "eye-off" : "eye"} size={16} />
                </button>
              </div>
            </div>

            <button type="submit" className="login-submit-btn">
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
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit} className="login-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="login-input"
                placeholder="e.g. Aayush Singh"
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
                placeholder="e.g. aayush_coder"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address (Optional)</label>
              <input
                type="email"
                className="login-input"
                placeholder="e.g. aayush@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Create Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
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
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <Icon name={showPassword ? "eye-off" : "eye"} size={16} />
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
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
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  <Icon name={showConfirmPassword ? "eye-off" : "eye"} size={16} />
                </button>
              </div>
            </div>

            <button type="submit" className="login-submit-btn">
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
          </form>
        )}

        <div className="login-footer-info">
          <p className="progress-note">
            <Icon name="shield-check" size={14} />
            Your learning progress is saved automatically.
          </p>
          <p className="login-credit">Designed & Engineered by Aayush Singh</p>
        </div>
      </div>
    </div>
  );
};

// In-App YouTube Video Modal Player Component with Distraction-Free ENDED State
const VideoPlayerModal = ({ videoInfo, onClose, onProgressUpdate, onNextUnit, userProgress }) => {
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const [embedError, setEmbedError] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [playbackState, setPlaybackState] = useState({
    currentTime: 0,
    duration: 0,
    watchedPercent: 0,
    statusText: "Not Started",
    isCompleted: false
  });

  const videoId = getYouTubeVideoId(videoInfo.url);

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    let player;
    setVideoEnded(false);
    setEmbedError(false);

    // Fetch initial saved playback position
    const savedEntry = userProgress[videoId] || {};
    const initialTime = savedEntry.currentTime || 0;

    const createPlayer = () => {
      try {
        player = new window.YT.Player('youtube-player-element', {
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            controls: 1,
            playsinline: 1,
            rel: 0,
            iv_load_policy: 3,
            enablejsapi: 1,
            origin: window.location.origin,
            start: Math.floor(initialTime)
          },
          events: {
            onReady: (event) => {
              playerRef.current = event.target;
              const dur = event.target.getDuration() || 0;
              setPlaybackState(prev => ({
                ...prev,
                duration: dur,
                currentTime: initialTime,
                watchedPercent: savedEntry.percent || 0,
                statusText: "Ready"
              }));
            },
            onStateChange: (event) => {
              let status = "Paused";
              if (event.data === window.YT.PlayerState.PLAYING) {
                status = "Watching";
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                status = "Paused";
              } else if (event.data === window.YT.PlayerState.BUFFERING) {
                status = "Buffering...";
              } else if (event.data === window.YT.PlayerState.ENDED) {
                status = "Completed";
                setVideoEnded(true);
                // Immediately update progress & completion
                onProgressUpdate({
                  videoId,
                  title: videoInfo.title,
                  lang: videoInfo.lang || "C",
                  phase: videoInfo.phase || "PHASE 01",
                  currentTime: playerRef.current ? playerRef.current.getDuration() : initialTime,
                  duration: playerRef.current ? playerRef.current.getDuration() : initialTime,
                  percent: 100,
                  isCompleted: true
                });
                if (playerRef.current && typeof playerRef.current.destroy === 'function') {
                  playerRef.current.destroy();
                }
              }
              setPlaybackState(prev => ({ ...prev, statusText: status }));
            },
            onError: () => {
              setEmbedError(true);
            }
          }
        });
      } catch (err) {
        setEmbedError(true);
      }
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    intervalRef.current = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        const cur = playerRef.current.getCurrentTime() || 0;
        const dur = playerRef.current.getDuration() || 0;
        const pct = dur > 0 ? Math.min(100, Math.round((cur / dur) * 100)) : 0;
        const isComp = pct >= 80;

        setPlaybackState(prev => ({
          ...prev,
          currentTime: cur,
          duration: dur,
          watchedPercent: Math.max(prev.watchedPercent, pct),
          isCompleted: prev.isCompleted || isComp
        }));

        onProgressUpdate({
          videoId,
          title: videoInfo.title,
          lang: videoInfo.lang || "C",
          phase: videoInfo.phase || "PHASE 01",
          currentTime: cur,
          duration: dur,
          percent: pct,
          isCompleted: isComp
        });
      }
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try { playerRef.current.destroy(); } catch (e) {}
      }
    };
  }, [videoId]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="video-modal-overlay">
      <div className="glass-panel video-modal-card">
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="phase-badge">{videoInfo.phase || "PHASE 01"}</span>
            <span className="lang-tag">{videoInfo.lang || "C"}</span>
            <h3 className="modal-video-title">{videoInfo.title}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close Video Player">
            <Icon name="x" size={20} />
          </button>
        </div>

        {/* Player / Completion Screen / Error Display */}
        {embedError ? (
          <div className="embed-error-box glass-panel">
            <Icon name="alert-triangle" size={32} className="error-icon" />
            <h4>This video cannot be played inside the website.</h4>
            <p>The content provider restricts playback on embedded players.</p>
            <button className="btn-primary" onClick={onClose}>Back to Roadmap</button>
          </div>
        ) : videoEnded ? (
          <div className="completion-screen-box glass-panel">
            <div className="completion-icon-wrapper">
              <Icon name="check-circle-2" size={48} className="completion-check" />
            </div>
            <h2>Video Completed ✓</h2>
            <p className="completion-msg">Great job! You completed this lesson.</p>

            <div className="completion-details">
              <div className="c-detail-item">
                <span className="lbl">Topic:</span> <strong>{videoInfo.title}</strong>
              </div>
              <div className="c-detail-item">
                <span className="lbl">Phase:</span> <strong>{videoInfo.phase || "PHASE 01"} ({videoInfo.lang || "C"})</strong>
              </div>
            </div>

            <div className="completion-actions">
              <button className="btn-primary" onClick={onNextUnit}>Next Unit →</button>
              <button className="btn-secondary" onClick={onClose}>Back to Roadmap</button>
            </div>
          </div>
        ) : (
          <div className="iframe-container">
            <div id="youtube-player-element"></div>
          </div>
        )}

        {!videoEnded && !embedError && (
          <div className="video-live-tracker-bar">
            <div className="tracker-top">
              <div className="status-indicator">
                <span className={`status-dot ${playbackState.statusText.toLowerCase().replace(/[^a-z]/g, '')}`}></span>
                <span className="status-text">{playbackState.statusText}</span>
                {playbackState.isCompleted && <span className="completion-badge">✓ Completed</span>}
              </div>
              <div className="time-display">
                {formatTime(playbackState.currentTime)} / {formatTime(playbackState.duration)} ({playbackState.watchedPercent}%)
              </div>
            </div>
            <div className="live-progress-track">
              <div
                className="live-progress-fill"
                style={{ width: `${playbackState.watchedPercent}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper to parse HH:MM:SS or MM:SS timestamp string into total seconds
const parseTimestampToSeconds = (timeStr) => {
  if (typeof timeStr === 'number') return timeStr;
  if (!timeStr) return 0;
  const parts = timeStr.split(':').map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return 0;
};

// One-Shot Masterclass Structured Data (C Language & Python 3.12+)
const ONE_SHOT_DATA = {
  c: {
    key: "c",
    langLabel: "C Language One-Shot",
    title: "Complete C Language Masterclass in 1 Video",
    subtitle: "End-to-end C programming marathon tutorial covering variables, memory pointers, recursion & exam questions.",
    embedUrl: "https://www.youtube.com/embed/aZb0iu4uGwA?autoplay=0&rel=0&enablejsapi=1",
    youtubeUrl: "https://youtu.be/aZb0iu4uGwA",
    videoId: "aZb0iu4uGwA",
    pdfUrl: "/notes/c_handbook.pdf",
    notesLink: "/notes/c_handbook.pdf",
    downloadFileName: "C_Language_Complete_Handbook.pdf",
    buttonLabel: "📄 Download Notes / Cheatsheet PDF",
    cheatsheetTitle: "C Language Complete Revision Notes & Cheatsheet (PDF)",
    badgeText: "Complete C Exam Roadmap",
    chapters: [],
    timestamps: [
      { time: "00:00", label: "C Fundamentals & Setup (GCC / VS Code)", sec: 0 },
      { time: "22:15", label: "Variables, Formats & Specifiers", sec: 1335 },
      { time: "54:40", label: "Conditional Logic (If-Else & Switch)", sec: 3280 },
      { time: "01:25:10", label: "Loops, Star Pyramids & Logic Building", sec: 5110 },
      { time: "02:05:30", label: "Functions, Parameters & Call Stack Recursion", sec: 7530 },
      { time: "02:45:00", label: "1D & 2D Arrays with Matrix Operations", sec: 9900 },
      { time: "03:30:20", label: "Pointers, Addressing & Dynamic Memory (malloc)", sec: 12620 }
    ]
  },
  python: {
    key: "python",
    langLabel: "Python One-Shot",
    title: "Complete Python 3.12+ Masterclass & Handbook",
    subtitle: "Complete Python programming tutorial covering 13 core chapters, OOPs, 4 real-world projects & AI bots.",
    embedUrl: "https://www.youtube.com/embed/UrsmFxEIp5k?autoplay=0&rel=0&enablejsapi=1",
    youtubeUrl: "https://youtu.be/UrsmFxEIp5k",
    videoId: "UrsmFxEIp5k",
    pdfUrl: "https://go.fliplink.me/view/CBB2185A-D58B-4510-A1A3-FA032E7977EE",
    notesLink: "https://go.fliplink.me/view/CBB2185A-D58B-4510-A1A3-FA032E7977EE",
    downloadFileName: null,
    buttonLabel: "📖 View Python Handwritten Notes",
    cheatsheetTitle: "📖 View Python Handwritten Notes",
    badgeText: "Includes 13 Chapters + 4 Projects + AI Bots",
    chapters: [
      { num: "Ch 01", title: "Modules, Comments & Pip Setup", desc: "Built-in & external modules, pyttsx3, REPL & VS Code" },
      { num: "Ch 02", title: "Variables & Data Types", desc: "Typecasting, operators, input() & dynamic variable types" },
      { num: "Ch 03", title: "Strings & String Methods", desc: "Slicing [start:end:step], f-strings, escape sequences & string functions" },
      { num: "Ch 04", title: "Lists & Tuples", desc: "List methods (.append, .sort), tuple immutability & indexing" },
      { num: "Ch 05", title: "Dictionary & Sets", desc: "Key-value pairs, .get() methods, set union/intersection & operations" },
      { num: "Ch 06", title: "Conditional Expressions", desc: "if-elif-else ladders, relational/logical operators & spam detection" },
      { num: "Ch 07", title: "Loops in Python", desc: "while & for loops, range(), break, continue & pass statements" },
      { num: "Ch 08", title: "Functions & Recursion", desc: "Def statements, return values, default parameters & recursive call stack" },
      { num: "Project 01", title: "Snake, Water, Gun Game", desc: "Interactive game building using random module and conditional logic" },
      { num: "Ch 09", title: "File I/O (Persistence & RAM)", desc: "fopen modes ('r', 'w', 'a'), with statement & file manipulation" },
      { num: "Ch 10", title: "OOPs (Classes & Objects)", desc: "Class attributes vs instance attributes, self parameter & __init__ constructor" },
      { num: "Ch 11", title: "Inheritance & Advanced OOP", desc: "Single/multiple inheritance, super() method, dunder methods & @classmethod" },
      { num: "Project 02", title: "The Perfect Guess Game", desc: "Number guessing game with score tracking & high score file update" },
      { num: "Ch 12", title: "Advanced Python 1", desc: "Walrus operator (:=), Match-Case, Exception handling (try-except-finally), Type hints & Dict merge" },
      { num: "Ch 13", title: "Advanced Python 2", desc: "Virtualenv, Lambda expressions, Map, Filter, Reduce & .join() methods" },
      { num: "Mega Projects", title: "Jarvis AI Voice Assistant & WhatsApp AI Bot", desc: "Speech recognition, pyttsx3 voice synthesis, OpenAI API & automated messaging" }
    ],
    timestamps: [
      { time: "00:00", label: "Ch 01: Python Setup, Pip & Modules", sec: 0 },
      { time: "18:30", label: "Ch 02: Variables, Data Types & Typecasting", sec: 1110 },
      { time: "42:10", label: "Ch 03: Strings, Slicing & Methods", sec: 2530 },
      { time: "01:05:00", label: "Ch 04 & 05: Lists, Tuples, Dictionaries & Sets", sec: 3900 },
      { time: "01:38:15", label: "Ch 06 & 07: Conditionals & Loops", sec: 5895 },
      { time: "02:10:00", label: "Ch 08: Functions & Recursion", sec: 7800 },
      { time: "02:35:40", label: "Project 01: Snake, Water, Gun Game", sec: 9340 },
      { time: "03:00:15", label: "Ch 09: File I/O Operations", sec: 10815 },
      { time: "03:32:00", label: "Ch 10 & 11: OOPs, Inheritance & Dunder Methods", sec: 12720 },
      { time: "04:15:20", label: "Project 02: The Perfect Guess Game", sec: 15320 },
      { time: "04:45:00", label: "Ch 12 & 13: Advanced Python (Walrus, Lambda, Map/Filter)", sec: 17100 },
      { time: "05:30:00", label: "Mega Projects: Jarvis AI & WhatsApp Automation", sec: 19800 }
    ]
  }
};

// One-Shot Tutorial View Component with Course Switcher & Embedded YouTube Player
const OneShotView = ({ onTopicClick, setToastMessage }) => {
  const iframeRef = useRef(null);
  const [activeCourse, setActiveCourse] = useState(() => {
    return localStorage.getItem("oneshot_preferred_course") || "c";
  });

  const handleSwitchCourse = (courseKey) => {
    setActiveCourse(courseKey);
    localStorage.setItem("oneshot_preferred_course", courseKey);
  };

  const currentData = ONE_SHOT_DATA[activeCourse];

  const handleTimestampClick = (ts) => {
    const seconds = parseTimestampToSeconds(ts.sec !== undefined ? ts.sec : ts.time);
    
    // PostMessage seekTo command via YouTube iframe API
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: 'seekTo',
            args: [seconds, true]
          }),
          '*'
        );
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: 'playVideo',
            args: []
          }),
          '*'
        );
      } catch (err) {
        console.error("PostMessage seek error:", err);
      }
    }
    
    setToastMessage(`Jumped to ${ts.time} — ${ts.label}`);
  };

  const handleDownloadPdf = () => {
    setToastMessage(`Downloading ${currentData.cheatsheetTitle}...`);
  };

  return (
    <div className="oneshot-container">
      {/* Header Banner */}
      <section className="glass-panel oneshot-header-card">
        <div className="oneshot-header-left">
          <div className="top-badge-row">
            <span className="badge-3d gold-badge">
              <Icon name="flame" size={13} />
              MASTERCLASS 1-SHOT REVISION
            </span>
            <span className="badge-pro cyan-badge">
              <Icon name="award" size={12} />
              FULL COURSE TUTORIAL
            </span>
          </div>

          <h1 className="oneshot-main-title">{currentData.title}</h1>
          <p className="oneshot-subtitle">{currentData.subtitle}</p>

          {/* Course Switcher Tabs */}
          <div className="oneshot-lang-switcher">
            <span className="switcher-lbl">SELECT COURSE:</span>
            <button
              className={`lang-tab-btn ${activeCourse === 'c' ? 'active' : ''}`}
              onClick={() => handleSwitchCourse('c')}
            >
              <Icon name="code-2" size={15} />
              C Language One-Shot
            </button>
            <button
              className={`lang-tab-btn ${activeCourse === 'python' ? 'active' : ''}`}
              onClick={() => handleSwitchCourse('python')}
            >
              <Icon name="terminal" size={15} />
              Python One-Shot
            </button>
          </div>
        </div>

        <div className="oneshot-header-right">
          <a
            href={currentData.notesLink || currentData.pdfUrl}
            {...(currentData.downloadFileName ? { download: currentData.downloadFileName } : {})}
            target="_blank"
            rel="noopener noreferrer"
            className="download-pdf-btn"
            style={{ textDecoration: 'none' }}
          >
            <Icon name="book-open" size={18} />
            <span>{currentData.buttonLabel || "Download Notes / Cheatsheet PDF"}</span>
          </a>
        </div>
      </section>

      {/* Handbook Badge Row */}
      {currentData.badgeText && (
        <div className="glass-panel handbook-badge-card">
          <div className="h-badge-left">
            <Icon name="book-open" size={20} className="h-badge-icon" />
            <span className="h-badge-title">OFFICIAL SYLLABUS & HANDBOOK</span>
          </div>
          <div className="h-badge-pill">
            <Icon name="sparkles" size={14} />
            <span>{currentData.badgeText}</span>
          </div>
        </div>
      )}

      {/* Main Embedded 16:9 Video & Timestamp Drawer Grid */}
      <div className="oneshot-content-grid">
        {/* Left: Responsive 16:9 Embedded Player */}
        <div className="glass-panel oneshot-player-card">
          <div className="player-top-bar">
            <span className="phase-badge">1-SHOT MASTERCLASS</span>
            <span className="lang-tag">{activeCourse === 'c' ? 'C LANGUAGE' : 'PYTHON'}</span>
          </div>

          <div className="iframe-container oneshot-iframe-box">
            <iframe
              ref={iframeRef}
              id={`oneshot-iframe-${activeCourse}`}
              src={currentData.embedUrl}
              title={currentData.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="player-footer-info">
            <h3>{currentData.title}</h3>
            <button
              className="btn-primary start-watch-btn"
              onClick={() => onTopicClick({
                title: currentData.title,
                url: currentData.youtubeUrl,
                lang: activeCourse === 'c' ? 'C' : 'Python',
                phase: 'ONE-SHOT'
              })}
            >
              <Icon name="maximize-2" size={16} />
              Open In Distraction-Free Player Mode
            </button>
          </div>
        </div>

        {/* Right: Timestamp Drawer & Resource List */}
        <div className="glass-panel oneshot-timestamps-card">
          <div className="drawer-header">
            <Icon name="clock" size={20} className="header-icon" />
            <h3>Chapter Timestamps</h3>
          </div>

          <div className="timestamps-list">
            {currentData.timestamps.map((ts, idx) => (
              <div
                key={idx}
                className="timestamp-item"
                onClick={() => handleTimestampClick(ts)}
              >
                <span className="ts-time">{ts.time}</span>
                <span className="ts-label">{ts.label}</span>
                <Icon name="play-circle" size={15} className="ts-play-icon" />
              </div>
            ))}
          </div>

          <div className="resource-download-footer">
            <a
              href={currentData.notesLink || currentData.pdfUrl}
              {...(currentData.downloadFileName ? { download: currentData.downloadFileName } : {})}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary full-width-btn"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              <Icon name="book-open" size={16} />
              {currentData.buttonLabel || currentData.cheatsheetTitle}
            </a>
          </div>
        </div>
      </div>

      {/* Handbook Chapters & Projects Preview Drawer for Python */}
      {currentData.chapters && currentData.chapters.length > 0 && (
        <section className="glass-panel handbook-drawer-card">
          <div className="drawer-header">
            <Icon name="layers" size={22} className="header-icon cyan" />
            <div>
              <h3>Python 3.12+ Complete Handbook Breakdown</h3>
              <p className="drawer-sub">13 Complete Chapters + 4 Interactive Game Projects & AI Bots</p>
            </div>
          </div>

          <div className="handbook-chapters-grid">
            {currentData.chapters.map((ch, idx) => (
              <div key={idx} className="glass-panel chapter-preview-chip">
                <div className="ch-top">
                  <span className="ch-num">{ch.num}</span>
                  <h4 className="ch-title">{ch.title}</h4>
                </div>
                <p className="ch-desc">{ch.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

// Navigation Bar Component
const Navbar = ({ activeTab, onSelectTab, user, onLogout }) => {
  return (
    <nav className="glass-panel nav-bar">
      <div className="nav-logo" onClick={() => onSelectTab('dashboard')}>
        <Icon name="graduation-cap" size={22} className="logo-icon" />
        <span className="logo-text">Learn with Aayush</span>
      </div>

      <div className="nav-links">
        <button
          className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => onSelectTab('dashboard')}
        >
          <Icon name="layout-dashboard" size={15} />
          <span>Dashboard</span>
        </button>
        <button
          className={`nav-btn ${activeTab === 'oneshot' ? 'active' : ''}`}
          onClick={() => onSelectTab('oneshot')}
        >
          <Icon name="flame" size={15} />
          <span>One-Shot 1-Video</span>
        </button>
        <button
          className={`nav-btn ${activeTab === 'c' ? 'active' : ''}`}
          onClick={() => onSelectTab('c')}
        >
          <Icon name="code-2" size={15} />
          <span>C Roadmap</span>
        </button>
        <button
          className={`nav-btn ${activeTab === 'python' ? 'active' : ''}`}
          onClick={() => onSelectTab('python')}
        >
          <Icon name="terminal" size={15} />
          <span>Python Roadmap</span>
        </button>
        <button
          className={`nav-btn ${activeTab === 'practice' ? 'active' : ''}`}
          onClick={() => onSelectTab('practice')}
        >
          <Icon name="brain-circuit" size={15} />
          <span>Practice</span>
        </button>
      </div>

      <div className="nav-user-area">
        <div className="nav-profile-chip">
          <div className="avatar-circle">AS</div>
          <div className="user-details">
            <span className="user-profile-name">Aayush Singh</span>
            <span className="user-role">Coding Learner</span>
          </div>
        </div>
        <button className="nav-logout-btn" onClick={onLogout} aria-label="Logout">
          <Icon name="log-out" size={15} />
        </button>
      </div>
    </nav>
  );
};

// Header Component for Roadmaps
const RoadmapHeader = ({ currentLang, onSelectLang }) => {
  const isPython = currentLang === 'python';

  return (
    <header className="glass-panel header-card 3d-header">
      <div className="header-left layer-depth-high">
        <div className="top-badge-row">
          <span className="badge-3d">
            <Icon name="layers" size={13} />
            3D ENGINEERING ROADMAP
          </span>
          <span className="badge-creator">
            <Icon name="code" size={12} />
            BY AAYUSH SINGH
          </span>
          
          <div className="language-selector-pill">
            <span className="lang-label">PATH:</span>
            <button
              className={`lang-btn ${!isPython ? 'active' : ''}`}
              onClick={() => onSelectLang('c')}
            >
              C
            </button>
            <button
              className={`lang-btn ${isPython ? 'active' : ''}`}
              onClick={() => onSelectLang('python')}
            >
              PYTHON
            </button>
          </div>
        </div>

        <div className="main-title-row">
          <h1 className="main-title">
            {isPython ? "Python Master Blueprint" : "C Language Master Blueprint"}
          </h1>
          <span className="badge-pro">PRO 3D</span>
        </div>
        <p className="subtitle">
          Engineered for university exams, technical interviews & algorithmic problem solving.
        </p>
      </div>

      <div className="header-stats layer-depth-mid">
        <StatCard value="5" label="PHASES" />
        <StatCard value="30" label="DAYS TARGET" />
        <StatCard value="100%" label="LOGIC BUILD" />
      </div>
    </header>
  );
};

// StatCard Component
const StatCard = ({ value, label }) => {
  return (
    <div className="stat-card">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

// TopicRow Component with Live Progress & Status Badge
const TopicRow = ({ topic, phaseBadge, lang, userProgress, onTopicClick }) => {
  const videoId = getYouTubeVideoId(topic.url);
  const progEntry = videoId ? userProgress[videoId] : null;

  let statusLabel = "Not Started";
  let statusClass = "not-started";

  if (progEntry) {
    if (progEntry.isCompleted) {
      statusLabel = "Completed ✓";
      statusClass = "completed";
    } else if (progEntry.percent > 0) {
      statusLabel = `In Progress — ${progEntry.percent}%`;
      statusClass = "in-progress";
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onTopicClick({ ...topic, phase: phaseBadge, lang });
    }
  };

  return (
    <div
      className="topic-row layer-depth-low"
      tabIndex={0}
      role="button"
      aria-label={`Open topic video: ${topic.title}`}
      onClick={() => onTopicClick({ ...topic, phase: phaseBadge, lang })}
      onKeyDown={handleKeyDown}
    >
      <div className="topic-left">
        <Video3DIcon active={Boolean(topic.url)} />
        <span>{topic.title}</span>
      </div>
      {topic.url && (
        <div className="topic-row-status-box">
          <span className={`topic-status-badge ${statusClass}`}>{statusLabel}</span>
        </div>
      )}
    </div>
  );
};

// PhaseCard Component with Interactive 3D Mouse Perspective Tilt
const PhaseCard = ({ phase, lang, userProgress, onTopicClick, animationDelay }) => {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [reflectionStyle, setReflectionStyle] = useState({});

  const handleMouseMove = (e) => {
    if (window.matchMedia("(max-width: 900px)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((centerY - y) / centerY) * 2.5;
    const rotateY = ((x - centerX) / centerX) * 2.5;
    
    setTransformStyle(`perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(4px)`);
    setReflectionStyle({
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(0, 240, 255, 0.12) 0%, rgba(255, 255, 255, 0) 70%)`
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle("perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)");
    setReflectionStyle({});
  };

  return (
    <div 
      ref={cardRef}
      className="glass-panel phase-card 3d-card"
      style={{ animationDelay: `${animationDelay}ms`, transform: transformStyle }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-light-reflection" style={reflectionStyle}></div>
      <div className="card-inner-depth">
        <div className="phase-top-bar layer-depth-high">
          <span className="phase-badge">{phase.badge}</span>
          <div className="phase-icon-wrapper">
            <Icon name={phase.icon} size={18} />
          </div>
        </div>

        <h2 className="phase-title layer-depth-mid">{phase.title}</h2>

        <div className="topics-list">
          {phase.topics.map((topic, index) => (
            <TopicRow
              key={index}
              topic={topic}
              phaseBadge={phase.badge}
              lang={lang}
              userProgress={userProgress}
              onTopicClick={onTopicClick}
            />
          ))}
        </div>
      </div>

      <div className="phase-bottom-label layer-depth-low">
        <Icon name={phase.bottomIcon || 'sparkles'} size={14} />
        <span>{phase.bottomLabel}</span>
      </div>
    </div>
  );
};

// Dashboard View
const DashboardView = ({ onSelectTab, onTopicClick, userProgress, onResetTracking }) => {
  const totalVideos = 32;
  const completedCount = Object.values(userProgress).filter(v => v.isCompleted).length;
  const inProgressCount = Object.values(userProgress).filter(v => !v.isCompleted && v.percent > 0).length;
  const overallPercent = Math.min(100, Math.round((completedCount / totalVideos) * 100));

  return (
    <div className="dashboard-container">
      {/* 1. Student Portal Landing Hero Section */}
      <section className="glass-panel hero-section">
        <div className="hero-content">
          <div className="top-badge-row">
            <span className="badge-3d">
              <Icon name="sparkles" size={13} />
              WELCOME TO YOUR LEARNING SPACE
            </span>
            <span className="badge-creator">
              <Icon name="code" size={12} />
              Designed & Engineered by Aayush Singh
            </span>
          </div>

          <h1 className="hero-title">Build Your Coding Future</h1>
          <p className="hero-subtitle">
            Watch lessons, learn consistently and complete your roadmap.
          </p>

          <div className="hero-cta-group">
            <button className="btn-primary" onClick={() => onSelectTab('c')}>
              Start Learning →
            </button>
            <button className="btn-secondary" onClick={() => onSelectTab('python')}>
              View Roadmap
            </button>
          </div>
        </div>

        <div className="hero-illustration">
          <div className="illustration-window glass-panel">
            <div className="window-bar">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="window-title">main.c — Studio</span>
            </div>
            <pre className="code-block">
              <code>
                <span className="code-keyword">#include</span> &lt;stdio.h&gt;<br/><br/>
                <span className="code-keyword">int</span> <span className="code-func">main</span>() &#123;<br/>
                &nbsp;&nbsp;<span className="code-func">printf</span>(<span className="code-str">"Hello, Coding Master!\\n"</span>);<br/>
                &nbsp;&nbsp;<span className="code-keyword">return</span> <span className="code-num">0</span>;<br/>
                &#125;
              </code>
            </pre>
          </div>
          <div className="floating-symbol sym-1">&#123; &#125;</div>
          <div className="floating-symbol sym-2">&lt;/&gt;</div>
          <div className="floating-badge badge-c">C</div>
          <div className="floating-badge badge-py">PY</div>
        </div>
      </section>

      {/* 2. Live Video Watch Statistics Cards */}
      <section className="section-block">
        <div className="section-header-row">
          <h2 className="section-title">
            <Icon name="bar-chart-2" size={20} />
            Learning Dashboard Statistics
          </h2>
          <button className="reset-tracking-btn" onClick={onResetTracking}>
            <Icon name="rotate-ccw" size={13} />
            Reset My Tracking
          </button>
        </div>
        
        <div className="quick-cards-grid">
          <div className="stat-card-dashboard glass-panel">
            <span className="d-stat-val">{totalVideos}</span>
            <span className="d-stat-lbl">TOTAL LESSON VIDEOS</span>
          </div>

          <div className="stat-card-dashboard glass-panel green">
            <span className="d-stat-val">{completedCount}</span>
            <span className="d-stat-lbl">COMPLETED VIDEOS</span>
          </div>

          <div className="stat-card-dashboard glass-panel yellow">
            <span className="d-stat-val">{inProgressCount}</span>
            <span className="d-stat-lbl">VIDEOS IN PROGRESS</span>
          </div>

          <div className="stat-card-dashboard glass-panel cyan">
            <span className="d-stat-val">{overallPercent}%</span>
            <span className="d-stat-lbl">OVERALL PROGRESS</span>
          </div>
        </div>
      </section>

      {/* 3. Quick Action Cards */}
      <section className="section-block">
        <h2 className="section-title">
          <Icon name="compass" size={20} />
          Quick Actions
        </h2>
        <div className="quick-cards-grid">
          <div className="glass-panel quick-card" onClick={() => onSelectTab('c')}>
            <div className="quick-icon-box">
              <Icon name="play-circle" size={22} />
            </div>
            <h3>Continue Learning</h3>
            <p>Pick up where you left off</p>
            <div className="quick-card-bottom">
              <div className="mini-progress-bar"><div className="fill" style={{ width: `${overallPercent}%` }}></div></div>
              <button className="quick-btn">Continue</button>
            </div>
          </div>

          <div className="glass-panel quick-card" onClick={() => onSelectTab('c')}>
            <div className="quick-icon-box blue">
              <Icon name="code-2" size={22} />
            </div>
            <h3>C Language</h3>
            <p>Master C programming fundamentals</p>
            <div className="quick-card-bottom">
              <button className="quick-btn">Open C Roadmap</button>
            </div>
          </div>

          <div className="glass-panel quick-card" onClick={() => onSelectTab('python')}>
            <div className="quick-icon-box purple">
              <Icon name="terminal" size={22} />
            </div>
            <h3>Python</h3>
            <p>Learn Python from basics to projects</p>
            <div className="quick-card-bottom">
              <button className="quick-btn">Open Python Roadmap</button>
            </div>
          </div>

          <div className="glass-panel quick-card" onClick={() => onSelectTab('practice')}>
            <div className="quick-icon-box cyan">
              <Icon name="brain-circuit" size={22} />
            </div>
            <h3>Practice Zone</h3>
            <p>Improve logic with coding problems</p>
            <div className="quick-card-bottom">
              <button className="quick-btn">Start Practice</button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Language Path Selector Section */}
      <section className="section-block">
        <h2 className="section-title">
          <Icon name="route" size={20} />
          Choose Your Learning Path
        </h2>
        <div className="path-selection-grid">
          <div className="glass-panel path-card active" onClick={() => onSelectTab('c')}>
            <div className="path-header">
              <Icon name="cpu" size={28} className="path-icon" />
              <span className="badge-pro">RECOMMENDED</span>
            </div>
            <h3>C Language & Algorithmic Blueprint</h3>
            <p>Master memory pointers, recursion, data structures and core low-level logic.</p>
            <div className="path-meta">5 Phases • 20 Topics • Exam Ready</div>
          </div>

          <div className="glass-panel path-card" onClick={() => onSelectTab('python')}>
            <div className="path-header">
              <Icon name="terminal" size={28} className="path-icon purple" />
              <span className="badge-pro purple">POPULAR</span>
            </div>
            <h3>Python & Modern Scripting</h3>
            <p>Learn Python data structures, OOP modularity, file I/O and rapid application logic.</p>
            <div className="path-meta">5 Phases • 20 Topics • Project Ready</div>
          </div>
        </div>
      </section>

      {/* 5. Live Progress & Daily Mission Section */}
      <div className="dashboard-dual-grid">
        <section className="glass-panel progress-card">
          <div className="card-header">
            <Icon name="trending-up" size={20} className="card-header-icon" />
            <h2>Your Progress Tracker</h2>
          </div>

          <div className="progress-overview">
            <div className="progress-percentage-box">
              <span className="percentage-number">{overallPercent}%</span>
              <span className="percentage-label">OVERALL COMPLETION</span>
            </div>
            <div className="progress-bar-large">
              <div className="progress-fill-large" style={{ width: `${overallPercent}%` }}></div>
            </div>
          </div>

          <div className="progress-stats-grid">
            <div className="p-stat-item">
              <span className="p-val">{completedCount} of {totalVideos}</span>
              <span className="p-lbl">Completed Videos</span>
            </div>
            <div className="p-stat-item">
              <span className="p-val">3 Days 🔥</span>
              <span className="p-lbl">Learning Streak</span>
            </div>
            <div className="p-stat-item">
              <span className="p-val">Foundations & I/O</span>
              <span className="p-lbl">Current Phase</span>
            </div>
          </div>
        </section>

        {/* Daily Mission Card */}
        <section className="glass-panel mission-card">
          <div className="card-header">
            <Icon name="target" size={20} className="card-header-icon cyan" />
            <h2>Today’s Coding Mission</h2>
          </div>
          <p className="mission-text">
            “Complete one video lesson and solve three logic problems.”
          </p>
          <div className="mission-quote">
            <Icon name="quote" size={14} />
            <span>Small progress every day creates strong programming skills.</span>
          </div>
          <button className="btn-primary mission-btn" onClick={() => onSelectTab('c')}>
            Start Mission
          </button>
        </section>
      </div>

      {/* 6. Achievements Section */}
      <section className="section-block">
        <h2 className="section-title">
          <Icon name="trophy" size={20} />
          Your Achievements
        </h2>
        <div className="achievements-grid">
          {SAMPLE_ACHIEVEMENTS.map((ach) => (
            <div
              key={ach.id}
              className={`glass-panel achievement-chip ${ach.unlocked ? 'unlocked' : 'locked'}`}
              title={ach.desc}
            >
              <div className="ach-icon-box">
                <Icon name={ach.icon} size={18} />
              </div>
              <div className="ach-info">
                <h4>{ach.title}</h4>
                <p>{ach.desc}</p>
              </div>
              <span className="ach-status">{ach.unlocked ? 'Unlocked' : 'Locked'}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// SuccessProtocol Component
const SuccessProtocol = ({ currentLang }) => {
  const isPython = currentLang === 'python';

  const protocols = [
    {
      icon: "wrench",
      boldText: "Dry Run:",
      normalText: "Trace variables on paper first"
    },
    {
      icon: "shield",
      boldText: "Edge Cases:",
      normalText: "Test 0, negative & empty bounds"
    },
    {
      icon: "cpu",
      boldText: "Memory:",
      normalText: isPython ? "Manage resources carefully" : "Always free dynamic heap blocks"
    }
  ];

  return (
    <div className="glass-panel protocol-panel 3d-protocol">
      <div className="protocol-title layer-depth-mid">
        <Icon name="lightbulb" size={18} />
        <span>SUCCESS PROTOCOL:</span>
      </div>
      <div className="protocol-items layer-depth-high">
        {protocols.map((item, idx) => (
          <div key={idx} className="protocol-chip">
            <span className="chip-icon-box">
              <Icon name={item.icon} size={15} />
            </span>
            <span>
              <strong className="chip-bold">{item.boldText}</strong> {item.normalText}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer-credit">
      <div className="footer-line"></div>
      <p className="footer-text">
        <Icon name="sparkles" size={14} className="footer-sparkle" />
        Designed & Engineered by <strong className="author-name">Aayush Singh</strong>
      </p>
    </footer>
  );
};

// Toast Component
const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-container">
      <div className="toast">
        <Icon name="info" size={18} style={{ color: 'var(--neon-cyan)' }} />
        <span>{message}</span>
      </div>
    </div>
  );
};

// Main App Component with Route, Distraction-Free Player & Reset Progress
const App = () => {
  const getInitialTab = () => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('/oneshot')) return 'oneshot';
    if (path.includes('/python')) return 'python';
    if (path.includes('/c')) return 'c';
    if (path.includes('/practice')) return 'practice';
    return 'dashboard';
  };

  const [user, setUser] = useState(() => sessionStorage.getItem("roadmap_user"));
  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [toastMessage, setToastMessage] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  // User-specific progress state stored in localStorage (key: pps-video-progress-${username})
  const [userProgress, setUserProgress] = useState(() => {
    if (!user) return {};
    const saved = localStorage.getItem(`pps-video-progress-${user}`);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [activeTab, user, activeVideo]);

  useEffect(() => {
    const handlePopState = () => {
      setActiveTab(getInitialTab());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLogin = (username) => {
    setUser(username);
    sessionStorage.setItem("roadmap_user", username);
    const saved = localStorage.getItem(`pps-video-progress-${username}`);
    setUserProgress(saved ? JSON.parse(saved) : {});
    setToastMessage(`Welcome back, ${username}!`);
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem("roadmap_user");
    localStorage.removeItem("roadmap_user");
    localStorage.removeItem("roadmap_session");
    setToastMessage("Successfully exited session.");
  };

  const handleSelectTab = (tab) => {
    setActiveTab(tab);
    let targetPath = '/dashboard';
    if (tab === 'oneshot') targetPath = '/oneshot';
    if (tab === 'c') targetPath = '/c';
    if (tab === 'python') targetPath = '/python';
    if (tab === 'practice') targetPath = '/practice';
    window.history.pushState({}, '', targetPath);
  };

  const handleTopicClick = (topic) => {
    if (topic.url) {
      setActiveVideo(topic);
    } else {
      setToastMessage("Video link coming soon.");
    }
  };

  const handleNextUnit = () => {
    if (!activeVideo) return;
    const allTopics = getAllTopicsList();
    const currIndex = allTopics.findIndex(t => t.title === activeVideo.title);
    if (currIndex !== -1 && currIndex + 1 < allTopics.length) {
      const nextItem = allTopics[currIndex + 1];
      if (nextItem.url) {
        setActiveVideo(nextItem);
      } else {
        setToastMessage(`Next topic "${nextItem.title}" video link coming soon.`);
        setActiveVideo(null);
      }
    } else {
      setToastMessage("You have reached the end of the roadmap units!");
      setActiveVideo(null);
    }
  };

  const handleVideoProgressUpdate = (progressData) => {
    if (!user || !progressData.videoId) return;

    setUserProgress(prev => {
      const prevEntry = prev[progressData.videoId] || {};
      const updated = {
        ...prev,
        [progressData.videoId]: {
          videoId: progressData.videoId,
          title: progressData.title,
          lang: progressData.lang,
          phase: progressData.phase,
          currentTime: progressData.currentTime,
          duration: progressData.duration,
          percent: Math.max(prevEntry.percent || 0, progressData.percent),
          isCompleted: prevEntry.isCompleted || progressData.isCompleted,
          lastWatchedAt: new Date().toISOString()
        }
      };
      localStorage.setItem(`pps-video-progress-${user}`, JSON.stringify(updated));
      return updated;
    });
  };

  const handleResetTracking = () => {
    if (!user) return;
    if (window.confirm("Are you sure you want to reset all your learning progress?")) {
      localStorage.removeItem(`pps-video-progress-${user}`);
      setUserProgress({});
      setToastMessage("Your learning progress has been reset.");
    }
  };

  return (
    <React.Fragment>
      <div className="perspective-grid-floor"></div>
      <div className="horizon-glow"></div>

      {!user ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <React.Fragment>
          <Navbar
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
            user={user}
            onLogout={handleLogout}
          />

          {activeTab === 'dashboard' && (
            <DashboardView
              onSelectTab={handleSelectTab}
              onTopicClick={handleTopicClick}
              userProgress={userProgress}
              onResetTracking={handleResetTracking}
            />
          )}

          {activeTab === 'oneshot' && (
            <OneShotView
              onTopicClick={handleTopicClick}
              setToastMessage={setToastMessage}
            />
          )}

          {(activeTab === 'c' || activeTab === 'python') && (
            <React.Fragment>
              <RoadmapHeader
                currentLang={activeTab}
                onSelectLang={handleSelectTab}
              />

              <main className="roadmap-grid">
                {(activeTab === 'python' ? PYTHON_ROADMAP_DATA : C_ROADMAP_DATA).map((phase, idx) => (
                  <PhaseCard
                    key={phase.id}
                    phase={phase}
                    lang={activeTab === 'python' ? 'Python' : 'C'}
                    userProgress={userProgress}
                    onTopicClick={handleTopicClick}
                    animationDelay={100 * idx}
                  />
                ))}
              </main>

              <SuccessProtocol currentLang={activeTab} />
            </React.Fragment>
          )}

          {activeTab === 'practice' && (
            <div className="glass-panel practice-zone-view">
              <div className="practice-header">
                <Icon name="brain-circuit" size={32} className="practice-icon" />
                <h2>Algorithmic Practice Zone</h2>
                <p>Sharpen your C and Python logic with university-level problem sets.</p>
              </div>
              <div className="practice-grid">
                <div className="glass-panel p-card">
                  <h4>Star & Pyramid Patterns</h4>
                  <span className="p-tag easy">EASY</span>
                  <button className="quick-btn" onClick={() => setToastMessage("Opening problem editor...")}>Solve Problem</button>
                </div>
                <div className="glass-panel p-card">
                  <h4>Prime & Armstrong Numbers</h4>
                  <span className="p-tag medium">MEDIUM</span>
                  <button className="quick-btn" onClick={() => setToastMessage("Opening problem editor...")}>Solve Problem</button>
                </div>
                <div className="glass-panel p-card">
                  <h4>Matrix Multiplication (2D Array)</h4>
                  <span className="p-tag hard">HARD</span>
                  <button className="quick-btn" onClick={() => setToastMessage("Opening problem editor...")}>Solve Problem</button>
                </div>
              </div>
            </div>
          )}

          <Footer />
        </React.Fragment>
      )}

      {/* In-App YouTube Player Modal */}
      {activeVideo && (
        <VideoPlayerModal
          videoInfo={activeVideo}
          userProgress={userProgress}
          onClose={() => setActiveVideo(null)}
          onNextUnit={handleNextUnit}
          onProgressUpdate={handleVideoProgressUpdate}
        />
      )}

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </React.Fragment>
  );
};

// Render React App
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
