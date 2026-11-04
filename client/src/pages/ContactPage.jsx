import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { submitInquiry } from '../services/api';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const prefillPropertyId = searchParams.get('property') || '';

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    lookingFor: prefillPropertyId 
      ? `Inquiry for property reference: "${prefillPropertyId}". Please provide current title status and walkthrough details.`
      : ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.mobile.trim() || !formData.lookingFor.trim()) {
      setErrorMessage('Please fill in your Name, Mobile, and what you are Looking for.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        phone: formData.mobile.trim(),
        lookingFor: formData.lookingFor.trim(),
        message: formData.lookingFor.trim(),
        email: `${formData.mobile.replace(/\D/g, '') || 'client'}@sadu-development.sa`,
        propertyId: prefillPropertyId || null,
        channel: 'Contact Page Form'
      };

      const res = await submitInquiry(payload);
      if (res.success) {
        setSubmittedData(res.data || payload);
      } else {
        setErrorMessage(res.message || 'Submission error');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Error submitting inquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const offices = [
    {
      city: 'Riyadh Headquarters',
      address: 'King Fahd Road, Al Olaya District, Riyadh 12214',
      coordinates: '24°42′N 46°40′E',
      hours: 'Sun – Thu · 09:00 – 18:00 (AST)',
      phone: '+966 11 482 9900',
      email: 'riyadh@sadu-development.sa'
    },
    {
      city: 'Jeddah Waterfront Desk',
      address: 'Corniche Road, Al Shati District, Jeddah 23610',
      coordinates: '21°32′N 39°10′E',
      hours: 'Sun – Thu · 09:00 – 18:00 (AST)',
      phone: '+966 12 690 4422',
      email: 'jeddah@sadu-development.sa'
    },
    {
      city: 'Dubai Prime Office',
      address: 'DIFC Gate Village & Marina Walk, Dubai, UAE',
      coordinates: '25°12′N 55°17′E',
      hours: 'Mon – Fri · 09:00 – 18:00 (GST)',
      phone: '+971 4 390 1200',
      email: 'dubai@sadu-development.sa'
    }
  ];

  const faqs = [
    {
      q: 'Which markets does Sadu Real Estate Development cover?',
      a: 'We operate exclusively across five prime territories: Riyadh, Jeddah, Mecca, Medina, and Dubai.'
    },
    {
      q: 'How are development titles verified?',
      a: 'All inventory is validated against official Ministry of Justice deed records, Wafi escrow licensing, and developer milestones.'
    },
    {
      q: 'Are there buyer brokerage markups?',
      a: 'No. Acquisitions are conducted directly under developer channel terms with transparent direct pricing.'
    }
  ];

  return (
    <div className="pt-28 pb-24 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <ScrollReveal animation="fade-down">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#B8913A] uppercase tracking-widest">
            <Clock size={14} />
            <span>Direct Client Desk</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#0F0F0E] tracking-tight leading-tight">
            Contact Sadu
          </h1>
          <p className="text-[#5A5A52] text-sm sm:text-base leading-relaxed">
            Connect directly with our development and acquisition principals across Riyadh, Jeddah, Mecca, Medina, and Dubai.
          </p>
        </div>
      </ScrollReveal>

      {/* Main Grid: Form + Office Locations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Form Container (Strictly 3 Columns / Fields: Name, Mobile, Looking for) */}
        <div className="lg:col-span-7">
          <ScrollReveal animation="fade-right">
            <div className="bg-[#FAF7F2] border border-[rgba(15,15,14,0.12)] rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="border-b border-[rgba(15,15,14,0.08)] pb-4 mb-6">
                <h2 className="font-serif text-2xl font-bold text-[#0F0F0E]">
                  Inquiry Brief
                </h2>
                <p className="text-[#6B6B5A] text-xs mt-1">
                  Share your parameters. An advisor will reach out to your mobile.
                </p>
              </div>

              {submittedData ? (
                <div className="py-10 text-center space-y-4">
                  <div className="h-14 w-14 rounded-full bg-[#B8913A]/15 border border-[#B8913A] text-[#B8913A] flex items-center justify-center mx-auto">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#0F0F0E]">Inquiry Registered</h3>
                  <div className="bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-lg p-4 text-left text-xs space-y-1.5 max-w-sm mx-auto text-[#5A5A52]">
                    <p><strong className="text-[#0F0F0E]">Name:</strong> {submittedData.name}</p>
                    <p><strong className="text-[#0F0F0E]">Mobile:</strong> {submittedData.mobile || submittedData.phone}</p>
                    <p><strong className="text-[#0F0F0E]">Looking for:</strong> {submittedData.lookingFor || submittedData.message}</p>
                  </div>
                  <p className="text-xs text-[#5A5A52] max-w-md mx-auto leading-relaxed">
                    Thank you. A senior advisor from Sadu Real Estate Development will contact your mobile shortly.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setSubmittedData(null)}
                      className="px-4 py-2 bg-[#F0EBE1] hover:bg-[#E8E1D5] text-[#0F0F0E] text-xs rounded transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* Strictly 3 Fields: Name, Mobile, Looking for */
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded flex items-center gap-2">
                      <AlertCircle size={14} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* 1. Name */}
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

                  {/* 2. Mobile */}
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

                  {/* 3. Looking for */}
                  <div>
                    <label className="block text-[11px] uppercase font-mono tracking-wider text-[#6B6B5A] mb-1.5">
                      Looking for <span className="text-[#B8913A]">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.lookingFor}
                      onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                      placeholder="Specify your requirements: e.g. Villa in Riyadh, Corniche Penthouse in Jeddah, Sanctuary in Mecca/Medina, or Dubai Waterfront..."
                      className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.12)] rounded-lg px-3.5 py-2.5 text-xs text-[#0F0F0E] placeholder:text-[#8A8A75] focus:border-[#B8913A] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[10px] text-[#8A8A75] font-mono">Confidential & Direct</span>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#B8913A] hover:bg-[#D4A853] text-[#FAF7F2] font-semibold px-6 py-3 rounded text-xs tracking-wider uppercase flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
                    >
                      {isSubmitting ? 'Submitting...' : 'Send Inquiry'}
                      <Send size={12} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Office Hubs & Concierge */}
        <div className="lg:col-span-5 space-y-6">
          
          <ScrollReveal animation="fade-left" delay={100}>
            <div className="bg-[#FAF7F2] border border-[rgba(15,15,14,0.12)] rounded-2xl p-6 space-y-4 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[#0F0F0E]">Private Desk Hotline</h3>
              <p className="text-xs text-[#5A5A52] leading-relaxed">
                Direct phone and WhatsApp assistance for private clients and institutional allocators:
              </p>
              <div className="space-y-3 pt-1 text-xs">
                <a
                  href="https://wa.me/966501234567"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-lg bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] hover:border-[#B8913A]/50 transition-colors"
                >
                  <Phone size={16} className="text-emerald-700 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#0F0F0E]">+966 50 123 4567</p>
                    <p className="text-[10px] text-[#6B6B5A] font-mono">WhatsApp Concierge Desk</p>
                  </div>
                </a>

                <a
                  href="mailto:contact@sadu-development.sa"
                  className="flex items-center gap-3 p-3.5 rounded-lg bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] hover:border-[#B8913A]/50 transition-colors"
                >
                  <Mail size={16} className="text-[#B8913A] shrink-0" />
                  <div>
                    <p className="font-semibold text-[#0F0F0E]">contact@sadu-development.sa</p>
                    <p className="text-[10px] text-[#6B6B5A] font-mono">Executive Development Desk</p>
                  </div>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Regional Offices */}
          <div className="space-y-4">
            <ScrollReveal animation="fade-left" delay={200}>
              <h3 className="font-serif text-lg font-bold text-[#0F0F0E]">Office Locations</h3>
            </ScrollReveal>
            <div className="space-y-3">
              {offices.map((office, idx) => (
                <ScrollReveal 
                  key={idx}
                  animation="fade-left"
                  delay={250 + idx * 80}
                >
                  <div className="p-4 rounded-xl bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-[#0F0F0E]">{office.city}</h4>
                      <span className="font-mono text-[9px] text-[#B8913A] font-semibold">{office.coordinates}</span>
                    </div>
                    <p className="text-[#5A5A52] flex items-start gap-1.5">
                      <MapPin size={12} className="text-[#B8913A] mt-0.5 shrink-0" />
                      <span>{office.address}</span>
                    </p>
                    <p className="text-[10.5px] text-[#6B6B5A]">
                      {office.hours}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* FAQs */}
      <ScrollReveal animation="fade-up">
        <div className="pt-8 border-t border-[rgba(15,15,14,0.08)] space-y-6">
          <div className="max-w-2xl space-y-1">
            <p className="text-xs font-mono uppercase text-[#B8913A]">Governance</p>
            <h2 className="font-serif text-2xl font-bold text-[#0F0F0E]">Key Parameters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-[#FAF7F2] border border-[rgba(15,15,14,0.10)] space-y-2 shadow-sm">
                <h4 className="font-serif text-sm font-semibold text-[#0F0F0E] flex items-start gap-2">
                  <HelpCircle size={15} className="text-[#B8913A] shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-[#5A5A52] leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

    </div>
  );
}
