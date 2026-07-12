import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';

const API_URL = import.meta.env.VITE_API_URL;

interface StudentState {
  courses: any[];
  community: Array<{ courseId: string; courseTitle: string; students: Array<{ _id: string; name: string; email: string; role: string; avatar?: string }> }>;
  dashboard: {
    totalCourses: number;
    completedAssignments: number;
    pendingAssignments: number;
    avgGrade: number;
    attendanceRate: number;
    courses: any[];
    upcomingAssignments: any[];
  } | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StudentState = {
  courses: [],
  dashboard: null,
  status: 'idle',
  error: null,
};

const authHeader = (getState: () => RootState) => ({
  Authorization: `Bearer ${getState().auth.token}`,
});

export const fetchStudentDashboard = createAsyncThunk(
  'student/fetchDashboard',
  async (_, { getState, rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/student/dashboard`, {
        headers: authHeader(getState as () => RootState),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to load dashboard');
      }
      return res.json();
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Error');
    }
  }
);

export const fetchStudentCourses = createAsyncThunk(
  'student/fetchCourses',
  async (_, { getState, rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/student/courses`, {
        headers: authHeader(getState as () => RootState),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to load courses');
      }
      return res.json();
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Error');
    }
  }
);

export const fetchStudentCommunity = createAsyncThunk(
  'student/fetchCommunity',
  async (_, { getState, rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/student/community`, {
        headers: authHeader(getState as () => RootState),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to load community');
      }
      return res.json();
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Error');
    }
  }
);

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentDashboard.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchStudentDashboard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dashboard = action.payload;
      })
      .addCase(fetchStudentDashboard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchStudentCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
      })
      .addCase(fetchStudentCommunity.fulfilled, (state, action) => {
        state.community = action.payload;
      });
  },
});

export default studentSlice.reducer;
