import React, { useState, useEffect } from 'react';
import { Database, CheckCircle2, ChevronDown, ChevronUp, Server, HardDrive } from 'lucide-react';
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
        className="bg-[#FAF7F2]/95 backdrop-blur-md border border-[rgba(15,15,14,0.14)] rounded-full shadow-lg px-3.5 py-1.5 flex items-center gap-2.5 text-xs text-[#0F0F0E] transition-all hover:border-[#B8913A] cursor-pointer"
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
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </>
          )}
        </span>

        <span className="font-mono tracking-tight text-[11px] font-medium">
          {isMongoLive ? 'MongoDB Live' : 'Demo Mode: Local Store'}
        </span>

        <span className="text-[#8A8A75] text-[10px] hidden sm:inline">| MERN Stack</span>
        {isOpen ? <ChevronDown size={14} className="text-[#6B6B5A]" /> : <ChevronUp size={14} className="text-[#6B6B5A]" />}
      </div>

      {/* Expanded System Info Card */}
      {isOpen && (
        <div className="absolute bottom-11 left-0 w-80 sm:w-96 bg-[#FAF7F2] border border-[rgba(15,15,14,0.14)] rounded-xl shadow-2xl p-4 text-xs text-[#0F0F0E] space-y-3 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between border-b border-[rgba(15,15,14,0.08)] pb-2.5">
            <div>
              <p className="font-serif font-semibold text-sm text-[#0F0F0E] tracking-wide">MERN Architecture Status</p>
              <p className="text-[11px] text-[#6B6B5A]">Node.js · Express · React · MongoDB</p>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${isMongoLive ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'}`}>
              {isMongoLive ? 'CONNECTED' : 'IN-MEMORY DEMO'}
            </span>
          </div>

          <div className="space-y-2 text-[11px] font-mono text-[#5A5A52]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5"><Server size={12} className="text-[#B8913A]" /> Backend API:</span>
              <span className="text-[#0F0F0E] font-semibold">Express v4 (Port 5001)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5"><Database size={12} className="text-[#B8913A]" /> Database:</span>
              <span className="text-[#0F0F0E]">{dbMode}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5"><HardDrive size={12} className="text-[#B8913A]" /> Sample Properties:</span>
              <span className="text-[#0F0F0E]">7 Active Listings</span>
            </div>
          </div>

          <div className="bg-[#F0EBE1] p-3 rounded border border-[rgba(15,15,14,0.08)] text-[10.5px] leading-relaxed text-[#5A5A52]">
            {isMongoLive ? (
              <p className="text-emerald-700 flex items-center gap-1 font-medium">
                <CheckCircle2 size={12} /> Connected to MongoDB database. Live queries and submissions are persistently stored.
              </p>
            ) : (
              <p>
                <strong className="text-[#0F0F0E]">Sample Dataset Active:</strong> The demo runs seamlessly with all filter, search, and inquiry features fully operational. To connect live MongoDB, set <code className="text-[#B8913A]">MONGODB_URI</code> in <code className="text-[#0F0F0E]">server/.env</code>.
              </p>
            )}
          </div>

          <div className="flex justify-between items-center pt-1 text-[10.5px]">
            <a 
              href="/inquiries" 
              className="text-[#B8913A] hover:underline flex items-center gap-1 font-medium"
            >
              View Inquiries Database Panel &rarr;
            </a>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[#6B6B5A] hover:text-[#0F0F0E] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
