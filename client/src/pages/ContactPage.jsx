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
    email: '',
    phone: '',
    cityOfInterest: 'Riyadh',
    inquiryType: 'Private Acquisition',
    budgetRange: 'SAR 2M - 4M',
    timeframe: 'Immediate (1-3 months)',
    message: prefillPropertyId 
      ? `Inquiring specifically on property unit ID "${prefillPropertyId}". Please provide current title status and walkthrough availability.`
      : ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, email address, and a brief description.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        ...formData,
        propertyId: prefillPropertyId || null,
        channel: 'Contact Page Web Form'
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
      city: 'Riyadh Metropolitan Headquarters',
      address: 'King Fahd Road, Al Olaya District, Riyadh 12214',
      coordinates: '24°42′43″N 46°40′50″E',
      hours: 'Sun – Thu · 09:00 – 18:00 (Riyadh GMT+3)',
      phone: '+966 11 482 9900',
      email: 'riyadh@miras-re.sa'
    },
    {
      city: 'Jeddah Red Sea Advisory Desk',
      address: 'Corniche Road, Al Shati District, Jeddah 23610',
      coordinates: '21°36′12″N 39°06′33″E',
      hours: 'Sun – Thu · 09:00 – 18:00 (Riyadh GMT+3)',
      phone: '+966 12 690 4422',
      email: 'jeddah@miras-re.sa'
    },
    {
      city: 'Al Khobar Eastern Gateway Office',
      address: 'Prince Turki Street, Al Corniche, Al Khobar 34414',
      coordinates: '26°17′30″N 50°13′07″E',
      hours: 'Sun – Thu · 09:00 – 18:00 (Riyadh GMT+3)',
      phone: '+966 13 881 7733',
      email: 'khobar@miras-re.sa'
    }
  ];

  const faqs = [
    {
      q: 'Do you charge buyer advisory commissions?',
      a: 'Under our master developer channel agreements, our advisory and transaction representation fees are remunerated directly by the developer. Private buyers and institutional allocators pay zero retail broker markup.'
    },
    {
      q: 'Can non-Saudi / international investors acquire real estate through MIRĀS?',
      a: 'Yes. Saudi Arabia’s updated foreign property ownership law permits international entities and individuals to acquire residential and commercial real estate within designated zones, subject to REGA registration.'
    },
    {
      q: 'How do you verify off-plan developer projects?',
      a: 'We verify every project through the Wafi licensing system, confirm that dedicated project escrow accounts are opened with approved Saudi banks, and review historical delivery performance.'
    }
  ];

  return (
    <div className="pt-28 pb-24 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <ScrollReveal animation="fade-down">
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#B8913A] uppercase tracking-widest">
            <Clock size={14} />
            <span>Fiduciary Inquiry & Consultation</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#0F0F0E] tracking-tight leading-tight">
            Direct Advisory & Inquiries
          </h1>
          <p className="text-[#5A5A52] text-sm sm:text-base leading-relaxed">
            Share your acquisition parameters or schedule a confidential advisory discussion with our principals. Every inquiry is handled with strict professional discretion.
          </p>
        </div>
      </ScrollReveal>

      {/* Main Grid: Form + Office Locations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Form Container */}
        <div className="lg:col-span-7">
          <ScrollReveal animation="fade-right">
            <div className="bg-[#FAF7F2] border border-[rgba(15,15,14,0.12)] rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="border-b border-[rgba(15,15,14,0.08)] pb-4 mb-6">
                <h2 className="font-serif text-2xl font-bold text-[#0F0F0E]">
                  Submit Your Acquisition Brief
                </h2>
                <p className="text-[#6B6B5A] text-xs mt-1">
                  Your inquiry is logged directly in our MERN stack database and reviewed by a designated advisor.
                </p>
              </div>

              {submittedData ? (
                <div className="py-10 text-center space-y-4">
                  <div className="h-14 w-14 rounded-full bg-[#B8913A]/15 border border-[#B8913A] text-[#B8913A] flex items-center justify-center mx-auto">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#0F0F0E]">Brief Registered</h3>
                  <p className="text-xs text-[#5A5A52] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#0F0F0E]">{submittedData.name}</strong>. Your inquiry has been saved to the database (ID: {submittedData.id || 'INQ-SUCCESS'}). An advisor will review your criteria for {submittedData.cityOfInterest} and reply shortly.
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
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded flex items-center gap-2">
                      <AlertCircle size={14} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase font-mono text-[#6B6B5A] mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Faisal Al-Otaibi"
                        className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-lg p-2.5 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-mono text-[#6B6B5A] mb-1">Corporate or Private Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@organization.com"
                        className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-lg p-2.5 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase font-mono text-[#6B6B5A] mb-1">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+966 50 000 0000"
                        className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-lg p-2.5 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-mono text-[#6B6B5A] mb-1">Primary Region of Interest</label>
                      <select
                        value={formData.cityOfInterest}
                        onChange={(e) => setFormData({ ...formData, cityOfInterest: e.target.value })}
                        className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-lg p-2.5 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none"
                      >
                        <option value="Riyadh">Riyadh Metropolitan</option>
                        <option value="Jeddah">Jeddah Waterfront & Red Sea</option>
                        <option value="Al Khobar">Al Khobar & Eastern Province</option>
                        <option value="Cross-Kingdom">Cross-Kingdom Portfolio</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase font-mono text-[#6B6B5A] mb-1">Engagement Pathway</label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-lg p-2.5 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none"
                      >
                        <option value="Private Acquisition">Private Residential Acquisition</option>
                        <option value="Commercial Investment">Commercial / Office Floorplate</option>
                        <option value="Family Office Allocation">Family Office Allocation</option>
                        <option value="Developer Channel">Developer Channel Inquiry</option>
                        <option value="General Consultation">General Strategic Advisory</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-mono text-[#6B6B5A] mb-1">Target Capital Scale</label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-lg p-2.5 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none"
                      >
                        <option value="SAR 1M - 2M">SAR 1,000,000 – 2,000,000</option>
                        <option value="SAR 2M - 4M">SAR 2,000,000 – 4,000,000</option>
                        <option value="SAR 4M - 7M">SAR 4,000,000 – 7,000,000</option>
                        <option value="SAR 7M+">Above SAR 7,000,000</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-mono text-[#6B6B5A] mb-1">Brief Details *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your desired asset class, unit requirements, or preferred delivery timing..."
                      className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-lg p-3 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[10px] text-[#8A8A75] font-mono">Response within 24 business hours</span>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#B8913A] hover:bg-[#D4A853] text-[#FAF7F2] font-semibold px-6 py-3 rounded text-xs tracking-wider uppercase flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
                    >
                      {isSubmitting ? 'Registering Brief...' : 'Transmit Brief'}
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
              <h3 className="font-serif text-lg font-bold text-[#0F0F0E]">Direct Concierge Hotline</h3>
              <p className="text-xs text-[#5A5A52] leading-relaxed">
                For urgent walkthrough scheduling or high-priority inquiries, contact our advisory concierge directly:
              </p>
              <div className="space-y-3 pt-2 text-xs">
                <a
                  href="https://wa.me/966501234567"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-lg bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] hover:border-[#B8913A]/50 transition-colors"
                >
                  <Phone size={16} className="text-emerald-700 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#0F0F0E]">+966 50 123 4567</p>
                    <p className="text-[10px] text-[#6B6B5A] font-mono">Instant WhatsApp Concierge Desk</p>
                  </div>
                </a>

                <a
                  href="mailto:advisory@miras-re.sa"
                  className="flex items-center gap-3 p-3.5 rounded-lg bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] hover:border-[#B8913A]/50 transition-colors"
                >
                  <Mail size={16} className="text-[#B8913A] shrink-0" />
                  <div>
                    <p className="font-semibold text-[#0F0F0E]">advisory@miras-re.sa</p>
                    <p className="text-[10px] text-[#6B6B5A] font-mono">Executive Advisory Inquiries</p>
                  </div>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Regional Offices */}
          <div className="space-y-4">
            <ScrollReveal animation="fade-left" delay={200}>
              <h3 className="font-serif text-lg font-bold text-[#0F0F0E]">Kingdom Office Locations</h3>
            </ScrollReveal>
            <div className="space-y-3">
              {offices.map((office, idx) => (
                <ScrollReveal 
                  key={idx}
                  animation="fade-left"
                  delay={250 + idx * 80}
                >
                  <div className="p-4 rounded-xl bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-[#0F0F0E]">{office.city}</h4>
                      <span className="font-mono text-[9px] text-[#B8913A] font-semibold">{office.coordinates}</span>
                    </div>
                    <p className="text-[#5A5A52] flex items-start gap-1.5">
                      <MapPin size={12} className="text-[#B8913A] mt-0.5 shrink-0" />
                      <span>{office.address}</span>
                    </p>
                    <p className="text-[11px] text-[#6B6B5A] pt-1">
                      Hours: {office.hours}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Frequently Answered Questions */}
      <ScrollReveal animation="fade-up">
        <div className="pt-8 border-t border-[rgba(15,15,14,0.08)] space-y-6">
          <div className="max-w-2xl space-y-1">
            <p className="text-xs font-mono uppercase text-[#B8913A]">Advisory Governance</p>
            <h2 className="font-serif text-2xl font-bold text-[#0F0F0E]">Frequently Addressed Parameters</h2>
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
