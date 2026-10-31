import React, { useState, useEffect } from 'react';
import { 
  fetchInquiries, 
  fetchStats 
} from '../services/api';
import { 
  Database, 
  Mail, 
  Phone, 
  Clock, 
  Filter, 
  RotateCcw, 
  CheckCircle, 
  Building, 
  MapPin, 
  User, 
  ShieldCheck,
  Server,
  Layers
} from 'lucide-react';

export default function InquiriesDashboardPage() {
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [inqRes, statsRes] = await Promise.all([
        fetchInquiries({ status: statusFilter, city: cityFilter }),
        fetchStats()
      ]);
      setInquiries(inqRes.data || []);
      setStats(statsRes);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter, cityFilter]);

  const handleStatusChange = async (inquiryId, newStatus) => {
    setUpdatingId(inquiryId);
    try {
      const API_BASE = import.meta.env.VITE_API_URL || '/api';
      const res = await fetch(`${API_BASE}/inquiries/${inquiryId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        // update locally
        setInquiries(prev => prev.map(inq => 
          (inq.id === inquiryId || inq._id === inquiryId) 
            ? { ...inq, status: newStatus } 
            : inq
        ));
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-950 text-blue-300 border-blue-800';
      case 'Under Review':
        return 'bg-amber-950 text-amber-300 border-amber-800';
      case 'Advisory Scheduled':
        return 'bg-purple-950 text-purple-300 border-purple-800';
      case 'In Progress':
        return 'bg-cyan-950 text-cyan-300 border-cyan-800';
      case 'Completed':
        return 'bg-emerald-950 text-emerald-300 border-emerald-800';
      default:
        return 'bg-neutral-800 text-stone-300 border-neutral-700';
    }
  };

  const isMongoLive = stats?.system?.database?.connected;

  return (
    <div className="pt-28 pb-24 space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header & Stack Status */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-800 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#C5A265] uppercase tracking-widest">
            <Database size={14} />
            <span>MERN Backend Administration</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F3EFEA]">
            Inquiries & Advisory Pipeline
          </h1>
          <p className="text-stone-400 text-xs sm:text-sm max-w-2xl">
            Live record of client consultations, residential briefs, and developer applications stored in the backend database.
          </p>
        </div>

        {/* Database Status Chip */}
        <div className="bg-[#151A21] border border-neutral-800 rounded-xl p-3.5 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              {isMongoLive ? (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </>
              ) : (
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
              )}
            </span>
            <span className="text-xs font-mono font-medium text-stone-200">
              {isMongoLive ? 'MongoDB Connected' : 'In-Memory Store (Demo Mode)'}
            </span>
          </div>

          <button
            onClick={loadData}
            className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-stone-300 transition-colors"
            title="Refresh from database"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#141920] border border-neutral-800">
          <span className="text-[10px] font-mono text-stone-400 uppercase block mb-1">Total Inquiries</span>
          <p className="font-serif text-2xl font-bold text-[#F3EFEA]">{inquiries.length}</p>
        </div>
        <div className="p-4 rounded-xl bg-[#141920] border border-neutral-800">
          <span className="text-[10px] font-mono text-stone-400 uppercase block mb-1">Active Pipeline</span>
          <p className="font-serif text-2xl font-bold text-[#C5A265]">
            {inquiries.filter(i => i.status !== 'Completed').length}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-[#141920] border border-neutral-800">
          <span className="text-[10px] font-mono text-stone-400 uppercase block mb-1">Portfolio Units</span>
          <p className="font-serif text-2xl font-bold text-[#F3EFEA]">7 Active</p>
        </div>
        <div className="p-4 rounded-xl bg-[#141920] border border-neutral-800">
          <span className="text-[10px] font-mono text-stone-400 uppercase block mb-1">Backend Server</span>
          <p className="font-mono text-xs font-semibold text-stone-300 pt-1">Express.js :5001</p>
        </div>
      </div>

      {/* Filter Row */}
      <div className="bg-[#151A21] border border-neutral-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-stone-400 uppercase text-[10.5px] flex items-center gap-1">
            <Filter size={12} className="text-[#C5A265]" /> Filter by Status:
          </span>
          {['all', 'New', 'Under Review', 'Advisory Scheduled', 'In Progress', 'Completed'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                statusFilter === st 
                  ? 'bg-[#C5A265] text-[#0F1216] font-semibold' 
                  : 'text-stone-300 hover:bg-neutral-800'
              }`}
            >
              {st === 'all' ? 'All Statuses' : st}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-stone-400 uppercase text-[10.5px]">Region:</span>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="bg-[#0F1216] border border-neutral-800 rounded px-2.5 py-1 text-xs text-stone-200 focus:outline-none"
          >
            <option value="all">All Regions</option>
            <option value="Riyadh">Riyadh</option>
            <option value="Jeddah">Jeddah</option>
            <option value="Al Khobar">Al Khobar</option>
          </select>
        </div>
      </div>

      {/* Inquiries Table / Cards */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-28 bg-neutral-800/40 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : inquiries.length === 0 ? (
        <div className="text-center py-16 bg-[#141920] border border-neutral-800 rounded-xl space-y-3">
          <Database size={24} className="text-stone-400 mx-auto" />
          <h3 className="font-serif text-lg font-semibold text-[#F3EFEA]">No inquiries recorded</h3>
          <p className="text-xs text-stone-400">
            Submit a test inquiry through the website or contact page to see it appear here in real time.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => {
            const inqId = inq.id || inq._id;
            return (
              <div
                key={inqId}
                className="bg-[#151A21] border border-neutral-800 rounded-xl p-5 hover:border-neutral-700 transition-colors space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/80 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-[#C5A265] bg-[#0F1216] px-2 py-0.5 rounded border border-neutral-800">
                      {inqId}
                    </span>
                    <h3 className="font-serif font-bold text-base text-[#F3EFEA]">
                      {inq.name}
                    </h3>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {inq.inquiryType || 'General Advisory'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-[10.5px] font-mono border ${getStatusBadge(inq.status)}`}>
                      {inq.status || 'New'}
                    </span>

                    {/* Change Status Dropdown */}
                    <select
                      value={inq.status || 'New'}
                      disabled={updatingId === inqId}
                      onChange={(e) => handleStatusChange(inqId, e.target.value)}
                      className="bg-[#0F1216] border border-neutral-800 rounded px-2 py-0.5 text-[11px] text-stone-300 focus:outline-none"
                    >
                      <option value="New">New</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Advisory Scheduled">Advisory Scheduled</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-stone-300">
                  <div className="space-y-1">
                    <p className="flex items-center gap-1.5 text-stone-400">
                      <Mail size={12} className="text-[#C5A265]" />
                      <a href={`mailto:${inq.email}`} className="text-stone-300 hover:underline">{inq.email}</a>
                    </p>
                    {inq.phone && (
                      <p className="flex items-center gap-1.5 text-stone-400">
                        <Phone size={12} className="text-[#C5A265]" />
                        <span>{inq.phone}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="flex items-center gap-1.5 text-stone-400">
                      <MapPin size={12} className="text-[#C5A265]" />
                      <span>Target: <strong className="text-stone-200">{inq.cityOfInterest}</strong></span>
                    </p>
                    {inq.budgetRange && (
                      <p className="text-stone-400 text-[11px] font-mono">
                        Budget: {inq.budgetRange}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    {inq.propertyTitle && (
                      <p className="flex items-center gap-1.5 text-stone-400 truncate">
                        <Building size={12} className="text-[#C5A265]" />
                        <span className="truncate">Unit: <strong className="text-stone-200">{inq.propertyTitle}</strong></span>
                      </p>
                    )}
                    <p className="text-[11px] text-stone-400 font-mono flex items-center gap-1">
                      <Clock size={11} />
                      {new Date(inq.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="bg-[#0F1216] p-3 rounded-lg border border-neutral-800 text-xs text-stone-300 leading-relaxed font-sans">
                  <span className="text-[10px] font-mono uppercase text-stone-400 block mb-1">Brief Content:</span>
                  <p className="whitespace-pre-line">{inq.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
