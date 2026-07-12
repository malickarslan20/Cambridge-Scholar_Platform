import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import { Book, Clock, GraduationCap, TrendingUp, Calendar, ChevronRight } from 'lucide-react';
import { fetchStudentDashboard } from '../redux/slices/studentSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const StudentDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { dashboard, status, error } = useAppSelector((state) => state.student);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchStudentDashboard());
  }, [dispatch]);

  if (status === 'loading' && !dashboard) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center text-on-surface/50">Loading student dashboard...</div>
      </DashboardLayout>
    );
  }

  if (status === 'failed') {
    return (
      <DashboardLayout>
        <div className="p-8 text-center text-error">{error || 'Unable to load dashboard.'}</div>
      </DashboardLayout>
    );
  }

  const stats = dashboard
    ? [
        { label: 'Active Courses', value: dashboard.totalCourses, icon: <Book className="text-primary" />, trend: 'Current enrollment' },
        { label: 'Completed Assignments', value: dashboard.completedAssignments, icon: <GraduationCap className="text-secondary" />, trend: 'Recently graded' },
        { label: 'Pending Assignments', value: dashboard.pendingAssignments, icon: <Clock className="text-primary" />, trend: 'Needs attention' },
        { label: 'Attendance Rate', value: `${dashboard.attendanceRate}%`, icon: <TrendingUp className="text-secondary" />, trend: 'Current rate' },
      ]
    : [];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <section>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-display font-bold mb-2"
          >
            Welcome back, <span className="text-primary">{user?.name || 'Scholar'}</span>
          </motion.h1>
          <p className="text-on-surface/60 italic">Your student dashboard shows your enrolled courses, grades, and upcoming work.</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl scholarly-shadow ghost-border"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-surface-container-low rounded-xl flex items-center justify-center">
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

        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          <div className="bg-white rounded-2xl scholarly-shadow ghost-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">My Courses</h2>
              <button
                type="button"
                onClick={() => navigate('/dashboard/student/courses')}
                className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all"
              >
                View All <ChevronRight size={16} />
              </button>
            </div>
            <div className="space-y-4">
              {dashboard?.courses.length === 0 ? (
                <p className="text-on-surface/50 text-sm">You are not enrolled in any courses yet.</p>
              ) : (
                dashboard?.courses.map((course: any) => (
                  <div key={course._id} className="bg-surface-container-low p-4 rounded-2xl ghost-border">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-lg">{course.title}</h3>
                        <p className="text-xs text-on-surface/50">Instructor: {course.teacher}</p>
                      </div>
                      <span className="text-xs text-on-surface/50">{course.studentCount} students</span>
                    </div>
                    <p className="mt-3 text-sm text-on-surface/60">{course.description}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-surface-container-lowest rounded-2xl shadow-inner p-6">
              <h2 className="text-xl font-bold mb-4">Upcoming Assignments</h2>
              {dashboard?.upcomingAssignments.length === 0 ? (
                <p className="text-on-surface/50 text-sm">No upcoming assignments found.</p>
              ) : (
                dashboard?.upcomingAssignments.map((assignment: any) => (
                  <div key={assignment._id} className="rounded-2xl bg-white p-4 ghost-border">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <p className="font-semibold text-sm">{assignment.title}</p>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface/50">Due</p>
                    </div>
                    <p className="text-xs text-on-surface/50">{new Date(assignment.dueDate).toLocaleDateString()}</p>
                  </div>
                ))
              )}
            </div>
            <div className="bg-white rounded-2xl scholarly-shadow ghost-border p-6">
              <h2 className="text-xl font-bold mb-4">Study Progress</h2>
              <p className="text-sm text-on-surface/60 mb-4">Stay on top of pending assignments and keep your attendance strong.</p>
              <div className="w-full h-3 bg-on-surface/10 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${dashboard?.attendanceRate || 0}%` }} />
              </div>
              <p className="mt-3 text-xs text-on-surface/50">Attendance rate</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
