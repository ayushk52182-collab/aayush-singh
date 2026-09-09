import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, AlertTriangle, CheckCircle2, PlayCircle } from 'lucide-react';
import { getYouTubeVideoId, formatTime } from '../utils/youtube';

const VideoPlayerModal = ({ videoInfo, onClose, onProgressUpdate, onNextUnit, userProgress }) => {
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const [embedError, setEmbedError] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [playbackState, setPlaybackState] = useState({
    currentTime: 0, duration: 0, watchedPercent: 0, statusText: "Not Started", isCompleted: false
  });

  const videoId = getYouTubeVideoId(videoInfo.url);

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    let player;
    setVideoEnded(false);
    setEmbedError(false);
    const savedEntry = userProgress[videoId] || {};
    const initialTime = savedEntry.currentTime || 0;

    const createPlayer = () => {
      try {
        player = new window.YT.Player('youtube-player-element', {
          videoId,
          playerVars: { autoplay: 1, controls: 1, playsinline: 1, rel: 0, iv_load_policy: 3, enablejsapi: 1, origin: window.location.origin, start: Math.floor(initialTime) },
          events: {
            onReady: (event) => {
              playerRef.current = event.target;
              const dur = event.target.getDuration() || 0;
              setPlaybackState(prev => ({ ...prev, duration: dur, currentTime: initialTime, watchedPercent: savedEntry.percent || 0, statusText: "Ready" }));
            },
            onStateChange: (event) => {
              let status = "Paused";
              if (event.data === window.YT.PlayerState.PLAYING) status = "Watching";
              else if (event.data === window.YT.PlayerState.PAUSED) status = "Paused";
              else if (event.data === window.YT.PlayerState.BUFFERING) status = "Buffering...";
              else if (event.data === window.YT.PlayerState.ENDED) {
                status = "Completed";
                setVideoEnded(true);
                onProgressUpdate({
                  videoId, title: videoInfo.title, lang: videoInfo.lang || "C", phase: videoInfo.phase || "PHASE 01",
                  currentTime: playerRef.current ? playerRef.current.getDuration() : initialTime,
                  duration: playerRef.current ? playerRef.current.getDuration() : initialTime,
                  percent: 100, isCompleted: true
                });
                if (playerRef.current && typeof playerRef.current.destroy === 'function') playerRef.current.destroy();
              }
              setPlaybackState(prev => ({ ...prev, statusText: status }));
            },
            onError: () => setEmbedError(true)
          }
        });
      } catch (err) { setEmbedError(true); }
    };

    if (window.YT && window.YT.Player) createPlayer();
    else window.onYouTubeIframeAPIReady = createPlayer;

    intervalRef.current = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        const cur = playerRef.current.getCurrentTime() || 0;
        const dur = playerRef.current.getDuration() || 0;
        const pct = dur > 0 ? Math.min(100, Math.round((cur / dur) * 100)) : 0;
        const isComp = pct >= 80;
        setPlaybackState(prev => ({ ...prev, currentTime: cur, duration: dur, watchedPercent: Math.max(prev.watchedPercent, pct), isCompleted: prev.isCompleted || isComp }));
        onProgressUpdate({ videoId, title: videoInfo.title, lang: videoInfo.lang || "C", phase: videoInfo.phase || "PHASE 01", currentTime: cur, duration: dur, percent: pct, isCompleted: isComp });
      }
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (playerRef.current && typeof playerRef.current.destroy === 'function') { try { playerRef.current.destroy(); } catch (e) {} }
    };
  }, [videoId]);

  return (
    <motion.div
      className="video-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="glass-card video-modal-card"
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: "spring", damping: 25 }}
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="phase-badge">{videoInfo.phase || "PHASE 01"}</span>
            <span className="lang-tag">{videoInfo.lang || "C"}</span>
            <h3 className="modal-video-title">{videoInfo.title}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close Video Player">
            <X size={20} />
          </button>
        </div>

        {embedError ? (
          <div className="embed-error-box glass-card">
            <AlertTriangle size={32} className="error-icon" />
            <h4>This video cannot be played inside the website.</h4>
            <p>The content provider restricts playback on embedded players.</p>
            <button className="btn-primary" onClick={onClose}>Back to Roadmap</button>
          </div>
        ) : videoEnded ? (
          <div className="completion-screen-box glass-card">
            <div className="completion-icon-wrapper">
              <CheckCircle2 size={48} className="completion-check" />
            </div>
            <h2>Video Completed ✓</h2>
            <p className="completion-msg">Great job! You completed this lesson.</p>
            <div className="completion-details">
              <div className="c-detail-item"><span className="lbl">Topic:</span> <strong>{videoInfo.title}</strong></div>
              <div className="c-detail-item"><span className="lbl">Phase:</span> <strong>{videoInfo.phase || "PHASE 01"} ({videoInfo.lang || "C"})</strong></div>
            </div>
            <div className="completion-actions">
              <button className="btn-primary" onClick={onNextUnit}>Next Unit →</button>
              <button className="btn-secondary" onClick={onClose}>Back to Roadmap</button>
            </div>
          </div>
        ) : (
          <div className="iframe-container">
            <div id="youtube-player-element"></div>
          </div>
        )}

        {!videoEnded && !embedError && (
          <div className="video-live-tracker-bar">
            <div className="tracker-top">
              <div className="status-indicator">
                <span className={`status-dot ${playbackState.statusText.toLowerCase().replace(/[^a-z]/g, '')}`}></span>
                <span className="status-text">{playbackState.statusText}</span>
                {playbackState.isCompleted && <span className="completion-badge">✓ Completed</span>}
              </div>
              <div className="time-display">
                {formatTime(playbackState.currentTime)} / {formatTime(playbackState.duration)} ({playbackState.watchedPercent}%)
              </div>
            </div>
            <div className="live-progress-track">
              <div className="live-progress-fill" style={{ width: `${playbackState.watchedPercent}%` }}></div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default VideoPlayerModal;
