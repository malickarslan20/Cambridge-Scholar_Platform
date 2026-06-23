import React from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import { Book, Clock, GraduationCap, TrendingUp, Calendar, ChevronRight } from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const stats = [
    { label: 'Active Courses', value: '4', icon: <Book className="text-primary" />, trend: '+1 this term' },
    { label: 'Academic GPA', value: '3.92', icon: <GraduationCap className="text-secondary" />, trend: 'Top 5%' },
    { label: 'Study Hours', value: '128', icon: <Clock className="text-primary" />, trend: '+12h this week' },
    { label: 'Credits Earned', value: '42', icon: <TrendingUp className="text-secondary" />, trend: '85% of degree' },
  ];

  const recentCourses = [
    { title: 'Quantum Physics', progress: 75, instructor: 'Dr. Sterling', color: 'bg-primary' },
    { title: 'Classical Philosophy', progress: 45, instructor: 'Prof. Vance', color: 'bg-secondary' },
    { title: 'Visual Rhetoric', progress: 90, instructor: 'Sarah Al-Farabi', color: 'bg-primary' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Hero */}
        <section>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-display font-bold mb-2"
          >
            Good Morning, <span className="text-primary">Arthur</span>
          </motion.h1>
          <p className="text-on-surface/60 italic">"The roots of education are bitter, but the fruit is sweet." — Aristotle</p>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl scholarly-shadow ghost-border group hover:border-primary/20 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-surface-container-low rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <span className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest">{stat.label}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-display font-bold">{stat.value}</span>
                <span className="text-xs text-primary font-medium">{stat.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content: Courses */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">In-Progress Curriculum</h2>
              <button className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                View All <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid gap-4">
              {recentCourses.map((course, i) => (
                <div key={i} className="bg-surface-container-low p-6 rounded-2xl ghost-border flex items-center gap-6 group cursor-pointer hover:bg-white transition-all">
                  <div className={`w-16 h-16 ${course.color} rounded-xl flex items-center justify-center text-white shrink-0`}>
                    <Book size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                    <p className="text-xs text-on-surface/50 mb-4">Instructor: {course.instructor}</p>
                    <div className="w-full h-1.5 bg-on-surface/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full ${course.color}`}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold">{course.progress}%</span>
                    <p className="text-[10px] text-on-surface/40 uppercase">Completion</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar: Upcoming */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Upcoming Sessions</h2>
            <div className="bg-white p-6 rounded-2xl scholarly-shadow ghost-border space-y-6">
              {[
                { title: 'Classical Ethics Workshop', time: '14:00 PM', date: 'Today', color: 'border-primary' },
                { title: 'Physics Peer Review', time: '10:30 AM', date: 'Tomorrow', color: 'border-secondary' },
                { title: 'Rhetoric Masterclass', time: '09:00 AM', date: 'Fri, 14th', color: 'border-primary' }
              ].map((item, i) => (
                <div key={i} className={`pl-4 border-l-4 ${item.color} py-1`}>
                  <p className="text-[10px] font-bold text-on-surface/40 uppercase mb-1">{item.date} • {item.time}</p>
                  <h4 className="font-bold text-sm">{item.title}</h4>
                </div>
              ))}
              <button className="w-full py-3 bg-surface-container-low rounded-xl text-primary font-bold text-sm hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                <Calendar size={16} /> View Academic Calendar
              </button>
            </div>

            {/* Achievements Card */}
            <div className="bg-primary p-6 rounded-2xl text-white relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="font-bold mb-2">Dean's List Status</h4>
                <p className="text-sm text-white/80 mb-4">You are 4 credits away from the Honor Society qualification.</p>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-4/5 h-full bg-white" />
                </div>
              </div>
              <Award className="absolute -bottom-4 -right-4 text-white/10 w-24 h-24 rotate-12" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const Award: React.FC<any> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
);

export default StudentDashboard;
