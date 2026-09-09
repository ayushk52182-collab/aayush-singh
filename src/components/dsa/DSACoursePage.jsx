import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Boxes, CheckCircle2, Circle, PlayCircle, ChevronDown, ChevronRight,
  Sparkles, Award, Clock, ArrowRight, Play, BookOpen, Layers
} from 'lucide-react';
import { A2Z_SECTIONS, getAllA2ZLessons } from '../../data/dsaA2ZData';
import { formatTime } from '../../utils/youtube';

const DSACoursePage = ({ onSelectLesson, dsaProgress = {}, onContinueLearning }) => {
  const allLessons = getAllA2ZLessons();
  const totalLessons = allLessons.length;
  const completedLessons = allLessons.filter(l => dsaProgress[l.id]?.isCompleted);
  const completedCount = completedLessons.length;
  const overallPercent = totalLessons > 0 ? Math.min(100, Math.round((completedCount / totalLessons) * 100)) : 0;

  // Auto-detect next unfinished lesson or first in-progress
  const inProgressLesson = allLessons.find(l => !dsaProgress[l.id]?.isCompleted && (dsaProgress[l.id]?.percent || 0) > 0);
  const nextUnfinished = inProgressLesson || allLessons.find(l => !dsaProgress[l.id]?.isCompleted) || allLessons[0];
  const nextSaved = nextUnfinished ? (dsaProgress[nextUnfinished.id] || {}) : {};

  // Accordion state
  const [expandedSections, setExpandedSections] = useState({
    1: true,
    2: true,
    3: true
  });

  const toggleSection = (id) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const allExp = {};
    A2Z_SECTIONS.forEach(s => { allExp[s.id] = true; });
    setExpandedSections(allExp);
  };

  const collapseAll = () => {
    setExpandedSections({});
  };

  return (
    <div className="dsa-course-container">
      {/* Hero Banner with Course Metadata */}
      <div className="glass-card dsa-hero-card">
        <div className="dsa-hero-left">
          <div className="top-badge-row">
            <span className="badge-cyber">
              <Sparkles size={13} /> STRIVER A2Z CURRICULUM
            </span>
            <span className="badge-pro" style={{ background: 'linear-gradient(135deg, var(--orange-primary), var(--rose-coral))' }}>
              INTERVIEW READY
            </span>
          </div>

          <div className="dsa-title-group">
            <div className="dsa-hero-icon-box">
              <Boxes size={32} />
            </div>
            <div>
              <h1 className="dsa-main-title">DSA – Data Structures & Algorithms</h1>
              <span className="dsa-sub-title">18 Curated Steps • 474+ Curated Problems • Official Video Masterclasses</span>
            </div>
          </div>

          <p className="dsa-hero-desc">
            Master Data Structures and Algorithms from basics to advanced with structured lessons, videos, practice problems and automatic progress tracking.
          </p>

          <div className="dsa-hero-actions">
            {nextUnfinished && (
              <button
                className="btn-primary btn-glow dsa-continue-btn"
                onClick={() => onContinueLearning(nextUnfinished)}
              >
                <PlayCircle size={18} />
                <span>
                  {nextSaved.percent > 0
                    ? `Continue: ${nextUnfinished.title} (${nextSaved.percent}% watched)`
                    : `Start: ${nextUnfinished.title}`
                  }
                </span>
                <ArrowRight size={15} />
              </button>
            )}

            {completedCount === totalLessons && totalLessons > 0 && (
              <div className="course-completed-badge">
                <Award size={18} /> All Lessons Completed!
              </div>
            )}
          </div>
        </div>

        {/* Hero Progress Metrics with exact Live Course Progress meter */}
        <div className="dsa-hero-metrics glass-card">
          <div className="metrics-header">
            <Award size={18} color="var(--orange-primary)" />
            <h3>DSA Progress</h3>
          </div>

          <div className="dsa-visual-meter-box">
            <div className="dsa-ascii-bar">
              {'█'.repeat(Math.floor(overallPercent / 5)) + '░'.repeat(Math.max(0, 20 - Math.floor(overallPercent / 5)))}
            </div>
            <div className="dsa-meter-stats">
              <span className="dsa-big-pct">{overallPercent}%</span>
              <span className="dsa-count-sub">{completedCount} / {totalLessons} lessons completed</span>
            </div>
          </div>

          <div className="mini-progress-bar" style={{ height: '8px', marginBottom: '1.2rem' }}>
            <div className="fill" style={{ width: `${overallPercent}%` }} />
          </div>

          <div className="metrics-stats-grid">
            <div className="m-stat">
              <span className="val">{completedCount} / {totalLessons}</span>
              <span className="lbl">Videos Completed</span>
            </div>
            <div className="m-stat">
              <span className="val">18</span>
              <span className="lbl">A2Z Steps</span>
            </div>
            <div className="m-stat">
              <span className="val">474+</span>
              <span className="lbl">Problems Target</span>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Sections List */}
      <div className="curriculum-header-row">
        <div className="curriculum-title">
          <Layers size={22} color="var(--orange-primary)" />
          <h2>A2Z Structured Curriculum (18 Steps)</h2>
        </div>

        <div className="expand-all-actions">
          <button className="quick-btn" onClick={expandAll}>Expand All</button>
          <button className="quick-btn" onClick={collapseAll}>Collapse All</button>
        </div>
      </div>

      <div className="dsa-modules-list">
        {A2Z_SECTIONS.map((section) => {
          const isExpanded = !!expandedSections[section.id];
          const sectionLessons = section.lessons || [];
          const completedCount = sectionLessons.filter(l => dsaProgress[l.id]?.isCompleted).length;
          const secPercent = sectionLessons.length > 0
            ? Math.round((completedCount / sectionLessons.length) * 100)
            : 0;

          return (
            <div key={section.id} className="dsa-module-card glass-card">
              {/* Section Header with Section Progress */}
              <div
                className="module-card-header"
                onClick={() => toggleSection(section.id)}
              >
                <div className="mod-header-left">
                  <span className="mod-badge">{section.badge}</span>
                  <div className="mod-title-desc">
                    <h3>{section.title}</h3>
                    <p>{section.description}</p>
                  </div>
                </div>

                <div className="mod-header-right">
                  <div className="mod-progress-mini">
                    <span className="mod-count">{completedCount} / {sectionLessons.length} completed ({secPercent}%)</span>
                    <div className="mod-ascii-mini">
                      {'█'.repeat(Math.floor(secPercent / 10)) + '░'.repeat(Math.max(0, 10 - Math.floor(secPercent / 10)))}
                    </div>
                    <div className="mod-mini-bar">
                      <div className="mod-mini-fill" style={{ width: `${secPercent}%` }} />
                    </div>
                  </div>
                  <button className="mod-toggle-btn" aria-label="Toggle Section">
                    {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </button>
                </div>
              </div>

              {/* Lesson Items inside Section with exact video-by-video status */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className="module-topics-list"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {sectionLessons.map((l, index) => {
                      const lProgress = dsaProgress[l.id] || {};
                      const isCompleted = lProgress.isCompleted;
                      const percent = lProgress.percent || 0;
                      const currentTime = lProgress.currentTime || 0;

                      return (
                        <div
                          key={l.id}
                          className={`module-topic-row ${isCompleted ? 'completed' : ''}`}
                          onClick={() => onSelectLesson(l)}
                        >
                          <div className="topic-row-left">
                            <span className="topic-num">{index + 1}</span>
                            <div className="topic-text">
                              <h4>{l.title}</h4>
                              <span className="topic-short-desc">{l.description}</span>
                            </div>
                          </div>

                          <div className="topic-row-right">
                            <span className="complexity-badge-sm">
                              <Clock size={11} /> {l.duration}
                            </span>

                            {isCompleted ? (
                              <span className="status-pill completed">
                                <CheckCircle2 size={13} /> ✓ Completed (100% watched)
                              </span>
                            ) : percent > 0 ? (
                              <span className="status-pill in-progress">
                                <Play size={11} /> ◉ {percent}% watched ({formatTime(currentTime)})
                              </span>
                            ) : (
                              <span className="status-pill not-started">
                                <Circle size={13} /> ○ Not Started
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DSACoursePage;
