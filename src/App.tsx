import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  Activity, 
  AlertCircle, 
  Fingerprint, 
  Search,
  ChevronRight,
  Info,
  Zap,
  Terminal,
  Lock,
  Eye,
  Crosshair
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type RiskLevel = 'Low' | 'Medium' | 'High';

interface ThreatData {
  score: number;
  level: RiskLevel;
  type: string;
  explanations: string[];
  phrases: string[];
  actions: string[];
  timestamp: string;
  source: 'WhatsApp' | 'Gmail';
}

const MOCK_THREATS: Record<string, ThreatData> = {
  safe: {
    score: 0.04,
    level: 'Low',
    type: 'CLEAN_SESSION',
    explanations: [
      'SENDER_ID_VERIFIED: SPF/DKIM_PASS',
      'PATTERN_MATCH: NULL',
      'BEHAVIORAL_ANALYSIS: NOMINAL'
    ],
    phrases: [],
    actions: ['PROCEED', 'ARCHIVE'],
    timestamp: '2026-02-27 09:25:03',
    source: 'Gmail'
  },
  phishing: {
    score: 0.87,
    level: 'High',
    type: 'PHISHING_PROTOCOL_V4',
    explanations: [
      'DOMAIN_SPOOF: Look-alike detected (g00gle.com)',
      'TRACKING_PIXEL: 1x1 hidden element found',
      'URGENCY_INDEX: 9.2/10 (High Manipulation)'
    ],
    phrases: ['Verify account', 'Suspicious login', 'Secure now'],
    actions: ['QUARANTINE', 'REPORT_SENDER', 'BLOCK_DOMAIN'],
    timestamp: '2026-02-27 09:25:03',
    source: 'WhatsApp'
  },
  financial: {
    score: 0.64,
    level: 'Medium',
    type: 'FINANCIAL_SCAM_DETECTED',
    explanations: [
      'ROI_ANOMALY: Guaranteed 200% return',
      'PAYMENT_GATEWAY: Crypto/GiftCard request',
      'TEMPLATE_MATCH: Pig_Butchering_v2'
    ],
    phrases: ['Guaranteed return', 'DM for details', 'Limited time'],
    actions: ['BLOCK_USER', 'FLAG_CONTENT'],
    timestamp: '2026-02-27 09:25:03',
    source: 'WhatsApp'
  }
};

const TechnicalModule = ({ title, children, icon: Icon }: { title: string, children: React.ReactNode, icon?: any }) => (
  <div className="relative border border-cyber-border bg-black/40 p-4 mb-4">
    <div className="corner-accent corner-tl" />
    <div className="corner-accent corner-tr" />
    <div className="corner-accent corner-bl" />
    <div className="corner-accent corner-br" />
    
    <div className="flex items-center gap-2 mb-3 border-b border-cyber-border pb-2">
      {Icon && <Icon className="w-3 h-3 text-white/40" />}
      <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/60">{title}</h4>
    </div>
    {children}
  </div>
);

