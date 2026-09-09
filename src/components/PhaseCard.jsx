import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import TopicRow from './TopicRow';

const PhaseCard = ({ phase, lang, userProgress, onTopicClick, index }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("");
  const [glowPos, setGlowPos] = useState({});

  const PhaseIcon = Icons[phase.icon] || Icons.Sparkles;
  const BottomIcon = Icons[phase.bottomIcon] || Icons.Sparkles;

  const handleMouseMove = (e) => {
    if (window.matchMedia("(max-width: 900px)").matches) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2, cy = rect.height / 2;
    const rx = ((cy - y) / cy) * 4;
    const ry = ((x - cx) / cx) * 4;
    setTransform(`perspective(1200px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(8px)`);
    setGlowPos({ background: `radial-gradient(circle at ${x}px ${y}px, rgba(0, 240, 255, 0.12) 0%, transparent 70%)` });
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)");
    setGlowPos({});
  };

  return (
    <motion.div
      ref={cardRef}
      className="glass-card phase-card"
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: "spring", damping: 20 }}
    >
      <div className="card-glow-overlay" style={glowPos}></div>
      <div className="phase-top-bar">
        <span className="phase-badge">{phase.badge}</span>
        <div className="phase-icon-wrapper">
          <PhaseIcon size={18} />
        </div>
      </div>
      <h2 className="phase-title">{phase.title}</h2>
      <div className="topics-list">
        {phase.topics.map((topic, idx) => (
          <TopicRow
            key={idx}
            topic={topic}
            phaseBadge={phase.badge}
            lang={lang}
            userProgress={userProgress}
            onTopicClick={onTopicClick}
          />
        ))}
      </div>
      <div className="phase-bottom-label">
        <BottomIcon size={14} />
        <span>{phase.bottomLabel}</span>
      </div>
    </motion.div>
  );
};

export default PhaseCard;
