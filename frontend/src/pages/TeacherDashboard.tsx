import React from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import { Users, FileText, CheckCircle2, Video, Plus, MoreVertical } from 'lucide-react';

const TeacherDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Scholars', value: '142', icon: <Users className="text-primary" />, trend: 'Across 4 courses' },
    { label: 'Grading Pending', value: '28', icon: <FileText className="text-secondary" />, trend: '7 new submissions' },
    { label: 'Avg. Attendance', value: '94%', icon: <CheckCircle2 className="text-primary" />, trend: 'Excellent engagement' },
    { label: 'Live Sessions', value: '12', icon: <Video className="text-secondary" />, trend: 'Scheduled this week' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold mb-1 text-on-surface">Instructional Hub</h1>
            <p className="text-on-surface/50 text-sm">Managing your curriculum and scholarly progress.</p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Plus size={18} /> New Module
          </button>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl scholarly-shadow ghost-border"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-surface-container-low rounded-lg flex items-center justify-center">
                  {stat.icon}
                </div>
                <span className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest">{stat.label}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-display font-bold">{stat.value}</span>
                <span className="text-[10px] text-on-surface/60 font-medium">{stat.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Courses */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              Current Courses <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">4 Active</span>
            </h2>
            
            <div className="grid gap-4">
              {[
                { title: 'Advanced Quantum Physics', students: 38, submissions: 12, health: 'Excellent' },
                { title: 'Visual Rhetoric: Digital Era', students: 45, submissions: 8, health: 'Good' },
                { title: 'The Ethics of Inquiry', students: 24, submissions: 15, health: 'Needs Review' }
              ].map((course, i) => (
                <div key={i} className="bg-surface-container-lowest p-6 rounded-2xl ghost-border hover:scholarly-shadow transition-all group">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                      <div className="flex gap-4 text-xs text-on-surface/50">
                        <span className="flex items-center gap-1"><Users size={12} /> {course.students} Scholars</span>
                        <span className="flex items-center gap-1"><FileText size={12} /> {course.submissions} Submissions</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        course.health === 'Excellent' ? 'bg-green-100 text-green-700' : 
                        course.health === 'Good' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {course.health}
                      </span>
                      <button className="text-on-surface/20 hover:text-on-surface transition-colors">
                        <MoreVertical size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grading Queue */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Grading Queue</h2>
            <div className="bg-white rounded-2xl scholarly-shadow ghost-border overflow-hidden">
              <div className="p-6 space-y-6">
                {[
                  { name: 'Arthur Montgomery', task: 'Quantum Final Essay', time: '2h ago' },
                  { name: 'Isabella Chen', task: 'Ethics Reflection', time: '5h ago' },
                  { name: 'Marcus Aurelius', task: 'Physics Lab Report', time: '1d ago' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-surface-container-low overflow-hidden border-2 border-transparent group-hover:border-primary transition-all">
                      <img src={`https://i.pravatar.cc/100?u=${item.name}`} alt="" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold group-hover:text-primary transition-colors">{item.name}</p>
                      <p className="text-xs text-on-surface/50 truncate max-w-[150px]">{item.task}</p>
                    </div>
                    <span className="text-[10px] text-on-surface/30 font-bold uppercase">{item.time}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 bg-surface-container-low text-primary font-bold text-sm hover:bg-primary/5 transition-all">
                Enter Grading Suite
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
