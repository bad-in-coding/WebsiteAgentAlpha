import React, { createContext, useState, type ReactNode } from 'react';
import type { ReactFlowInstance, Node, Edge } from '@xyflow/react';
import type { NodeData } from '@/types/flow'; // Ensure this path is correct
 // Ensure this path is correct

// 1. Define the specific Instance type
// This tells TypeScript: "Our instance ONLY contains Nodes with NodeData"
type AppReactFlowInstance = ReactFlowInstance<Node<NodeData>, Edge>;

interface FlowContextType {
  reactFlowInstance: AppReactFlowInstance | null;
  setReactFlowInstance: (instance: AppReactFlowInstance) => void;
  deleteNode: (id: string) => void;
  duplicateNode: (id: string) => void;
}

export const FlowContext = createContext<FlowContextType>({
  reactFlowInstance: null,
  setReactFlowInstance: () => {},
  deleteNode: () => {},
  duplicateNode: () => {},
});

export const FlowContextProvider = ({ children }: { children: ReactNode }) => {
  const [reactFlowInstance, setReactFlowInstance] = useState<AppReactFlowInstance | null>(null);

  const deleteNode = (id: string) => {
    setReactFlowInstance((prev) => {
      if (!prev) return null;
      // We must cast here because setNodes signature is complex in the library
      prev.setNodes((nodes) => nodes.filter((n) => n.id !== id));
      prev.setEdges((edges) => edges.filter((e) => e.source !== id && e.target !== id));
      return prev;
    });
  };

  const duplicateNode = (id: string) => {
    console.log("Duplicate logic placeholder for:", id);
  };

  return (
    <FlowContext.Provider value={{ reactFlowInstance, setReactFlowInstance, deleteNode, duplicateNode }}>
      {children}
    </FlowContext.Provider>
  );
};