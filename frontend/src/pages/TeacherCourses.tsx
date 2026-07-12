import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import { Users, BookOpen, Plus, Trash2 } from 'lucide-react';
import { fetchMyCourses, createCourse } from '../redux/slices/teacherSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const TeacherCourses: React.FC = () => {
  const dispatch = useAppDispatch();
  const { courses, status, error } = useAppSelector((state) => state.teacher);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchMyCourses());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setIsSubmitting(true);
    await dispatch(createCourse({ title: title.trim(), description: description.trim() }));
    setTitle('');
    setDescription('');
    setIsSubmitting(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold mb-1 text-on-surface">My Courses</h1>
            <p className="text-on-surface/50 text-sm">Create and manage the courses you teach.</p>
          </div>
          <span className="text-sm text-on-surface/60">{courses.length} active course(s)</span>
        </header>

        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl scholarly-shadow ghost-border p-6">
              <h2 className="text-xl font-bold mb-4">Create New Module</h2>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-field w-full"
                    placeholder="Module title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input-field w-full min-h-24"
                    placeholder="Short module description"
                  />
                </div>
                <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                  <Plus size={16} /> {isSubmitting ? 'Creating...' : 'Add Module'}
                </button>
                {error && <p className="text-error text-sm">{error}</p>}
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl scholarly-shadow ghost-border p-6">
              <h2 className="text-xl font-bold mb-4">Course List</h2>
              <div className="space-y-4">
                {status === 'loading' && !courses.length ? (
                  <p className="text-on-surface/50 text-sm">Loading courses...</p>
                ) : courses.length === 0 ? (
                  <p className="text-on-surface/50 text-sm">No courses found. Add your first module above.</p>
                ) : (
                  courses.map((course: any) => (
                    <motion.div
                      key={course._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-surface-container-low p-4 rounded-2xl ghost-border flex flex-col gap-3"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-lg">{course.title}</h3>
                          <p className="text-xs text-on-surface/50">{course.description || 'No description provided.'}</p>
                        </div>
                        <button className="text-on-surface/40 hover:text-error transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs text-on-surface/50">
                        <span className="inline-flex items-center gap-2">
                          <BookOpen size={14} /> {course.students?.length ?? 0} students
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <Users size={14} /> Assigned to you
                        </span>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherCourses;
