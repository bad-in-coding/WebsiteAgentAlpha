import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const LiveIntelligenceFeed = () => {
  const [insights, setInsights] = useState<string[]>([]);
  const [currentInsight, setCurrentInsight] = useState<string | null>(null);

  // Simulate insights appearing
  useEffect(() => {
    const insightsList = [
      "Detected: Manual Invoicing Pain Point",
      "Drafting: Salesforce Sync Node",
      "Identified: Data Validation Gap",
      "Recommendation: Add Slack Integration",
      "Detected: Email Automation Opportunity",
      "Optimization: Reduce API Calls",
      "Risk: Compliance Check Required",
      "Suggestion: Add Voice Confirmation"
    ];

    const interval = setInterval(() => {
      const randomInsight = insightsList[Math.floor(Math.random() * insightsList.length)];
      setInsights(prev => [randomInsight, ...prev].slice(0, 8));
      setCurrentInsight(randomInsight);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      {/* Live Transcript */}
      <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
        <h3 className="text-lg font-semibold text-foreground mb-3">Live Transcript</h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></div>
            <p className="text-muted-foreground">"I need to automate our invoice processing workflow. It's taking too long and causing delays."</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 mr-3 flex-shrink-0"></div>
            <p className="text-muted-foreground">"That's a common challenge. We can create a workflow that pulls data from your CRM and auto-generates invoices."</p>
          </div>
        </div>
      </div>

      {/* Real-time Insight Extractor Panel */}
      <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
        <h3 className="text-lg font-semibold text-foreground mb-3">Real-time Insights</h3>
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-2"
            >
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 text-blue-300"
              >
                {insight}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Current Insight Highlight */}
      {currentInsight && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-4 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
            <span className="text-blue-300 font-medium">Current Insight:</span>
            <span className="text-white">{currentInsight}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LiveIntelligenceFeed;