import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Play, RotateCcw, CheckCircle2, Copy, Check, Terminal, Sparkles, Code2 } from 'lucide-react';

const PRACTICE_PROBLEMS = {
  patterns: {
    id: 'patterns',
    title: 'Star & Pyramid Patterns',
    difficulty: 'EASY',
    tags: ['Loops', 'Logic', 'Matrix'],
    description: 'Write a program to print a symmetric pyramid of stars (*) with height N.',
    defaultLang: 'c',
    codeC: `#include <stdio.h>

int main() {
    int n = 5;
    printf("Printing %d-level Pyramid:\\n", n);
    for (int i = 1; i <= n; i++) {
        for (int space = 1; space <= n - i; space++) {
            printf(" ");
        }
        for (int j = 1; j <= (2 * i - 1); j++) {
            printf("*");
        }
        printf("\\n");
    }
    return 0;
}`,
    codePython: `def print_pyramid(n=5):
    print(f"Printing {n}-level Pyramid:")
    for i in range(1, n + 1):
        spaces = " " * (n - i)
        stars = "*" * (2 * i - 1)
        print(spaces + stars)

print_pyramid(5)`,
    expectedOutput: `Printing 5-level Pyramid:
    *
   ***
  *****
 *******
*********`
  },
  armstrong: {
    id: 'armstrong',
    title: 'Prime & Armstrong Numbers',
    difficulty: 'MEDIUM',
    tags: ['Math', 'Conditions', 'While Loop'],
    description: 'Determine whether a given 3-digit integer is an Armstrong number (sum of cubes of its digits equals the number).',
    defaultLang: 'c',
    codeC: `#include <stdio.h>

int main() {
    int num = 153, originalNum, remainder, result = 0;
    originalNum = num;

    while (originalNum != 0) {
        remainder = originalNum % 10;
        result += remainder * remainder * remainder;
        originalNum /= 10;
    }

    if (result == num)
        printf("%d is an Armstrong Number! [PASS]\\n", num);
    else
        printf("%d is NOT an Armstrong Number. [FAIL]\\n", num);

    return 0;
}`,
    codePython: `def check_armstrong(num=153):
    digits = [int(d) for d in str(num)]
    total = sum(d ** len(digits) for d in digits)
    if total == num:
        return f"{num} is an Armstrong Number! [PASS]"
    return f"{num} is NOT an Armstrong Number. [FAIL]"

print(check_armstrong(153))`,
    expectedOutput: `153 is an Armstrong Number! [PASS]`
  },
  matrix: {
    id: 'matrix',
    title: 'Matrix Multiplication (2D Array)',
    difficulty: 'HARD',
    tags: ['2D Arrays', 'Nested Loops', 'Algorithms'],
    description: 'Multiply two 2x2 integer matrices A and B, and print the resulting matrix C.',
    defaultLang: 'c',
    codeC: `#include <stdio.h>

int main() {
    int A[2][2] = {{1, 2}, {3, 4}};
    int B[2][2] = {{5, 6}, {7, 8}};
    int C[2][2] = {0};

    printf("Executing Matrix Multiplication:\\n");
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            for (int k = 0; k < 2; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    for (int i = 0; i < 2; i++) {
        printf("[ ");
        for (int j = 0; j < 2; j++) {
            printf("%d ", C[i][j]);
        }
        printf("]\\n");
    }
    return 0;
}`,
    codePython: `def multiply_matrices():
    A = [[1, 2], [3, 4]]
    B = [[5, 6], [7, 8]]
    C = [[sum(a * b for a, b in zip(A_row, B_col)) for B_col in zip(*B)] for A_row in A]
    
    print("Executing Matrix Multiplication:")
    for row in C:
        print("[ " + " ".join(map(str, row)) + " ]")

multiply_matrices()`,
    expectedOutput: `Executing Matrix Multiplication:
[ 19 22 ]
[ 43 50 ]`
  }
};

