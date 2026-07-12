import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, ChevronRight } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchStudentCourses } from '../redux/slices/studentSlice';

const StudentCourses: React.FC = () => {
  const dispatch = useAppDispatch();
  const { courses, status, error } = useAppSelector((state) => state.student);

  useEffect(() => {
    dispatch(fetchStudentCourses());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold mb-1 text-on-surface">My Learning Path</h1>
            <p className="text-on-surface/50 text-sm">View the courses you are enrolled in and follow your progress.</p>
          </div>
          <span className="text-sm text-on-surface/60">{courses.length} course{courses.length === 1 ? '' : 's'}</span>
        </header>

        {status === 'loading' && !courses.length ? (
          <p className="text-on-surface/50">Loading your courses...</p>
        ) : null}

        {error && <p className="text-error text-sm">{error}</p>}

        <div className="grid gap-6 lg:grid-cols-2">
          {courses.length === 0 ? (
            <div className="bg-white rounded-2xl scholarly-shadow ghost-border p-6">
              <p className="text-on-surface/50">You are not enrolled in any courses yet. Check the learning catalog to join a class.</p>
            </div>
          ) : (
            courses.map((course: any) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl scholarly-shadow ghost-border p-6"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-xl font-bold">{course.title}</h2>
                    <p className="text-sm text-on-surface/50">Instructor: {course.teacher?.name || 'TBA'}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-surface-container-high px-3 py-1 text-xs font-semibold text-on-surface/70">
                    {course.studentCount ?? course.students?.length ?? 0} learners
                  </span>
                </div>
                <p className="text-sm text-on-surface/60 mb-6">{course.description || 'No course description available.'}</p>
                <div className="flex items-center justify-between gap-4 text-xs text-on-surface/50">
                  <span className="inline-flex items-center gap-2">
                    <BookOpen size={14} /> Course details
                  </span>
                  <button className="text-primary font-semibold inline-flex items-center gap-2">
                    Continue <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentCourses;
