import React, { useState, useEffect } from 'react';
import { Database, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Server, HardDrive } from 'lucide-react';
import { fetchStats } from '../services/api';

export default function DatabaseStatusIndicator() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function checkStatus() {
      try {
        const res = await fetchStats();
        if (isMounted) {
          setStatus(res);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) setLoading(false);
      }
    }
    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const isMongoLive = status?.system?.database?.connected;
  const dbMode = status?.system?.database?.mode || 'Sample Dataset Active';

  return (
    <aside aria-label="System status" className="fixed bottom-4 left-4 z-50">
      <div 
        className="bg-[#151A21]/95 backdrop-blur-md border border-neutral-700/60 rounded-full shadow-2xl px-3.5 py-1.5 flex items-center gap-2.5 text-xs text-stone-300 transition-all hover:border-[#C5A265]/60 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        title="Click to view MERN architecture & database status"
      >
        <span className="relative flex h-2 w-2">
          {isMongoLive ? (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </>
          ) : (
            <>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
            </>
          )}
        </span>

        <span className="font-mono tracking-tight text-[11px]">
          {isMongoLive ? 'MongoDB Live' : 'Demo Mode: Local Store'}
        </span>

        <span className="text-stone-500 text-[10px] hidden sm:inline">| MERN Stack</span>
        {isOpen ? <ChevronDown size={14} className="text-stone-400" /> : <ChevronUp size={14} className="text-stone-400" />}
      </div>

      {/* Expanded System Info Card */}
      {isOpen && (
        <div className="absolute bottom-11 left-0 w-80 sm:w-96 bg-[#161B22] border border-neutral-700/80 rounded-xl shadow-2xl p-4 text-xs text-stone-300 space-y-3 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between border-b border-neutral-800 pb-2.5">
            <div>
              <p className="font-serif font-semibold text-sm text-[#F3EFEA] tracking-wide">MERN Architecture Status</p>
              <p className="text-[11px] text-stone-400">Node.js · Express · React · MongoDB</p>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${isMongoLive ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'}`}>
              {isMongoLive ? 'CONNECTED' : 'IN-MEMORY DEMO'}
            </span>
          </div>

          <div className="space-y-2 text-[11px] font-mono text-stone-400">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5"><Server size={12} className="text-[#C5A265]" /> Backend API:</span>
              <span className="text-stone-200 font-semibold">Express v4 (Port 5001)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5"><Database size={12} className="text-[#C5A265]" /> Database:</span>
              <span className="text-stone-200">{dbMode}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5"><HardDrive size={12} className="text-[#C5A265]" /> Sample Properties:</span>
              <span className="text-stone-200">7 Active Listings</span>
            </div>
          </div>

          <div className="bg-[#0F1216] p-2.5 rounded border border-neutral-800 text-[10.5px] leading-relaxed text-stone-400">
            {isMongoLive ? (
              <p className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 size={12} /> Connected to MongoDB database. Live queries and submissions are persistently stored.
              </p>
            ) : (
              <p>
                <strong className="text-amber-300">Sample Dataset Active:</strong> The demo runs seamlessly with all filter, search, and inquiry features fully operational. To connect live MongoDB, set <code className="text-[#C5A265]">MONGODB_URI</code> in <code className="text-stone-200">server/.env</code> and restart.
              </p>
            )}
          </div>

          <div className="flex justify-between items-center pt-1 text-[10.5px]">
            <a 
              href="/inquiries" 
              className="text-[#C5A265] hover:underline flex items-center gap-1 font-medium"
            >
              View Inquiries Database Panel &rarr;
            </a>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-stone-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
