import React, { useState } from 'react';
import data from "./data/data.json";

const schemeData = data;

const TreeNode = ({ node, onNodeClick, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(level < 2);

  const handleClick = (e) => {
    e.stopPropagation();

    if (node.children && node.children.length > 0) {
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
          {node.children && node.children.length > 0 && (
            <span className="ml-2">{isExpanded ? '−' : '+'}</span>
          )}
        </div>
      </div>
      {isExpanded && node.children && node.children.length > 0 && (
        <div className="flex justify-center">
          {node.children.map((child) => (
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
  const [name, setName] = useState(null);//selectedNode.inputParametrs[0].name || "";
  const [type, setType] = useState(null);//selectedNode.inputParametrs[0].type || "";
  const [description, setDescription]  = useState(null);//selectedNode.inputParametrs[0].description || "";

  const handleNodeClick = (node) => {
    console.log('Node clicked:', node);
    setSelectedNode(node);
    setName(node.inputParametrs[0].name);
    setType(node.inputParametrs[0].type);
    setDescription(node.inputParametrs[0].description);
  };
  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Interactive Scheme (Centered Top-Down Tree)</h1>
      <div className="flex flex-col items-center">
        <div className="mb-8">
          <TreeNode node={schemeData[0]} onNodeClick={handleNodeClick} />
        </div>
        {selectedNode && (
         
          <div className="p-4 border rounded bg-gray-100 max-w-md w-full">
            <h2 className="text-xl font-semibold">Selected: {selectedNode.title}</h2>
            <p>ID: {selectedNode.id}</p>
            <p>Number of children: {selectedNode.children ? selectedNode.children.length : 0}</p>
            <p>Input Parametrs:</p>
            <table>
              <thead>
                <th>Название параметра</th>
                <th>Тип</th>
                <th>Описание</th>
                </thead>
                <tbody>
                  <tr>
                    <td>{name}</td>
                    <td>{type}</td>
                    <td>{description}</td>
                  </tr>
                </tbody>
            </table>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveScheme;