export default function App() {
  const [activeThreat, setActiveThreat] = useState<ThreatData>(MOCK_THREATS.phishing);
  const [isScanning, setIsScanning] = useState(false);

  const simulateScan = (type: keyof typeof MOCK_THREATS) => {
    setIsScanning(true);
    setTimeout(() => {
      setActiveThreat(MOCK_THREATS[type]);
      setIsScanning(false);
    }, 1500);
  };

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 'Low': return 'text-cyber-green';
      case 'Medium': return 'text-cyber-amber';
      case 'High': return 'text-cyber-red';
    }
  };

  const getGlowClass = (level: RiskLevel) => {
    switch (level) {
      case 'Low': return 'glow-green';
      case 'Medium': return 'glow-amber';
      case 'High': return 'glow-red';
    }
  };

  return (
    <div className="relative h-screen bg-cyber-black flex flex-col font-mono max-w-[400px] mx-auto border-x border-cyber-border crt-flicker overflow-hidden">
      {/* Visual Effects Overlay */}
      <div className="scanlines" />
      
      {/* Header */}
      <header className="p-4 border-b border-cyber-border bg-black z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Shield className="w-6 h-6 text-cyber-green glow-green" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyber-green rounded-full animate-ping" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-widest text-white uppercase">ViralShield</h1>
              <p className="text-[8px] text-white/30 tracking-[0.3em] uppercase">Security_Protocol_v1.0.4</p>
            </div>
          </div>
          <div className="flex gap-1">
            {['safe', 'financial', 'phishing'].map((t) => (
              <button 
                key={t}
                onClick={() => simulateScan(t as any)}
                className="w-6 h-6 flex items-center justify-center border border-cyber-border hover:bg-white/5 transition-colors text-[10px] text-white/40 hover:text-white"
              >
                {t[0].toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4 z-10 custom-scrollbar">
        
        {/* Status Bar */}
        <div className="flex items-center justify-between px-1 mb-2">
          <div className="flex items-center gap-2">
            <Activity className="w-3 h-3 text-cyber-green" />
            <span className="text-[9px] text-cyber-green uppercase tracking-widest">Live_Monitoring: ACTIVE</span>
          </div>
          <span className="text-[9px] text-white/20">{activeThreat.timestamp}</span>
        </div>

        {/* Risk Gauge Module */}
        <div className="relative border border-cyber-border bg-black/60 p-6 flex flex-col items-center overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-cyber-border overflow-hidden">
             <motion.div 
               animate={{ x: ['-100%', '100%'] }}
               transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
               className={`h-full w-1/3 ${getRiskColor(activeThreat.level).replace('text', 'bg')}`}
             />
          </div>

          <div className="relative w-40 h-40 flex items-center justify-center">
             {/* Radar Grid */}
             <div className="absolute inset-0 border border-white/5 rounded-full" />
             <div className="absolute inset-4 border border-white/5 rounded-full" />
             <div className="absolute inset-8 border border-white/5 rounded-full" />
             <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5" />
             <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/5" />
             
             {/* Scanning Sweep */}
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
               className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-cyber-green/10 rounded-full"
             />

             {/* Score Display */}
             <div className="flex flex-col items-center z-10">
               <AnimatePresence mode="wait">
                 {isScanning ? (
                   <motion.div
                     key="scanning"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="text-cyber-green text-[10px] animate-pulse"
                   >
                     ANALYZING...
                   </motion.div>
                 ) : (
                   <motion.div
                     key="score"
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="flex flex-col items-center"
                   >
                     <span className={`text-5xl font-bold tracking-tighter ${getRiskColor(activeThreat.level)} ${getGlowClass(activeThreat.level)}`}>
                       {(activeThreat.score * 100).toFixed(0)}
                     </span>
                     <span className="text-[8px] text-white/30 tracking-[0.2em] mt-1">THREAT_INDEX</span>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
          </div>

          <div className="mt-4 w-full flex items-center gap-4">
             <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${activeThreat.score * 100}%` }}
                 className={`h-full ${getRiskColor(activeThreat.level).replace('text', 'bg')}`}
               />
             </div>
             <span className={`text-[10px] font-bold ${getRiskColor(activeThreat.level)}`}>
               {activeThreat.level.toUpperCase()}
             </span>
          </div>
        </div>

        {/* Threat Identity Module */}
        <TechnicalModule title="Threat_Identity" icon={Terminal}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-bold ${getRiskColor(activeThreat.level)}`}>
              {activeThreat.type}
            </h3>
            <div className="px-2 py-0.5 border border-white/10 text-[8px] text-white/40">
              SRC: {activeThreat.source.toUpperCase()}
            </div>
          </div>
        </TechnicalModule>

        {/* Forensic Analysis Module */}
        <TechnicalModule title="Forensic_Analysis" icon={Fingerprint}>
          <div className="space-y-3">
            {activeThreat.explanations.map((exp, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-[10px] text-white/20 mt-0.5">[{i+1}]</span>
                <p className="text-[11px] text-white/70 leading-tight font-sans">{exp}</p>
              </div>
            ))}
          </div>
        </TechnicalModule>

        {/* Flagged Segments Module */}
        {activeThreat.phrases.length > 0 && (
          <TechnicalModule title="Flagged_Segments" icon={Search}>
            <div className="grid grid-cols-1 gap-2">
              {activeThreat.phrases.map((phrase, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/[0.03] border border-white/5 p-2">
                  <Eye className="w-3 h-3 text-white/20" />
                  <span className="text-[10px] text-white/50 italic">"{phrase}"</span>
                </div>
              ))}
            </div>
          </TechnicalModule>
        )}

        {/* Counter-Measures Module */}
        <TechnicalModule title="Counter_Measures" icon={Lock}>
          <div className="grid grid-cols-1 gap-2">
            {activeThreat.actions.map((action, i) => (
              <button 
                key={i}
                className="group flex items-center justify-between p-3 border border-white/5 bg-white/[0.02] hover:bg-cyber-red/10 hover:border-cyber-red/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Crosshair className="w-3 h-3 text-white/20 group-hover:text-cyber-red" />
                  <span className="text-[10px] font-bold text-white/60 group-hover:text-white tracking-widest">{action}</span>
                </div>
                <ChevronRight className="w-3 h-3 text-white/10 group-hover:text-white/40" />
              </button>
            ))}
          </div>
        </TechnicalModule>

      </main>

      {/* Footer */}
      <footer className="p-4 border-t border-cyber-border bg-black z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-cyber-green rounded-full shadow-[0_0_5px_#00ff41]" />
            <span className="text-[8px] text-white/40 tracking-widest uppercase">Engine_Status: NOMINAL</span>
          </div>
          <div className="text-[8px] text-white/20 tracking-tighter">
            PWRD_BY: HOURS_GOT_VIRAL
          </div>
        </div>
      </footer>
    </div>
  );
}
