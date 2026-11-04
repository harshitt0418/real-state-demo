import React, { useState } from 'react';
import { Handshake, CheckCircle2, Send, Clock, AlertCircle } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { submitInquiry } from '../services/api';

export default function PartnershipsPage() {
  const [formData, setFormData] = useState({
    developerName: '',
    contactPerson: '',
    email: '',
    phone: '',
    projectLocation: 'Riyadh',
    projectType: 'Residential Master Community',
    estimatedUnits: '50-200 Units',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.developerName || !formData.email || !formData.notes) {
      setErrorMessage('Please fill in developer entity, email, and project notes.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        name: `${formData.contactPerson || formData.developerName} (Developer Channel)`,
        email: formData.email,
        phone: formData.phone,
        cityOfInterest: formData.projectLocation,
        inquiryType: 'Developer Channel',
        message: `[DEVELOPER CHANNEL APPLICATION]\nEntity: ${formData.developerName}\nProject Location: ${formData.projectLocation}\nAsset Type: ${formData.projectType}\nScale: ${formData.estimatedUnits}\nProject Brief: ${formData.notes}`,
        channel: 'Developer Partnership Form'
      };

      const res = await submitInquiry(payload);
      if (res.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(res.message || 'Submission failed');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Error submitting developer application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const partnerAdvantages = [
    {
      title: 'Institutional & Family Office Origination',
      desc: 'We place your developments in front of pre-qualified private capital allocators, corporate owner-occupiers, and international investors actively deploying liquidity.'
    },
    {
      title: 'Zero Broker Friction',
      desc: 'Our channel agreements are direct and structured. We manage investor qualification, viewing scheduling, and preliminary diligence so your sales teams focus on closing.'
    },
    {
      title: 'Wafi & REGA Regulatory Discipline',
      desc: 'We operate strictly within national regulatory guidelines, ensuring that escrow accounts, marketing disclosures, and conveyance paperwork meet Saudi legal governance.'
    },
    {
      title: 'Long-Term Brand Stewardship',
      desc: 'We position your architectural vision and quality standards through refined editorial presentation, safeguarding developer brand prestige in the secondary market.'
    }
  ];

  return (
    <div className="pt-28 pb-24 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <ScrollReveal animation="fade-down">
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#B8913A] uppercase tracking-widest">
            <Handshake size={14} />
            <span>Developer Channel Partnerships</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#0F0F0E] tracking-tight leading-tight">
            Connecting premier developers with vetted capital.
          </h1>
          <p className="text-[#5A5A52] text-sm sm:text-base leading-relaxed">
            MIRĀS serves as an exclusive channel partner for select developers across Saudi Arabia. We originate qualified purchasers and manage the acquisition relationship from introduction through to handover.
          </p>
        </div>
      </ScrollReveal>

      {/* Advantages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {partnerAdvantages.map((adv, idx) => (
          <ScrollReveal 
            key={idx}
            animation="fade-up"
            delay={idx * 110}
          >
            <div className="bg-[#FAF7F2] border border-[rgba(15,15,14,0.10)] rounded-xl p-6 space-y-3 h-full shadow-sm hover:shadow-md transition-shadow">
              <span className="font-serif text-2xl font-bold text-[#B8913A]">0{idx + 1}</span>
              <h3 className="font-serif text-lg font-semibold text-[#0F0F0E]">{adv.title}</h3>
              <p className="text-xs text-[#6B6B5A] leading-relaxed">{adv.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Partnership Submission Form & Criteria */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Vetting Criteria */}
        <div className="lg:col-span-5 space-y-6">
          <ScrollReveal animation="fade-right">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F0F0E]">
              Our Developer Selection Criteria
            </h2>
            <p className="text-[#5A5A52] text-sm leading-relaxed mb-4">
              We partner with a limited circle of master developers to ensure each project receives dedicated origination focus. We evaluate prospective developments against four core standards:
            </p>

            <div className="space-y-4 text-xs text-[#5A5A52]">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)]">
                <CheckCircle2 size={16} className="text-[#B8913A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F0F0E] block font-semibold mb-0.5">Wafi Off-Plan Certification:</strong>
                  Complete licensing under the Wafi program with verified Ministry of Housing escrow accounts for all off-plan phases.
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)]">
                <CheckCircle2 size={16} className="text-[#B8913A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F0F0E] block font-semibold mb-0.5">Demonstrated Delivery Record:</strong>
                  Minimum 3 successfully delivered projects with verified municipal completion certificates in the Kingdom.
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)]">
                <CheckCircle2 size={16} className="text-[#B8913A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F0F0E] block font-semibold mb-0.5">Architectural & Engineering Integrity:</strong>
                  Higher specification materials, sustainable thermal performance, and verifiable MEP warranties.
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)]">
                <CheckCircle2 size={16} className="text-[#B8913A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F0F0E] block font-semibold mb-0.5">Transparent Escrow Protocol:</strong>
                  Clean contract mechanisms protecting buyer capital and tying drawdowns to independent engineer sign-offs.
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right: Partner Intake Form */}
        <div className="lg:col-span-7">
          <ScrollReveal animation="fade-left" delay={150}>
            <div className="bg-[#FAF7F2] border border-[rgba(15,15,14,0.12)] rounded-2xl p-8 shadow-sm">
              <div className="border-b border-[rgba(15,15,14,0.08)] pb-4 mb-6">
                <h3 className="font-serif text-xl font-bold text-[#0F0F0E]">Developer Channel Registration</h3>
                <p className="text-[#6B6B5A] text-xs mt-1">Submit your upcoming project or development pipeline for channel evaluation.</p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="h-14 w-14 rounded-full bg-[#B8913A]/15 border border-[#B8913A] text-[#B8913A] flex items-center justify-center mx-auto">
                    <CheckCircle2 size={28} />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#0F0F0E]">Application Registered</h4>
                  <p className="text-xs text-[#6B6B5A] max-w-md mx-auto leading-relaxed">
                    Thank you. Your developer dossier has been logged. Our partnership director will contact you within two business days to arrange an introductory briefing.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 rounded bg-[#F0EBE1] text-[#0F0F0E] text-xs hover:bg-[#E8E1D5] cursor-pointer"
                  >
                    Submit Another Project
                  </button>
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
                      <label className="block text-[11px] uppercase font-mono text-[#6B6B5A] mb-1">Developer / Entity Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.developerName}
                        onChange={(e) => setFormData({ ...formData, developerName: e.target.value })}
                        placeholder="e.g. Al-Rawabi Developments"
                        className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-lg p-2.5 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-mono text-[#6B6B5A] mb-1">Representative Name</label>
                      <input
                        type="text"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        placeholder="e.g. Eng. Khalid Al-Mansoor"
                        className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-lg p-2.5 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase font-mono text-[#6B6B5A] mb-1">Corporate Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="partnerships@developer.sa"
                        className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-lg p-2.5 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-mono text-[#6B6B5A] mb-1">Contact Phone / Mobile</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+966 11 000 0000"
                        className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-lg p-2.5 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase font-mono text-[#6B6B5A] mb-1">Project Location</label>
                      <select
                        value={formData.projectLocation}
                        onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                        className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-lg p-2.5 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none"
                      >
                        <option value="Riyadh">Riyadh Metropolitan</option>
                        <option value="Jeddah">Jeddah Waterfront</option>
                        <option value="Mecca">Mecca Holy Precinct</option>
                        <option value="Medina">Medina Central Corridor</option>
                        <option value="Dubai">Dubai Luxury High-Rise</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-mono text-[#6B6B5A] mb-1">Asset Class</label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-lg p-2.5 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none"
                      >
                        <option value="Residential Master Community">Residential Villas/Community</option>
                        <option value="Luxury Apartments / High-Rise">Apartments / High-Rise</option>
                        <option value="Commercial Office / HQ">Commercial Office / HQ</option>
                        <option value="Retail Strip / Mixed-Use">Retail / Mixed-Use</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-mono text-[#6B6B5A] mb-1">Project Scale</label>
                      <select
                        value={formData.estimatedUnits}
                        onChange={(e) => setFormData({ ...formData, estimatedUnits: e.target.value })}
                        className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-lg p-2.5 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none"
                      >
                        <option value="Under 50 Units">Under 50 Units</option>
                        <option value="50-200 Units">50 – 200 Units</option>
                        <option value="200+ Units">200+ Master Phase</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-mono text-[#6B6B5A] mb-1">Project Summary & Licensing Status *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Outline project location, construction timeline, Wafi approval status, and target channel release date..."
                      className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-lg p-3 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <p className="text-[10px] text-[#8A8A75] font-mono flex items-center gap-1">
                      <Clock size={11} className="text-[#B8913A]" /> Response within 48h
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#B8913A] hover:bg-[#D4A853] text-[#FAF7F2] font-semibold px-6 py-3 rounded text-xs tracking-wider uppercase flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
                    >
                      {isSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <span>Submit Pipeline Dossier</span>
                          <Send size={13} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>

      </div>

    </div>
  );
}
