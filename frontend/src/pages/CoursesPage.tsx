import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, BookOpen, Clock, Users, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CoursesPage: React.FC = () => {
  const categories = ['All Curriculum', 'Humanities', 'Sciences', 'Arts', 'Global Policy', 'Technology'];
  const [activeCategory, setActiveCategory] = React.useState('All Curriculum');

  const courses = [
    { 
      title: 'Quantum Physics & Modern Inquiry', 
      instructor: 'Dr. Sterling', 
      cat: 'Sciences', 
      duration: '12 Weeks', 
      scholars: 142, 
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800'
    },
    { 
      title: 'Ethics & Classical Philosophy', 
      instructor: 'Prof. Vance', 
      cat: 'Humanities', 
      duration: '10 Weeks', 
      scholars: 85, 
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=800'
    },
    { 
      title: 'Visual Rhetoric & Digital Design', 
      instructor: 'Sarah Al-Farabi', 
      cat: 'Arts', 
      duration: '8 Weeks', 
      scholars: 210, 
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800'
    },
    { 
      title: 'International Relations', 
      instructor: 'Dr. Marcus Thorne', 
      cat: 'Global Policy', 
      duration: '14 Weeks', 
      scholars: 64, 
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800'
    },
    { 
      title: 'Epistemology of AI', 
      instructor: 'Dr. Sterling', 
      cat: 'Technology', 
      duration: '10 Weeks', 
      scholars: 120, 
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
    },
    { 
      title: 'Rhetorical Analysis', 
      instructor: 'Sarah Al-Farabi', 
      cat: 'Arts', 
      duration: '6 Weeks', 
      scholars: 95, 
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20 relative">
      {/* Header Area */}
      <header className="pt-24 pb-12 px-6 md:px-12 bg-surface-container-low border-b ghost-border">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="text-primary font-bold text-sm flex items-center gap-2 mb-8 hover:gap-3 transition-all">
            <ArrowRight size={16} className="rotate-180" /> Back to Academy Landing
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-on-surface">Curriculum Library</h1>
              <p className="text-on-surface/60 text-lg">Explore our carefully curated modules designed for deep intellectual growth and professional excellence.</p>
            </div>
            <div className="flex items-center gap-4 bg-surface-container-high p-2 rounded-2xl scholarly-shadow ghost-border w-full md:w-96">
              <Search className="text-on-surface/30 ml-2" size={20} />
              <input type="text" placeholder="Search curriculum..." className="bg-transparent border-none outline-none py-2 px-2 w-full text-sm text-white placeholder:text-white/20" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-6 md:px-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                activeCategory === cat 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'bg-surface-container-low text-on-surface/60 hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
          <button className="ml-auto flex items-center gap-2 text-on-surface/60 font-bold text-sm hover:text-primary transition-colors">
            <Filter size={18} /> More Filters
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % 3) * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="bg-surface-container-low rounded-2xl overflow-hidden scholarly-shadow ghost-border group-hover:border-primary/30 transition-all">
                <div className="aspect-video relative overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 glass rounded-lg text-[10px] font-bold uppercase tracking-widest text-on-surface shadow-sm">{course.cat}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <span className="text-white font-bold text-sm flex items-center gap-2 underline underline-offset-4">Explore Curriculum <ArrowRight size={16} /></span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-display font-bold text-lg leading-tight group-hover:text-primary transition-colors">{course.title}</h3>
                    <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-md">
                      <Star size={12} className="text-secondary fill-secondary" />
                      <span className="text-[10px] font-bold">{course.rating}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-on-surface/5">
                    <div className="flex items-center gap-2 text-on-surface/50 text-xs">
                      <Clock size={14} /> <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface/50 text-xs">
                      <Users size={14} /> <span>{course.scholars} Scholars</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <BookOpen size={16} />
                      </div>
                      <span className="text-xs font-medium text-on-surface/70">{course.instructor}</span>
                    </div>
                    <Link to="/signup" className="text-primary font-bold text-xs uppercase tracking-widest hover:underline">Enroll Now</Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer CTA */}
      <section className="py-24 px-6 md:px-12 text-center bg-surface-container-low mt-12">
        <h2 className="text-3xl font-display font-bold mb-4">Can't find what you're looking for?</h2>
        <p className="text-on-surface/60 mb-8">Suggest a custom curriculum or request a bespoke mentorship program.</p>
        <button className="btn-secondary">Request Custom Module</button>
      </section>
    </div>
  );
};

export default CoursesPage;
