// src/components/YourNode/nodeTypes.tsx
import React from 'react';
import { Zap, Bot, Hammer, Split, type LucideIcon } from 'lucide-react';
import type { NodeTypes, NodeProps } from '@xyflow/react';
import BaseNode, { type BaseNodeData } from './BaseNode';

/**
 * createNode(icon, color)
 * Returns a React component that injects icon + color into the node's data
 *
 * We intentionally use NodeProps<any> for the wrapper component's typing to avoid
 * brittle generic mismatches between different `@xyflow/react` versions.
 */
const createNode = (Icon: LucideIcon, color: string) => {
  const WrappedNode: React.FC<NodeProps<any>> = (props) => {
    // Merge incoming data with icon + color. Cast to BaseNodeData for BaseNode.
    const mergedData: BaseNodeData = {
      ...(props.data as BaseNodeData),
      icon: Icon,
      color,
    };

    // Forward all original props but replace data with mergedData
    return React.createElement(BaseNode, { ...(props as any), data: mergedData });
  };

  // Optional: give a helpful displayName for debugging in React DevTools
  WrappedNode.displayName = `Node(${Icon?.name ?? 'Icon'}:${color})`;

  return WrappedNode;
};

// Export nodeTypes in the shape expected by the canvas/ReactFlow wrapper
export const nodeTypes: NodeTypes = {
  trigger: createNode(Zap, 'purple') as any,
  agent: createNode(Bot, 'emerald') as any,
  action: createNode(Hammer, 'blue') as any,
  condition: createNode(Split, 'orange') as any,
};
