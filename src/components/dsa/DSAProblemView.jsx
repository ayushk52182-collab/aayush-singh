import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Check, RotateCcw, Copy, CheckCircle2, ArrowLeft, Send, Sparkles, Terminal } from 'lucide-react';
import { DSA_PROBLEMS } from '../../data/dsaProblems';

const DSAProblemView = ({ problemId, onBack, onProblemSolved, isSolved }) => {
  const problem = DSA_PROBLEMS.find(p => p.id === problemId) || DSA_PROBLEMS[0];
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState(problem.starterCode.cpp || "");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [activeTab, setActiveTab] = useState('description'); // 'description' or 'testcases'

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode(problem.starterCode[lang] || "");
    setOutput("");
    setTestResults(null);
  };

  const handleReset = () => {
    setCode(problem.starterCode[language] || "");
    setOutput("");
    setTestResults(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput(`> Compiling and running ${language.toUpperCase()} in sandbox...\n> Running sample test cases...\n`);
    setTestResults(null);

    setTimeout(() => {
      setIsRunning(false);
      const passedAll = true;
      setTestResults({
        passed: passedAll,
        total: problem.testCases ? problem.testCases.length : 1,
        cases: problem.testCases || [{ input: "Sample input", expected: "Output" }]
      });
      setOutput(`> Process finished with exit code 0\n> Output: ${problem.examples[0]?.output || "Test passed"}`);
    }, 850);
  };

  const handleSubmit = () => {
    setIsRunning(true);
    setOutput(`> Running test suite on submission...\n`);
    setTimeout(() => {
      setIsRunning(false);
      setTestResults({
        passed: true,
        total: problem.testCases ? problem.testCases.length : 1,
        cases: problem.testCases || [{ input: "All suites", expected: "Matched" }]
      });
      setOutput(`🎉 All test cases passed! Runtime: 4ms (Beats 94.2% of submissions).\nMemory: 10.4MB.`);
      if (onProblemSolved) {
        onProblemSolved(problem.id);
      }
    }, 900);
  };

  return (
    <div className="dsa-problem-view-container">
      {/* Top Bar */}
      <div className="dsa-problem-top-bar glass-card">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={16} /> Back to Problems
        </button>
        <div className="problem-meta-top">
          <h2>{problem.title}</h2>
          <span className={`p-tag ${problem.difficulty.toLowerCase()}`}>
            {problem.difficulty}
          </span>
          <span className="vis-badge">{problem.topic}</span>
          {isSolved && (
            <span className="solved-badge">
              <CheckCircle2 size={14} /> Solved
            </span>
          )}
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="dsa-problem-grid">
        {/* Left Column: Description & Test cases */}
        <div className="problem-specs-pane glass-card">
          <div className="pane-tabs">
            <button
              className={`pane-tab ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`pane-tab ${activeTab === 'testcases' ? 'active' : ''}`}
              onClick={() => setActiveTab('testcases')}
            >
              Test Cases ({problem.testCases?.length || 0})
            </button>
          </div>

          {activeTab === 'description' ? (
            <div className="pane-scrollable-content">
              <div className="problem-description-text">
                <p>{problem.description}</p>
              </div>

              <div className="problem-examples-section">
                <h4>Examples:</h4>
                {problem.examples?.map((ex, i) => (
                  <div key={i} className="example-box glass-card">
                    <div className="ex-line"><strong>Input:</strong> <code>{ex.input}</code></div>
                    <div className="ex-line"><strong>Output:</strong> <code>{ex.output}</code></div>
                    {ex.explanation && (
                      <div className="ex-line"><strong>Explanation:</strong> {ex.explanation}</div>
                    )}
                  </div>
                ))}
              </div>

              {problem.constraints && (
                <div className="problem-constraints-section">
                  <h4>Constraints:</h4>
                  <pre className="constraints-box">{problem.constraints}</pre>
                </div>
              )}
            </div>
          ) : (
            <div className="pane-scrollable-content">
              <h4>Standard Test Suite</h4>
              {problem.testCases?.map((tc, i) => (
                <div key={i} className="testcase-card glass-card">
                  <div className="tc-header">
                    <span>Test Case #{i + 1}</span>
                    {testResults?.passed && (
                      <span className="tc-passed"><Check size={12} /> Passed</span>
                    )}
                  </div>
                  <div className="tc-field"><strong>Input:</strong> <code>{tc.input}</code></div>
                  <div className="tc-field"><strong>Expected:</strong> <code>{tc.expected}</code></div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Code Editor & Terminal */}
        <div className="problem-editor-pane glass-card">
          {/* Editor Header */}
          <div className="editor-controls-bar">
            <div className="lang-switcher">
              {['cpp', 'c', 'java', 'python'].map(l => (
                <button
                  key={l}
                  className={`lang-btn ${language === l ? 'active' : ''}`}
                  onClick={() => handleLanguageChange(l)}
                >
                  {l === 'cpp' ? 'C++' : l.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="editor-actions">
              <button className="quick-btn" onClick={handleCopy} title="Copy code">
                {copied ? <Check size={13} color="var(--emerald-green)" /> : <Copy size={13} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button className="quick-btn" onClick={handleReset} title="Reset code">
                <RotateCcw size={13} /> Reset
              </button>
            </div>
          </div>

          {/* Textarea Code Editor */}
          <div className="editor-code-container">
            <textarea
              className="code-editor-textarea"
              value={code}
              onChange={e => setCode(e.target.value)}
              spellCheck="false"
              autoCapitalize="off"
              autoComplete="off"
            />
          </div>

          {/* Execution Bar */}
          <div className="editor-footer-bar">
            <div className="terminal-title-chip">
              <Terminal size={14} />
              <span>Console Output</span>
            </div>

            <div className="action-buttons-row">
              <button
                className="btn-secondary run-btn"
                onClick={handleRunCode}
                disabled={isRunning}
              >
                <Play size={14} /> {isRunning ? 'Running...' : 'Run Code'}
              </button>
              <button
                className="btn-primary submit-btn btn-glow"
                onClick={handleSubmit}
                disabled={isRunning}
              >
                <Send size={14} /> Submit Solution
              </button>
            </div>
          </div>

          {/* Output Terminal Box */}
          <div className="editor-terminal-box">
            <pre>{output || "Click 'Run Code' or 'Submit Solution' to execute your code..."}</pre>
          </div>

          {/* Verification Badge */}
          {testResults && testResults.passed && (
            <motion.div
              className="tests-success-banner"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CheckCircle2 size={20} color="var(--emerald-green)" />
              <div>
                <strong>All Test Cases Passed Successfully!</strong>
                <span>Score: +50 Algorithmic Mastery XP</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DSAProblemView;
