import React, { useState } from 'react';
import ArrayVisualization from './ArrayVisualization';
import LinkedListVisualization from './LinkedListVisualization';
import StackQueueVisualization from './StackQueueVisualization';
import TreeVisualization from './TreeVisualization';
import GraphVisualization from './GraphVisualization';
import SortingVisualization from './SortingVisualization';

const DSAVisualization = ({ visualType }) => {
  const [activeType, setActiveType] = useState(visualType || 'array');

  const renderVis = () => {
    switch (activeType) {
      case 'array':
        return <ArrayVisualization />;
      case 'linkedlist':
        return <LinkedListVisualization />;
      case 'stack':
      case 'queue':
        return <StackQueueVisualization />;
      case 'tree':
        return <TreeVisualization />;
      case 'graph':
        return <GraphVisualization />;
      case 'sorting':
        return <SortingVisualization />;
      default:
        return <ArrayVisualization />;
    }
  };

  return (
    <div className="dsa-vis-wrapper">
      {/* Quick Visualizer Switcher */}
      <div className="vis-type-pill-bar">
        <span className="vis-type-label">VISUAL LAB:</span>
        {['array', 'linkedlist', 'stack', 'tree', 'graph', 'sorting'].map(t => (
          <button
            key={t}
            className={`vis-type-btn ${activeType === t ? 'active' : ''}`}
            onClick={() => setActiveType(t)}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>
      {renderVis()}
    </div>
  );
};

export default DSAVisualization;
