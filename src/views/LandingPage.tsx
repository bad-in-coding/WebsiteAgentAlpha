import React from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu, Layers, ShieldCheck,
  Sparkles, Play, Bot,
  Mail, FileText, Database,
  Cloud, Server, PieChart, Hash, Table, Users, Briefcase, Search, Phone, Globe, Plus, Book, Keyboard, Network
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const ring1 = [
  { label: "Gmail", icon: <Mail className="w-4 h-4 md:w-5 md:h-5" />, color: "text-red-500" },
  { label: "Slack", icon: <Hash className="w-4 h-4 md:w-5 md:h-5" />, color: "text-pink-500" },
  { label: "Notion", icon: <Book className="w-4 h-4 md:w-5 md:h-5" />, color: "text-foreground" },
  { label: "Excel", icon: <Table className="w-4 h-4 md:w-5 md:h-5" />, color: "text-green-500" },
  { label: "Outlook", icon: <Mail className="w-4 h-4 md:w-5 md:h-5" />, color: "text-blue-500" }
];

const ring2 = [
  { label: "Salesforce", icon: <Cloud className="w-4 h-4 md:w-5 md:h-5" />, color: "text-blue-400" },
  { label: "SAP", icon: <Database className="w-4 h-4 md:w-5 md:h-5" />, color: "text-blue-600" },
  { label: "Oracle", icon: <Database className="w-4 h-4 md:w-5 md:h-5" />, color: "text-red-600" },
  { label: "NetSuite", icon: <Network className="w-4 h-4 md:w-5 md:h-5" />, color: "text-blue-300" },
  { label: "QuickBooks", icon: <PieChart className="w-4 h-4 md:w-5 md:h-5" />, color: "text-green-600" },
  { label: "CRM", icon: <Users className="w-4 h-4 md:w-5 md:h-5" />, color: "text-orange-500" },
  { label: "A ERP", icon: <Server className="w-4 h-4 md:w-5 md:h-5" />, color: "text-slate-400" }
];

const ring3 = [
  { label: "Google Docs", icon: <FileText className="w-4 h-4 md:w-5 md:h-5" />, color: "text-blue-500" },
  { label: "WhatsApp", icon: <Phone className="w-4 h-4 md:w-5 md:h-5" />, color: "text-green-500" },
  { label: "Any website", icon: <Globe className="w-4 h-4 md:w-5 md:h-5" />, color: "text-indigo-400" },
  { label: "Vendor portal", icon: <Briefcase className="w-4 h-4 md:w-5 md:h-5" />, color: "text-orange-400" },
  { label: "Form-filling", icon: <Keyboard className="w-4 h-4 md:w-5 md:h-5" />, color: "text-slate-400" },
  { label: "Data-scraping", icon: <Search className="w-4 h-4 md:w-5 md:h-5" />, color: "text-emerald-500" },
  { label: "Data entry", icon: <Database className="w-4 h-4 md:w-5 md:h-5" />, color: "text-yellow-500" },
  { label: "+ Other", icon: <Plus className="w-4 h-4 md:w-5 md:h-5" />, color: "text-foreground" }
];

