import React, { useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchStudentCommunity } from '../redux/slices/studentSlice';

const StudentCommunity: React.FC = () => {
  const dispatch = useAppDispatch();
  const { community, status, error } = useAppSelector((state) => state.student);

  useEffect(() => {
    dispatch(fetchStudentCommunity());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold mb-1 text-on-surface">Student Community</h1>
            <p className="text-on-surface/50 text-sm">Discover peers in your enrolled courses and connect with learners.</p>
          </div>
          <span className="text-sm text-on-surface/60">{community.reduce((count, group) => count + group.students.length, 0)} learners</span>
        </header>

        {status === 'loading' && <p className="text-on-surface/50">Loading course community...</p>}
        {error && <p className="text-error text-sm">{error}</p>}

        <div className="space-y-6">
          {community.length === 0 ? (
            <div className="bg-white rounded-2xl scholarly-shadow ghost-border p-6">
              <p className="text-on-surface/50">No classmates found yet. Enroll in a course to see your learning community.</p>
            </div>
          ) : (
            community.map((group) => (
              <section key={group.courseId} className="bg-white rounded-3xl scholarly-shadow ghost-border p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">{group.courseTitle}</h2>
                    <p className="text-sm text-on-surface/50">{group.students.length} peer{group.students.length === 1 ? '' : 's'}</p>
                  </div>
                </div>

                <div className="grid gap-4">
                  {group.students.map((student) => (
                    <div key={student._id} className="border border-surface-container-low rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <p className="font-semibold text-base">{student.name}</p>
                        <p className="text-xs text-on-surface/50">{student.email}</p>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-surface-container-high px-3 py-1 text-xs font-semibold text-on-surface/70">
                        {student.role}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentCommunity;
