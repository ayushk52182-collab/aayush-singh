import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Flame, Clock, BookOpen, Layers, PlayCircle } from 'lucide-react';
import { ONE_SHOT_DATA } from '../data/oneShotData';
import { parseTimestampToSeconds } from '../utils/youtube';

const OneShotView = ({ setToastMessage }) => {
  const iframeRef = useRef(null);
  const [activeCourse, setActiveCourse] = useState(() => localStorage.getItem("oneshot_preferred_course") || "c");

  const handleSwitchCourse = (courseKey) => {
    setActiveCourse(courseKey);
    localStorage.setItem("oneshot_preferred_course", courseKey);
  };

  const currentData = ONE_SHOT_DATA[activeCourse];

  const handleTimestampClick = (ts) => {
    const seconds = parseTimestampToSeconds(ts.sec !== undefined ? ts.sec : ts.time);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'seekTo', args: [seconds, true] }), '*');
        iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*');
      } catch (e) {}
    }
  };

  return (
    <motion.div
      className="oneshot-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="glass-card oneshot-header-card">
        <div className="oneshot-header-top">
          <div className="top-badge-row">
            <span className="badge-cyber"><Flame size={13} /> MASTERCLASS ONE-SHOT</span>
            <span className="badge-creator">BY AAYUSH SINGH</span>
          </div>
          <div className="course-switcher">
            <button className={`switch-btn ${activeCourse === 'c' ? 'active' : ''}`} onClick={() => handleSwitchCourse('c')}>
              <span>C Language</span>
            </button>
            <button className={`switch-btn ${activeCourse === 'python' ? 'active' : ''}`} onClick={() => handleSwitchCourse('python')}>
              <span>Python 3.12+</span>
            </button>
          </div>
        </div>
        <h1 className="oneshot-title">{currentData.title}</h1>
        <p className="oneshot-subtitle">{currentData.subtitle}</p>
        <div className="oneshot-badge-row">
          <span className="badge-pro">{currentData.badgeText}</span>
        </div>
      </div>

      <div className="oneshot-main-grid">
        <div className="glass-card oneshot-player-card">
          <div className="iframe-container oneshot-iframe">
            <iframe
              ref={iframeRef}
              src={currentData.embedUrl}
              title={currentData.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="oneshot-video-frame"
            ></iframe>
          </div>
        </div>

        <div className="glass-card oneshot-timestamps-card">
          <div className="drawer-header">
            <Clock size={20} className="header-icon" />
            <h3>Chapter Timestamps</h3>
          </div>
          <div className="timestamps-list">
            {currentData.timestamps.map((ts, idx) => (
              <div key={idx} className="timestamp-item" onClick={() => handleTimestampClick(ts)}>
                <span className="ts-time">{ts.time}</span>
                <span className="ts-label">{ts.label}</span>
                <PlayCircle size={15} className="ts-play-icon" />
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
              <BookOpen size={16} />
              {currentData.buttonLabel || currentData.cheatsheetTitle}
            </a>
          </div>
        </div>
      </div>

      {currentData.chapters && currentData.chapters.length > 0 && (
        <motion.section
          className="glass-card handbook-drawer-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="drawer-header">
            <Layers size={22} className="header-icon cyan" />
            <div>
              <h3>Python 3.12+ Complete Handbook Breakdown</h3>
              <p className="drawer-sub">13 Complete Chapters + 4 Interactive Game Projects & AI Bots</p>
            </div>
          </div>
          <div className="handbook-chapters-grid">
            {currentData.chapters.map((ch, idx) => (
              <motion.div
                key={idx}
                className="glass-card chapter-preview-chip"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx }}
              >
                <div className="ch-top">
                  <span className="ch-num">{ch.num}</span>
                  <h4 className="ch-title">{ch.title}</h4>
                </div>
                <p className="ch-desc">{ch.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </motion.div>
  );
};

export default OneShotView;
