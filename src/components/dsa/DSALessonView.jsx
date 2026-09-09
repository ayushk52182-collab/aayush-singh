import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Copy, Check, Sparkles, Clock, HardDrive, Code, BookOpen, ChevronRight, Play } from 'lucide-react';
import DSAVisualization from './visualizations/DSAVisualization';
import { getAllDsaLessons } from '../../data/dsaData';

const DSALessonView = ({ lesson, onBack, onCompleteLesson, onNextLesson, onPrevLesson, onOpenProblem, isCompleted }) => {
  const [activeLang, setActiveLang] = useState('cpp');
  const [copied, setCopied] = useState(false);

  // Auto-mark lesson as in-progress or completed
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lesson.id]);

  const handleCopyCode = () => {
    const codeText = lesson.code?.[activeLang] || "";
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const allLessons = getAllDsaLessons();
  const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <div className="dsa-lesson-view-wrapper">
      {/* Top Breadcrumb & Navigation */}
      <div className="glass-card lesson-top-nav">
        <div className="lesson-breadcrumb">
          <button className="breadcrumb-link" onClick={onBack}>
            <ArrowLeft size={15} /> All Modules
          </button>
          <ChevronRight size={14} className="bc-sep" />
          <span className="bc-module">{lesson.moduleTitle}</span>
          <ChevronRight size={14} className="bc-sep" />
          <span className="bc-current">{lesson.title}</span>
        </div>

        <div className="lesson-nav-actions">
          <button
            className={`btn-complete-lesson ${isCompleted ? 'completed' : ''}`}
            onClick={() => onCompleteLesson(lesson.id)}
          >
            <CheckCircle2 size={16} />
            {isCompleted ? 'Completed ✓' : 'Mark Complete'}
          </button>
        </div>
      </div>

      {/* Lesson Header Banner */}
      <div className="glass-card lesson-hero-card">
        <div className="lesson-badge-row">
          <span className="badge-cyber">LESSON TOPIC</span>
          <span className="badge-pro">{lesson.moduleTitle}</span>
        </div>
        <h1 className="lesson-hero-title">{lesson.title}</h1>
        <p className="lesson-hero-desc">{lesson.description}</p>

        {/* Complexity Cards */}
        <div className="complexity-grid">
          <div className="complexity-card glass-card">
            <div className="comp-icon-box">
              <Clock size={18} color="var(--orange-primary)" />
            </div>
            <div>
              <span className="comp-lbl">Time Complexity</span>
              <h3 className="comp-val">{lesson.timeComplexity || "O(1)"}</h3>
            </div>
          </div>

          <div className="complexity-card glass-card">
            <div className="comp-icon-box">
              <HardDrive size={18} color="var(--sky-blue)" />
            </div>
            <div>
              <span className="comp-lbl">Space Complexity</span>
              <h3 className="comp-val">{lesson.spaceComplexity || "O(1)"}</h3>
            </div>
          </div>

          <div className="complexity-card glass-card explanation-card">
            <div>
              <span className="comp-lbl">Complexity Rationale</span>
              <p className="comp-exp">{lesson.complexityExplanation || "Asymptotic upper bound analysis on standard inputs."}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Concept Explanation */}
      <section className="glass-card lesson-section">
        <div className="section-title-row">
          <BookOpen size={20} color="var(--orange-primary)" />
          <h2>Concept Explanation</h2>
        </div>
        <div className="lesson-concept-body">
          <p>{lesson.concept}</p>
        </div>
      </section>

      {/* Interactive Visualizer */}
      <section className="glass-card lesson-section">
        <div className="section-title-row">
          <Sparkles size={20} color="var(--amber-gold)" />
          <h2>Interactive Visual Lab</h2>
        </div>
        <DSAVisualization visualType={lesson.visualType || 'array'} />
      </section>

      {/* Algorithm & Pseudocode */}
      <section className="glass-card lesson-section">
        <div className="section-title-row">
          <Code size={20} color="var(--emerald-green)" />
          <h2>Algorithm & Logic Walkthrough</h2>
        </div>
        <div className="algorithm-pseudocode-box">
          <pre>{lesson.algorithm}</pre>
        </div>
      </section>

      {/* Code Implementation */}
      <section className="glass-card lesson-section">
        <div className="section-title-row" style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Code size={20} color="var(--orange-deep)" />
            <h2>Code Implementation</h2>
          </div>

          <div className="code-lang-tabs">
            {['cpp', 'c', 'java', 'python'].map(l => (
              <button
                key={l}
                className={`lang-btn ${activeLang === l ? 'active' : ''}`}
                onClick={() => setActiveLang(l)}
              >
                {l === 'cpp' ? 'C++' : l.toUpperCase()}
              </button>
            ))}
            <button className="quick-btn" onClick={handleCopyCode} title="Copy code">
              {copied ? <Check size={13} color="var(--emerald-green)" /> : <Copy size={13} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="lesson-code-window">
          <pre>
            <code>{lesson.code?.[activeLang] || "// Code coming soon"}</code>
          </pre>
        </div>
      </section>

      {/* Example Walkthrough */}
      {lesson.example && (
        <section className="glass-card lesson-section">
          <div className="section-title-row">
            <Sparkles size={20} color="var(--rose-coral)" />
            <h2>Example Test Case</h2>
          </div>
          <div className="example-walkthrough-box glass-card">
            <div className="ex-line"><strong>Input:</strong> <code>{lesson.example.input}</code></div>
            <div className="ex-line"><strong>Output:</strong> <code>{lesson.example.output}</code></div>
          </div>
        </section>
      )}

      {/* Practice Problem Recommendation */}
      <section className="glass-card lesson-practice-card">
        <div className="practice-card-left">
          <span className="badge-cyber">CHALLENGE READY</span>
          <h3>Ready to test your knowledge?</h3>
          <p>Solve curated algorithmic challenges related to {lesson.title} in our interactive code sandbox.</p>
        </div>
        <button
          className="btn-primary btn-glow practice-btn"
          onClick={() => onOpenProblem(lesson.id)}
        >
          <Play size={16} /> Launch Practice Code Studio
        </button>
      </section>

      {/* Footer Next/Prev Navigation */}
      <div className="lesson-bottom-nav">
        {prevLesson ? (
          <button className="nav-step-btn prev" onClick={() => onPrevLesson(prevLesson)}>
            <ArrowLeft size={16} />
            <div className="btn-text-block">
              <span className="sub">PREVIOUS TOPIC</span>
              <span className="title">{prevLesson.title}</span>
            </div>
          </button>
        ) : <div />}

        {nextLesson ? (
          <button className="nav-step-btn next" onClick={() => onNextLesson(nextLesson)}>
            <div className="btn-text-block" style={{ textAlign: 'right' }}>
              <span className="sub">NEXT TOPIC</span>
              <span className="title">{nextLesson.title}</span>
            </div>
            <ArrowRight size={16} />
          </button>
        ) : (
          <button className="nav-step-btn next completed" onClick={onBack}>
            <div className="btn-text-block" style={{ textAlign: 'right' }}>
              <span className="sub">COURSE FINISHED</span>
              <span className="title">🎉 Congratulations!</span>
            </div>
            <CheckCircle2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default DSALessonView;
