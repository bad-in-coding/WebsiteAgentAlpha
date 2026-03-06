export type InputType = 
  | 'string' 
  | 'number' 
  | 'boolean' 
  | 'options' 
  | 'multiOptions' 
  | 'credential'
  | 'json';

export interface NodeOption {
  label: string;
  name: string;
  description?: string;
}

export interface NodeInput {
  label: string;
  name: string;
  type: InputType;
  default?: any;
  description?: string;
  placeholder?: string;
  options?: NodeOption[]; // For dropdowns
  optional?: boolean;
  additionalParams?: boolean; // If true, hidden by default until "Show More" is clicked
  show?: Record<string, any>; // Conditional rendering logic (e.g., show if gmailType === 'drafts')
}

export interface NodeDefinition {
  name: string; // Unique ID (e.g., 'chatOpenAI')
  label: string; // Display Name (e.g., 'ChatOpenAI')
  icon: any; // Lucide Icon or Image URL
  category: 'Tools' | 'Chat Models' | 'Agents' | 'Memories';
  description: string;
  inputs: NodeInput[];
  outputs: { name: string; label: string; type: string }[];
}