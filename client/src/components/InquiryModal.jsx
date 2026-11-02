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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-[#FAF7F2] border border-[rgba(15,15,14,0.14)] rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(15,15,14,0.08)] bg-[#F0EBE1]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-lg text-[#0F0F0E]">MIRĀS</span>
              <span className="text-[10px] tracking-widest uppercase font-mono text-[#B8913A] border-l border-[rgba(15,15,14,0.12)] pl-2">
                Private Advisory Brief
              </span>
            </div>
            {initialProperty && (
              <p className="text-xs text-[#6B6B5A] truncate mt-0.5">
                Target Asset: <span className="text-[#0F0F0E] font-medium">{initialProperty.title}</span> ({initialProperty.city})
              </p>
            )}
          </div>

          <button
            onClick={resetAndClose}
            className="p-1 rounded-md text-[#6B6B5A] hover:text-[#0F0F0E] hover:bg-[#E8E1D5] transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          
          {submittedData ? (
            /* Success confirmation */
            <div className="py-8 text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-[#B8913A]/15 border border-[#B8913A] text-[#B8913A] flex items-center justify-center mx-auto">
                <CheckCircle size={24} />
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-[#0F0F0E]">Inquiry Successfully Logged</h3>
                <p className="text-xs text-[#6B6B5A] mt-1">Ref ID: {submittedData.id || 'INQ-SAVED-LOCAL'}</p>
              </div>

              <div className="bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-lg p-3 text-left text-xs space-y-1.5 text-[#5A5A52]">
                <p><strong className="text-[#0F0F0E]">Name:</strong> {submittedData.name}</p>
                <p><strong className="text-[#0F0F0E]">Contact:</strong> {submittedData.email} {submittedData.phone ? `· ${submittedData.phone}` : ''}</p>
                <p><strong className="text-[#0F0F0E]">Region:</strong> {submittedData.cityOfInterest}</p>
                {submittedData.propertyTitle && (
                  <p><strong className="text-[#0F0F0E]">Asset:</strong> {submittedData.propertyTitle}</p>
                )}
              </div>

              <p className="text-xs text-[#5A5A52] leading-relaxed max-w-sm mx-auto">
                Your mandate has been recorded in our database ledger. An authorized advisor will review your criteria and respond within 24 business hours.
              </p>

              <div className="pt-2 flex items-center justify-center gap-3">
                <a
                  href={`https://wa.me/966501234567?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <Phone size={13} />
                  <span>Connect on WhatsApp</span>
                </a>

                <button
                  onClick={resetAndClose}
                  className="px-4 py-2 rounded bg-[#F0EBE1] hover:bg-[#E8E1D5] text-[#0F0F0E] text-xs font-medium transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Submission Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded flex items-center gap-2">
                  <AlertCircle size={14} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase font-mono text-[#6B6B5A] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Tariq Al-Ghamdi"
                    className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-md px-3 py-2 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-mono text-[#6B6B5A] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.sa"
                    className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-md px-3 py-2 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 2: Phone and City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase font-mono text-[#6B6B5A] mb-1">
                    Phone / Mobile (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+966 50 000 0000"
                    className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-md px-3 py-2 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-mono text-[#6B6B5A] mb-1">
                    Target Region
                  </label>
                  <select
                    value={formData.cityOfInterest}
                    onChange={(e) => setFormData({ ...formData, cityOfInterest: e.target.value })}
                    className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-md px-3 py-2 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none"
                  >
                    <option value="Riyadh">Riyadh Metropolitan</option>
                    <option value="Jeddah">Jeddah Waterfront</option>
                    <option value="Al Khobar">Al Khobar & Eastern Prov.</option>
                    <option value="Multi-city">Multiple Markets</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Inquiry Type and Capital Bracket */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase font-mono text-[#6B6B5A] mb-1">
                    Acquisition Focus
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-md px-3 py-2 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none"
                  >
                    <option value="Private Acquisition">Private Residential Acquisition</option>
                    <option value="Commercial Investment">Commercial / Office Floorplate</option>
                    <option value="Developer Channel">Developer Channel Partner</option>
                    <option value="General Consultation">Fiduciary Portfolio Review</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-mono text-[#6B6B5A] mb-1">
                    Capital Allocation Target
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-md px-3 py-2 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none"
                  >
                    <option value="Under SAR 2M">Under SAR 2,000,000</option>
                    <option value="SAR 2M - 4M">SAR 2,000,000 – 4,000,000</option>
                    <option value="SAR 4M - 8M">SAR 4,000,000 – 8,000,000</option>
                    <option value="SAR 8M+">Above SAR 8,000,000</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Message */}
              <div>
                <label className="block text-[11px] uppercase font-mono text-[#6B6B5A] mb-1">
                  Brief Details / Specific Requirements *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline your acquisition criteria, preferred district, or questions regarding this unit..."
                  className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-md p-2.5 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none resize-none"
                />
              </div>

              {/* Actions & WhatsApp Direct */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[rgba(15,15,14,0.08)]">
                <a
                  href={`https://wa.me/966501234567?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 font-medium"
                >
                  <Phone size={13} />
                  <span>Direct WhatsApp Concierge</span>
                </a>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="flex-1 sm:flex-none px-3 py-2 rounded bg-[#F0EBE1] hover:bg-[#E8E1D5] text-[#6B6B5A] text-xs font-medium transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none px-4 py-2 rounded bg-[#B8913A] hover:bg-[#D4A853] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
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
