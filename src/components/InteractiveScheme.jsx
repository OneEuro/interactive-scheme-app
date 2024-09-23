import React, { useState } from 'react';

const schemeData = {
  id: 0,
  title: 'Root',
  children: [
    { 
      id: 1, 
      title: 'Node 1', 
      children: [
        { id: 11, title: 'Action 1A', children: [
          { id: 111, title: 'Sub-Action 1A-1', children: [] },
          { id: 112, title: 'Sub-Action 1A-2', children: [] }
        ]},
        { id: 12, title: 'Action 1B', children: [] }
      ] 
    },
    { 
      id: 2, 
      title: 'Node 2', 
      children: [
        { id: 21, title: 'Action 2A', children: [] },
        { id: 22, title: 'Action 2B', children: [
          { id: 221, title: 'Sub-Action 2B-1', children: [] }
        ]},
        { id: 23, title: 'Action 2C', children: [] }
      ] 
    },
    { id: 3, title: 'Node 3', children: [] },
  ]
};

const TreeNode = ({ node, onNodeClick, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(level < 2);

  const handleClick = (e) => {
    e.stopPropagation();
    if (node.children.length > 0) {
      setIsExpanded(!isExpanded);
    }
    onNodeClick(node);
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className="flex flex-col items-center cursor-pointer mb-2"
        onClick={handleClick}
      >
        {level > 0 && <div className="w-px h-8 bg-gray-400"></div>}
        <div className="bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded text-center">
          {node.title}
          {node.children.length > 0 && (
            <span className="ml-2">{isExpanded ? '−' : '+'}</span>
          )}
        </div>
      </div>
      {isExpanded && node.children.length > 0 && (
        <div className="flex justify-center">
          {node.children.map((child, index) => (
            <div key={child.id} className="flex flex-col items-center mx-2">
              <TreeNode node={child} onNodeClick={onNodeClick} level={level + 1} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const InteractiveScheme = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeClick = (node) => {
    console.log('Node clicked:', node);
    setSelectedNode(node);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Interactive Scheme (Centered Top-Down Tree)</h1>
      <div className="flex flex-col items-center">
        <div className="mb-8">
          <TreeNode node={schemeData} onNodeClick={handleNodeClick} />
        </div>
        {selectedNode && (
          <div className="p-4 border rounded bg-gray-100 max-w-md w-full">
            <h2 className="text-xl font-semibold">Selected: {selectedNode.title}</h2>
            <p>ID: {selectedNode.id}</p>
            <p>Number of children: {selectedNode.children.length}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveScheme;