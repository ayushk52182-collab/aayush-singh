import { motion } from 'framer-motion';
import { Play, Lock } from 'lucide-react';
import { getYouTubeVideoId } from '../utils/youtube';

const TopicRow = ({ topic, phaseBadge, lang, userProgress, onTopicClick }) => {
  const videoId = getYouTubeVideoId(topic.url);
  const progEntry = videoId ? userProgress[videoId] : null;
  let statusLabel = "Not Started";
  let statusClass = "not-started";

  if (progEntry) {
    if (progEntry.isCompleted) { statusLabel = "Completed ✓"; statusClass = "completed"; }
    else if (progEntry.percent > 0) { statusLabel = `${progEntry.percent}%`; statusClass = "in-progress"; }
  }

  return (
    <motion.div
      className="topic-row"
      whileHover={{ x: 4, backgroundColor: "rgba(0, 240, 255, 0.05)" }}
      transition={{ duration: 0.2 }}
      tabIndex={0}
      role="button"
      aria-label={`Open topic video: ${topic.title}`}
      onClick={() => onTopicClick({ ...topic, phase: phaseBadge, lang })}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onTopicClick({ ...topic, phase: phaseBadge, lang }); }}}
    >
      <div className="topic-left">
        <span className={`topic-play-icon ${topic.url ? 'active' : 'locked'}`}>
          {topic.url ? <Play size={14} /> : <Lock size={14} />}
        </span>
        <span className="topic-title-text">{topic.title}</span>
      </div>
      {topic.url && (
        <div className="topic-row-status-box">
          <span className={`topic-status-badge ${statusClass}`}>{statusLabel}</span>
        </div>
      )}
    </motion.div>
  );
};

export default TopicRow;
