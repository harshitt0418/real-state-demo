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
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Under Review':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Advisory Scheduled':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'In Progress':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  const isMongoLive = stats?.system?.database?.connected;

  return (
    <div className="pt-28 pb-24 space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header & Stack Status */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[rgba(15,15,14,0.08)] pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#B8913A] uppercase tracking-widest">
            <Database size={14} />
            <span>MERN Stack Persistence</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F0F0E]">
            Client Inquiries & CRM Ledger
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A52] max-w-2xl leading-relaxed">
            Live database records logged through website briefs, inquiry modals, and developer channel registrations. Data is preserved in MongoDB Atlas with resilient in-memory fallback.
          </p>
        </div>

        {/* System telemetry chip */}
        <div className="bg-[#FAF7F2] border border-[rgba(15,15,14,0.12)] p-4 rounded-xl flex items-center gap-4 text-xs shadow-sm">
          <div className="flex items-center gap-2">
            <div className={`h-2.5 w-2.5 rounded-full ${isMongoLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <div>
              <p className="font-mono font-semibold text-[#0F0F0E]">
                {isMongoLive ? 'MongoDB Atlas Live' : 'In-Memory Mock Store'}
              </p>
              <p className="text-[10px] text-[#6B6B5A] font-mono">
                {stats?.totalInquiries || inquiries.length} Active Records
              </p>
            </div>
          </div>

          <button
            onClick={loadData}
            className="p-2 rounded bg-[#F0EBE1] hover:bg-[#E8E1D5] text-[#0F0F0E] transition-colors cursor-pointer"
            title="Refresh database records"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#FAF7F2] p-4 rounded-xl border border-[rgba(15,15,14,0.10)] text-xs shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-[#6B6B5A] font-mono text-[11px] uppercase">
            <Filter size={12} className="text-[#B8913A]" />
            Status:
          </div>
          {['all', 'New', 'Under Review', 'Advisory Scheduled', 'Completed'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#B8913A] text-[#FAF7F2] font-semibold'
                  : 'text-[#5A5A52] hover:bg-[#F0EBE1]'
              }`}
            >
              {st === 'all' ? 'All Statuses' : st}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#6B6B5A]">Region:</span>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded px-2.5 py-1 text-xs text-[#0F0F0E] focus:outline-none"
          >
            <option value="all">All Corridors</option>
            <option value="Riyadh">Riyadh</option>
            <option value="Jeddah">Jeddah</option>
            <option value="Mecca">Mecca</option>
            <option value="Medina">Medina</option>
            <option value="Dubai">Dubai</option>
          </select>
        </div>
      </div>

      {/* Records Table / Cards */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 rounded-xl bg-[#F0EBE1] animate-pulse border border-[rgba(15,15,14,0.06)]" />
          ))}
        </div>
      ) : inquiries.length === 0 ? (
        <div className="text-center py-20 bg-[#FAF7F2] border border-[rgba(15,15,14,0.10)] rounded-xl space-y-3">
          <p className="font-serif text-lg text-[#0F0F0E]">No inquiries matching current filter</p>
          <p className="text-xs text-[#6B6B5A]">Try selecting 'All Statuses' or submitting a brief through any property page.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => {
            const id = inq.id || inq._id;
            return (
              <div 
                key={id}
                className="bg-[#FAF7F2] border border-[rgba(15,15,14,0.10)] rounded-xl p-5 hover:border-[#B8913A]/40 transition-all space-y-4 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(15,15,14,0.08)] pb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#F0EBE1] border border-[rgba(184,145,58,0.3)] flex items-center justify-center text-[#B8913A] font-semibold text-xs">
                      <User size={14} />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-sm text-[#0F0F0E]">{inq.name}</h3>
                      <p className="text-[10px] font-mono text-[#6B6B5A]">{inq.inquiryType || 'General Brief'} · Ref: {id}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-[10.5px] font-mono border ${getStatusBadge(inq.status)}`}>
                      {inq.status || 'New'}
                    </span>

                    {/* Status updater */}
                    <select
                      value={inq.status || 'New'}
                      onChange={(e) => handleStatusChange(id, e.target.value)}
                      disabled={updatingId === id}
                      className="bg-[#F0EBE1] border border-[rgba(15,15,14,0.10)] text-[11px] rounded px-2 py-0.5 text-[#0F0F0E] focus:outline-none cursor-pointer"
                    >
                      <option value="New">Mark New</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Advisory Scheduled">Advisory Scheduled</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                {/* Three Core Columns: Name, Mobile, Looking for */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#5A5A52] bg-[#F0EBE1]/60 p-3 rounded-lg border border-[rgba(15,15,14,0.06)]">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#8A8578] block">Column 1: Name</span>
                    <strong className="text-[#0F0F0E] text-xs font-semibold">{inq.name}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#8A8578] block">Column 2: Mobile</span>
                    <span className="font-mono text-xs text-[#0F0F0E] flex items-center gap-1.5 mt-0.5">
                      <Phone size={12} className="text-[#B8913A]" />
                      {inq.mobile || inq.phone || '—'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#8A8578] block">Market / Date</span>
                    <span className="text-[11px] text-[#6B6B5A]">
                      {inq.cityOfInterest || 'Riyadh'} · {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>
                </div>

                {/* Property context if any */}
                {inq.propertyTitle && (
                  <div className="p-2.5 rounded bg-[#F0EBE1] border border-[rgba(15,15,14,0.06)] text-xs flex items-center gap-2 text-[#0F0F0E]">
                    <Building size={13} className="text-[#B8913A]" />
                    <span>Target Property: <strong>{inq.propertyTitle}</strong></span>
                  </div>
                )}

                {/* Column 3: Looking for */}
                <div className="p-3 bg-[#F0EBE1] rounded-lg border border-[rgba(15,15,14,0.06)] text-xs text-[#3A3A35] leading-relaxed">
                  <span className="text-[10px] font-mono uppercase text-[#B8913A] font-semibold block mb-1">Column 3: Looking for</span>
                  <p className="whitespace-pre-wrap">{inq.lookingFor || inq.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
