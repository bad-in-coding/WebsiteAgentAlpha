import type { Node } from '@xyflow/react';

export interface FlowiseInputAnchor {
  label: string;
  name: string;
  type: string;
  list?: boolean;
}

export interface FlowiseInputParam {
  label: string;
  name: string;
  type: string;
  default?: string | number | boolean;
  optional?: boolean;
  hidden?: boolean;
  additionalParams?: boolean;
}

export interface FlowiseOutputAnchor {
  id: string;
  name: string;
  label: string;
  type: string;
}

export interface NodeData extends Record<string, unknown> {
  id: string;
  label: string;
  name: string;
  version?: number;
  description?: string;
  inputAnchors: FlowiseInputAnchor[];
  inputParams: FlowiseInputParam[];
  outputAnchors: FlowiseOutputAnchor[];
  selected?: boolean;
  originalType?: string;
}

export type CanvasNode = Node<NodeData>;