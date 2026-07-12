import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, ArrowRight, Settings } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  fetchMyCourses,
  enrollStudentInCourse,
  removeStudentFromCourse,
} from '../redux/slices/teacherSlice';
import { updateTeacherProfile, deleteTeacherProfile } from '../redux/slices/authSlice';

const TeacherSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authUser = useAppSelector((state) => state.auth.user);
  const { courses } = useAppSelector((state) => state.teacher);

  const [name, setName] = useState(authUser?.name || '');
  const [mobile, setMobile] = useState(authUser?.mobile || '');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(authUser?.avatar || '');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [rosterMessage, setRosterMessage] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchMyCourses());
  }, [dispatch]);

  useEffect(() => {
    if (authUser) {
      setName(authUser.name || '');
      setMobile(authUser.mobile || '');
      setAvatarPreview(authUser.avatar || '');
    }
  }, [authUser]);

  useEffect(() => {
    if (!selectedCourseId && courses.length > 0) {
      setSelectedCourseId(courses[0]._id);
    }
  }, [courses, selectedCourseId]);

  const selectedCourse = useMemo(
    () => courses.find((course: any) => course._id === selectedCourseId),
    [courses, selectedCourseId]
  );

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMessage(null);

    const result = await dispatch(updateTeacherProfile({ name, mobile, avatarFile }));
    if (updateTeacherProfile.fulfilled.match(result)) {
      setProfileMessage('Profile updated successfully.');
      setAvatarFile(null);
    } else {
      setProfileMessage((result.payload as string) || 'Failed to update profile.');
    }
  };

  const handleDeleteProfile = async () => {
    if (!window.confirm('Delete your profile and all teacher associations? This cannot be undone.')) {
      return;
    }

    const result = await dispatch(deleteTeacherProfile());
    if (deleteTeacherProfile.fulfilled.match(result)) {
      navigate('/login');
    } else {
      setProfileMessage((result.payload as string) || 'Failed to delete profile.');
    }
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseId || !studentEmail.trim()) return;

    setRosterMessage(null);
    const result = await dispatch(
      enrollStudentInCourse({ courseId: selectedCourseId, studentEmail: studentEmail.trim() })
    );

    if (enrollStudentInCourse.fulfilled.match(result)) {
      setRosterMessage('Student added to course roster.');
      setStudentEmail('');
    } else {
      setRosterMessage((result.payload as string) || 'Failed to add student.');
    }
  };

  const handleRemoveStudent = async (studentId: string) => {
    if (!selectedCourseId) return;
    setRosterMessage(null);

    const result = await dispatch(removeStudentFromCourse({ courseId: selectedCourseId, studentId }));
    if (removeStudentFromCourse.fulfilled.match(result)) {
      setRosterMessage('Student removed successfully.');
    } else {
      setRosterMessage((result.payload as string) || 'Failed to remove student.');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-on-surface">Teacher Settings</h1>
            <p className="text-sm text-on-surface/60">Update your profile and manage students in your courses.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="bg-white rounded-2xl scholarly-shadow ghost-border p-6 space-y-6">
            <div className="flex items-center gap-3">
              <Settings size={22} className="text-primary" />
              <div>
                <h2 className="text-xl font-bold">Profile settings</h2>
                <p className="text-sm text-on-surface/60">Maintain your teacher profile information.</p>
              </div>
            </div>

            <form onSubmit={handleProfileUpdate} className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Display Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field w-full"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Mobile Number</label>
                  <input
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="input-field w-full"
                    placeholder="e.g. +1 555 0123"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Upload profile picture</label>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setAvatarFile(file);
                    if (file) {
                      setAvatarPreview(URL.createObjectURL(file));
                    }
                  }}
                  className="input-field w-full"
                />
              </div>

              {avatarPreview && (
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-surface-container-low">
                    <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm text-on-surface/60">Preview</span>
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button type="submit" className="btn-primary px-6 py-3">Save profile</button>
                <button type="button" className="btn-secondary px-6 py-3 text-error" onClick={handleDeleteProfile}>
                  Delete profile
                </button>
              </div>

              {profileMessage && <p className="text-sm text-on-surface/70">{profileMessage}</p>}
            </form>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl shadow-inner p-6">
            <h2 className="text-xl font-bold mb-4">Course roster</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select course</label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="input-field w-full"
                >
                  {courses.map((course: any) => (
                    <option key={course._id} value={course._id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>

              <form onSubmit={handleAddStudent} className="grid gap-3">
                <label className="block text-sm font-medium">Add student by email</label>
                <div className="flex gap-2">
                  <input
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    className="input-field flex-1"
                    placeholder="student@example.com"
                  />
                  <button type="submit" className="btn-primary px-4 py-3">
                    <Plus size={16} />
                  </button>
                </div>
              </form>

              <div className="rounded-2xl bg-white p-4 border border-surface-container-low">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold">Enrolled students</p>
                  <span className="text-xs text-on-surface/50">{selectedCourse?.students?.length ?? 0} students</span>
                </div>
                {selectedCourse && selectedCourse.students?.length > 0 ? (
                  <div className="space-y-3">
                    {selectedCourse.students.map((student: any) => (
                      <div key={student._id} className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-surface-container-low">
                        <div>
                          <p className="font-medium text-sm">{student.name}</p>
                          <p className="text-xs text-on-surface/50">{student.email}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveStudent(student._id)}
                          className="text-error text-sm hover:text-error/80 flex items-center gap-2"
                        >
                          <Trash2 size={16} /> Remove
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-on-surface/50">Choose a course to see enrolled students.</p>
                )}
              </div>

              {rosterMessage && <p className="text-sm text-on-surface/70">{rosterMessage}</p>}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl scholarly-shadow ghost-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Profile summary</h2>
              <p className="text-sm text-on-surface/60">Your current teacher profile details.</p>
            </div>
            <ArrowRight size={20} className="text-primary" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-surface-container-low p-4">
              <p className="text-xs text-on-surface/50 uppercase tracking-[0.2em] mb-2">Name</p>
              <p className="font-semibold text-sm">{authUser?.name || 'Not set'}</p>
            </div>
            <div className="rounded-2xl bg-surface-container-low p-4">
              <p className="text-xs text-on-surface/50 uppercase tracking-[0.2em] mb-2">Mobile</p>
              <p className="font-semibold text-sm">{authUser?.mobile || 'Not set'}</p>
            </div>
            <div className="rounded-2xl bg-surface-container-low p-4">
              <p className="text-xs text-on-surface/50 uppercase tracking-[0.2em] mb-2">Email</p>
              <p className="font-semibold text-sm">{authUser?.email}</p>
            </div>
            <div className="rounded-2xl bg-surface-container-low p-4">
              <p className="text-xs text-on-surface/50 uppercase tracking-[0.2em] mb-2">Avatar</p>
              {authUser?.avatar ? (
                <img src={authUser.avatar} alt="Teacher avatar" className="w-20 h-20 rounded-full object-cover" />
              ) : (
                <p className="font-semibold text-sm text-on-surface/50">Not set</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherSettings;
