import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, Code2, ArrowRight, Layers, Clock } from 'lucide-react';
import { getAllA2ZLessons } from '../data/dsaA2ZData';
import { DSA_PROBLEMS } from '../data/dsaProblems';

const SearchModal = ({ isOpen, onClose, onSelectLesson, onSelectProblem }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(false);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allLessons = getAllA2ZLessons();
  const q = query.trim().toLowerCase();

  const matchedLessons = q
    ? allLessons.filter(l =>
        l.title.toLowerCase().includes(q) ||
        l.sectionTitle.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        (l.topicsCovered && l.topicsCovered.some(t => t.toLowerCase().includes(q)))
      ).slice(0, 8)
    : [];

  const matchedProblems = q
    ? DSA_PROBLEMS.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.topic.toLowerCase().includes(q) ||
        p.difficulty.toLowerCase().includes(q)
      ).slice(0, 5)
    : [];

  return (
    <AnimatePresence>
      <motion.div
        className="search-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="search-modal-box glass-card"
          initial={{ scale: 0.95, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: -20 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Search Input Field */}
          <div className="search-input-header">
            <Search size={20} className="search-icon" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search A2Z lessons, videos, algorithms, problems... (e.g. binary search)"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="search-box-input"
            />
            <button className="search-close-btn" onClick={onClose} aria-label="Close search">
              <X size={18} />
            </button>
          </div>

          {/* Search Results */}
          <div className="search-results-container">
            {q === '' ? (
              <div className="search-empty-hint">
                <p>Type keywords like <strong>"binary search"</strong>, <strong>"kadane"</strong>, <strong>"linked list"</strong>, <strong>"dijkstra"</strong>, or <strong>"two sum"</strong>.</p>
                <div className="search-tags">
                  {['Basics', 'Kadane', 'Binary Search', 'Linked List', 'Stack', 'Trees', 'Graph', 'DP', 'Two Sum'].map(t => (
                    <button key={t} className="search-tag-chip" onClick={() => setQuery(t)}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            ) : matchedLessons.length === 0 && matchedProblems.length === 0 ? (
              <div className="search-empty-hint">
                <p>No results found for "{query}".</p>
              </div>
            ) : (
              <>
                {matchedLessons.length > 0 && (
                  <div className="search-category-group">
                    <div className="search-category-title">
                      <BookOpen size={14} /> A2Z VIDEO LESSONS ({matchedLessons.length})
                    </div>
                    {matchedLessons.map(l => (
                      <div
                        key={l.id}
                        className="search-result-item"
                        onClick={() => {
                          onSelectLesson(l);
                          onClose();
                        }}
                      >
                        <div className="sri-left">
                          <span className="sri-module">{l.sectionTitle} • <Clock size={10} /> {l.duration}</span>
                          <strong>{l.title}</strong>
                          <span className="sri-desc">{l.description}</span>
                        </div>
                        <ArrowRight size={16} className="sri-arrow" />
                      </div>
                    ))}
                  </div>
                )}

                {matchedProblems.length > 0 && (
                  <div className="search-category-group">
                    <div className="search-category-title">
                      <Code2 size={14} /> PRACTICE PROBLEMS ({matchedProblems.length})
                    </div>
                    {matchedProblems.map(p => (
                      <div
                        key={p.id}
                        className="search-result-item"
                        onClick={() => {
                          onSelectProblem(p.id);
                          onClose();
                        }}
                      >
                        <div className="sri-left">
                          <span className="sri-module">{p.topic}</span>
                          <strong>{p.title}</strong>
                          <span className={`p-tag ${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                        </div>
                        <ArrowRight size={16} className="sri-arrow" />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchModal;
