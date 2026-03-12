import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe } from 'lucide-react';

export function PersonalAlphaSection() {
  const [riskTolerance, setRiskTolerance] = useState(50);
  const [defaultTone, setDefaultTone] = useState(50);
  const [nativeLanguage, setNativeLanguage] = useState('Auto-Detect');

  const languages = ['Auto-Detect', 'Hindi', 'English', 'Tamil', 'Telugu', 'Bengali'];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-foreground mb-6"
        >
          Your <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Personal Alpha</span> Profile
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-muted-foreground max-w-3xl mx-auto"
        >
          Customize your AI assistant's behavior with your personal preferences
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          <h3 className="text-2xl font-bold text-foreground mb-6">Alpha Profile Settings</h3>

          <div className="space-y-8">
            {/* Risk Tolerance */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-400" />
                  Risk Tolerance
                </h4>
                <span className="text-sm text-muted-foreground">
                  {riskTolerance < 30 ? 'Strict Approval' : riskTolerance > 70 ? 'Full Autonomy' : 'Balanced'}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={riskTolerance}
                  onChange={(e) => setRiskTolerance(parseInt(e.target.value))}
                  className="w-full h-2 bg-card/50 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <span className="text-sm text-muted-foreground w-12">{riskTolerance}%</span>
              </div>
            </div>

            {/* Default Tone */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-400" />
                  Default Tone
                </h4>
                <span className="text-sm text-muted-foreground">
                  {defaultTone < 30 ? 'Professional' : defaultTone > 70 ? 'Casual' : 'Balanced'}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={defaultTone}
                  onChange={(e) => setDefaultTone(parseInt(e.target.value))}
                  className="w-full h-2 bg-card/50 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <span className="text-sm text-muted-foreground w-12">{defaultTone}%</span>
              </div>
            </div>

            {/* Native Language */}
            <div>
              <h4 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                <Globe className="w-5 h-5 text-green-400" />
                Native Language
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setNativeLanguage(lang)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      nativeLanguage === lang
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 text-white'
                        : 'bg-card/50 border border-white/10 text-muted-foreground hover:bg-card/70'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Visualization */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <h4 className="font-semibold text-foreground mb-4">Profile Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Risk Tolerance:</span>
                <span className="text-white font-medium">{riskTolerance < 30 ? 'Strict' : riskTolerance > 70 ? 'Autonomous' : 'Balanced'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Default Tone:</span>
                <span className="text-white font-medium">{defaultTone < 30 ? 'Professional' : defaultTone > 70 ? 'Casual' : 'Balanced'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Language:</span>
                <span className="text-white font-medium">{nativeLanguage}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <h4 className="font-semibold text-foreground mb-4">Personal Alpha Benefits</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                <span>Adapts to your communication style</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                <span>Respects your risk preferences</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                <span>Supports multiple Indian languages</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                <span>Provides context-aware responses</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}