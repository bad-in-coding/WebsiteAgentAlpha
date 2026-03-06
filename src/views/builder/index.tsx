import React, { useEffect, useRef, useState } from 'react';
import Canvas from './Canvas';
import Sidebar from './SideBar';
import { Bot, Send, Sparkles, LayoutTemplate, Save, Play, User, PanelRightClose, PanelRightOpen, Moon, Sun, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useFlowStore } from '@/store/flowStore';
import { cn } from '@/lib/utils';

export default function BuilderInterface() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { nodes, edges, updateGraph, addMessage, chatHistory } = useFlowStore();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [chatHistory]);

  const handleInputResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height to auto to correctly calculate the new scrollHeight
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`; // Set new height based on content, capped at 200px
    }
  };
  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    const userText = prompt;
    setPrompt("");
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    
    addMessage('user', userText);
    setIsGenerating(true);

    try {
      const res = await fetch("http://localhost:8000/api/build-agent/graph", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            user_input: userText,
            current_nodes: nodes,
            current_edges: edges
        })
      });
      
      const blueprint = await res.json();
      updateGraph(blueprint.nodes, blueprint.edges, false);
      addMessage('assistant', blueprint.reply_text || "I've updated the workflow based on your request.");
      
    } catch (e) {
      console.error("Generation failed:", e);
      addMessage('assistant', "Sorry, I encountered an error generating that workflow.");
    } finally {
      setIsGenerating(false);
    }
  };
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
      
      {/* Left Sidebar: Chat Interface */}
      <div className="w-[400px] flex flex-col border-r border-border bg-card/50 backdrop-blur-sm z-20 shadow-2xl">
        <div className="p-4 border-b border-border flex justify-between items-center sticky top-0 z-10 bg-background/80 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg border border-primary/20">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-tight">Agent Alpha</h1>
              <p className="text-[10px] text-muted-foreground">AI Architect</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)}>
               {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Badge variant="secondary" className="text-[10px] font-mono border-primary/20 text-primary">BETA</Badge>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6">
            {chatHistory.map((msg, i) => (
              <div key={i} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border shadow-sm",
                  msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                </div>
                
                <div className={cn(
                  "px-4 py-3 rounded-2xl text-sm shadow-sm max-w-[85%] leading-relaxed",
                  msg.role === 'user' 
                    ? "bg-primary text-primary-foreground rounded-tr-sm" 
                    : "bg-card border border-border text-card-foreground rounded-tl-sm"
                )}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isGenerating && (
               <div className="flex gap-3 items-center text-muted-foreground">
                 <Loader2 className="w-4 h-4 animate-spin" />
                 <span className="text-xs">Thinking...</span>
               </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border bg-background/50">
          <div className="relative flex items-end gap-2 bg-secondary/50 border border-transparent focus-within:border-ring rounded-[24px] p-2 transition-all shadow-sm">
            <Textarea
              ref={textareaRef}
              className="min-h-[44px] max-h-[150px] w-full resize-none border-none shadow-none focus-visible:ring-0 px-4 py-3 text-sm bg-transparent placeholder:text-muted-foreground"
              placeholder="Describe your agent..."
              value={prompt}
              rows={1}
              onChange={handleInputResize}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleGenerate();
                }
              }}
            />
            <Button 
              size="icon"
              className={cn("h-9 w-9 mb-1 mr-1 shrink-0 rounded-full transition-all", prompt.trim() ? "bg-primary hover:bg-primary/90" : "bg-muted text-muted-foreground")}
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
            >
              <Send className="w-4 h-4 ml-0.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Center: Canvas */}
      <div className="flex-1 relative flex flex-col bg-muted/20">
        <div className="h-14 border-b border-border bg-background/80 backdrop-blur px-6 flex items-center justify-between z-10">
           <div className="flex items-center gap-2 text-muted-foreground">
              <LayoutTemplate className="w-4 h-4" />
              <span className="text-sm font-medium">Untitled Workflow</span>
           </div>
           <Button size="sm" className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white border-0 shadow-lg shadow-emerald-500/20">
             <Play className="w-3.5 h-3.5 fill-current" /> Deploy Agent
           </Button>
        </div>
        <div className="flex-1 relative overflow-hidden">
          <Canvas />
        </div>
      </div>

      {/* Right: Manual Sidebar (Collapsible) */}
      <Sidebar />

    </div>
  );
}