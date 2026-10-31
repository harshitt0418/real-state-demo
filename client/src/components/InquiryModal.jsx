import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Send, Phone, Mail, Building, AlertCircle, Clock } from 'lucide-react';
import { submitInquiry } from '../services/api';

export default function InquiryModal({
  isOpen,
  onClose,
  initialProperty = null
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cityOfInterest: 'Riyadh',
    inquiryType: 'Private Acquisition',
    budgetRange: 'SAR 2M - 4M',
    timeframe: 'Immediate (1-3 months)',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Pre-fill message if a specific property was passed
  useEffect(() => {
    if (initialProperty) {
      setFormData(prev => ({
        ...prev,
        cityOfInterest: initialProperty.city || 'Riyadh',
        message: prev.message || `I would like to receive the investment prospectus and schedule a private advisory walkthrough for "${initialProperty.title}" (${initialProperty.district}, ${initialProperty.city}).`
      }));
    }
  }, [initialProperty]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, email address, and a brief description.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        propertyId: initialProperty ? initialProperty.id : null,
        propertyTitle: initialProperty ? initialProperty.title : null,
        channel: 'Website Form'
      };

      const result = await submitInquiry(payload);
      if (result.success) {
        setSubmittedData(result.data || payload);
      } else {
        setErrorMessage(result.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Error sending inquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSubmittedData(null);
    setErrorMessage('');
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello MIRĀS Advisory, I am inquiring regarding ${
      initialProperty ? initialProperty.title : 'real estate advisory services'
    }. My name is ${formData.name || 'a private investor'}.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-[#141920] border border-neutral-700/80 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#10141A]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A265]">Private Advisory Brief</span>
              <span className="text-neutral-500 text-xs">|</span>
              <span className="text-[10px] text-stone-400 font-mono">Fiduciary Channel</span>
            </div>
            <h2 className="font-serif text-lg font-semibold text-[#F3EFEA] mt-0.5">
              {initialProperty ? 'Inquire on Specified Unit' : 'Schedule a Confidential Consultation'}
            </h2>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          
          {submittedData ? (
            /* Success State */
            <div className="text-center py-6 space-y-5 animate-in fade-in duration-300">
              <div className="h-14 w-14 rounded-full bg-[#C5A265]/15 border border-[#C5A265] text-[#C5A265] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle size={28} />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-xl font-bold text-[#F3EFEA]">Inquiry Registered Successfully</h3>
                <p className="text-xs text-stone-400 max-w-md mx-auto leading-relaxed">
                  Your acquisition brief has been logged in the MIRĀS database. A senior property advisor will review your parameters and follow up within 24 business hours.
                </p>
              </div>

              <div className="bg-[#0F1216] border border-neutral-800 rounded-lg p-3 text-xs text-stone-300 font-mono max-w-sm mx-auto text-left space-y-1">
                <p><span className="text-stone-400">Reference:</span> {submittedData.id || `INQ-${Date.now().toString().slice(-6)}`}</p>
                <p><span className="text-stone-400">Contact:</span> {submittedData.name} ({submittedData.email})</p>
                <p><span className="text-stone-400">Target Region:</span> {submittedData.cityOfInterest}</p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/966501234567?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded text-xs transition-colors"
                >
                  <Phone size={13} />
                  <span>Direct WhatsApp Followup</span>
                </a>
                <button
                  onClick={resetAndClose}
                  className="w-full sm:w-auto px-4 py-2 rounded bg-neutral-800 hover:bg-neutral-700 text-stone-200 text-xs font-medium transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Inquiry Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Optional Property Pill */}
              {initialProperty && (
                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-[#0F1216] border border-neutral-800 text-xs">
                  <img
                    src={initialProperty.image}
                    alt={initialProperty.title}
                    className="h-10 w-14 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif font-semibold text-stone-200 truncate">{initialProperty.title}</p>
                    <p className="text-[11px] text-[#C5A265] font-mono">{initialProperty.district}, {initialProperty.city} · {initialProperty.priceLabel}</p>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="flex items-center gap-2 p-3 rounded bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs">
                  <AlertCircle size={15} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] uppercase font-mono text-stone-400 mb-1">
                    Full Name <span className="text-[#C5A265]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Faisal Al-Otaibi"
                    className="w-full bg-[#0F1216] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:border-[#C5A265] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-mono text-stone-400 mb-1">
                    Email Address <span className="text-[#C5A265]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full bg-[#0F1216] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:border-[#C5A265] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] uppercase font-mono text-stone-400 mb-1">
                    Phone / WhatsApp (with country code)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+966 50 123 4567"
                    className="w-full bg-[#0F1216] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:border-[#C5A265] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-mono text-stone-400 mb-1">
                    Region of Interest
                  </label>
                  <select
                    value={formData.cityOfInterest}
                    onChange={(e) => setFormData({ ...formData, cityOfInterest: e.target.value })}
                    className="w-full bg-[#0F1216] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:border-[#C5A265] focus:outline-none"
                  >
                    <option value="Riyadh">Riyadh Metropolitan</option>
                    <option value="Jeddah">Jeddah & Red Sea Coast</option>
                    <option value="Al Khobar">Al Khobar & Eastern Province</option>
                    <option value="Multiple">Multiple Corridors</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] uppercase font-mono text-stone-400 mb-1">
                    Inquiry Category
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full bg-[#0F1216] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:border-[#C5A265] focus:outline-none"
                  >
                    <option value="Private Acquisition">Private Residential Acquisition</option>
                    <option value="Commercial Investment">Commercial / Office Floorplate</option>
                    <option value="Family Office Allocation">Family Office Portfolio Allocation</option>
                    <option value="Developer Channel">Developer Channel Partnership</option>
                    <option value="General Consultation">General Advisory Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-mono text-stone-400 mb-1">
                    Target Capital Allocation
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full bg-[#0F1216] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:border-[#C5A265] focus:outline-none"
                  >
                    <option value="SAR 1M - 2M">SAR 1,000,000 – 2,000,000</option>
                    <option value="SAR 2M - 4M">SAR 2,000,000 – 4,000,000</option>
                    <option value="SAR 4M - 7M">SAR 4,000,000 – 7,000,000</option>
                    <option value="SAR 7M+">Above SAR 7,000,000</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-mono text-stone-400 mb-1">
                  Brief Details / Specific Requirements <span className="text-[#C5A265]">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline your acquisition criteria, desired completion timeline, or target yield objectives..."
                  className="w-full bg-[#0F1216] border border-neutral-800 rounded-lg p-3 text-xs text-stone-200 focus:border-[#C5A265] focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <p className="text-[10px] text-stone-400 flex items-center gap-1 font-mono">
                  <Clock size={11} className="text-[#C5A265]" /> Response within 24h
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="px-3 py-2 rounded text-stone-400 hover:text-white text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#C5A265] hover:bg-[#B28F52] disabled:opacity-50 text-[#0F1216] font-semibold px-4 py-2 rounded text-xs tracking-wider uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Submit Brief</span>
                        <Send size={12} />
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
