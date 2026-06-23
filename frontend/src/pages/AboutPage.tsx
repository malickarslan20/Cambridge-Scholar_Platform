import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, BookOpen, ArrowRight, Globe, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-surface font-sans relative">
      {/* Immersive Header */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=2000" 
          alt="Academy Heritage" 
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-surface/40 to-surface"></div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-8 ghost-border border-primary/20"
          >
            <BookOpen size={40} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-extrabold text-on-surface mb-6 tracking-tight"
          >
            Our <span className="text-primary">Legacy</span> of Inquiry
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-xl text-on-surface/60 leading-relaxed"
          >
            Founded on the principles of critical synthesis and ethical leadership, we curate excellence for the next generation of global thinkers.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeInUp}>
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Our North Star</span>
            <h2 className="text-4xl font-display font-bold mb-6">The Academic Curator Methodology</h2>
            <p className="text-on-surface/70 text-lg leading-relaxed mb-8">
              We reject the industrial "one-size-fits-all" approach to learning. Instead, we treat education as a curated art form. Each scholar's journey is unique, guided by mentors who are leaders in their respective fields.
            </p>
            <div className="space-y-4">
              {[
                "Socratic tradition of critical inquiry",
                "Cross-disciplinary creative synthesis",
                "Global networking with elite alumni",
                "Bespoke curriculum mapping"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 font-medium text-on-surface/80">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Award size={14} />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              {...fadeInUp}
              className="aspect-square bg-surface-container-low rounded-3xl overflow-hidden scholarly-shadow mt-12"
            >
              <img src="https://images.unsplash.com/photo-1523050338691-c1e53d076efd?auto=format&fit=crop&q=80&w=800" alt="Library" className="w-full h-full object-cover opacity-80" />
            </motion.div>
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="aspect-[4/5] bg-primary rounded-3xl overflow-hidden scholarly-shadow"
            >
              <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800" alt="Mentorship" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-surface-container-low px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Core Principles</h2>
            <p className="text-on-surface/60 max-w-xl mx-auto">What defines a Cambridge Scholar? Our values are the bedrock of our academic excellence.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Intellectual Rigor', icon: <Target className="text-primary" />, desc: 'We pursue truth with uncompromising dedication and scientific precision.' },
              { title: 'Global Perspective', icon: <Globe className="text-primary" />, desc: 'Understanding the world through diverse lenses and cultural synthesis.' },
              { title: 'Moral Courage', icon: <Award className="text-primary" />, desc: 'Applying knowledge with a deep sense of ethical responsibility.' }
            ].map((value, i) => (
              <motion.div 
                key={i}
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                className="bg-surface-container-high p-10 rounded-3xl ghost-border hover:scholarly-shadow transition-all"
              >
                <div className="w-16 h-16 bg-surface-container-low rounded-2xl flex items-center justify-center mb-8">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-on-surface/60 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: 'Years of Tradition', value: '100+' },
            { label: 'Countries Represented', value: '45' },
            { label: 'Distinguished Faculty', value: '120' },
            { label: 'Success Rate', value: '98%' }
          ].map((stat, i) => (
            <div key={i}>
              <h4 className="text-5xl font-display font-extrabold text-primary mb-2">{stat.value}</h4>
              <p className="text-xs font-bold text-on-surface/40 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 md:px-12 bg-primary text-white dark:text-black text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-display font-bold mb-6 text-white dark:text-black">Ready to join our legacy?</h2>
          <p className="text-white/80 dark:text-black/80 text-lg mb-10 leading-relaxed">
            The journey of a thousand miles begins with a single scholarly inquiry. Start your application today.
          </p>
          <Link to="/signup" className="bg-white dark:bg-black text-primary dark:text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-surface-container-low transition-all scholarly-shadow inline-flex items-center gap-2">
            Apply Now <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
