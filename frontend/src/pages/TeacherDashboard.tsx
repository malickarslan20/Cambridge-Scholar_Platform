import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import { Users, FileText, CheckCircle2, Video } from 'lucide-react';
import { fetchDashboardStats, fetchGradingQueue } from '../redux/slices/teacherSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

interface GradingQueueItem {
  _id: string;
  submittedAt: string;
  student?: { name?: string };
  assignment?: { title?: string };
}

const TeacherDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { gradingQueue, stats, status } = useAppSelector((state) => state.teacher);
  const gradingQueueItems = gradingQueue as GradingQueueItem[];

  useEffect(() => {
    dispatch(fetchGradingQueue());
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  // Loading guard — stats is null until the fetch resolves
  if (status === 'loading' && !stats) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center text-on-surface/50">Loading overview...</div>
      </DashboardLayout>
    );
  }

  // Transform the stats object into display cards
  const statCards = stats
    ? [
        { label: 'Total Scholars', value: stats.totalStudents, icon: <Users className="text-primary" />, trend: `Across ${stats.totalCourses} courses` },
        { label: 'Grading Pending', value: stats.pendingGrading, icon: <FileText className="text-secondary" />, trend: 'submissions' },
        { label: 'Avg. Attendance', value: `${stats.avgAttendance}%`, icon: <CheckCircle2 className="text-primary" />, trend: 'Engagement' },
        { label: 'Total Courses', value: stats.totalCourses, icon: <Video className="text-secondary" />, trend: 'Taught by you' },
      ]
    : [];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold mb-1 text-on-surface">Teacher Overview</h1>
            <p className="text-on-surface/50 text-sm">Track your teaching performance and pending grading items.</p>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, i) => (
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

        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          <div className="bg-white rounded-2xl scholarly-shadow ghost-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Grading Queue</h2>
              <span className="text-sm text-on-surface/50">Priority assignments</span>
            </div>
            <div className="space-y-4">
              {gradingQueue.length === 0 ? (
                <p className="text-on-surface/50 text-sm">No pending submissions in your queue.</p>
              ) : (
                gradingQueueItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 p-4 border border-surface-container-low rounded-2xl">
                    <div className="w-12 h-12 rounded-full bg-surface-container-low overflow-hidden shrink-0">
                      <img src={`https://i.pravatar.cc/100?u=${item.student?.name}`} alt={item.student?.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{item.student?.name}</p>
                      <p className="text-xs text-on-surface/50">{item.assignment?.title}</p>
                    </div>
                    <span className="text-[10px] text-on-surface/40 uppercase tracking-[0.2em]">
                      {new Date(item.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </div>
            <button className="mt-6 w-full btn-secondary">Open grading suite</button>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl shadow-inner p-6 space-y-4">
            <div>
              <h2 className="text-xl font-bold">Focus</h2>
              <p className="text-sm text-on-surface/60">Use My Courses to create modules and manage your teaching roster.</p>
            </div>
            <div className="space-y-3">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold">Next action</p>
                <p className="text-xs text-on-surface/50">Review submissions or add new modules from My Courses.</p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold">Teaching tip</p>
                <p className="text-xs text-on-surface/50">Keep module goals measurable and update students regularly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;