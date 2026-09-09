import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart2, RotateCcw, Compass, PlayCircle, Code2, Terminal as TerminalIcon,
  BrainCircuit, Route, Cpu, TrendingUp, Target, Quote, Trophy, Sparkles,
  Boxes, ArrowRight, Layers, Clock
} from 'lucide-react';
import { SAMPLE_ACHIEVEMENTS } from '../data/achievements';
import { TOTAL_VIDEOS } from '../utils/constants';
import * as Icons from 'lucide-react';
import HeroCanvas3D from '../three/HeroCanvas3D';
import { getAllA2ZLessons } from '../data/dsaA2ZData';
import { formatTime } from '../utils/youtube';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 20 } }
};

const Dashboard = ({
  onSelectTab,
  onTopicClick,
  userProgress = {},
  dsaProgress = {},
  lastWatchedLesson = null,
  totalWatchTimeFormatted = "0m",
  onResetTracking
}) => {
  const completedCount = Object.values(userProgress).filter(v => v.isCompleted).length;
  const inProgressCount = Object.values(userProgress).filter(v => !v.isCompleted && v.percent > 0).length;
  const videoPercent = Math.min(100, Math.round((completedCount / (TOTAL_VIDEOS || 40)) * 100));

  // Striver A2Z calculations
  const allDsaLessons = getAllA2ZLessons();
  const dsaTotalCount = allDsaLessons.length || 46;
  const dsaCompletedCount = allDsaLessons.filter(l => dsaProgress[l.id]?.isCompleted).length;
  const dsaPercent = Math.min(100, Math.round((dsaCompletedCount / dsaTotalCount) * 100));

  return (
    <motion.div className="dashboard-container" variants={containerVariants} initial="hidden" animate="visible">

      {/* Hero Section with Interactive 3D WebGL Canvas */}
      <motion.section className="glass-card hero-section" variants={itemVariants}>
        <div className="hero-content">
          <div className="top-badge-row">
            <span className="badge-cyber"><Sparkles size={13} /> STRIVER A2Z + C + PYTHON PLATFORM</span>
            <span className="badge-creator"><Code2 size={12} /> Designed & Engineered by Aayush Singh</span>
          </div>
          <h1 className="hero-title">
            <span className="hero-title-line">Master Code &</span>
            <span className="hero-title-line gradient-text">Algorithms 3D</span>
          </h1>
          <p className="hero-subtitle">
            Master Data Structures and Algorithms from basics to advanced with structured lessons, official video lectures, practice problems and automatic progress tracking.
          </p>
          <div className="hero-cta-group">
            <button className="btn-primary btn-glow" onClick={() => onSelectTab('dsa')}>
              <Boxes size={16} /> Explore A2Z DSA Sheet →
            </button>
            <button className="btn-secondary" onClick={() => onSelectTab('c')}>
              C Blueprint
            </button>
            <button className="btn-secondary" onClick={() => onSelectTab('dsa-problems')} style={{ borderColor: 'rgba(249, 115, 22, 0.4)', color: 'var(--orange-deep)' }}>
              <BrainCircuit size={15} /> Problem Set
            </button>
          </div>
        </div>

        {/* 3D WebGL Scene & Floating Code Card */}
        <div className="hero-illustration" style={{ minHeight: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
            <Suspense fallback={<div className="loading-3d">Initializing 3D World...</div>}>
              <HeroCanvas3D />
            </Suspense>
          </div>

          <div className="illustration-window glass-card" style={{ zIndex: 2, pointerEvents: 'auto', background: 'rgba(6, 6, 15, 0.85)', backdropFilter: 'blur(16px)' }}>
            <div className="window-bar">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="window-title">strivers_a2z.cpp</span>
            </div>
            <pre className="code-block">
              <code>
                <span className="code-keyword">#include</span> &lt;iostream&gt;{"\n\n"}<span className="code-keyword">int</span> <span className="code-func">main</span>() {"{"}{"\n"}  <span className="code-func">printf</span>(<span className="code-str">"Mastering Striver A2Z DSA!\\n"</span>);{"\n"}  <span className="code-keyword">return</span> <span className="code-num">0</span>;{"\n"}{"}"}
              </code>
            </pre>
          </div>
        </div>
      </motion.section>

      {/* Choose Your Learning Path (With DSA Course Card!) */}
      <motion.section className="section-block" variants={itemVariants}>
        <div className="section-header-row">
          <h2 className="section-title"><Route size={20} /> Choose Your Learning Path</h2>
          <span className="header-subtitle-tag">3 Curated Roadmaps</span>
        </div>

        <div className="path-selection-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {/* Striver A2Z DSA Course Card (Exact requirements) */}
          <motion.div
            className="glass-card path-card active dsa-path-highlight"
            onClick={() => onSelectTab('dsa')}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <div className="path-header">
              <Boxes size={32} className="path-icon dsa-glow" />
              <span className="badge-pro" style={{ background: 'linear-gradient(135deg, var(--orange-primary), var(--rose-coral))' }}>
                A2Z DSA SHEET
              </span>
            </div>
            <h3>DSA – Data Structures & Algorithms</h3>
            <p>
              Master Data Structures and Algorithms from basics to advanced with structured lessons, videos, practice problems and automatic progress tracking.
            </p>
            <div className="path-meta">
              <span>Topics: 18+ Sections • Problems: 474+ • Difficulty: Easy / Medium / Hard</span>
            </div>

            {/* Course Progress Section */}
            <div className="path-progress-container">
              <div className="path-progress-info">
                <span>Progress: {dsaPercent}%</span>
                <span>{dsaCompletedCount} of {dsaTotalCount} Completed</span>
              </div>
              <div className="mini-progress-bar">
                <div className="fill" style={{ width: `${dsaPercent}%` }} />
              </div>
            </div>

            <div className="path-card-action">
              <button className="btn-primary btn-glow" style={{ width: '100%' }}>
                <PlayCircle size={15} />
                Continue Learning
              </button>
            </div>
          </motion.div>

          {/* C Language Card */}
          <motion.div
            className="glass-card path-card"
            onClick={() => onSelectTab('c')}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <div className="path-header">
              <Cpu size={28} className="path-icon" />
              <span className="badge-pro">CORE FOUNDATION</span>
            </div>
            <h3>C Language Master Blueprint</h3>
            <p>Master memory pointers, recursion, structs, DMA and core hardware-level programming logic.</p>
            <div className="path-meta">
              <span>5 Phases • 20 Topics • Exam Ready</span>
            </div>
            <div className="path-progress-container">
              <div className="path-progress-info">
                <span>Progress: {videoPercent}%</span>
                <span>{completedCount} Videos</span>
              </div>
              <div className="mini-progress-bar">
                <div className="fill" style={{ width: `${videoPercent}%` }} />
              </div>
            </div>
            <div className="path-card-action">
              <button className="quick-btn" style={{ width: '100%' }}>
                Open C Roadmap
              </button>
            </div>
          </motion.div>

          {/* Python Card */}
          <motion.div
            className="glass-card path-card"
            onClick={() => onSelectTab('python')}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <div className="path-header">
              <TerminalIcon size={28} className="path-icon purple" />
              <span className="badge-pro purple">SCRIPTING & OOPS</span>
            </div>
            <h3>Python 3.12+ Modern Scripting</h3>
            <p>Learn Python data structures, OOP modularity, file I/O, regex, and rapid application development.</p>
            <div className="path-meta">
              <span>5 Phases • 20 Topics • Project Ready</span>
            </div>
            <div className="path-progress-container">
              <div className="path-progress-info">
                <span>Masterclass + Handbook</span>
              </div>
              <div className="mini-progress-bar">
                <div className="fill" style={{ width: `35%` }} />
              </div>
            </div>
            <div className="path-card-action">
              <button className="quick-btn" style={{ width: '100%' }}>
                Open Python Roadmap
              </button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats */}
      <motion.section className="section-block" variants={itemVariants}>
        <div className="section-header-row">
          <h2 className="section-title"><BarChart2 size={20} /> Learning Dashboard Statistics</h2>
          <button className="reset-tracking-btn" onClick={onResetTracking}><RotateCcw size={13} /> Reset All Tracking</button>
        </div>
        <div className="quick-cards-grid">
          <div className="stat-card-dashboard glass-card">
            <span className="d-stat-val">{dsaTotalCount}</span>
            <span className="d-stat-lbl">TOTAL VIDEO LESSONS</span>
          </div>
          <div className="stat-card-dashboard glass-card green">
            <span className="d-stat-val">{dsaCompletedCount}</span>
            <span className="d-stat-lbl">COMPLETED LESSONS</span>
          </div>
          <div className="stat-card-dashboard glass-card yellow">
            <span className="d-stat-val">{totalWatchTimeFormatted}</span>
            <span className="d-stat-lbl">TOTAL WATCH TIME</span>
          </div>
          <div className="stat-card-dashboard glass-card cyan">
            <span className="d-stat-val">{dsaPercent}%</span>
            <span className="d-stat-lbl">DSA OVERALL PROGRESS</span>
          </div>
        </div>
      </motion.section>

      {/* Quick Actions */}
      <motion.section className="section-block" variants={itemVariants}>
        <h2 className="section-title"><Compass size={20} /> Quick Actions</h2>
        <div className="quick-cards-grid">
          <div className="glass-card quick-card" onClick={() => onSelectTab('dsa')}>
            <div className="quick-icon-box" style={{ background: 'linear-gradient(135deg, var(--orange-primary), var(--rose-coral))', color: '#fff' }}>
              <Boxes size={22} />
            </div>
            <h3>A2Z Curriculum</h3>
            <p>18 Curated Sections</p>
            <div className="quick-card-bottom">
              <div className="mini-progress-bar"><div className="fill" style={{ width: `${dsaPercent}%` }}></div></div>
              <button className="quick-btn">Learn A2Z</button>
            </div>
          </div>

          <div className="glass-card quick-card" onClick={() => onSelectTab('dsa-problems')}>
            <div className="quick-icon-box cyan">
              <BrainCircuit size={22} />
            </div>
            <h3>DSA Problem Set</h3>
            <p>Solve Two Sum, Kadane's & more</p>
            <div className="quick-card-bottom">
              <button className="quick-btn">Start Practice</button>
            </div>
          </div>

          <div className="glass-card quick-card" onClick={() => onSelectTab('c')}>
            <div className="quick-icon-box blue"><Code2 size={22} /></div>
            <h3>C Language</h3>
            <p>Master pointers & memory</p>
            <div className="quick-card-bottom"><button className="quick-btn">C Roadmap</button></div>
          </div>

          <div className="glass-card quick-card" onClick={() => onSelectTab('python')}>
            <div className="quick-icon-box purple"><TerminalIcon size={22} /></div>
            <h3>Python</h3>
            <p>OOPs, data structures, projects</p>
            <div className="quick-card-bottom"><button className="quick-btn">Python Roadmap</button></div>
          </div>
        </div>
      </motion.section>

      {/* Progress & Mission */}
      <motion.div className="dashboard-dual-grid" variants={itemVariants}>
        <section className="glass-card progress-card">
          <div className="card-header"><TrendingUp size={20} className="card-header-icon" /><h2>Your Master Progress</h2></div>
          <div className="progress-overview">
            <div className="progress-percentage-box">
              <span className="percentage-number">{dsaPercent}%</span>
              <span className="percentage-label">DSA COMPLETION</span>
            </div>
            <div className="progress-bar-large"><div className="progress-fill-large" style={{ width: `${dsaPercent}%` }}></div></div>
          </div>
          <div className="progress-stats-grid">
            <div className="p-stat-item"><span className="p-val">{dsaCompletedCount} of {dsaTotalCount}</span><span className="p-lbl">Completed DSA</span></div>
            <div className="p-stat-item"><span className="p-val">7 Days 🔥</span><span className="p-lbl">Study Streak</span></div>
            <div className="p-stat-item"><span className="p-val">18 Steps</span><span className="p-lbl">A2Z Scope</span></div>
          </div>
        </section>

        <section className="glass-card mission-card">
          <div className="card-header"><Target size={20} color="var(--orange-primary)" /><h2>Today's Coding Mission</h2></div>
          <p className="mission-text">&ldquo;Watch one A2Z masterclass video and solve two practice problems.&rdquo;</p>
          <div className="mission-quote"><Quote size={14} /><span>Consistency with data structures creates unstoppable problem-solving skills.</span></div>
          <button className="btn-primary mission-btn btn-glow" onClick={() => onSelectTab('dsa')}>Start Mission</button>
        </section>
      </motion.div>

      {/* Achievements */}
      <motion.section className="section-block" variants={itemVariants}>
        <h2 className="section-title"><Trophy size={20} /> Your Achievements</h2>
        <div className="achievements-grid">
          {SAMPLE_ACHIEVEMENTS.map((ach) => {
            const AchIcon = Icons[ach.icon] || Icons.Award;
            return (
              <motion.div
                key={ach.id}
                className={`glass-card achievement-chip ${ach.unlocked ? 'unlocked' : 'locked'}`}
                title={ach.desc}
                whileHover={{ scale: 1.03 }}
              >
                <div className="ach-icon-box"><AchIcon size={18} /></div>
                <div className="ach-info"><h4>{ach.title}</h4><p>{ach.desc}</p></div>
                <span className="ach-status">{ach.unlocked ? 'Unlocked' : 'Locked'}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Dashboard;
