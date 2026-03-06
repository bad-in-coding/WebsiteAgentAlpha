// src/views/builder/Canvas.tsx
import React, { useRef, useCallback } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap, 
  ReactFlowProvider, 
  useReactFlow,
  type NodeTypes, 
  type NodeProps 
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useFlowStore } from '@/store/flowStore';
import { BaseNode } from './nodes/BaseNode';

const CustomNodeWrapper: React.FC<NodeProps> = (props) => {
  return <BaseNode {...props} data={props.data as any} id={props.id} selected={props.selected} />;
};

const nodeTypes: NodeTypes = {
  customNode: CustomNodeWrapper,
};

const CanvasInternal = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } = useFlowStore(); 

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      if (!reactFlowWrapper.current) return;
      const nodeTypeStr = event.dataTransfer.getData('application/reactflow');
      if (!nodeTypeStr) return;

      try {
        const droppedData = JSON.parse(nodeTypeStr);
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const position = screenToFlowPosition({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });
        addNode(droppedData.type, position, droppedData.data);
      } catch (e) {
        console.error("Error parsing dropped node data:", e);
      }
    },
    [screenToFlowPosition, addNode]
  );

  return (
    <div className="w-full h-full bg-[#020617]" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        // Dark theme defaults for connections
        connectionLineStyle={{ stroke: '#64748b', strokeWidth: 2 }}
        defaultEdgeOptions={{ 
            style: { stroke: '#475569', strokeWidth: 2 },
            animated: true, 
        }}
      >
        <Background 
            gap={24} 
            size={1.5} 
            color="#334155" // Slate 700 dots
            style={{ backgroundColor: '#020617' }} // Deep Slate background
        />
        <Controls className="bg-slate-800 border border-slate-700 shadow-xl rounded-lg fill-slate-300" />
        <MiniMap 
            className="border border-slate-700 shadow-2xl rounded-xl bg-slate-900" 
            nodeColor={() => '#1e293b'}
            maskColor="rgba(2, 6, 23, 0.7)"
        />
      </ReactFlow>
    </div>
  );
};

export default function Canvas() {
  return (
    <ReactFlowProvider>
      <CanvasInternal />
    </ReactFlowProvider>
  );
}