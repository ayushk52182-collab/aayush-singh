import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import ParticleBackground from './components/ParticleBackground';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import OneShotView from './components/OneShotView';
import RoadmapView from './components/RoadmapView';
import PracticeZone from './components/PracticeZone';
import VideoPlayerModal from './components/VideoPlayerModal';
import Footer from './components/Footer';
import Toast from './components/Toast';
import SearchModal from './components/SearchModal';
import AuthRequiredModal from './components/AuthRequiredModal';

// DSA Striver A2Z Components
import DSACoursePage from './components/dsa/DSACoursePage';
import DSAVideoPlayerView from './components/dsa/DSAVideoPlayerView';
import DSADashboard from './components/dsa/DSADashboard';
import DSAProblemSet from './components/dsa/DSAProblemSet';
import DSAProblemView from './components/dsa/DSAProblemView';

import { useProgress } from './hooks/useProgress';
import { useTheme } from './hooks/useTheme';
import { getAllTopicsList } from './data/roadmapData';
import { getAllA2ZLessons } from './data/dsaA2ZData';

const App = () => {
  const getInitialTab = () => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('/dsa-problems')) return 'dsa-problems';
    if (path.includes('/dsa-dashboard')) return 'dsa-dashboard';
    if (path.includes('/dsa')) return 'dsa';
    if (path.includes('/oneshot')) return 'oneshot';
    if (path.includes('/python')) return 'python';
    if (path.includes('/c')) return 'c';
    if (path.includes('/practice')) return 'practice';
    return 'dashboard';
  };

  const [user, setUser] = useState(() => sessionStorage.getItem("roadmap_user") || localStorage.getItem("roadmap_user"));
  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [toastMessage, setToastMessage] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingVideoAction, setPendingVideoAction] = useState(null);

  // DSA view states
  const [activeDsaLesson, setActiveDsaLesson] = useState(null);
  const [activeDsaProblemId, setActiveDsaProblemId] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Hooks
  const {
    userProgress, updateProgress,
    dsaProgress, updateDsaVideoProgress, markDsaLessonComplete,
    lastWatchedLesson, totalWatchTimeFormatted,
    dsaProblemProgress, updateDsaProblemProgress,
    resetProgress, loadProgress
  } = useProgress(user);

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handlePopState = () => setActiveTab(getInitialTab());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLogin = useCallback((username) => {
    setUser(username);
    sessionStorage.setItem("roadmap_user", username);
    localStorage.setItem("roadmap_user", username);
    loadProgress(username);
    setToastMessage(`Welcome back, ${username}!`);
  }, [loadProgress]);

  const handleLogout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem("roadmap_user");
    localStorage.removeItem("roadmap_user");
    localStorage.removeItem("roadmap_session");
    setActiveDsaLesson(null);
    setActiveDsaProblemId(null);
    setActiveVideo(null);
    setToastMessage("Successfully exited session. See you soon!");
  }, []);

  const handleSelectTab = useCallback((tab) => {
    setActiveTab(tab);
    if (tab !== 'dsa') setActiveDsaLesson(null);
    if (tab !== 'dsa-problems') setActiveDsaProblemId(null);

    const paths = {
      dashboard: '/dashboard',
      dsa: '/dsa',
      'dsa-problems': '/dsa-problems',
      'dsa-dashboard': '/dsa-dashboard',
      oneshot: '/oneshot',
      c: '/c',
      python: '/python',
      practice: '/practice'
    };
    window.history.pushState({}, '', paths[tab] || '/dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Guest check: Guests can explore all tabs but must log in to play videos
  const isGuest = !user || user === 'Guest Learner' || user === 'Guest';

  // DSA Lesson Handlers (Locked for guests)
  const handleSelectDsaLesson = useCallback((lesson) => {
    if (!user || user === 'Guest Learner' || user === 'Guest') {
      setPendingVideoAction({ type: 'dsa', data: lesson });
      setIsAuthModalOpen(true);
      setToastMessage("🔒 Please sign in first to watch DSA video lessons.");
      return;
    }
    setActiveDsaLesson(lesson);
    setActiveTab('dsa');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [user]);

  const handleCompleteDsaLesson = useCallback((lessonId, sectionId, title) => {
    markDsaLessonComplete(lessonId, sectionId, title);
    setToastMessage("🎉 Lecture marked as Completed (100%)!");
  }, [markDsaLessonComplete]);

  const handleSelectDsaProblem = useCallback((probId) => {
    setActiveDsaProblemId(probId);
    setActiveTab('dsa-problems');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleProblemSolved = useCallback((probId) => {
    updateDsaProblemProgress(probId, true);
    setToastMessage("🏆 Problem solved successfully! +50 Algorithmic XP");
  }, [updateDsaProblemProgress]);

  // Continue Learning Engine (Locked for guests)
  const handleContinueLearning = useCallback((targetLesson) => {
    if (!user || user === 'Guest Learner' || user === 'Guest') {
      setPendingVideoAction({ type: 'dsa', data: targetLesson });
      setIsAuthModalOpen(true);
      setToastMessage("🔒 Please sign in first to watch video lessons.");
      return;
    }
    if (targetLesson) {
      handleSelectDsaLesson(targetLesson);
    } else if (lastWatchedLesson?.lessonId) {
      const all = getAllA2ZLessons();
      const match = all.find(l => l.id === lastWatchedLesson.lessonId);
      handleSelectDsaLesson(match || all[0]);
    } else {
      const all = getAllA2ZLessons();
      handleSelectDsaLesson(all[0]);
    }
  }, [user, handleSelectDsaLesson, lastWatchedLesson]);

  // C / Python Video Handlers (Locked for guests)
  const handleTopicClick = useCallback((topic) => {
    if (!user || user === 'Guest Learner' || user === 'Guest') {
      setPendingVideoAction({ type: 'topic', data: topic });
      setIsAuthModalOpen(true);
      setToastMessage("🔒 Please sign in first to watch video masterclasses.");
      return;
    }
    if (topic.url) setActiveVideo(topic);
    else setToastMessage("Video link coming soon.");
  }, [user]);

  // Modal Login Success: unlocks and automatically plays pending video
  const handleModalLoginSuccess = useCallback((userName) => {
    handleLogin(userName);
    setIsAuthModalOpen(false);
    setToastMessage(`Welcome back, ${userName}! Video playback unlocked.`);
    if (pendingVideoAction) {
      if (pendingVideoAction.type === 'topic' && pendingVideoAction.data?.url) {
        setActiveVideo(pendingVideoAction.data);
      } else if (pendingVideoAction.type === 'dsa' && pendingVideoAction.data) {
        setActiveDsaLesson(pendingVideoAction.data);
        setActiveTab('dsa');
      }
      setPendingVideoAction(null);
    }
  }, [handleLogin, pendingVideoAction]);

  const handleNextUnit = useCallback(() => {
    if (!activeVideo) return;
    const allTopics = getAllTopicsList();
    const currIndex = allTopics.findIndex(t => t.title === activeVideo.title);
    if (currIndex !== -1 && currIndex + 1 < allTopics.length) {
      const nextItem = allTopics[currIndex + 1];
      if (nextItem.url) setActiveVideo(nextItem);
      else { setToastMessage(`Next topic "${nextItem.title}" video link coming soon.`); setActiveVideo(null); }
    } else { setToastMessage("You have reached the end of the roadmap units!"); setActiveVideo(null); }
  }, [activeVideo]);

  const handleResetTracking = useCallback(() => {
    if (window.confirm("Are you sure you want to reset all your learning progress (C, Python & Striver A2Z)?")) {
      resetProgress();
      setToastMessage("Your learning progress has been reset.");
    }
  }, [resetProgress]);

  return (
    <>
      <ParticleBackground />
      <div className="cyber-grid-floor"></div>
      <div className="horizon-glow"></div>

      {!user ? (
          <LoginPage key="login" onLogin={handleLogin} />
        ) : (
          <div key="app" className="app-shell">
            <Navbar
              activeTab={activeTab}
              onSelectTab={handleSelectTab}
              user={user}
              onLogout={handleLogout}
              theme={theme}
              toggleTheme={toggleTheme}
              onOpenSearch={() => setIsSearchOpen(true)}
              onOpenSignIn={() => setIsAuthModalOpen(true)}
            />

            <AnimatePresence mode="wait">
              {/* Dashboard */}
              {activeTab === 'dashboard' && (
                <Dashboard
                  key="dash"
                  onSelectTab={handleSelectTab}
                  onTopicClick={handleTopicClick}
                  userProgress={userProgress}
                  dsaProgress={dsaProgress}
                  lastWatchedLesson={lastWatchedLesson}
                  totalWatchTimeFormatted={totalWatchTimeFormatted}
                  onResetTracking={handleResetTracking}
                />
              )}

              {/* Striver A2Z Main Course / Video Player View */}
              {activeTab === 'dsa' && (
                activeDsaLesson ? (
                  <DSAVideoPlayerView
                    key={activeDsaLesson.id}
                    lesson={activeDsaLesson}
                    onSelectLesson={handleSelectDsaLesson}
                    onBack={() => setActiveDsaLesson(null)}
                    dsaProgress={dsaProgress}
                    onProgressUpdate={updateDsaVideoProgress}
                    onCompleteLesson={handleCompleteDsaLesson}
                    onOpenProblem={handleSelectDsaProblem}
                  />
                ) : (
                  <DSACoursePage
                    key="dsa-course"
                    onSelectLesson={handleSelectDsaLesson}
                    dsaProgress={dsaProgress}
                    onContinueLearning={handleContinueLearning}
                  />
                )
              )}

              {/* Dedicated Striver A2Z Dashboard */}
              {activeTab === 'dsa-dashboard' && (
                <DSADashboard
                  key="dsa-dash"
                  dsaProgress={dsaProgress}
                  dsaProblemProgress={dsaProblemProgress}
                  lastWatchedLesson={lastWatchedLesson}
                  totalWatchTimeFormatted={totalWatchTimeFormatted}
                  onSelectLesson={handleSelectDsaLesson}
                  onSelectTab={handleSelectTab}
                />
              )}

              {/* DSA Problem Set / Problem Studio View */}
              {activeTab === 'dsa-problems' && (
                activeDsaProblemId ? (
                  <DSAProblemView
                    key={activeDsaProblemId}
                    problemId={activeDsaProblemId}
                    onBack={() => setActiveDsaProblemId(null)}
                    onProblemSolved={handleProblemSolved}
                    isSolved={dsaProblemProgress[activeDsaProblemId]?.solved}
                  />
                ) : (
                  <DSAProblemSet
                    key="dsa-problems-list"
                    onSelectProblem={handleSelectDsaProblem}
                    dsaProblemProgress={dsaProblemProgress}
                  />
                )
              )}

              {/* C / Python Roadmaps (Preserved) */}
              {(activeTab === 'c' || activeTab === 'python') && (
                <RoadmapView
                  key={activeTab}
                  activeTab={activeTab}
                  onSelectTab={handleSelectTab}
                  userProgress={userProgress}
                  onTopicClick={handleTopicClick}
                />
              )}

              {/* OneShot Masterclass (Preserved) */}
              {activeTab === 'oneshot' && (
                <OneShotView
                  key="oneshot"
                  onTopicClick={handleTopicClick}
                  setToastMessage={setToastMessage}
                />
              )}

              {/* Practice Zone (Preserved) */}
              {activeTab === 'practice' && (
                <PracticeZone
                  key="practice"
                  setToastMessage={setToastMessage}
                />
              )}
            </AnimatePresence>

            <Footer />
          </div>
        )}

      {/* Video Player Modal for C / Python (Preserved) */}
      <AnimatePresence>
        {activeVideo && (
          <VideoPlayerModal
            key="video"
            videoInfo={activeVideo}
            userProgress={userProgress}
            onClose={() => setActiveVideo(null)}
            onNextUnit={handleNextUnit}
            onProgressUpdate={updateProgress}
          />
        )}
      </AnimatePresence>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLesson={handleSelectDsaLesson}
        onSelectProblem={handleSelectDsaProblem}
      />

      {/* Video Guest Lock Modal */}
      <AuthRequiredModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setPendingVideoAction(null);
        }}
        onLogin={handleModalLoginSuccess}
        onSwitchToFullLogin={() => {
          setIsAuthModalOpen(false);
          handleLogout();
        }}
        videoTitle={pendingVideoAction?.data?.title || pendingVideoAction?.data?.name}
      />

      {/* Toast Notifications */}
      <AnimatePresence>
        {toastMessage && (
          <Toast key="toast" message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