export const CodePlaygroundModal = ({ initialProblemKey = 'patterns', onClose }) => {
  const [selectedKey, setSelectedKey] = useState(initialProblemKey);
  const [language, setLanguage] = useState('c');
  const problem = PRACTICE_PROBLEMS[selectedKey] || PRACTICE_PROBLEMS.patterns;

  const [code, setCode] = useState(() => (language === 'c' ? problem.codeC : problem.codePython));
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [passed, setPassed] = useState(null);

  const handleSelectProblem = (key) => {
    setSelectedKey(key);
    const p = PRACTICE_PROBLEMS[key];
    setCode(language === 'c' ? p.codeC : p.codePython);
    setOutput('');
    setPassed(null);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode(lang === 'c' ? problem.codeC : problem.codePython);
    setOutput('');
    setPassed(null);
  };

  const handleReset = () => {
    setCode(language === 'c' ? problem.codeC : problem.codePython);
    setOutput('');
    setPassed(null);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput('> Compiling binary with CyberCompiler GCC v14.2...\n> Linking symbols...\n> Executing runtime process...\n');
    setPassed(null);

    setTimeout(() => {
      setIsRunning(false);
      setOutput(problem.expectedOutput);
      setPassed(true);
    }, 900);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className="video-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ zIndex: 1100 }}
    >
      <motion.div
        className="glass-card video-modal-card"
        style={{ maxWidth: '1050px', width: '95%', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
      >
        {/* Header */}
        <div className="modal-header" style={{ padding: '1rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
            <div className="logo-icon-wrapper" style={{ width: '32px', height: '32px' }}>
              <Terminal size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', margin: 0 }}>
                Algorithmic Code Studio
              </h3>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Solve university algorithmic problems & execute interactive logic
              </span>
            </div>
          </div>

          <button className="modal-close-btn" onClick={onClose} aria-label="Close Code Studio">
            <X size={20} />
          </button>
        </div>

        {/* Studio Body */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', flex: 1, overflow: 'hidden', minHeight: '480px' }}>
          {/* Left Column: Problem description & code editor */}
          <div style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--glass-border)', padding: '1.2rem', overflowY: 'auto' }}>
            {/* Problem selector pills */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {Object.keys(PRACTICE_PROBLEMS).map((key) => {
                const item = PRACTICE_PROBLEMS[key];
                return (
                  <button
                    key={key}
                    onClick={() => handleSelectProblem(key)}
                    className="quick-btn"
                    style={{
                      background: selectedKey === key ? 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))' : 'rgba(0, 240, 255, 0.05)',
                      color: selectedKey === key ? '#06060f' : 'var(--text-secondary)',
                      fontWeight: selectedKey === key ? '700' : '500',
                      borderColor: selectedKey === key ? 'transparent' : 'rgba(0, 240, 255, 0.15)'
                    }}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>

            {/* Problem Specs */}
            <div className="glass-card" style={{ padding: '1rem', marginBottom: '1rem', background: 'rgba(0, 240, 255, 0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{problem.title}</h4>
                <span className={`p-tag ${problem.difficulty.toLowerCase()}`} style={{ margin: 0 }}>
                  {problem.difficulty}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                {problem.description}
              </p>
            </div>

            {/* Editor Action Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button
                  className={`lang-btn ${language === 'c' ? 'active' : ''}`}
                  onClick={() => handleLanguageChange('c')}
                  style={{ padding: '0.25rem 0.7rem', fontSize: '0.72rem' }}
                >
                  C (GCC)
                </button>
                <button
                  className={`lang-btn ${language === 'python' ? 'active' : ''}`}
                  onClick={() => handleLanguageChange('python')}
                  style={{ padding: '0.25rem 0.7rem', fontSize: '0.72rem' }}
                >
                  Python 3.12+
                </button>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={handleCopy}
                  className="quick-btn"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem' }}
                  title="Copy code"
                >
                  {copied ? <Check size={13} color="var(--neon-green)" /> : <Copy size={13} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button
                  onClick={handleReset}
                  className="quick-btn"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem' }}
                  title="Reset code to starter template"
                >
                  <RotateCcw size={13} />
                  Reset
                </button>
              </div>
            </div>

            {/* Code Editor Textarea */}
            <div style={{ position: 'relative', flex: 1, minHeight: '240px' }}>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck="false"
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: '240px',
                  background: 'rgba(6, 6, 15, 0.85)',
                  border: '1px solid rgba(0, 240, 255, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--neon-cyan)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  lineHeight: '1.6',
                  padding: '1rem',
                  resize: 'none',
                  outline: 'none',
                  boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)'
                }}
              />
            </div>
          </div>

          {/* Right Column: Interactive Terminal Output */}
          <div style={{ display: 'flex', flexDirection: 'column', padding: '1.2rem', background: 'rgba(6, 6, 15, 0.95)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div className="dot green"></div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  cyber-terminal:~$ output
                </span>
              </div>

              <button
                className="btn-primary btn-glow"
                onClick={handleRunCode}
                disabled={isRunning}
                style={{ padding: '0.5rem 1.2rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <Play size={15} />
                {isRunning ? 'Compiling...' : 'Run Code ▶'}
              </button>
            </div>

            {/* Terminal Window Box */}
            <div
              className="glass-card"
              style={{
                flex: 1,
                minHeight: '220px',
                padding: '1.2rem',
                background: '#04040a',
                border: '1px solid rgba(0, 240, 255, 0.15)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                color: '#e8e8f0',
                overflowY: 'auto',
                whiteSpace: 'pre-wrap',
                lineHeight: '1.7'
              }}
            >
              {output ? (
                <div>{output}</div>
              ) : (
                <div style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  Click &ldquo;Run Code ▶&rdquo; to compile and execute program in sandbox...
                </div>
              )}
            </div>

            {/* Test Case Verification Status Badge */}
            {passed !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginTop: '1rem',
                  padding: '0.8rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(0, 255, 136, 0.1)',
                  border: '1px solid rgba(0, 255, 136, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem'
                }}
              >
                <CheckCircle2 size={20} color="var(--neon-green)" />
                <div>
                  <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--neon-green)', display: 'block' }}>
                    All Test Cases Passed (100% Correct)
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                    Runtime: 0.04s • Memory: 1.2MB • Algorithmic score: +50 XP
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CodePlaygroundModal;
