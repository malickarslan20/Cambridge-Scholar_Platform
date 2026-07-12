import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Settings } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { updateStudentProfile } from '../redux/slices/authSlice';

const StudentSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authUser = useAppSelector((state) => state.auth.user);

  const [name, setName] = useState(authUser?.name || '');
  const [mobile, setMobile] = useState(authUser?.mobile || '');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(authUser?.avatar || '');
  const [profileMessage, setProfileMessage] = useState<string | null>(null);

  useEffect(() => {
    if (authUser) {
      setName(authUser.name || '');
      setMobile(authUser.mobile || '');
      setAvatarPreview(authUser.avatar || '');
    }
  }, [authUser]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMessage(null);

    const result = await dispatch(updateStudentProfile({ name, mobile, avatarFile }));
    if (updateStudentProfile.fulfilled.match(result)) {
      setProfileMessage('Profile updated successfully.');
      setAvatarFile(null);
    } else {
      setProfileMessage((result.payload as string) || 'Failed to update profile.');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-on-surface">Student Settings</h1>
            <p className="text-sm text-on-surface/60">Update your learner profile and account preferences.</p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/dashboard/student')}
            className="btn-secondary px-4 py-2"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="bg-white rounded-2xl scholarly-shadow ghost-border p-6 space-y-6">
            <div className="flex items-center gap-3">
              <Settings size={22} className="text-primary" />
              <div>
                <h2 className="text-xl font-bold">Profile settings</h2>
                <p className="text-sm text-on-surface/60">Keep your learner profile details up to date.</p>
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
              </div>

              {profileMessage && <p className="text-sm text-on-surface/70">{profileMessage}</p>}
            </form>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl shadow-inner p-6">
            <h2 className="text-xl font-bold mb-4">Account summary</h2>
            <div className="grid gap-4">
              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs text-on-surface/50 uppercase tracking-[0.2em] mb-2">Name</p>
                <p className="font-semibold text-sm">{authUser?.name || 'Not set'}</p>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs text-on-surface/50 uppercase tracking-[0.2em] mb-2">Mobile</p>
                <p className="font-semibold text-sm">{authUser?.mobile || 'Not set'}</p>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs text-on-surface/50 uppercase tracking-[0.2em] mb-2">Email</p>
                <p className="font-semibold text-sm">{authUser?.email}</p>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs text-on-surface/50 uppercase tracking-[0.2em] mb-2">Avatar</p>
                {authUser?.avatar ? (
                  <img src={authUser.avatar} alt="Student avatar" className="w-20 h-20 rounded-full object-cover" />
                ) : (
                  <p className="font-semibold text-sm text-on-surface/50">Not set</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl scholarly-shadow ghost-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Profile health</h2>
              <p className="text-sm text-on-surface/60">Complete your learner profile so teachers can connect with you easily.</p>
            </div>
            <ArrowRight size={20} className="text-primary" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-surface-container-low p-4">
              <p className="text-xs text-on-surface/50 uppercase tracking-[0.2em] mb-2">Profile completeness</p>
              <p className="font-semibold text-sm">{authUser?.name && authUser?.avatar ? 'Complete' : 'Incomplete'}</p>
            </div>
            <div className="rounded-2xl bg-surface-container-low p-4">
              <p className="text-xs text-on-surface/50 uppercase tracking-[0.2em] mb-2">Recommended next step</p>
              <p className="font-semibold text-sm">Upload a profile picture and confirm your contact details.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentSettings;
