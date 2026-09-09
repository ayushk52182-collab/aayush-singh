import { motion } from 'framer-motion';
import { Layers, Code as CodeIcon } from 'lucide-react';
import { C_ROADMAP_DATA, PYTHON_ROADMAP_DATA } from '../data/roadmapData';
import PhaseCard from './PhaseCard';

const StatCard = ({ value, label }) => (
  <div className="stat-card">
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
  </div>
);

const SuccessProtocol = ({ currentLang }) => {
  const isPython = currentLang === 'python';
  const protocols = [
    { icon: "🔧", bold: "Dry Run:", text: "Trace variables on paper first" },
    { icon: "🛡️", bold: "Edge Cases:", text: "Test 0, negative & empty bounds" },
    { icon: "⚡", bold: "Memory:", text: isPython ? "Manage resources carefully" : "Always free dynamic heap blocks" }
  ];
  return (
    <motion.div
      className="glass-card protocol-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="protocol-title">
        <span>💡</span>
        <span>SUCCESS PROTOCOL:</span>
      </div>
      <div className="protocol-items">
        {protocols.map((item, idx) => (
          <div key={idx} className="protocol-chip">
            <span className="chip-icon-box">{item.icon}</span>
            <span><strong className="chip-bold">{item.bold}</strong> {item.text}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const RoadmapView = ({ activeTab, onSelectTab, userProgress, onTopicClick }) => {
  const isPython = activeTab === 'python';
  const data = isPython ? PYTHON_ROADMAP_DATA : C_ROADMAP_DATA;

  return (
    <>
      <motion.header
        className="glass-card header-card"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <div className="header-left">
          <div className="top-badge-row">
            <span className="badge-cyber">
              <Layers size={13} />
              CYBERPUNK ENGINEERING ROADMAP
            </span>
            <span className="badge-creator">
              <CodeIcon size={12} />
              BY AAYUSH SINGH
            </span>
            <div className="language-selector-pill">
              <span className="lang-label">PATH:</span>
              <button className={`lang-btn ${!isPython ? 'active' : ''}`} onClick={() => onSelectTab('c')}>C</button>
              <button className={`lang-btn ${isPython ? 'active' : ''}`} onClick={() => onSelectTab('python')}>PYTHON</button>
            </div>
          </div>
          <div className="main-title-row">
            <h1 className="main-title">{isPython ? "Python Master Blueprint" : "C Language Master Blueprint"}</h1>
            <span className="badge-pro">PRO 3D</span>
          </div>
          <p className="subtitle">Engineered for university exams, technical interviews & algorithmic problem solving.</p>
        </div>
        <div className="header-stats">
          <StatCard value="5" label="PHASES" />
          <StatCard value="30" label="DAYS TARGET" />
          <StatCard value="100%" label="LOGIC BUILD" />
        </div>
      </motion.header>

      <main className="roadmap-grid">
        {data.map((phase, idx) => (
          <PhaseCard
            key={phase.id}
            phase={phase}
            lang={isPython ? 'Python' : 'C'}
            userProgress={userProgress}
            onTopicClick={onTopicClick}
            index={idx}
          />
        ))}
      </main>

      <SuccessProtocol currentLang={activeTab} />
    </>
  );
};

export default RoadmapView;