const allItems = [...ring1, ...ring2, ...ring3];

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden w-full">
      {/* Background Gradients: Light Mode (Subtle) vs Dark Mode (Deep) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[100px] -z-10" />

      {/* Hero Section */}
      <section className="pt-24 pb-32 px-6 max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-12 items-center">

        {/* Left Column Text */}
        <motion.div
          className="flex flex-col items-center text-center md:items-start md:text-left z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide mb-6 md:mb-8 shadow-[0_0_15px_rgba(59,130,246,0.2)] backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>The Next Gen Agentic Workflow Builder</span>
          </motion.div>

          {/* Title: Use text-foreground so it's black in light mode, white in dark */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]"
          >
            Architect Your <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 drop-shadow-sm mt-1">AI Workforce</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl mb-10 leading-relaxed font-medium"
          >
            AgentAlpha turns a single natural-language intent into a working, deployable agent.
            Non-technical users discover value through a video-led consultation; power users design, test, and customize agents in a visual playground.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
            <Link to="/consult" className="group relative z-10 inline-flex items-center justify-center">
              <Button className="h-14 px-8 text-base bg-foreground hover:bg-foreground/90 text-background rounded-full shadow-2xl transition-all hover:scale-105 group relative overflow-hidden">
                <span className="relative z-10 flex items-center font-bold">
                  Talk to Alpha Now
                  <Play className="w-4 h-4 ml-3 fill-current group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Column Visual / Video Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full relative max-w-lg mx-auto md:max-w-none mt-10 md:mt-0"
        >
          {/* Soft large purple blur behind */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-500/10 blur-3xl rounded-full -z-10" />

          <div className="w-full bg-card/40 backdrop-blur-xl border border-white/10 rounded-3xl p-3 shadow-2xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Glowing Ring around Avatar Placeholder */}
            <div className="w-full aspect-square bg-background/50 rounded-2xl border border-white/5 relative flex items-center justify-center overflow-hidden">
              <div className="absolute w-[60%] h-[60%] rounded-full bg-blue-500/10 animate-pulse blur-xl" />
              <div className="w-40 h-40 rounded-full border border-blue-500/20 absolute animate-[ping_3s_ease-in-out_infinite]" />
              <div className="w-32 h-32 rounded-full border-2 border-dashed border-blue-500/40 animate-[spin_10s_linear_infinite] absolute" />
              <div className="w-24 h-24 bg-card rounded-full border border-blue-500/30 flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                <Bot className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            {/* Mock Transcript Box */}
            <div className="mt-4 bg-background/80 backdrop-blur-md border border-white/5 rounded-2xl p-4 sm:p-5 relative z-10 text-left">
              <div className="flex flex-col gap-3 text-sm sm:text-base">
                <div className="text-muted-foreground"><span className="font-semibold text-foreground/80">User:</span> Pull the Q3 metrics...</div>
                <div className="text-blue-500 dark:text-blue-400 font-medium"><span className="font-bold">Alpha:</span> Right away, generating the chart now.</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Task 3: The "Personal Alpha" Memory Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5 relative z-10">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-16 items-center">

          {/* Left Column (The Timeline) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full relative"
          >
            {/* Timeline vertical line */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-500/10 via-purple-500/20 to-transparent -z-10" />

            <div className="flex flex-col gap-8">
              {/* Node 1 */}
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full bg-card border border-white/10 flex items-center justify-center shrink-0 z-10 shadow-lg group-hover:border-blue-500/30 transition-colors">
                  <div className="w-3 h-3 rounded-full bg-blue-500/50" />
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  <span className="text-[10px] sm:text-xs font-bold tracking-wider text-blue-400 uppercase border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 rounded w-fit">Learned</span>
                  <p className="text-foreground/80 md:text-lg">"Day 1: Draft emails in Hinglish."</p>
                </div>
              </div>

              {/* Node 2 */}
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full bg-card border border-white/10 flex items-center justify-center shrink-0 z-10 shadow-lg group-hover:border-purple-500/30 transition-colors">
                  <div className="w-3 h-3 rounded-full bg-purple-500/50" />
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  <span className="text-[10px] sm:text-xs font-bold tracking-wider text-emerald-400 uppercase border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 rounded w-fit">Preference Saved</span>
                  <p className="text-foreground/80 md:text-lg">"Day 5: Never execute Stripe refunds without asking."</p>
                </div>
              </div>

              {/* Node 3 (Active) */}
              <div className="flex items-start gap-6 relative">
                {/* Glow effect for active node */}
                <div className="absolute top-2 -left-6 w-32 h-32 bg-purple-500/20 blur-2xl -z-10 rounded-full pointer-events-none" />

                <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center shrink-0 z-10 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  <div className="w-4 h-4 rounded-full bg-purple-500 animate-pulse" />
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  <span className="text-[10px] sm:text-xs font-bold tracking-wider text-purple-400 uppercase border border-purple-500/20 bg-purple-500/10 px-2 py-0.5 rounded w-fit">Active</span>
                  <p className="text-foreground font-medium md:text-lg leading-relaxed">"Now: AgentAlpha handles everything exactly how you like it, natively in your regional language."</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column (Text) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h3 className="text-purple-400 font-bold tracking-widest text-sm mb-4 uppercase">Adaptive Intelligence</h3>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight tracking-tight">Evolves as you use it. <span className="text-foreground/50">Every single day.</span></h2>
            <p className="text-lg text-muted-foreground/90 leading-relaxed max-w-lg">
              AgentAlpha features a persistent <span className="text-foreground font-medium">Personal Profile</span>. It learns your tone, your risk tolerance, and your preferred languages. No repeated instructions, ever.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Task 4: The Orbital Ecosystem (Why Alpha) */}
      <section className="py-32 relative overflow-hidden flex flex-col items-center justify-center border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.blue.500/0.05)_0%,transparent_60%)] pointer-events-none" />

        <div className="text-center z-20 mb-16 md:mb-24 px-6 relative">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Connect to any of your tools.<br /><span className="text-blue-500 drop-shadow-sm">Securely.</span></h2>
        </div>

        {/* Orbital Layout - Hidden on very small mobile, visible on sm and up */}
        <div className="hidden sm:flex relative w-full h-[600px] md:h-[800px] items-center justify-center overflow-hidden">
          <div className="relative w-full h-full max-w-[800px] flex items-center justify-center scale-[0.6] min-[800px]:scale-75 lg:scale-90 xl:scale-100">
            {/* Center glowing sphere / Logo */}
            <div className="w-24 h-24 md:w-32 md:h-32 bg-card rounded-full border border-white/10 z-20 flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.3)] relative">
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl -z-10 animate-pulse" />
              <img src="logo.png" alt="AgentAlpha" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
            </div>

            <OrbitRing items={ring1} radius={180} duration={40} />
            <OrbitRing items={ring2} radius={290} duration={55} reverse />
            <OrbitRing items={ring3} radius={400} duration={70} />
          </div>
        </div>

        {/* Mobile Fallback Flex Grid */}
        <div className="sm:hidden flex flex-wrap justify-center gap-3 px-4 max-w-full mx-auto z-10 relative">
          {allItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-full bg-card/80 backdrop-blur-md border border-white/10 px-3 py-1.5 shadow-sm text-sm font-medium">
              <div className={item.color}>{item.icon}</div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-foreground mb-16 text-center tracking-tight"
        >
          Why AgentAlpha?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Layers className="w-7 h-7 text-blue-400" />}
            title="Prompt-to-Agent"
            desc="Type a single prompt — we auto-generate the workflow, connectors, and prompts so you don’t have to. Experience true 10x leverage."
            delay={0}
          />
          <FeatureCard
            icon={<Cpu className="w-7 h-7 text-indigo-400" />}
            title="Multi-Model Engine"
            desc="Mix GPT, Claude, Gemini and specialized tools within a single unified agent for best-of-breed outcomes and zero lock-in."
            delay={0.1}
          />
          <FeatureCard
            icon={<ShieldCheck className="w-7 h-7 text-emerald-400" />}
            title="Enterprise Secure"
            desc="Role-based access, encrypted credential storage, and SOC2 compliant architecture guarantees your data remains private natively."
            delay={0.2}
          />
        </div>
      </section>

      {/* Task 5: See Alpha in Action */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-center mb-16">See Alpha in action</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="group relative rounded-2xl overflow-hidden border border-border bg-card/40 backdrop-blur-xl aspect-[16/10] flex items-center justify-center shadow-lg transition-all hover:border-white/20">
            <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors duration-500" />
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="relative z-20 w-20 h-20 rounded-full bg-foreground/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl group-hover:border-white/40 group-hover:bg-foreground/20 transition-all duration-300">
              <Play className="w-8 h-8 text-foreground fill-current ml-2" />
            </motion.button>
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-background/90 via-background/60 to-transparent">
              <h3 className="text-2xl font-bold text-foreground">Voice to Execution</h3>
              <p className="text-muted-foreground mt-2 text-lg">Watch Alpha build a workflow from a voice prompt</p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="group relative rounded-2xl overflow-hidden border border-border bg-card/40 backdrop-blur-xl aspect-[16/10] flex items-center justify-center shadow-lg transition-all hover:border-white/20">
            <div className="absolute inset-0 bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors duration-500" />
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="relative z-20 w-20 h-20 rounded-full bg-foreground/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl group-hover:border-white/40 group-hover:bg-foreground/20 transition-all duration-300">
              <Play className="w-8 h-8 text-foreground fill-current ml-2" />
            </motion.button>
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-background/90 via-background/60 to-transparent">
              <h3 className="text-2xl font-bold text-foreground">The Visual Studio</h3>
              <p className="text-muted-foreground mt-2 text-lg">Deep dive into the orchestration canvas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Task 6: Testimonials Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-center mb-16">Trusted by Professionals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 6 Testimonial Cards */}
          <TestimonialCard quote="AgentAlpha completely changed how we handle customer onboarding. It essentially gave us a 10x team overnight." name="Sarah Jenkins" title="VP Operations, CloudScale" />
          <TestimonialCard quote="The natural language routing is flawless. We replaced a 4-month enterprise integration project with a 3-minute prompt." name="Michael Chen" title="CTO, FinTech Innovators" />
          <TestimonialCard quote="It remembers our complex compliance rules without us ever needing to hardcode anything. Absolute magic." name="Aisha Patel" title="Director of Risk, HealthSecure" />
          <TestimonialCard quote="The visual studio lets my business analysts tweak workflows without needing to submit Jira tickets to engineering." name="David Ross" title="Product Manager, OmniCommerce" />
          <TestimonialCard quote="We scaled our outbound sales logic globally. The native language capabilities combined with adaptive memory is unmatched." name="Elena Costa" title="Head of Growth, ScaleUp Inc" />
          <TestimonialCard quote="Connecting to our legacy ERP system took 5 minutes securely. AgentAlpha is the missing glue for our tech stack." name="James Wilson" title="Lead Architect, GlobalLogistics" />
        </div>
      </section>

      {/* Task 7: The Power User Handoff */}
      <section className="py-24 px-6 w-full bg-slate-50 dark:bg-slate-900 border-y border-border">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <span className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-4">FOR POWER USERS</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">Want more control?</h2>
          <p className="text-lg text-muted-foreground/90 leading-relaxed mb-10">
            Build custom automation flows from scratch with our visual workflow builder. Prompt once, automate forever.
          </p>
          <Link to="/builder" className="group">
            <Button variant="outline" className="h-14 px-8 text-base border-foreground/20 hover:bg-foreground hover:text-background rounded-full transition-all duration-300">
              Explore custom flows <span className="ml-2 group-hover:translate-x-1 transition-transform">-&gt;</span>
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function TestimonialCard({ quote, name, title }: { quote: string, name: string, title: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white dark:bg-card/40 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between h-full">
      <div className="mb-6">
        <div className="text-blue-500 mb-4 opacity-70">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" /></svg>
        </div>
        <p className="text-slate-700 dark:text-foreground/90 font-medium leading-relaxed">"{quote}"</p>
      </div>
      <div>
        <h4 className="font-bold text-foreground">{name}</h4>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
} function FeatureCard({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      className="p-8 rounded-[2rem] bg-card/30 backdrop-blur-xl border border-white/10 hover:border-blue-500/40 hover:bg-card/50 transition-all duration-500 shadow-xl group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="w-14 h-14 rounded-2xl bg-background/50 border border-white/5 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300 relative z-10">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-4 relative z-10">{title}</h3>
      <p className="text-muted-foreground text-base leading-relaxed relative z-10">{desc}</p>
    </motion.div>
  );
}

// --- Helper Components for Orbital Section ---

function OrbitRing({ items, radius, duration, reverse }: { items: any[], radius: number, duration: number, reverse?: boolean }) {
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-spin"
      style={{
        width: radius * 2,
        height: radius * 2,
        animationDuration: `${duration}s`,
        animationDirection: reverse ? 'reverse' : 'normal',
        animationTimingFunction: 'linear'
      }}
    >
      <div className="absolute inset-0 border border-white/5 rounded-full" />
      {items.map((item, i) => {
        const angle = (i / items.length) * 2 * Math.PI - Math.PI / 2;
        const top = `calc(50% + ${Math.sin(angle) * 50}%)`;
        const left = `calc(50% + ${Math.cos(angle) * 50}%)`;

        return (
          <div
            key={i}
            className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 pointer-events-auto hover:z-50"
            style={{ top, left }}
          >
            <div
              className="rounded-full bg-card/95 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg transition-transform hover:scale-110 px-3 py-1.5 md:px-4 md:py-2 whitespace-nowrap group animate-spin"
              style={{
                animationDuration: `${duration}s`,
                animationDirection: reverse ? 'normal' : 'reverse',
                animationTimingFunction: 'linear'
              }}
            >
              <div className={item.color}>
                {item.icon}
              </div>
              <span className="text-xs md:text-sm font-medium ml-2 md:ml-3 text-foreground/80 group-hover:text-foreground transition-colors">{item.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
