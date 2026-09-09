import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, RotateCcw } from 'lucide-react';

const StackQueueVisualization = () => {
  const [mode, setMode] = useState('stack'); // 'stack' or 'queue'
  const [items, setItems] = useState([10, 20, 30]);
  const [message, setMessage] = useState("LIFO Stack: Elements are pushed and popped from the TOP.");
  const [inputVal, setInputVal] = useState("");

  const handlePush = () => {
    const val = parseInt(inputVal, 10);
    if (isNaN(val) || items.length >= 6) {
      setMessage(items.length >= 6 ? "Maximum capacity reached (6 items)." : "Enter valid number.");
      return;
    }
    setItems(prev => [...prev, val]);
    setInputVal("");
    if (mode === 'stack') {
      setMessage(`Pushed ${val} onto TOP of stack. O(1) time.`);
    } else {
      setMessage(`Enqueued ${val} at REAR of queue. O(1) time.`);
    }
  };

  const handlePop = () => {
    if (items.length === 0) {
      setMessage("Underflow! Structure is currently empty.");
      return;
    }
    if (mode === 'stack') {
      const popped = items[items.length - 1];
      setItems(prev => prev.slice(0, -1));
      setMessage(`Popped ${popped} from TOP of stack. O(1) time.`);
    } else {
      const popped = items[0];
      setItems(prev => prev.slice(1));
      setMessage(`Dequeued ${popped} from FRONT of queue. O(1) time.`);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setItems([10, 20, 30]);
    setMessage(newMode === 'stack' ? "LIFO Stack: Push and pop at TOP." : "FIFO Queue: Enqueue at REAR, Dequeue from FRONT.");
  };

  return (
    <div className="vis-container glass-card">
      <div className="vis-header">
        <div className="vis-tabs">
          <button className={`switch-btn ${mode === 'stack' ? 'active' : ''}`} onClick={() => switchMode('stack')}>
            Stack (LIFO)
          </button>
          <button className={`switch-btn ${mode === 'queue' ? 'active' : ''}`} onClick={() => switchMode('queue')}>
            Queue (FIFO)
          </button>
        </div>
        <span className="vis-badge">{mode === 'stack' ? 'TOP restricted access' : 'FRONT / REAR ports'}</span>
      </div>

      <div className="vis-display-area" style={{ minHeight: '180px' }}>
        {mode === 'stack' ? (
          <div className="stack-vertical-container">
            <div className="stack-top-pointer">➔ TOP</div>
            <div className="stack-box">
              <AnimatePresence>
                {[...items].reverse().map((item, idx) => (
                  <motion.div
                    key={item + '-' + idx}
                    className="stack-item"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item}
                  </motion.div>
                ))}
              </AnimatePresence>
              {items.length === 0 && <div className="empty-indicator">Empty Stack</div>}
            </div>
            <div className="stack-base">BOTTOM</div>
          </div>
        ) : (
          <div className="queue-horizontal-container">
            <div className="queue-label">FRONT ➔</div>
            <div className="queue-box">
              <AnimatePresence>
                {items.map((item, idx) => (
                  <motion.div
                    key={item + '-' + idx}
                    className="queue-item"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item}
                  </motion.div>
                ))}
              </AnimatePresence>
              {items.length === 0 && <div className="empty-indicator">Empty Queue</div>}
            </div>
            <div className="queue-label">➔ REAR</div>
          </div>
        )}
      </div>

      <div className="vis-status-box">
        <p>{message}</p>
      </div>

      <div className="vis-controls-toolbar">
        <div className="vis-action-group">
          <button className="quick-btn" onClick={handlePop}>
            <Trash2 size={14} /> {mode === 'stack' ? 'Pop TOP' : 'Dequeue FRONT'}
          </button>
          <button className="quick-btn" onClick={() => switchMode(mode)}>
            <RotateCcw size={14} /> Reset
          </button>
        </div>

        <div className="vis-input-group">
          <input
            type="number"
            placeholder="Val"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            className="vis-input"
          />
          <button className="quick-btn btn-glow" onClick={handlePush}>
            <Plus size={14} /> {mode === 'stack' ? 'Push TOP' : 'Enqueue REAR'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StackQueueVisualization;
