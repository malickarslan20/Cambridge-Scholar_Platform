import React from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import { UserCircle, TrendingUp, MessageCircle, AlertCircle } from 'lucide-react';

const ParentDashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header className="bg-primary/5 p-8 rounded-3xl ghost-border border-primary/10 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border-2 border-primary/20">
                <UserCircle size={48} />
              </div>
              <div>
                <p className="text-xs text-on-surface/50 uppercase tracking-widest font-bold mb-1">Monitoring Progress for</p>
                <h1 className="text-3xl font-display font-bold">Arthur Montgomery</h1>
                <div className="flex gap-4 mt-2">
                  <span className="text-sm bg-white px-2 py-0.5 rounded-full ghost-border font-bold">Class of 2024</span>
                  <span className="text-sm bg-white px-2 py-0.5 rounded-full ghost-border font-bold text-primary">GPA: 3.92</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="btn-primary flex items-center gap-2">
                <MessageCircle size={18} /> Contact Mentors
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Academic Performance */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                Recent Academic Performance <TrendingUp size={18} className="text-primary" />
              </h2>
              <div className="grid gap-4">
                {[
                  { subject: 'Quantum Physics', grade: 'A', feedback: 'Exceptional synthesis of theory.', date: 'Oct 12' },
                  { subject: 'Ethics & Philosophy', grade: 'A-', feedback: 'Profound insights in recent essay.', date: 'Oct 10' },
                  { subject: 'Rhetoric & Design', grade: 'A+', feedback: 'Visual project set a new standard.', date: 'Oct 05' }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl scholarly-shadow ghost-border flex items-center justify-between group cursor-default hover:border-primary/20 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-surface-container-low rounded-xl flex items-center justify-center font-display font-bold text-primary text-xl">
                        {item.grade}
                      </div>
                      <div>
                        <h4 className="font-bold">{item.subject}</h4>
                        <p className="text-xs text-on-surface/50">"{item.feedback}"</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-on-surface/30 uppercase">{item.date}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Attendance & Engagement */}
            <section className="bg-surface-container-low p-8 rounded-3xl ghost-border">
              <h3 className="font-bold mb-6">Attendance & Scholarly Engagement</h3>
              <div className="flex justify-between items-end gap-2 h-40">
                {[85, 90, 100, 95, 100, 100, 98].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      className={`w-full max-w-[40px] rounded-t-lg transition-all ${height === 100 ? 'bg-primary' : 'bg-primary/40 group-hover:bg-primary/60'}`}
                    />
                    <span className="text-[10px] font-bold text-on-surface/30 uppercase">Day {i + 1}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            {/* Mentor Communications */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold">Mentor Correspondence</h2>
              <div className="bg-white rounded-2xl scholarly-shadow ghost-border p-6 space-y-6">
                {[
                  { mentor: 'Dr. Sterling', msg: 'Arthur has shown great maturity...', time: '1d ago' },
                  { mentor: 'Prof. Vance', msg: 'Excellent progress in Calculus...', time: '3d ago' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-surface-container-low flex-shrink-0" />
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-bold">{item.mentor}</span>
                        <span className="text-[10px] text-on-surface/30">{item.time}</span>
                      </div>
                      <p className="text-xs text-on-surface/60 line-clamp-2">{item.msg}</p>
                    </div>
                  </div>
                ))}
                <button className="w-full py-3 bg-primary/5 text-primary rounded-xl font-bold text-xs hover:bg-primary/10 transition-all">
                  Open Inbox
                </button>
              </div>
            </section>

            {/* Financial Overview */}
            <section className="bg-secondary p-6 rounded-2xl text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-bold mb-1">Credits & Funding</h3>
                <p className="text-sm text-white/70 mb-6 font-medium">Next Term Installment Due</p>
                <div className="flex justify-between items-end">
                  <span className="text-3xl font-display font-bold">$12,400</span>
                  <button className="px-4 py-2 bg-white text-secondary rounded-lg font-bold text-xs shadow-lg shadow-black/10">
                    Settle Account
                  </button>
                </div>
              </div>
              <AlertCircle className="absolute -bottom-4 -right-4 text-white/10 w-24 h-24 rotate-12" />
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ParentDashboard;
