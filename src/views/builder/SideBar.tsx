import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getAllDefinitions } from './nodes/nodeRegistry';
import { Mail, Bot, Calendar, Database, Zap, GripVertical, ChevronLeft, ChevronRight, Search, CheckSquare, FileText, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

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

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const definitions = getAllDefinitions();
  
  const filtered = definitions.filter(d => 
    d.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Group by Category
  const grouped = definitions.reduce((acc, def) => {
    const cat = def.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(def);
    return acc;
  }, {} as Record<string, typeof definitions>);

  const onDragStart = (event: React.DragEvent, nodeDef: any) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({
        type: 'customNode', 
        data: {
            originalType: nodeDef.name,
            label: nodeDef.label,
            category: nodeDef.category
        }
    }));
    event.dataTransfer.effectAllowed = 'move';
};

  return (
    <div 
      className={cn(
        "relative border-l bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-col transition-all duration-300 ease-in-out border-border",
        isCollapsed ? "w-[50px]" : "w-[280px]"
      )}
    >
      {/* Collapse Toggle */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute -left-3 top-6 h-6 w-6 rounded-full border bg-background shadow-md hover:bg-accent z-50"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronLeft className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
      </Button>

      {/* Header */}
      {!isCollapsed && (
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-sm mb-3">Components</h3>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search nodes..." 
              className="pl-8 h-9 bg-secondary/50 border-transparent focus:border-primary transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}
      
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-6">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className={cn(isCollapsed && "hidden")}>
              <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2 px-2">{category}</h4>
              <div className="space-y-1">
                {items.map((def) => {
                  const Icon = ICON_MAP[def.icon] || Database;
                  return (
                    <div
                      key={def.name}
                      draggable
                      onDragStart={(event) => onDragStart(event, def)}
                      className="flex items-center gap-3 p-2 rounded-lg border border-transparent hover:border-border hover:bg-accent/50 cursor-grab active:cursor-grabbing transition-all group"
                    >
                      <div className="p-1.5 bg-primary/10 rounded-md text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{def.label}</div>
                        <div className="text-[10px] text-muted-foreground truncate">{def.description}</div>
                      </div>
                      <GripVertical className="w-4 h-4 text-muted-foreground/30 group-hover:text-muted-foreground" />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}