import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

const GraphVisualization = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [message, setMessage] = useState("Graph: 4 vertices connected by 5 undirected edges.");
  const [isAnimating, setIsAnimating] = useState(false);

  const nodes = [
    { id: 'A', x: 80, y: 50 },
    { id: 'B', x: 280, y: 50 },
    { id: 'C', x: 80, y: 150 },
    { id: 'D', x: 280, y: 150 },
  ];

  const edges = [
    { from: 'A', to: 'B' },
    { from: 'A', to: 'C' },
    { from: 'B', to: 'D' },
    { from: 'C', to: 'D' },
    { from: 'B', to: 'C' }, // diagonal
  ];

  const runBFS = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setVisitedNodes([]);
    setMessage("Running BFS (Breadth-First Search) starting at node A using Queue...");
    const order = ['A', 'B', 'C', 'D'];
    const visited = [];
    for (const node of order) {
      setActiveNode(node);
      visited.push(node);
      setVisitedNodes([...visited]);
      setMessage(`BFS Queue pop: Visiting vertex ${node}`);
      await new Promise(r => setTimeout(r, 650));
    }
    setActiveNode(null);
    setMessage("BFS Complete! Explored layer-by-layer: A -> B -> C -> D");
    setIsAnimating(false);
  };

  const runDFS = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setVisitedNodes([]);
    setMessage("Running DFS (Depth-First Search) starting at node A using Call Stack...");
    const order = ['A', 'B', 'D', 'C'];
    const visited = [];
    for (const node of order) {
      setActiveNode(node);
      visited.push(node);
      setVisitedNodes([...visited]);
      setMessage(`DFS Exploring branch: Vertex ${node}`);
      await new Promise(r => setTimeout(r, 650));
    }
    setActiveNode(null);
    setMessage("DFS Complete! Deepest path traversed: A -> B -> D -> C");
    setIsAnimating(false);
  };

  const handleReset = () => {
    setActiveNode(null);
    setVisitedNodes([]);
    setMessage("Graph reset.");
  };

  const getNodePos = (id) => nodes.find(n => n.id === id);

  return (
    <div className="vis-container glass-card">
      <div className="vis-header">
        <h4>Interactive Graph Visualizer</h4>
        <span className="vis-badge">Vertices & Edges Network</span>
      </div>

      <div className="vis-display-area" style={{ height: '210px', position: 'relative' }}>
        <svg viewBox="0 0 360 200" style={{ width: '100%', height: '100%' }}>
          {edges.map((e, idx) => {
            const p1 = getNodePos(e.from);
            const p2 = getNodePos(e.to);
            return (
              <line
                key={idx}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke="var(--glass-border-hover)"
                strokeWidth="2"
              />
            );
          })}

          {nodes.map(n => {
            const isCurrent = activeNode === n.id;
            const isVisited = visitedNodes.includes(n.id);
            return (
              <g key={n.id}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="20"
                  fill={isCurrent ? "var(--orange-deep)" : isVisited ? "var(--orange-primary)" : "var(--bg-card)"}
                  stroke={isCurrent ? "var(--amber-gold)" : "var(--glass-border)"}
                  strokeWidth={isCurrent ? "3" : "1.5"}
                  style={{ transition: 'all 0.3s ease' }}
                />
                <text
                  x={n.x}
                  y={n.y + 5}
                  textAnchor="middle"
                  fill={isVisited ? "#fff" : "var(--text-primary)"}
                  fontSize="14"
                  fontWeight="bold"
                  fontFamily="var(--font-display)"
                >
                  {n.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="vis-status-box">
        <p>{message}</p>
        {visitedNodes.length > 0 && (
          <div className="vis-history-chips">
            <span>Discovered: </span>
            {visitedNodes.map((v, i) => (
              <span key={i} className="vis-chip">{v}</span>
            ))}
          </div>
        )}
      </div>

      <div className="vis-controls-toolbar">
        <div className="vis-action-group">
          <button className="quick-btn" onClick={runBFS} disabled={isAnimating}>
            <Play size={14} /> BFS Traversal
          </button>
          <button className="quick-btn" onClick={runDFS} disabled={isAnimating}>
            <Play size={14} /> DFS Traversal
          </button>
          <button className="quick-btn" onClick={handleReset} disabled={isAnimating}>
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default GraphVisualization;
