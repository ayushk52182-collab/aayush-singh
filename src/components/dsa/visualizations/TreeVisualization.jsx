import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';

const TreeVisualization = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [traversalOrder, setTraversalOrder] = useState([]);
  const [message, setMessage] = useState("Binary Search Tree: Left child < Parent < Right child.");
  const [isAnimating, setIsAnimating] = useState(false);

  // Hardcoded balanced BST nodes with coordinates
  const nodes = [
    { id: 1, val: 50, x: 200, y: 30, left: 2, right: 3 },
    { id: 2, val: 30, x: 100, y: 90, left: 4, right: 5 },
    { id: 3, val: 70, x: 300, y: 90, left: 6, right: 7 },
    { id: 4, val: 20, x: 50,  y: 150, left: null, right: null },
    { id: 5, val: 40, x: 150, y: 150, left: null, right: null },
    { id: 6, val: 60, x: 250, y: 150, left: null, right: null },
    { id: 7, val: 80, x: 350, y: 150, left: null, right: null },
  ];

  const animateOrder = async (order, name) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTraversalOrder([]);
    setMessage(`Running ${name} Traversal...`);
    const history = [];

    for (const val of order) {
      setActiveNode(val);
      history.push(val);
      setTraversalOrder([...history]);
      await new Promise(r => setTimeout(r, 600));
    }
    setActiveNode(null);
    setMessage(`${name} Complete! Visited order: [${order.join(', ')}]`);
    setIsAnimating(false);
  };

  const handleInorder = () => {
    // Left, Root, Right -> sorted ascending: 20, 30, 40, 50, 60, 70, 80
    animateOrder([20, 30, 40, 50, 60, 70, 80], "Inorder (L, Root, R)");
  };

  const handlePreorder = () => {
    // Root, Left, Right: 50, 30, 20, 40, 70, 60, 80
    animateOrder([50, 30, 20, 40, 70, 60, 80], "Preorder (Root, L, R)");
  };

  const handlePostorder = () => {
    // Left, Right, Root: 20, 40, 30, 60, 80, 70, 50
    animateOrder([20, 40, 30, 60, 80, 70, 50], "Postorder (L, R, Root)");
  };

  const handleLevelOrder = () => {
    // Level by level: 50, 30, 70, 20, 40, 60, 80
    animateOrder([50, 30, 70, 20, 40, 60, 80], "Level Order (BFS)");
  };

  const handleReset = () => {
    setActiveNode(null);
    setTraversalOrder([]);
    setMessage("Tree reset.");
  };

  return (
    <div className="vis-container glass-card">
      <div className="vis-header">
        <h4>Binary Tree & BST Visualizer</h4>
        <span className="vis-badge">Hierarchical Pointer Structure</span>
      </div>

      <div className="vis-display-area" style={{ height: '210px', position: 'relative' }}>
        <svg viewBox="0 0 400 180" style={{ width: '100%', height: '100%' }}>
          {/* Edges */}
          <line x1="200" y1="30" x2="100" y2="90" stroke="var(--glass-border-hover)" strokeWidth="2" />
          <line x1="200" y1="30" x2="300" y2="90" stroke="var(--glass-border-hover)" strokeWidth="2" />
          <line x1="100" y1="90" x2="50"  y2="150" stroke="var(--glass-border-hover)" strokeWidth="2" />
          <line x1="100" y1="90" x2="150" y2="150" stroke="var(--glass-border-hover)" strokeWidth="2" />
          <line x1="300" y1="90" x2="250" y2="150" stroke="var(--glass-border-hover)" strokeWidth="2" />
          <line x1="300" y1="90" x2="350" y2="150" stroke="var(--glass-border-hover)" strokeWidth="2" />

          {/* Nodes */}
          {nodes.map(n => {
            const isHighlighted = activeNode === n.val;
            return (
              <g key={n.id}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="18"
                  fill={isHighlighted ? "var(--orange-primary)" : "var(--bg-card)"}
                  stroke={isHighlighted ? "var(--orange-deep)" : "var(--glass-border)"}
                  strokeWidth={isHighlighted ? "3" : "1.5"}
                  style={{ transition: 'all 0.3s ease' }}
                />
                <text
                  x={n.x}
                  y={n.y + 5}
                  textAnchor="middle"
                  fill={isHighlighted ? "#fff" : "var(--text-primary)"}
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="var(--font-mono)"
                >
                  {n.val}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="vis-status-box">
        <p>{message}</p>
        {traversalOrder.length > 0 && (
          <div className="vis-history-chips">
            <span>Visited: </span>
            {traversalOrder.map((v, i) => (
              <span key={i} className="vis-chip">{v}</span>
            ))}
          </div>
        )}
      </div>

      <div className="vis-controls-toolbar">
        <div className="vis-action-group" style={{ flexWrap: 'wrap' }}>
          <button className="quick-btn" onClick={handleInorder} disabled={isAnimating}>
            <Play size={14} /> Inorder
          </button>
          <button className="quick-btn" onClick={handlePreorder} disabled={isAnimating}>
            <Play size={14} /> Preorder
          </button>
          <button className="quick-btn" onClick={handlePostorder} disabled={isAnimating}>
            <Play size={14} /> Postorder
          </button>
          <button className="quick-btn" onClick={handleLevelOrder} disabled={isAnimating}>
            <Play size={14} /> Level Order
          </button>
          <button className="quick-btn" onClick={handleReset} disabled={isAnimating}>
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default TreeVisualization;
