import { create } from 'zustand';
import type { Node, Edge, OnNodesChange, OnEdgesChange, OnConnect, Connection} from '@xyflow/react';
import {applyNodeChanges, applyEdgeChanges, addEdge, MarkerType } from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';
import type { NodeData } from '@/types/flow';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
interface FlowState {
  // State
  nodes: Node<NodeData>[];
  edges: Edge[];
  chatHistory: ChatMessage[];
  selectedNodeId: string | null;
  
  // Actions
  addMessage: (role: 'user' | 'assistant', content: string) => void;
  updateGraph: (nodes: Node<NodeData>[], edges: Edge[], merge?: boolean) => void;
  // React Flow handlers
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (type: string, position: { x: number; y: number }, data?: Partial<NodeData>) => void;
  deleteNode: (id: string) => void;
  duplicateNode: (id: string) => void;
  setSelectedNode: (id: string | null) => void;
}

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  chatHistory: [{ role: 'assistant', content: "Hi! I'm your AI Architect. Describe an agent, and I'll build it." }],
  selectedNodeId: null,

  addMessage: (role, content) => {
    set((state) => ({ chatHistory: [...state.chatHistory, { role, content }] }));
  },

  updateGraph: (incomingNodes, incomingEdges, merge = false ) => {
    const safeNodes = incomingNodes.map((node) => ({
        ...node,
        type: 'customNode', // Force React Flow to use your registered BaseNode
        data: {
        ...node.data,
        // Map the AI's "type" (trigger/agent) to data so BaseNode can style it
        originalType: node.type || 'action', 
        label: node.data?.label || 'Untitled',
        id: node.id
        },
        position: node.position || { x: 0, y: 0 }
    }));
    
    const safeEdges = incomingEdges.map((edge) => ({
        ...edge,
        id: edge.id || uuidv4(),
        animated: true,
        style: { stroke: '#64748b', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b' },
    }));

    if (merge) {
      const currentNodes = get().nodes;
      const offsetX = currentNodes.length > 0 ? Math.max(...currentNodes.map(n => n.position.x)) + 300 : 0;
      
      const shiftedNodes = safeNodes.map(n => ({
        ...n,
        position: { x: n.position.x + offsetX, y: n.position.y }
      }));
      
      set({ 
        nodes: [...currentNodes, ...shiftedNodes], 
        edges: [...get().edges, ...safeEdges] 
      });
    } else {
      set({ nodes: safeNodes, edges: safeEdges });
    }
  },
  onNodesChange: (changes) => {set({nodes: applyNodeChanges(changes, get().nodes) as Node<NodeData>[],});},
  onEdgesChange: (changes) => {set({edges: applyEdgeChanges(changes, get().edges),});},
  onConnect: (connection: Connection) => {set({edges: addEdge({ ...connection, animated: true, style: { stroke: '#64748b', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed } }, get().edges),});},

  // --- Custom Actions ---
  addNode: (type, position, data = {}) => {
    const nodeId = uuidv4();
    const newNode: Node<NodeData> = {
      id: nodeId,
      type: 'customNode', // Maps to our BaseNode
      position,
      data: {
        label: 'New Node',
        name: type,
        inputAnchors: [],
        inputParams: [],
        outputAnchors: [],
        ...data,
        id: nodeId,
      },
    };
    set({ nodes: [...get().nodes, newNode] });
  },

  deleteNode: (id) => {
    set({
      nodes: get().nodes.filter((n) => n.id !== id),
      edges: get().edges.filter((e) => e.source !== id && e.target !== id),
    });
  },

  duplicateNode: (id) => {
    const nodeToClone = get().nodes.find((n) => n.id === id);
    if (!nodeToClone) return;

    const newNode = {
      ...nodeToClone,
      id: uuidv4(),
      position: { 
        x: nodeToClone.position.x + 50, 
        y: nodeToClone.position.y + 50 
      },
      selected: false,
    };

    set({ nodes: [...get().nodes, newNode] });
  },

  setSelectedNode: (id) => set({ selectedNodeId: id }),
}));