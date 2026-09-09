import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle2, Circle, ArrowRight, BrainCircuit, Filter } from 'lucide-react';
import { DSA_PROBLEMS } from '../../data/dsaProblems';

const DSAProblemSet = ({ onSelectProblem, dsaProblemProgress = {} }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const topics = ['All', 'Arrays', 'Strings', 'Linked List', 'Stack', 'Queue', 'Trees', 'Graph', 'Sorting', 'Searching', 'DP', 'Greedy'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filteredProblems = DSA_PROBLEMS.filter(p => {
    const matchesDiff = selectedDifficulty === 'All' || p.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    const matchesTopic = selectedTopic === 'All' || p.topic.toLowerCase() === selectedTopic.toLowerCase();
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDiff && matchesTopic && matchesSearch;
  });

  const solvedCount = Object.values(dsaProblemProgress).filter(p => p.solved).length;

  return (
    <div className="dsa-problemset-container">
      {/* Header Banner */}
      <div className="glass-card problemset-header">
        <div className="ps-header-left">
          <div className="top-badge-row">
            <span className="badge-cyber">
              <BrainCircuit size={13} />
              ALGORITHMIC PROBLEM SET
            </span>
          </div>
          <h1>DSA Coding Challenges</h1>
          <p>Hand-curated interview problems covering Arrays, Linked Lists, Trees, Dynamic Programming & Graphs.</p>
        </div>
        <div className="ps-header-stats">
          <div className="ps-stat-box">
            <span className="ps-stat-val">{solvedCount} / {DSA_PROBLEMS.length}</span>
            <span className="ps-stat-lbl">PROBLEMS SOLVED</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="problemset-filter-bar glass-card">
        <div className="ps-search-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search problems by name or topic..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="ps-search-input"
          />
        </div>

        <div className="ps-pills-row">
          <div className="filter-chip-group">
            <span className="filter-label">Difficulty:</span>
            {difficulties.map(d => (
              <button
                key={d}
                className={`filter-pill ${selectedDifficulty === d ? 'active' : ''}`}
                onClick={() => setSelectedDifficulty(d)}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="filter-chip-group">
            <span className="filter-label">Topic:</span>
            <select
              className="ps-topic-select"
              value={selectedTopic}
              onChange={e => setSelectedTopic(e.target.value)}
            >
              {topics.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Problems List / Grid */}
      <div className="problems-table glass-card">
        <div className="table-header-row">
          <span className="col-status">Status</span>
          <span className="col-title">Title</span>
          <span className="col-topic">Topic</span>
          <span className="col-diff">Difficulty</span>
          <span className="col-action">Action</span>
        </div>

        <div className="table-body">
          {filteredProblems.length > 0 ? (
            filteredProblems.map((prob) => {
              const isSolved = dsaProblemProgress[prob.id]?.solved;
              return (
                <motion.div
                  key={prob.id}
                  className={`table-row ${isSolved ? 'solved-row' : ''}`}
                  whileHover={{ backgroundColor: "rgba(249, 115, 22, 0.05)" }}
                  onClick={() => onSelectProblem(prob.id)}
                >
                  <span className="col-status">
                    {isSolved ? (
                      <CheckCircle2 size={18} color="var(--emerald-green)" />
                    ) : (
                      <Circle size={18} color="var(--text-muted)" />
                    )}
                  </span>
                  <span className="col-title">
                    <strong>{prob.title}</strong>
                  </span>
                  <span className="col-topic">
                    <span className="topic-badge">{prob.topic}</span>
                  </span>
                  <span className="col-diff">
                    <span className={`p-tag ${prob.difficulty.toLowerCase()}`}>
                      {prob.difficulty}
                    </span>
                  </span>
                  <span className="col-action">
                    <button className="attempt-btn">
                      {isSolved ? 'Review' : 'Solve'} <ArrowRight size={13} />
                    </button>
                  </span>
                </motion.div>
              );
            })
          ) : (
            <div className="no-problems-state">
              <p>No problems match the selected filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DSAProblemSet;
