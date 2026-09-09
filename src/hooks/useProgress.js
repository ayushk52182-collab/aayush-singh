import { useState, useCallback, useMemo } from 'react';

export const useProgress = (user) => {
  // Existing PPS C & Python video progress
  const [userProgress, setUserProgress] = useState(() => {
    if (!user) return {};
    const saved = localStorage.getItem(`pps-video-progress-${user}`);
    return saved ? JSON.parse(saved) : {};
  });

  // Striver A2Z Real-time Video Watch Progress:
  // Keyed by lessonId: { lessonId, sectionId, currentTime, duration, percent, isCompleted, firstWatchedAt, lastWatchedAt, completedAt }
  const [dsaProgress, setDsaProgress] = useState(() => {
    if (!user) return {};
    const saved = localStorage.getItem(`dsa-a2z-progress-${user}`);
    return saved ? JSON.parse(saved) : {};
  });

  // Last watched lesson for seamless Continue Learning engine
  // { lessonId, sectionId, title, currentTime, duration, percent }
  const [lastWatchedLesson, setLastWatchedLesson] = useState(() => {
    if (!user) return null;
    const saved = localStorage.getItem(`dsa-a2z-lastwatched-${user}`);
    return saved ? JSON.parse(saved) : null;
  });

  // DSA Coding Problem progress
  const [dsaProblemProgress, setDsaProblemProgress] = useState(() => {
    if (!user) return {};
    const saved = localStorage.getItem(`dsa-problems-${user}`);
    return saved ? JSON.parse(saved) : {};
  });

  // 1. C & Python Video progress update (existing)
  const updateProgress = useCallback((progressData) => {
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
  }, [user]);

  // 2. Real-time DSA Video Watch Tracking with Auto-Completion at >= 90%
  const updateDsaVideoProgress = useCallback((lessonId, sectionId, currentTime, duration, title, forceComplete = false) => {
    if (!user || !lessonId) return;

    const cur = Math.max(0, Math.floor(currentTime || 0));
    const dur = Math.max(0, Math.floor(duration || 0));
    const calculatedPercent = dur > 0 ? Math.min(100, Math.round((cur / dur) * 100)) : 0;

    setDsaProgress(prev => {
      const prevEntry = prev[lessonId] || {};
      const maxPercent = Math.max(prevEntry.percent || 0, calculatedPercent);

      // Automatic completion threshold: >= 90% or forceComplete
      const isCompleted = prevEntry.isCompleted || (maxPercent >= 90) || forceComplete;

      const updatedEntry = {
        lessonId,
        sectionId: sectionId || prevEntry.sectionId || 1,
        title: title || prevEntry.title || "",
        currentTime: cur,
        duration: dur > 0 ? dur : (prevEntry.duration || 0),
        percent: maxPercent,
        isCompleted,
        status: isCompleted ? 'completed' : (cur > 0 ? 'in-progress' : 'not-started'),
        firstWatchedAt: prevEntry.firstWatchedAt || new Date().toISOString(),
        lastWatchedAt: new Date().toISOString(),
        completedAt: isCompleted ? (prevEntry.completedAt || new Date().toISOString()) : null
      };

      const updated = {
        ...prev,
        [lessonId]: updatedEntry
      };

      localStorage.setItem(`dsa-a2z-progress-${user}`, JSON.stringify(updated));
      return updated;
    });

    // Update Last Watched Lesson tracking
    const lastWatchedData = {
      lessonId,
      sectionId,
      title: title || "",
      currentTime: cur,
      duration: dur,
      percent: calculatedPercent
    };
    setLastWatchedLesson(lastWatchedData);
    localStorage.setItem(`dsa-a2z-lastwatched-${user}`, JSON.stringify(lastWatchedData));
  }, [user]);

  // 3. Mark lesson complete manually or via check
  const markDsaLessonComplete = useCallback((lessonId, sectionId, title) => {
    if (!user || !lessonId) return;
    setDsaProgress(prev => {
      const prevEntry = prev[lessonId] || {};
      const updatedEntry = {
        ...prevEntry,
        lessonId,
        sectionId: sectionId || prevEntry.sectionId || 1,
        title: title || prevEntry.title || "",
        percent: 100,
        isCompleted: true,
        status: 'completed',
        lastWatchedAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      };
      const updated = { ...prev, [lessonId]: updatedEntry };
      localStorage.setItem(`dsa-a2z-progress-${user}`, JSON.stringify(updated));
      return updated;
    });
  }, [user]);

  // 4. DSA problem progress update
  const updateDsaProblemProgress = useCallback((problemId, solved) => {
    if (!user || !problemId) return;
    setDsaProblemProgress(prev => {
      const updated = {
        ...prev,
        [problemId]: {
          problemId,
          solved,
          solvedAt: solved ? new Date().toISOString() : null
        }
      };
      localStorage.setItem(`dsa-problems-${user}`, JSON.stringify(updated));
      return updated;
    });
  }, [user]);

  // Total watch time calculated dynamically across all DSA lessons
  const totalWatchTimeFormatted = useMemo(() => {
    let totalSeconds = 0;
    Object.values(dsaProgress).forEach(item => {
      totalSeconds += (item.currentTime || 0);
    });
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }, [dsaProgress]);

  const resetProgress = useCallback(() => {
    if (!user) return;
    localStorage.removeItem(`pps-video-progress-${user}`);
    localStorage.removeItem(`dsa-a2z-progress-${user}`);
    localStorage.removeItem(`dsa-a2z-lastwatched-${user}`);
    localStorage.removeItem(`dsa-problems-${user}`);
    setUserProgress({});
    setDsaProgress({});
    setLastWatchedLesson(null);
    setDsaProblemProgress({});
  }, [user]);

  const loadProgress = useCallback((username) => {
    const saved = localStorage.getItem(`pps-video-progress-${username}`);
    setUserProgress(saved ? JSON.parse(saved) : {});
    const dsaSaved = localStorage.getItem(`dsa-a2z-progress-${username}`);
    setDsaProgress(dsaSaved ? JSON.parse(dsaSaved) : {});
    const lastWatchedSaved = localStorage.getItem(`dsa-a2z-lastwatched-${username}`);
    setLastWatchedLesson(lastWatchedSaved ? JSON.parse(lastWatchedSaved) : null);
    const probSaved = localStorage.getItem(`dsa-problems-${username}`);
    setDsaProblemProgress(probSaved ? JSON.parse(probSaved) : {});
  }, []);

  return {
    userProgress, updateProgress,
    dsaProgress, updateDsaVideoProgress, markDsaLessonComplete,
    lastWatchedLesson,
    totalWatchTimeFormatted,
    dsaProblemProgress, updateDsaProblemProgress,
    resetProgress, loadProgress
  };
};
