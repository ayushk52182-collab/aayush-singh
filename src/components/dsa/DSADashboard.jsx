import React from 'react';
import { motion } from 'framer-motion';
import {
  PlayCircle, Award, CheckCircle2, TrendingUp, Flame, BrainCircuit,
  Target, BookOpen, ArrowRight, Sparkles, Code2, Layers, Clock,
  CheckCircle, Play, Compass, RotateCcw
} from 'lucide-react';
import { A2Z_SECTIONS, getAllA2ZLessons } from '../../data/dsaA2ZData';
import { DSA_PROBLEMS } from '../../data/dsaProblems';
import { formatTime } from '../../utils/youtube';

const DSADashboard = ({
  dsaProgress = {},
  dsaProblemProgress = {},
  lastWatchedLesson = null,
  totalWatchTimeFormatted = "0m",
  onSelectLesson,
  onSelectTab
}) => {
  const allLessons = getAllA2ZLessons();
  const totalLessons = allLessons.length;

  const completedLessons = allLessons.filter(l => dsaProgress[l.id]?.isCompleted);
  const inProgressLessons = allLessons.filter(l => !dsaProgress[l.id]?.isCompleted && (dsaProgress[l.id]?.percent || 0) > 0);
  const notStartedCount = Math.max(0, totalLessons - completedLessons.length - inProgressLessons.length);

  const completedCount = completedLessons.length;
  const inProgressCount = inProgressLessons.length;
  const overallPercent = totalLessons > 0 ? Math.min(100, Math.round((completedCount / totalLessons) * 100)) : 0;

  // Continue Learning Resolution:
  // 1. If lastWatchedLesson exists and is incomplete, prioritize it.
  // 2. Otherwise pick first unfinished lesson.
  let continueTarget = null;
  if (lastWatchedLesson?.lessonId) {
    const found = allLessons.find(l => l.id === lastWatchedLesson.lessonId);
    if (found) continueTarget = found;
  }
  if (!continueTarget) {
    continueTarget = inProgressLessons[0] || allLessons.find(l => !dsaProgress[l.id]?.isCompleted) || allLessons[0];
  }

  const targetSaved = continueTarget ? (dsaProgress[continueTarget.id] || {}) : {};
  const targetWatchedPercent = targetSaved.percent || (lastWatchedLesson?.percent || 0);
  const targetCurrentTime = targetSaved.currentTime || (lastWatchedLesson?.currentTime || 0);
  const targetDuration = targetSaved.duration || continueTarget?.durationSec || 0;

  // Dynamic Problems breakdown (scaled against Striver's 474 target)
  const solvedProblemIds = Object.keys(dsaProblemProgress).filter(id => dsaProblemProgress[id]?.solved);
  const solvedCount = solvedProblemIds.length;
  const totalProblemTarget = 474;

  const easySolved = solvedProblemIds.filter(id => {
    const p = DSA_PROBLEMS.find(prob => prob.id === id);
    return p && p.difficulty.toLowerCase() === 'easy';
  }).length;

  const mediumSolved = solvedProblemIds.filter(id => {
    const p = DSA_PROBLEMS.find(prob => prob.id === id);
    return p && p.difficulty.toLowerCase() === 'medium';
  }).length;

  const hardSolved = solvedProblemIds.filter(id => {
    const p = DSA_PROBLEMS.find(prob => prob.id === id);
    return p && p.difficulty.toLowerCase() === 'hard';
  }).length;

  return (
    <div className="dsa-dashboard-container">
      {/* Welcome Banner */}
      <div className="glass-card dsa-dash-welcome">
        <div className="dash-welcome-left">
          <div className="top-badge-row">
            <span className="badge-cyber">
              <Sparkles size={13} /> STRIVER A2Z COMMAND CENTER
            </span>
          </div>
          <h1>Welcome back 👋</h1>
          <p>
            Master Data Structures & Algorithms from basics to advanced with structured lessons, official video lectures, and live playback watch tracking.
          </p>

          <div className="dash-hero-actions">
            {continueTarget && (
              <button
                className="btn-primary btn-glow"
                onClick={() => onSelectLesson(continueTarget)}
              >
                <PlayCircle size={18} />
                <span>
                  {targetWatchedPercent > 0
                    ? `Resume: ${continueTarget.title}`
                    : `Start: ${continueTarget.title}`
                  }
                </span>
                <ArrowRight size={15} />
              </button>
            )}

            <button
              className="btn-secondary"
              onClick={() => onSelectTab('dsa')}
            >
              <Layers size={17} />
              <span>Full A2Z Roadmap</span>
            </button>
          </div>
        </div>

        {/* Continue Learning Target Card */}
        {continueTarget && (
          <div className="dash-target-card glass-card">
            <div className="target-card-header">
              <span className="target-lbl">
                {targetWatchedPercent > 0 ? "CURRENT LESSON IN PROGRESS" : "RECOMMENDED NEXT LESSON"}
              </span>
              {targetWatchedPercent > 0 && (
                <span className="target-percent-badge">{targetWatchedPercent}% Watched</span>
              )}
            </div>

            <h3>{continueTarget.title}</h3>
            <p>{continueTarget.description}</p>

            <div className="target-meta">
              <span className="topic-badge">{continueTarget.sectionTitle || "A2Z Section"}</span>
              <span className="complexity-badge-sm"><Clock size={11} /> {continueTarget.duration}</span>
            </div>

            {/* Resume timestamp bar */}
            <div className="target-resume-action-box">
              {targetCurrentTime > 10 ? (
                <div className="resume-time-info">
                  <span>Resume from: <strong>{formatTime(targetCurrentTime)}</strong> / {formatTime(targetDuration)}</span>
                </div>
              ) : (
                <div className="resume-time-info">
                  <span>Not started yet</span>
                </div>
              )}
              <button
                className="resume-now-btn"
                onClick={() => onSelectLesson(continueTarget)}
              >
                <Play size={13} /> {targetCurrentTime > 10 ? `Resume at ${formatTime(targetCurrentTime)}` : "Start Lesson"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* KPI Stats Grid */}
      <div className="dash-kpi-grid">
        <div className="stat-card-dashboard glass-card cyan">
          <span className="d-stat-val">{overallPercent}%</span>
          <span className="d-stat-lbl">DSA OVERALL PROGRESS</span>
        </div>
        <div className="stat-card-dashboard glass-card green">
          <span className="d-stat-val">{completedCount} / {totalLessons}</span>
          <span className="d-stat-lbl">VIDEOS COMPLETED</span>
        </div>
        <div className="stat-card-dashboard glass-card yellow">
          <span className="d-stat-val">{totalWatchTimeFormatted}</span>
          <span className="d-stat-lbl">TOTAL WATCH TIME</span>
        </div>
        <div className="stat-card-dashboard glass-card">
          <span className="d-stat-val" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            7 Days <Flame size={20} color="var(--orange-primary)" />
          </span>
          <span className="d-stat-lbl">CURRENT STREAK</span>
        </div>
      </div>

      {/* Lessons Status Breakdown: Completed, In Progress, Not Started */}
      <div className="dash-triple-status-grid">
        <div className="status-kpi-card glass-card green-border">
          <span className="kpi-num">{completedCount}</span>
          <span className="kpi-title">Lessons Completed</span>
          <span className="kpi-sub">≥ 90% watched threshold met</span>
        </div>
        <div className="status-kpi-card glass-card orange-border">
          <span className="kpi-num">{inProgressCount}</span>
          <span className="kpi-title">Lessons In Progress</span>
          <span className="kpi-sub">Ready to resume anytime</span>
        </div>
        <div className="status-kpi-card glass-card blue-border">
          <span className="kpi-num">{notStartedCount}</span>
          <span className="kpi-title">Lessons Not Started</span>
          <span className="kpi-sub">Ahead in curriculum</span>
        </div>
      </div>

      {/* Dual Column: Section Progress & Problem Solving Breakdown */}
      <div className="dash-dual-grid">
        {/* 18 Sections Curriculum Progress */}
        <div className="glass-card dash-panel">
          <div className="panel-header">
            <Layers size={20} color="var(--orange-primary)" />
            <h3>A2Z Section-by-Section Progress</h3>
          </div>

          <div className="sections-progress-list">
            {A2Z_SECTIONS.map((sec) => {
              const secLessons = sec.lessons || [];
              const secCompleted = secLessons.filter(l => dsaProgress[l.id]?.isCompleted).length;
              const secPct = secLessons.length > 0 ? Math.round((secCompleted / secLessons.length) * 100) : 0;

              return (
                <div key={sec.id} className="sec-progress-row">
                  <div className="sec-progress-info">
                    <span className="sec-p-title">{sec.title}</span>
                    <span className="sec-p-count">{secCompleted} / {secLessons.length} ({secPct}%)</span>
                  </div>
                  <div className="sec-progress-bar-track">
                    <div className="sec-progress-bar-fill" style={{ width: `${secPct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Problem Difficulty Breakdown */}
        <div className="glass-card dash-panel">
          <div className="panel-header">
            <Target size={20} color="var(--sky-blue)" />
            <h3>Problems Solved ({solvedCount} / {totalProblemTarget})</h3>
          </div>

          <div className="diff-breakdown-list">
            <div className="diff-stat-row">
              <div className="diff-info">
                <span className="p-tag easy">EASY</span>
                <span className="diff-count">{easySolved} / 151</span>
              </div>
              <div className="diff-bar-track">
                <div className="diff-bar-fill easy" style={{ width: `${Math.min(100, Math.max(8, (easySolved / 151) * 100))}%` }} />
              </div>
            </div>

            <div className="diff-stat-row">
              <div className="diff-info">
                <span className="p-tag medium">MEDIUM</span>
                <span className="diff-count">{mediumSolved} / 187</span>
              </div>
              <div className="diff-bar-track">
                <div className="diff-bar-fill medium" style={{ width: `${Math.min(100, Math.max(8, (mediumSolved / 187) * 100))}%` }} />
              </div>
            </div>

            <div className="diff-stat-row">
              <div className="diff-info">
                <span className="p-tag hard">HARD</span>
                <span className="diff-count">{hardSolved} / 136</span>
              </div>
              <div className="diff-bar-track">
                <div className="diff-bar-fill hard" style={{ width: `${Math.min(100, Math.max(8, (hardSolved / 136) * 100))}%` }} />
              </div>
            </div>
          </div>

          <div className="quick-launch-links" style={{ marginTop: '1.5rem' }}>
            <button className="ql-item" onClick={() => onSelectTab('dsa-problems')}>
              <div className="ql-left">
                <Code2 size={18} color="var(--emerald-green)" />
                <div>
                  <strong>Open Algorithmic Problem Set</strong>
                  <span>Practice Two Sum, Kadane's, Reverse LL & more</span>
                </div>
              </div>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSADashboard;
