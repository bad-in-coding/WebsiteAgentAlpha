// src/components/YourNode/BaseNode.tsx
import React from 'react';
import { Handle, Position, type NodeProps, type Node, NodeToolbar } from '@xyflow/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Copy, Trash, AlertTriangle, Calendar, Mail, Database, Bot, Zap, Settings2, CheckSquare, FileText, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NodeData } from '@/types/flow';
import { useFlowStore } from '@/store/flowStore';
import { getDefinition } from './nodeRegistry';

const ICON_MAP: Record<string, any> = {
  Mail: Mail,
  Bot: Bot,
  Calendar: Calendar,
  Database: Database,
  Zap: Zap,
  Hash: Hash,           // Slack
  FileText: FileText,   // Notion
  CheckSquare: CheckSquare // Linear
};
const CATEGORY_STYLES: Record<string, { bg: string, border: string, iconBg: string, text: string }> = {
  'Tools': { 
    bg: 'bg-rose-950/30', border: 'border-rose-500/50', iconBg: 'bg-rose-500', text: 'text-rose-200' 
  },
  'Chat Models': { 
    bg: 'bg-emerald-950/30', border: 'border-emerald-500/50', iconBg: 'bg-emerald-500', text: 'text-emerald-200' 
  },
  'Agents': { 
    bg: 'bg-blue-950/30', border: 'border-blue-500/50', iconBg: 'bg-blue-500', text: 'text-blue-200' 
  },
  'default': { 
    bg: 'bg-slate-900/80', border: 'border-slate-600', iconBg: 'bg-slate-600', text: 'text-slate-200' 
  }
};

export type BaseNodeProps = NodeProps<Node<NodeData, string>>;
export type BaseNodeData = NodeData;
export const BaseNode: React.FC<BaseNodeProps> = ({ data, id, selected }) => {
  const deleteNode = useFlowStore((state) => state.deleteNode);
  const duplicateNode = useFlowStore((state) => state.duplicateNode);
  const definition = getDefinition(data.originalType || data.name || '');
  
  // ERROR HANDLING: If definition is missing, render a "Broken Node" card
  if (!definition) {
    return (
      <Card className="w-[200px] border-2 border-red-400 bg-red-50">
        <CardHeader className="p-3">
          <CardTitle className="text-xs text-red-600 font-mono">
            Unknown Type: "{data.originalType || data.name}"
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 text-[10px] text-red-500">
          The backend sent a node type that isn't in the frontend registry.
        </CardContent>
      </Card>
    );
  }
  const IconComponent = ICON_MAP[definition?.icon as string] || AlertTriangle;
  const category = definition?.category || 'default';
  const styles = CATEGORY_STYLES[category] || CATEGORY_STYLES['default'];

  const renderInput = (input: any) => {
      // Conditional Logic (e.g., show "Query" only if operation is "listMessages")
      if (input.show) {
        const [dependencyKey, dependencyValue] = Object.entries(input.show)[0];
        const currentValue = data[dependencyKey];
        
        // Handle array dependency (e.g. ["listMessages", "listThreads"])
        if (Array.isArray(dependencyValue)) {
          if (!dependencyValue.includes(currentValue)) return null;
        } else {
          if (currentValue !== dependencyValue) return null;
        }
      }

      return (
      <div key={input.name} className="space-y-1 mt-3 group">
        <div className="flex items-center justify-between">
          <Label className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">
            {input.label}
          </Label>
          <Handle type="target" position={Position.Left} id={input.name} className="!bg-slate-400 !w-1.5 !h-1.5 !border-none" />
        </div>

        {input.type === 'string' || input.type === 'number' || input.type === 'credential' ? (
           input.rows ? (
             <Textarea 
               className="min-h-[60px] text-xs bg-slate-950/50 border-slate-700 focus:border-blue-500 text-slate-200 resize-none rounded-md" 
               placeholder={input.placeholder || "..."}
               defaultValue={data[input.name] || input.default} 
             />
           ) : (
             <Input 
               className="h-7 text-xs bg-slate-950/50 border-slate-700 focus:border-blue-500 text-slate-200 rounded-md" 
               placeholder={input.placeholder || "..."}
               defaultValue={data[input.name] || input.default}
               type={input.type === 'number' ? 'number' : 'text'}
             />
           )
        ) : input.type === 'options' ? (
          <Select defaultValue={data[input.name] || input.default}>
            <SelectTrigger className="h-7 text-xs bg-slate-950/50 border-slate-700 text-slate-200"><SelectValue /></SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
              {input.options?.map((opt: any) => (
                <SelectItem key={opt.name} value={opt.name} className="text-xs focus:bg-slate-800">{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : null}
      </div>
    );
  };

  return (
    <>
      <NodeToolbar isVisible={selected} position={Position.Top} className="flex gap-1 bg-slate-800 p-1 rounded-full shadow-xl border border-slate-700 mb-4 px-2">
        <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-slate-700 rounded-full text-slate-300" onClick={() => duplicateNode(id)}><Copy className="w-3.5 h-3.5" /></Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-rose-400 hover:bg-rose-950/50 rounded-full" onClick={() => deleteNode(id)}><Trash className="w-3.5 h-3.5" /></Button>
      </NodeToolbar>

      {/* The Glow Effect Container */}
      <div className={cn(
        "relative group transition-all duration-300",
        selected ? "scale-105" : ""
      )}>
        {/* Glow behind */}
        <div className={cn(
            "absolute -inset-0.5 rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100 blur",
            selected ? "opacity-75" : "",
            styles.iconBg // Use the category color for the glow
        )}></div>

        <Card className={cn(
          "relative min-w-[300px] border rounded-2xl overflow-hidden bg-slate-900/90 backdrop-blur-xl shadow-2xl",
          selected ? `ring-1 ring-white/20 ${styles.border}` : "border-slate-800"
        )}>
          
          <div className="flex h-full">
            {/* Left Colored Strip with Icon */}
            <div className={cn("w-12 flex flex-col items-center py-4 border-r border-white/5", styles.bg)}>
                <div className={cn("p-2 rounded-xl shadow-inner mb-2", styles.iconBg, "text-white")}>
                    <IconComponent className="w-5 h-5" />
                </div>
                {/* Vertical Text */}
                <div className="flex-1 w-full flex items-center justify-center">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/40 -rotate-90 whitespace-nowrap">
                        {definition?.category}
                    </span>
                </div>
            </div>

            {/* Right Content Area */}
            <div className="flex-1 p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-sm font-bold text-slate-100">{definition?.label || data.label}</h3>
                        <p className="text-[10px] text-slate-400 leading-tight line-clamp-2 mt-0.5">{definition?.description}</p>
                    </div>
                    <Settings2 className="w-3.5 h-3.5 text-slate-600" />
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent my-3" />

                {/* Inputs */}
                <div className="space-y-1">
                    {definition?.inputs.map((input) => renderInput(input))}
                </div>

                {/* Outputs Handles */}
                {definition?.outputs?.map((output) => (
                    <div key={output.name} className="flex justify-end mt-4">
                    <div className="relative flex items-center">
                        <span className="text-[9px] uppercase text-slate-500 font-bold tracking-wider mr-2">{output.label}</span>
                        <Handle 
                            type="source" 
                            position={Position.Right} 
                            id={output.name} 
                            className={cn("!w-3 !h-3 !border-2 !border-slate-900", styles.iconBg)} 
                        />
                    </div>
                    </div>
                ))}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default BaseNode;
