import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchUsers, fetchCourses, createCourse, deleteCourse, assignTeacher, enrollStudent, removeStudent, deleteUser } from '../redux/slices/adminSlice';
import { BookOpen, GraduationCap, Users, Plus, Trash2, PencilLine, CheckCircle2 } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, courses, status } = useAppSelector((state) => state.admin);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<Record<string, string>>({});
  const [selectedStudent, setSelectedStudent] = useState<Record<string, string>>({});

  useEffect(() => {
    dispatch(fetchUsers({}));
    dispatch(fetchCourses());
  }, [dispatch]);

  const teachers = useMemo(() => users.filter((user) => user.role === 'teacher'), [users]);
  const students = useMemo(() => users.filter((user) => user.role === 'student'), [users]);
  const unassignedCourses = courses.filter((course) => !course.teacher);

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await dispatch(createCourse({ title: title.trim(), description: description.trim() }));
    setTitle('');
    setDescription('');
    dispatch(fetchCourses());
  };

  const handleAssignTeacher = async (courseId: string) => {
    const teacherId = selectedTeacher[courseId];
    if (!teacherId) return;

    await dispatch(assignTeacher({ id: courseId, teacherId }));
    dispatch(fetchCourses());
  };

  const handleEnrollStudent = async (courseId: string) => {
    const studentId = selectedStudent[courseId];
    if (!studentId) return;

    await dispatch(enrollStudent({ id: courseId, studentId }));
    dispatch(fetchCourses());
  };

  const handleRemoveStudent = async (courseId: string, studentId: string) => {
    await dispatch(removeStudent({ id: courseId, studentId }));
    dispatch(fetchCourses());
  };

  const stats = [
    { label: 'Students', value: students.length, icon: <GraduationCap className="text-primary" /> },
    { label: 'Teachers', value: teachers.length, icon: <Users className="text-secondary" /> },
    { label: 'Courses', value: courses.length, icon: <BookOpen className="text-primary" /> },
    { label: 'Unassigned', value: unassignedCourses.length, icon: <CheckCircle2 className="text-secondary" /> },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold mb-1 text-on-surface">Admin Panel</h1>
            <p className="text-on-surface/50 text-sm">Oversee courses, instructors, and student enrollment.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white p-6 rounded-2xl scholarly-shadow ghost-border"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-surface-container-low rounded-lg flex items-center justify-center">
                  {stat.icon}
                </div>
                <span className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest">{stat.label}</span>
              </div>
              <div className="text-3xl font-display font-bold">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid xl:grid-cols-[1.4fr_0.8fr] gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl scholarly-shadow ghost-border overflow-hidden">
              <div className="p-6 border-b border-on-surface/10">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Course Management</h2>
                  <span className="text-xs text-on-surface/50">{status === 'loading' ? 'Loading…' : `${courses.length} courses`}</span>
                </div>
              </div>
              <div className="divide-y divide-on-surface/10">
                {courses.map((course) => (
                  <div key={course._id} className="p-6 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-lg">{course.title}</h3>
                        <p className="text-sm text-on-surface/60">{course.description || 'No description provided.'}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 rounded-lg hover:bg-surface-container-low text-on-surface/60">
                          <PencilLine size={16} />
                        </button>
                        <button
                          onClick={() => dispatch(deleteCourse(course._id))}
                          className="p-2 rounded-lg hover:bg-error-container text-error"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-on-surface/40">Assigned Teacher</label>
                        <select
                          value={selectedTeacher[course._id] || course.teacher?._id || ''}
                          onChange={(e) => setSelectedTeacher((prev) => ({ ...prev, [course._id]: e.target.value }))}
                          className="input-field w-full"
                        >
                          <option value="">Unassigned</option>
                          {teachers.map((teacher) => (
                            <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                          ))}
                        </select>
                        <button onClick={() => handleAssignTeacher(course._id)} className="btn-primary text-sm">Assign</button>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-on-surface/40">Enroll Student</label>
                        <select
                          value={selectedStudent[course._id] || ''}
                          onChange={(e) => setSelectedStudent((prev) => ({ ...prev, [course._id]: e.target.value }))}
                          className="input-field w-full"
                        >
                          <option value="">Select student</option>
                          {students.map((student) => (
                            <option key={student._id} value={student._id}>{student.name}</option>
                          ))}
                        </select>
                        <button onClick={() => handleEnrollStudent(course._id)} className="btn-primary text-sm">Enroll</button>
                      </div>
                    </div>

                    <div className="rounded-xl bg-surface-container-low p-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-on-surface/60">Teacher: {course.teacherName}</span>
                        <span className="text-on-surface/60">Enrolled: {course.studentCount}</span>
                      </div>
                      {course.students && course.students.length > 0 ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {course.students.map((student) => (
                            <span key={student._id} className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm border border-on-surface/10">
                              {student.name}
                              <button onClick={() => handleRemoveStudent(course._id, student._id)} className="text-error">
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-3 text-sm text-on-surface/50">No students enrolled yet.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl scholarly-shadow ghost-border p-6">
              <h2 className="text-xl font-bold mb-4">Create Course</h2>
              <form onSubmit={handleCreateCourse} className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">Title</label>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} className="input-field w-full" placeholder="Course title" />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Description</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="input-field w-full min-h-[100px]" placeholder="Short course summary" />
                </div>
                <button type="submit" className="btn-primary flex items-center gap-2">
                  <Plus size={16} /> Create Course
                </button>
              </form>
            </div>

            <div className="bg-white rounded-2xl scholarly-shadow ghost-border overflow-hidden">
              <div className="p-6 border-b border-on-surface/10">
                <h2 className="text-xl font-bold">Users</h2>
              </div>
              <div className="divide-y divide-on-surface/10">
                {users.map((user) => (
                  <div key={user._id} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-on-surface/50 uppercase tracking-widest">{user.role}</p>
                    </div>
                    <button onClick={() => dispatch(deleteUser(user._id))} className="text-error text-sm">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
