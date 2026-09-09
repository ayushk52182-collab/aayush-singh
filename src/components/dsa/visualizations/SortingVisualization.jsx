import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';

const SortingVisualization = () => {
  const initialBars = [65, 25, 80, 15, 45, 95, 30, 50];
  const [bars, setBars] = useState([...initialBars]);
  const [compareIdx, setCompareIdx] = useState([]);
  const [sortedIdx, setSortedIdx] = useState([]);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [message, setMessage] = useState("Select an algorithm and click 'Sort' to view comparison-based sorting.");
  const [isSorting, setIsSorting] = useState(false);

  const resetBars = () => {
    setBars([...initialBars]);
    setCompareIdx([]);
    setSortedIdx([]);
    setMessage("Array reset to unsorted state.");
  };

  const bubbleSort = async () => {
    setIsSorting(true);
    const arr = [...bars];
    const n = arr.length;
    setMessage("Running Bubble Sort: Bubbling largest elements to the end...");

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setCompareIdx([j, j + 1]);
        if (arr[j] > arr[j + 1]) {
          const tmp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = tmp;
          setBars([...arr]);
        }
        await new Promise(r => setTimeout(r, 200));
      }
      setSortedIdx(prev => [...prev, n - i - 1]);
    }
    setSortedIdx(Array.from({ length: n }, (_, i) => i));
    setCompareIdx([]);
    setMessage("Bubble Sort Complete! Array is sorted.");
    setIsSorting(false);
  };

  const selectionSort = async () => {
    setIsSorting(true);
    const arr = [...bars];
    const n = arr.length;
    setMessage("Running Selection Sort: Finding minimum element and placing at front...");

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        setCompareIdx([minIdx, j]);
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
        await new Promise(r => setTimeout(r, 180));
      }
      if (minIdx !== i) {
        const tmp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = tmp;
        setBars([...arr]);
      }
      setSortedIdx(prev => [...prev, i]);
    }
    setSortedIdx(Array.from({ length: n }, (_, i) => i));
    setCompareIdx([]);
    setMessage("Selection Sort Complete! Array is sorted.");
    setIsSorting(false);
  };

  const handleStartSort = () => {
    if (isSorting) return;
    setSortedIdx([]);
    if (algorithm === 'bubble') bubbleSort();
    else selectionSort();
  };

  return (
    <div className="vis-container glass-card">
      <div className="vis-header">
        <div className="vis-tabs">
          <button className={`switch-btn ${algorithm === 'bubble' ? 'active' : ''}`} onClick={() => { setAlgorithm('bubble'); resetBars(); }}>
            Bubble Sort O(n²)
          </button>
          <button className={`switch-btn ${algorithm === 'selection' ? 'active' : ''}`} onClick={() => { setAlgorithm('selection'); resetBars(); }}>
            Selection Sort O(n²)
          </button>
        </div>
        <span className="vis-badge">In-place Array Bar Swaps</span>
      </div>

      <div className="vis-display-area" style={{ height: '180px', alignItems: 'flex-end', justifyContent: 'center', display: 'flex', gap: '8px', paddingBottom: '1rem' }}>
        {bars.map((val, idx) => {
          const isComparing = compareIdx.includes(idx);
          const isSorted = sortedIdx.includes(idx);
          return (
            <motion.div
              key={idx}
              className="sorting-bar-column"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
            >
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{val}</span>
              <motion.div
                className="sorting-bar"
                style={{
                  width: '28px',
                  height: `${val * 1.3}px`,
                  background: isComparing
                    ? 'var(--rose-coral)'
                    : isSorted
                    ? 'var(--emerald-green)'
                    : 'linear-gradient(to top, var(--orange-deep), var(--orange-primary))',
                  borderRadius: '4px 4px 0 0',
                  transition: 'background 0.2s ease'
                }}
              />
            </motion.div>
          );
        })}
      </div>

      <div className="vis-status-box">
        <p>{message}</p>
      </div>

      <div className="vis-controls-toolbar">
        <div className="vis-action-group">
          <button className="quick-btn btn-glow" onClick={handleStartSort} disabled={isSorting}>
            <Play size={14} /> Start Sorting
          </button>
          <button className="quick-btn" onClick={resetBars} disabled={isSorting}>
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualization;
