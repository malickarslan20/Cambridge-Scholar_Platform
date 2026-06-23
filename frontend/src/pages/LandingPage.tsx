import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Menu, X, Globe, MessageSquare, Award, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-surface font-sans selection:bg-primary/20 selection:text-primary">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold mb-6">
              <Award size={16} />
              <span>ESTABLISHED SCHOLARLY TRADITION</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-on-surface leading-[1.1] mb-6">
              Excellence in <span className="text-primary">Curated</span> Learning
            </h1>
            <p className="text-xl text-on-surface/70 mb-8 max-w-lg leading-relaxed">
              Experience a curated educational journey designed for the world's most promising scholars. Our academy blends centuries of tradition with visionary digital learning.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup" className="btn-primary flex items-center gap-2">
                Begin Journey <ArrowRight size={18} />
              </Link>
              <button className="px-6 py-2.5 rounded-md font-medium text-on-surface hover:bg-surface-container-low transition-all">
                Explore Methodology
              </button>
            </div>

            <div className="mt-12 flex items-center gap-8">
              <div>
                <span className="block text-3xl font-display font-bold text-primary">100+</span>
                <span className="text-sm text-on-surface/50 uppercase tracking-widest font-bold">Years of Heritage</span>
              </div>
              <div className="w-px h-10 bg-on-surface/10"></div>
              <div>
                <span className="block text-3xl font-display font-bold text-primary">500+</span>
                <span className="text-sm text-on-surface/50 uppercase tracking-widest font-bold">Global Mentors</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden scholarly-shadow relative z-10">
              <img
                src="/images/hero.png"
                alt="Academy Architecture"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* Abstract Background Elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 -right-8 glass p-6 rounded-xl scholarly-shadow z-20 hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white">
                  <BookOpen size={24} />
                </div>
                <div>
                  <p className="font-bold text-on-surface">Bespoke Curriculum</p>
                  <p className="text-xs text-on-surface/60">Tailored to your vision</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 bg-surface-container-low px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Transformation Through Inquiry</h2>
            <p className="text-on-surface/70 max-w-2xl mx-auto">
              Our methodology is rooted in the Socratic tradition, emphasizing critical inquiry, creative synthesis, and ethical leadership.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Bespoke Mentorship", desc: "One-on-one guidance from industry leaders and distinguished academics.", icon: <MessageSquare className="text-primary" /> },
              { title: "Global Alumni", desc: "Connect with a network of scholars making an impact in every corner of the globe.", icon: <Globe className="text-primary" /> },
              { title: "Ethical Leadership", desc: "Integrating moral philosophy into every aspect of the modern professional journey.", icon: <Award className="text-primary" /> }
            ].map((feature, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                className="bg-surface-container-lowest p-8 rounded-xl ghost-border hover:scholarly-shadow transition-all group"
              >
                <div className="w-14 h-14 bg-surface-container-low rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-on-surface/70 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-display font-bold mb-4">Curated Course Selection</h2>
              <p className="text-on-surface/70">Explore our rigorous modules designed for deep intellectual growth.</p>
            </div>
            <Link to="/courses" className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
              View All Courses <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Quantum Physics & Modern Inquiry", cat: "Sciences", img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800" },
              { title: "Ethics & Classical Philosophy", cat: "Humanities", img: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=800" },
              { title: "Visual Rhetoric & Digital Design", cat: "Arts", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800" },
              { title: "International Relations & Policy", cat: "Global Studies", img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800' }
            ].map((course, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                className="group cursor-pointer"
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-4 relative">
                  <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 glass rounded-full text-xs font-bold uppercase tracking-wider text-on-surface">{course.cat}</span>
                  </div>
                </div>
                <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{course.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="py-24 bg-surface-container-high px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-4xl font-display font-bold mb-16">Distinguished Faculty</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Dr. Elizabeth Sterling", role: "Chair of Humanities" },
              { name: "Prof. Julian Vance", role: "Applied Mathematics" },
              { name: "Sarah Al-Farabi", role: "Digital Arts Lead" },
              { name: "Dr. Marcus Thorne", role: "Political Economy" }
            ].map((member, i) => (
              <div key={i} className="text-center">
                <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4 overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${member.name}`} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold">{member.name}</h4>
                <p className="text-sm text-on-surface/60">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="text-primary mb-8 flex justify-center">
            <Award size={48} />
          </div>
          <p className="text-2xl md:text-3xl font-display font-medium text-on-surface leading-relaxed mb-8 italic">
            "The Cambridge Scholars Academy didn't just teach me facts; they taught me how to think, how to question, and how to create meaning in a complex world. The mentorship I received was life-changing."
          </p>
          <div>
            <p className="font-bold text-xl">Arthur Montgomery</p>
            <p className="text-on-surface/60 uppercase tracking-widest text-sm">Class of 2022, Oxford Scholar</p>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-3xl -z-10 rounded-full"></div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-6xl mx-auto bg-primary rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Join Our Next Cohort</h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Applications for the Winter 2024 Semester are now open. Secure your place in our next cohort of visionary thinkers.
            </p>
            <Link to="/signup" className="bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-surface-container-low transition-all scholarly-shadow">
              Start Application
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-lowest py-20 px-6 md:px-12 ghost-border border-x-0 border-b-0">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-display font-bold text-sm">C</div>
              <span className="font-display font-bold text-xl tracking-tight">Cambridge Scholars</span>
            </div>
            <p className="text-on-surface/60 max-w-sm mb-8">
              A high-end, editorial educational experience treating the UI not as software, but as a sophisticated canvas.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center hover:bg-primary/10 hover:text-primary cursor-pointer transition-all"><Globe size={20} /></div>
              <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center hover:bg-primary/10 hover:text-primary cursor-pointer transition-all"><MessageSquare size={20} /></div>
            </div>
          </div>

          <div>
            <h5 className="font-bold mb-6">Academy</h5>
            <ul className="space-y-4 text-on-surface/60">
              <li><Link to="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
              <li><Link to="/courses" className="hover:text-primary transition-colors">Curriculum</Link></li>
              <li><Link to="/faculty" className="hover:text-primary transition-colors">Distinguished Faculty</Link></li>
              <li><Link to="/alumni" className="hover:text-primary transition-colors">Alumni Network</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6">Resources</h5>
            <ul className="space-y-4 text-on-surface/60">
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/accessibility" className="hover:text-primary transition-colors">Accessibility</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-10 ghost-border border-x-0 border-b-0 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-on-surface/40">
          <p>© 2024 Cambridge Scholars Academy. All rights reserved.</p>
          <div className="flex gap-8">
            <span>Powered by Visionary Learning</span>
            <span>English (Global)</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
