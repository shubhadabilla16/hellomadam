import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Mail,
  Instagram, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  ShieldCheck 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: 'Navi Peth (Datta Chowk)',
    serviceInterest: 'Hydra Facial & Skincare',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please enter your name and phone number.');
      return;
    }
    setFormSubmitted(true);
  };

  const solapurAreas = [
    'Navi Peth (Datta Chowk)',
    'Datta Chowk Area',
    'Jule Solapur',
    'Hotgi Road',
    'Saat Rasta',
    'Lashkar / Camp',
    'Kumtha Naka',
    'Vijapur Road',
    'Bhavani Peth',
    'Daji Peth',
    'Other Solapur Area'
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2]">
      
      {/* 1. Header Banner */}
      <section className="bg-white border-b border-[#ebdccd] pt-12 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#e03e1a] uppercase font-serif">
            <Sparkles className="w-3.5 h-3.5 text-[#e03e1a]" />
            <span>Connect with Hello Madam Solapur</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            We Are Here for Solapur’s Ladies
          </h1>
          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Have questions regarding our doorstep treatments, bridal packages, or timing? Reach out to our dedicated Solapur team directly.
          </p>
        </div>
      </section>

      {/* 2. Official Contact Information & Actions */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left 5 Cols: Direct Contact Details & Action Buttons */}
            <div className="lg:col-span-5 space-y-8">
              
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-900">
                  Official Business Information
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-stone-600">
                  Tap any button below to connect with Hello Madam instantly.
                </p>
              </div>

              {/* Direct Quick Action Buttons (Call, WhatsApp, Email, Instagram) */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="tel:+919657156795"
                  className="p-4 rounded-2xl bg-[#e03e1a] hover:bg-[#b82e0e] text-white shadow-xs transition-colors flex flex-col items-center justify-center text-center gap-1.5"
                >
                  <Phone className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Click to Call</span>
                  <span className="text-[11px] font-mono opacity-90">+91 9657156795</span>
                </a>

                <a
                  href="https://wa.me/919657156795?text=Hello%20Madam%20Solapur!%20I%20would%20like%20to%20inquire%20about%20booking%20an%20appointment."
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors flex flex-col items-center justify-center text-center gap-1.5"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span className="text-xs font-bold uppercase tracking-wider">WhatsApp</span>
                  <span className="text-[11px] font-mono opacity-90">+91 9657156795</span>
                </a>

                <a
                  href="mailto:dfinesolapur@gmail.com"
                  className="p-4 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white shadow-xs transition-colors flex flex-col items-center justify-center text-center gap-1.5"
                >
                  <Mail className="w-5 h-5 text-amber-300" />
                  <span className="text-xs font-bold uppercase tracking-wider">Email Us</span>
                  <span className="text-[11px] opacity-90 truncate max-w-full">dfinesolapur@gmail.com</span>
                </a>

                <a
                  href="https://www.instagram.com/hello_madam_solapur5/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-2xl bg-gradient-to-r from-purple-800 to-pink-700 hover:opacity-90 text-white shadow-xs transition-opacity flex flex-col items-center justify-center text-center gap-1.5"
                >
                  <Instagram className="w-5 h-5 text-pink-200" />
                  <span className="text-xs font-bold uppercase tracking-wider">Instagram</span>
                  <span className="text-[11px] opacity-90">@hello_madam_solapur5</span>
                </a>
              </div>

              {/* Detailed Location & Hours Info Cards */}
              <div className="space-y-4">
                
                {/* Location */}
                <div className="p-6 rounded-3xl bg-white border border-[#ebdccd] shadow-2xs space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#fef2ee] text-[#e03e1a] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase text-stone-400 font-serif">Official Address</div>
                      <h4 className="text-sm font-bold text-stone-900">Navi Peth, Datta Chowk area, Solapur, Maharashtra</h4>
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 pl-13 leading-relaxed">
                    <strong>Landmark Reference:</strong> Near June Vitthal Mandir, Mahalakshmi Dudh Dairy, Nikon Camera, Datta Chowk, Navi Peth area, Solapur.
                  </p>
                  <div className="pl-13 pt-1">
                    <a
                      href="https://maps.google.com/maps?q=17.678722381591797,75.90560913085938&z=17&hl=en"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e03e1a] hover:underline"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="p-6 rounded-3xl bg-white border border-[#ebdccd] shadow-2xs flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 border border-amber-200">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase text-stone-400 font-serif">Operating Hours</div>
                    <div className="text-sm font-bold text-stone-900">Monday to Sunday: 10:00 AM – 5:00 PM</div>
                    <div className="text-xs text-stone-500">Appointments scheduled 7 days a week</div>
                  </div>
                </div>

              </div>

            </div>

            {/* Right 7 Cols: Interactive Form & Embedded Google Map */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Form */}
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#ebdccd] shadow-sm">
                {formSubmitted ? (
                  <div className="py-12 text-center space-y-4 animate-in fade-in">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-stone-900">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
                      Thank you, {formData.name}. Our team will contact you on <span className="font-mono text-stone-900 font-bold">{formData.phone}</span> shortly to help with your inquiry.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="mt-4 px-6 py-2.5 text-xs font-bold text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-full transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-stone-900">
                        Send an Inquiry or Custom Request
                      </h3>
                      <p className="text-xs text-stone-500 mt-1">
                        Fill in your details and our team will get in touch with you.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5 font-serif">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Vaishali Mane"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#faf7f2] border border-[#ebdccd] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e03e1a]/20"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5 font-serif">
                          Contact Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 9657156795"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#faf7f2] border border-[#ebdccd] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e03e1a]/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5 font-serif">
                          Solapur Locality / Area
                        </label>
                        <select
                          value={formData.area}
                          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                          className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#faf7f2] border border-[#ebdccd] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e03e1a]/20 cursor-pointer"
                        >
                          {solapurAreas.map((a) => (
                            <option key={a} value={a}>
                              {a}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5 font-serif">
                          Service of Interest
                        </label>
                        <select
                          value={formData.serviceInterest}
                          onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                          className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#faf7f2] border border-[#ebdccd] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e03e1a]/20 cursor-pointer"
                        >
                          <option value="Hydra Facial">Hydra Facial Therapy</option>
                          <option value="Ice Globes Facial">Ice Globes Facial & Cleanup</option>
                          <option value="Advanced Pedicure">Advanced Pedicure & Foot Spa</option>
                          <option value="Hair Spa">Hair Spa Steamer & Color</option>
                          <option value="Hygienic Waxing">Hygienic Waxing (Arms & Legs)</option>
                          <option value="Festival Combo">Festival All-in-One Combo</option>
                          <option value="Bridal Makeover">Bridal & Party Makeover</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5 font-serif">
                        Your Message / Special Requests
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your preferred time or special requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#faf7f2] border border-[#ebdccd] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e03e1a]/20"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3 text-xs font-bold tracking-wider uppercase text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-full transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 text-amber-200" />
                      <span>Submit Inquiry</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Embedded Google Map using Coordinates 17.678722381591797, 75.90560913085938 */}
              <div className="bg-white rounded-3xl border border-[#ebdccd] overflow-hidden shadow-sm p-2">
                <div className="p-4 flex items-center justify-between border-b border-[#ebdccd]/70">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#e03e1a]" />
                    <span className="text-xs font-bold text-stone-900 font-serif">
                      Hello Madam Location Map · Datta Chowk, Navi Peth, Solapur
                    </span>
                  </div>
                  <a
                    href="https://maps.google.com/maps?q=17.678722381591797,75.90560913085938&z=17&hl=en"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-bold text-[#e03e1a] hover:underline flex items-center gap-1"
                  >
                    <span>View Larger Map</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="relative w-full h-72 sm:h-80 bg-stone-100 rounded-2xl overflow-hidden">
                  <iframe
                    title="Hello Madam Solapur Google Maps Location"
                    src="https://maps.google.com/maps?q=17.678722381591797,75.90560913085938&hl=en&z=16&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
