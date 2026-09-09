import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, RotateCcw, Plus, Trash2, RefreshCw } from 'lucide-react';

const LinkedListVisualization = () => {
  const [nodes, setNodes] = useState([10, 20, 30, 40]);
  const [highlightIdx, setHighlightIdx] = useState(null);
  const [message, setMessage] = useState("Singly Linked List: Head pointer -> nodes linked via next pointers -> NULL");
  const [inputValue, setInputValue] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleReset = () => {
    setNodes([10, 20, 30, 40]);
    setHighlightIdx(null);
    setMessage("Linked list reset.");
  };

  const handleInsertHead = () => {
    const val = parseInt(inputValue, 10);
    if (isNaN(val) || nodes.length >= 6) {
      setMessage(nodes.length >= 6 ? "Max 6 nodes demo limit reached." : "Enter a valid integer.");
      return;
    }
    setNodes(prev => [val, ...prev]);
    setMessage(`Inserted ${val} at Head: O(1) time complexity! New head created.`);
    setInputValue("");
    setHighlightIdx(0);
    setTimeout(() => setHighlightIdx(null), 1000);
  };

  const handleDeleteHead = () => {
    if (nodes.length <= 1) {
      setMessage("List must have at least 1 node.");
      return;
    }
    const val = nodes[0];
    setNodes(prev => prev.slice(1));
    setMessage(`Deleted Head node (${val}): Head shifted to next node in O(1).`);
  };

  const handleReverse = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setMessage("Reversing pointers iteratively using prev, curr, and next...");
    for (let i = 0; i < nodes.length; i++) {
      setHighlightIdx(i);
      await new Promise(r => setTimeout(r, 450));
    }
    setNodes(prev => [...prev].reverse());
    setHighlightIdx(null);
    setMessage("Reversed! Head now points to the previous tail node.");
    setIsAnimating(false);
  };

  return (
    <div className="vis-container glass-card">
      <div className="vis-header">
        <h4>Interactive Linked List Visualizer</h4>
        <span className="vis-badge">Heap Pointers & References</span>
      </div>

      <div className="vis-display-area">
        <div className="ll-nodes-row">
          <div className="ll-head-label">HEAD ➔</div>
          {nodes.map((val, idx) => (
            <React.Fragment key={idx}>
              <motion.div
                className={`ll-node-box ${highlightIdx === idx ? 'highlighted' : ''}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: highlightIdx === idx ? 1.15 : 1, opacity: 1 }}
              >
                <div className="ll-node-data">{val}</div>
                <div className="ll-node-next">next</div>
              </motion.div>
              <div className="ll-arrow">
                <ArrowRight size={20} />
              </div>
            </React.Fragment>
          ))}
          <div className="ll-null-box">NULL</div>
        </div>
      </div>

      <div className="vis-status-box">
        <p>{message}</p>
      </div>

      <div className="vis-controls-toolbar">
        <div className="vis-action-group">
          <button className="quick-btn" onClick={handleDeleteHead} disabled={isAnimating}>
            <Trash2 size={14} /> Pop Head O(1)
          </button>
          <button className="quick-btn" onClick={handleReverse} disabled={isAnimating}>
            <RefreshCw size={14} /> Reverse List
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
          <button className="quick-btn btn-glow" onClick={handleInsertHead}>
            <Plus size={14} /> Push Head
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkedListVisualization;
