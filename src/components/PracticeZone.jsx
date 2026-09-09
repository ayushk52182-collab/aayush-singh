import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Play, Sparkles, Terminal, Code2, Cpu } from 'lucide-react';
import CodePlaygroundModal from './CodePlaygroundModal';

const PracticeZone = () => {
  const [activeProblemKey, setActiveProblemKey] = useState(null);

  return (
    <>
      <motion.div
        className="glass-card practice-zone-view"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <div className="practice-header">
          <BrainCircuit size={36} className="practice-icon" />
          <h2>Algorithmic Practice Zone & Code Studio</h2>
          <p>Sharpen your C and Python logic with university-level problem sets and an interactive in-browser compiler sandbox.</p>
        </div>

        <div className="practice-grid">
          <motion.div className="glass-card p-card" whileHover={{ scale: 1.03, y: -4 }}>
            <div className="quick-icon-box" style={{ margin: '0 auto 0.8rem auto' }}>
              <Code2 size={22} />
            </div>
            <h4>Star & Pyramid Patterns</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
              Nested loop logic, spacing manipulation, and symmetric ASCII patterns.
            </p>
            <span className="p-tag easy">EASY</span>
            <div>
              <button className="btn-primary btn-glow" style={{ width: '100%' }} onClick={() => setActiveProblemKey('patterns')}>
                <Play size={14} /> Open Problem & Solve
              </button>
            </div>
          </motion.div>

          <motion.div className="glass-card p-card" whileHover={{ scale: 1.03, y: -4 }}>
            <div className="quick-icon-box purple" style={{ margin: '0 auto 0.8rem auto' }}>
              <Cpu size={22} />
            </div>
            <h4>Prime & Armstrong Numbers</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
              Modulo arithmetic, digit extraction, power series, and conditional flags.
            </p>
            <span className="p-tag medium">MEDIUM</span>
            <div>
              <button className="btn-primary btn-glow" style={{ width: '100%' }} onClick={() => setActiveProblemKey('armstrong')}>
                <Play size={14} /> Open Problem & Solve
              </button>
            </div>
          </motion.div>

          <motion.div className="glass-card p-card" whileHover={{ scale: 1.03, y: -4 }}>
            <div className="quick-icon-box cyan" style={{ margin: '0 auto 0.8rem auto' }}>
              <Terminal size={22} />
            </div>
            <h4>Matrix Multiplication (2D Array)</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
              Triple nested loops, memory grid addressing, and dot-product calculations.
            </p>
            <span className="p-tag hard">HARD</span>
            <div>
              <button className="btn-primary btn-glow" style={{ width: '100%' }} onClick={() => setActiveProblemKey('matrix')}>
                <Play size={14} /> Open Problem & Solve
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {activeProblemKey && (
          <CodePlaygroundModal
            initialProblemKey={activeProblemKey}
            onClose={() => setActiveProblemKey(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PracticeZone;
