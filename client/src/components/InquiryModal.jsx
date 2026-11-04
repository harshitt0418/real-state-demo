import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Send, Phone, AlertCircle } from 'lucide-react';
import { submitInquiry } from '../services/api';

export default function InquiryModal({
  isOpen,
  onClose,
  initialProperty = null
}) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    lookingFor: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Pre-fill lookingFor if a property was passed
  useEffect(() => {
    if (initialProperty) {
      setFormData(prev => ({
        ...prev,
        lookingFor: prev.lookingFor || `Inquiry for ${initialProperty.title} (${initialProperty.city})`
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

    if (!formData.name.trim() || !formData.mobile.trim() || !formData.lookingFor.trim()) {
      setErrorMessage('Please fill in your Name, Mobile, and what you are Looking for.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        phone: formData.mobile.trim(),
        lookingFor: formData.lookingFor.trim(),
        message: formData.lookingFor.trim(),
        email: `${formData.mobile.replace(/\D/g, '') || 'client'}@sadu-development.sa`,
        propertyId: initialProperty ? initialProperty.id : null,
        propertyTitle: initialProperty ? initialProperty.title : null,
        cityOfInterest: initialProperty ? initialProperty.city : 'Riyadh',
        channel: 'SADU Website Form'
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
    `Hello Sadu Real Estate Development, I am inquiring regarding ${formData.lookingFor || 'exclusive properties'}. My name is ${formData.name || 'a private investor'} (${formData.mobile || ''}).`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-[#FAF7F2] border border-[rgba(15,15,14,0.14)] rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(15,15,14,0.08)] bg-[#F0EBE1]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-lg text-[#0F0F0E]">SADU</span>
              <span className="text-[10px] tracking-widest uppercase font-mono text-[#B8913A] border-l border-[rgba(15,15,14,0.12)] pl-2">
                Real Estate Development
              </span>
            </div>
            {initialProperty && (
              <p className="text-xs text-[#6B6B5A] truncate mt-0.5">
                Target: <span className="text-[#0F0F0E] font-medium">{initialProperty.title}</span> ({initialProperty.city})
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
                <h3 className="font-serif text-xl font-bold text-[#0F0F0E]">Inquiry Received</h3>
                <p className="text-xs text-[#6B6B5A] mt-1">Ref ID: {submittedData.id || 'SADU-INQ-SUCCESS'}</p>
              </div>

              <div className="bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-lg p-4 text-left text-xs space-y-2 text-[#5A5A52]">
                <p><strong className="text-[#0F0F0E]">Name:</strong> {submittedData.name}</p>
                <p><strong className="text-[#0F0F0E]">Mobile:</strong> {submittedData.mobile || submittedData.phone}</p>
                <p><strong className="text-[#0F0F0E]">Looking for:</strong> {submittedData.lookingFor || submittedData.message}</p>
              </div>

              <p className="text-xs text-[#5A5A52] leading-relaxed max-w-sm mx-auto">
                Thank you. A senior advisor from Sadu Real Estate Development will contact your mobile shortly.
              </p>

              <div className="pt-2 flex items-center justify-center gap-3">
                <a
                  href={`https://wa.me/966501234567?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <Phone size={13} />
                  <span>Connect via WhatsApp</span>
                </a>

                <button
                  onClick={resetAndClose}
                  className="px-4 py-2 rounded bg-[#F0EBE1] hover:bg-[#E8E1D5] text-[#0F0F0E] text-xs font-medium transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Submission Form: Exactly 3 Columns / Fields: Name, Mobile, Looking for */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded flex items-center gap-2">
                  <AlertCircle size={14} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Field 1: Name */}
              <div>
                <label className="block text-[11px] uppercase font-mono tracking-wider text-[#6B6B5A] mb-1.5">
                  Name <span className="text-[#B8913A]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full Name"
                  className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.12)] rounded-lg px-3.5 py-2.5 text-xs text-[#0F0F0E] placeholder:text-[#8A8A75] focus:border-[#B8913A] focus:outline-none transition-colors"
                />
              </div>

              {/* Field 2: Mobile */}
              <div>
                <label className="block text-[11px] uppercase font-mono tracking-wider text-[#6B6B5A] mb-1.5">
                  Mobile <span className="text-[#B8913A]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="+966 5X XXX XXXX / +971 5X XXX XXXX"
                  className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.12)] rounded-lg px-3.5 py-2.5 text-xs text-[#0F0F0E] placeholder:text-[#8A8A75] focus:border-[#B8913A] focus:outline-none transition-colors"
                />
              </div>

              {/* Field 3: Looking for */}
              <div>
                <label className="block text-[11px] uppercase font-mono tracking-wider text-[#6B6B5A] mb-1.5">
                  Looking for <span className="text-[#B8913A]">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.lookingFor}
                  onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                  placeholder="e.g. 4-Bedroom Villa in Riyadh, Corniche Penthouse in Jeddah, Holy Sanctuary in Mecca/Medina, or Dubai Waterfront..."
                  className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.12)] rounded-lg px-3.5 py-2.5 text-xs text-[#0F0F0E] placeholder:text-[#8A8A75] focus:border-[#B8913A] focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <span className="text-[10px] font-mono text-[#8A8A75]">
                  Strict Privacy Assured
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 bg-[#B8913A] hover:bg-[#D4A853] text-[#FAF7F2] font-semibold px-6 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <Send size={13} />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
}
