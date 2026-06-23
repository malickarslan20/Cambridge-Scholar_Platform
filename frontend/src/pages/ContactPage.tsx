import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Globe, ArrowRight, MessageSquare, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface font-sans selection:bg-primary/20 relative">
      {/* Header */}
      <header className="py-24 px-6 md:px-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Get In Touch</span>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Connect with the <span className="text-primary">Academy</span></h1>
          <p className="text-on-surface/60 text-lg">Whether you are an aspiring scholar, a prospective partner, or a member of the press, we welcome your inquiry.</p>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-surface-container-high p-10 rounded-3xl scholarly-shadow ghost-border"
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <MessageSquare className="text-primary" /> Send an Inquiry
            </h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface/50 uppercase tracking-widest">Full Name</label>
                  <input type="text" placeholder="Scholar Name" className="w-full input-field" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface/50 uppercase tracking-widest">Email Address</label>
                  <input type="email" placeholder="scholar@example.edu" className="w-full input-field" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface/50 uppercase tracking-widest">Subject of Inquiry</label>
                <select className="w-full input-field appearance-none">
                  <option>General Admissions</option>
                  <option>Scholarship Opportunities</option>
                  <option>Partnership & Collaboration</option>
                  <option>Press & Media</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface/50 uppercase tracking-widest">Your Message</label>
                <textarea rows={5} placeholder="How can we assist in your scholarly journey?" className="w-full input-field resize-none"></textarea>
              </div>

              <button className="w-full btn-primary py-4 text-lg font-bold flex items-center justify-center gap-2">
                Submit Message <ArrowRight size={20} />
              </button>
            </form>
          </motion.div>

          {/* Contact Details */}
          <div className="space-y-12">
            <section className="space-y-8">
              <h2 className="text-2xl font-bold">Global Presence</h2>
              <div className="grid gap-8">
                {[
                  { title: 'The Cambridge Hub', address: '12 Trinity St, Cambridge CB2 1TJ, UK', phone: '+44 1223 337733', icon: <MapPin className="text-primary" /> },
                  { title: 'Digital Support', email: 'admissions@cambridge.edu', support: '24/7 Academic Support', icon: <Globe className="text-primary" /> }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="flex gap-6 p-6 rounded-2xl bg-surface-container-low ghost-border hover:bg-surface-container-high hover:scholarly-shadow transition-all group"
                  >
                    <div className="w-12 h-12 bg-surface-container-highest rounded-xl flex items-center justify-center scholarly-shadow group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold">{item.title}</h4>
                      {item.address && <p className="text-sm text-on-surface/60">{item.address}</p>}
                      {item.phone && <p className="text-sm text-primary font-bold">{item.phone}</p>}
                      {item.email && <p className="text-sm text-primary font-bold">{item.email}</p>}
                      {item.support && <p className="text-xs text-on-surface/40 uppercase font-bold">{item.support}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="bg-primary/5 p-8 rounded-3xl ghost-border border-primary/10">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Phone className="text-primary" /> Academic Hotline
              </h3>
              <p className="text-sm text-on-surface/70 mb-6">For urgent admissions queries or scholarship verification, our scholarly assistants are available during UK business hours.</p>
              <span className="text-2xl font-display font-bold text-primary">0800 123 4567</span>
            </section>
          </div>
        </div>
      </main>

      {/* Map Placeholder */}
      <section className="h-[400px] w-full bg-surface-container-high relative overflow-hidden flex items-center justify-center">
        <div className="text-center opacity-20">
          <MapPin size={64} className="mx-auto mb-4" />
          <p className="font-display font-bold text-xl uppercase tracking-[0.5em]">Interactive Map Placeholder</p>
        </div>
        <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
      </section>

      {/* Footer Copy */}
      <footer className="py-12 text-center text-on-surface/40 text-sm">
        <Link to="/" className="text-primary font-bold hover:underline">Back to Landing Page</Link>
        <p className="mt-4">© 2024 Cambridge Scholars Academy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactPage;
