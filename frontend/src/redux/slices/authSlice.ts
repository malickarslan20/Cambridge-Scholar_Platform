import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

const API_URL = import.meta.env.VITE_API_URL;

export type UserRole = 'student' | 'teacher' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  mobile?: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Rehydrate from localStorage on load, so refresh doesn't log the user out
const savedUser = localStorage.getItem('academy_user');
const savedToken = localStorage.getItem('academy_token');

const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: savedToken || null,
  status: 'idle',
  error: null,
};

const authHeader = (getState: () => RootState) => ({
  Authorization: `Bearer ${getState().auth.token}`,
});

// --- Async thunks ---

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message || 'Login failed');
      }
      return data; // { token, user }
    } catch {
      return rejectWithValue('Network error — please try again');
    }
  }
);

export const signupUser = createAsyncThunk(
  'auth/signup',
  async (
    payload: { name: string; email: string; password: string; role: UserRole },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message || 'Signup failed');
      }
      return data; // { token, user }
    } catch {
      return rejectWithValue('Network error — please try again');
    }
  }
);

export const updateTeacherProfile = createAsyncThunk(
  'auth/updateProfile',
  async (
    profile: { name?: string; mobile?: string; avatarFile?: File | null },
    { getState, rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      if (profile.name !== undefined) formData.append('name', profile.name);
      if (profile.mobile !== undefined) formData.append('mobile', profile.mobile);
      if (profile.avatarFile) formData.append('avatar', profile.avatarFile);

      const res = await fetch(`${API_URL}/teacher/profile`, {
        method: 'PUT',
        headers: {
          ...authHeader(getState as () => RootState),
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message || 'Failed to update profile');
      }
      return data;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Network error');
    }
  }
);

export const updateStudentProfile = createAsyncThunk(
  'auth/updateStudentProfile',
  async (
    profile: { name?: string; mobile?: string; avatarFile?: File | null },
    { getState, rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      if (profile.name !== undefined) formData.append('name', profile.name);
      if (profile.mobile !== undefined) formData.append('mobile', profile.mobile);
      if (profile.avatarFile) formData.append('avatar', profile.avatarFile);

      const res = await fetch(`${API_URL}/student/profile`, {
        method: 'PUT',
        headers: {
          ...authHeader(getState as () => RootState),
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message || 'Failed to update profile');
      }
      return data;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Network error');
    }
  }
);

export const deleteTeacherProfile = createAsyncThunk(
  'auth/deleteProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/teacher/profile`, {
        method: 'DELETE',
        headers: authHeader(getState as () => RootState),
      });
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message || 'Failed to delete profile');
      }
      return data;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Network error');
    }
  }
);

// --- Slice ---

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('academy_user');
      localStorage.removeItem('academy_token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('academy_user', JSON.stringify(action.payload.user));
        localStorage.setItem('academy_token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Login failed';
      })
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('academy_user', JSON.stringify(action.payload.user));
        localStorage.setItem('academy_token', action.payload.token);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Signup failed';
      })
      .addCase(updateTeacherProfile.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
        state.user = action.payload.user;
        localStorage.setItem('academy_user', JSON.stringify(action.payload.user));
      })
      .addCase(updateStudentProfile.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
        state.user = action.payload.user;
        localStorage.setItem('academy_user', JSON.stringify(action.payload.user));
      })
      .addCase(deleteTeacherProfile.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem('academy_user');
        localStorage.removeItem('academy_token');
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;