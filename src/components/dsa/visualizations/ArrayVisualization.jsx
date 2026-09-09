import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Plus, Trash2, Search } from 'lucide-react';

const ArrayVisualization = () => {
  const [array, setArray] = useState([10, 25, 38, 42, 67, 89]);
  const [highlightIdx, setHighlightIdx] = useState(null);
  const [message, setMessage] = useState("Array in contiguous memory. Click operations below to animate.");
  const [inputValue, setInputValue] = useState("");
  const [searchTarget, setSearchTarget] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleReset = () => {
    setArray([10, 25, 38, 42, 67, 89]);
    setHighlightIdx(null);
    setMessage("Array reset to default state.");
  };

  const handleTraverse = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setMessage("Traversing array sequentially from index 0 to " + (array.length - 1) + "...");
    for (let i = 0; i < array.length; i++) {
      setHighlightIdx(i);
      setMessage(`Visiting Index [${i}] = ${array[i]}`);
      await new Promise(r => setTimeout(r, 600));
    }
    setHighlightIdx(null);
    setMessage("Traversal complete! O(n) time.");
    setIsAnimating(false);
  };

  const handleSearch = async () => {
    const target = parseInt(searchTarget, 10);
    if (isNaN(target) || isAnimating) return;
    setIsAnimating(true);
    setMessage(`Searching for value ${target}...`);
    let found = false;
    for (let i = 0; i < array.length; i++) {
      setHighlightIdx(i);
      if (array[i] === target) {
        setMessage(`Match found at index [${i}]! Value: ${array[i]}`);
        found = true;
        break;
      }
      await new Promise(r => setTimeout(r, 500));
    }
    if (!found) {
      setHighlightIdx(null);
      setMessage(`Target ${target} not found in array.`);
    }
    setIsAnimating(false);
  };

  const handleInsert = () => {
    const val = parseInt(inputValue, 10);
    if (isNaN(val) || array.length >= 8) {
      setMessage(array.length >= 8 ? "Maximum demo capacity reached (8 elements)." : "Enter valid integer.");
      return;
    }
    setArray(prev => [...prev, val]);
    setHighlightIdx(array.length);
    setMessage(`Inserted ${val} at index [${array.length}]. Memory expanded.`);
    setInputValue("");
    setTimeout(() => setHighlightIdx(null), 1000);
  };

  const handleDelete = () => {
    if (array.length <= 1) {
      setMessage("Cannot delete from minimum sized array.");
      return;
    }
    const removed = array[array.length - 1];
    setArray(prev => prev.slice(0, -1));
    setMessage(`Deleted last element ${removed} from index [${array.length - 1}].`);
  };

  return (
    <div className="vis-container glass-card">
      <div className="vis-header">
        <h4>Interactive Array Memory Model</h4>
        <span className="vis-badge">Continuous RAM Block</span>
      </div>

      <div className="vis-display-area">
        <div className="array-cells-row">
          {array.map((val, idx) => (
            <motion.div
              key={idx}
              className={`array-cell ${highlightIdx === idx ? 'highlighted' : ''}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: highlightIdx === idx ? 1.15 : 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <span className="cell-index">idx: {idx}</span>
              <div className="cell-value">{val}</div>
              <span className="cell-address">0x{1000 + idx * 4}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="vis-status-box">
        <p>{message}</p>
      </div>

      <div className="vis-controls-toolbar">
        <div className="vis-action-group">
          <button className="quick-btn" onClick={handleTraverse} disabled={isAnimating}>
            <Play size={14} /> Traverse O(n)
          </button>
          <button className="quick-btn" onClick={handleDelete} disabled={isAnimating}>
            <Trash2 size={14} /> Pop Tail
          </button>
          <button className="quick-btn" onClick={handleReset} disabled={isAnimating}>
            <RotateCcw size={14} /> Reset
          </button>
        </div>

        <div className="vis-input-group">
          <input
            type="number"
            placeholder="Val"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="vis-input"
          />
          <button className="quick-btn btn-glow" onClick={handleInsert}>
            <Plus size={14} /> Push
          </button>

          <input
            type="number"
            placeholder="Search"
            value={searchTarget}
            onChange={e => setSearchTarget(e.target.value)}
            className="vis-input"
          />
          <button className="quick-btn" onClick={handleSearch} disabled={isAnimating}>
            <Search size={14} /> Find
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArrayVisualization;
