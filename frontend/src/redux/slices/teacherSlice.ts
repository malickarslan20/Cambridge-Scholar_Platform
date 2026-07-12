import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';

const API_URL = import.meta.env.VITE_API_URL;

interface CommunityGroup {
  courseId: string;
  courseTitle: string;
  students: Array<{ _id: string; name: string; email: string; role: string }>;
}

interface TeacherState {
  courses: any[];
  gradingQueue: any[];
  community: CommunityGroup[];
  stats: { totalStudents: number; totalCourses: number; pendingGrading: number; avgAttendance: number } | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TeacherState = {
  courses: [],
  gradingQueue: [],
  community: [],
  stats: null,
  status: 'idle',
  error: null,
};

const authHeader = (getState: () => RootState) => ({
  Authorization: `Bearer ${getState().auth.token}`,
});

export const fetchMyCourses = createAsyncThunk(
  'teacher/fetchCourses',
  async (_, { getState, rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/teacher/courses`, {
        headers: authHeader(getState as () => RootState),
      });
      if (!res.ok) throw new Error('Failed to fetch courses');
      return res.json();
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Error');
    }
  }
);

export const fetchGradingQueue = createAsyncThunk(
  'teacher/fetchGradingQueue',
  async (_, { getState, rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/teacher/grading-queue`, {
        headers: authHeader(getState as () => RootState),
      });
      if (!res.ok) throw new Error('Failed to fetch grading queue');
      return res.json();
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Error');
    }
  }
);

export const fetchDashboardStats = createAsyncThunk(
  'teacher/fetchStats',
  async (_, { getState, rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/teacher/stats`, {
        headers: authHeader(getState as () => RootState),
      });
      if (!res.ok) throw new Error('Failed to fetch stats');
      return res.json();
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Error');
    }
  }
);

export const createCourse = createAsyncThunk(
  'teacher/createCourse',
  async (
    payload: { title: string; description?: string },
    { getState, rejectWithValue }
  ) => {
    try {
      const res = await fetch(`${API_URL}/teacher/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeader(getState as () => RootState),
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to create course');
      }
      return res.json();
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Error');
    }
  }
);

export const enrollStudentInCourse = createAsyncThunk(
  'teacher/enrollStudent',
  async (
    payload: { courseId: string; studentEmail: string },
    { getState, rejectWithValue }
  ) => {
    try {
      const res = await fetch(`${API_URL}/teacher/courses/${payload.courseId}/enroll-student`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...authHeader(getState as () => RootState),
        },
        body: JSON.stringify({ studentEmail: payload.studentEmail }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to add student');
      }
      return res.json();
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Error');
    }
  }
);

export const removeStudentFromCourse = createAsyncThunk(
  'teacher/removeStudent',
  async (
    payload: { courseId: string; studentId: string },
    { getState, rejectWithValue }
  ) => {
    try {
      const res = await fetch(`${API_URL}/teacher/courses/${payload.courseId}/remove-student`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...authHeader(getState as () => RootState),
        },
        body: JSON.stringify({ studentId: payload.studentId }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to remove student');
      }
      return res.json();
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Error');
    }
  }
);

export const fetchCommunityStudents = createAsyncThunk(
  'teacher/fetchCommunityStudents',
  async (_, { getState, rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/teacher/community`, {
        headers: authHeader(getState as () => RootState),
      });
      if (!res.ok) throw new Error('Failed to fetch community students');
      return res.json();
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Error');
    }
  }
);

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyCourses.fulfilled, (state, action) => { state.courses = action.payload; })
      .addCase(fetchGradingQueue.fulfilled, (state, action) => { state.gradingQueue = action.payload; })
      .addCase(fetchCommunityStudents.fulfilled, (state, action) => { state.community = action.payload; })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => { state.stats = action.payload; })
      .addCase(createCourse.fulfilled, (state, action) => { state.courses.unshift(action.payload); })
      .addCase(enrollStudentInCourse.fulfilled, (state, action) => {
        state.courses = state.courses.map((course) =>
          course._id === action.payload._id ? action.payload : course
        );
      })
      .addCase(removeStudentFromCourse.fulfilled, (state, action) => {
        state.courses = state.courses.map((course) =>
          course._id === action.payload._id ? action.payload : course
        );
      })
      .addMatcher((action) => action.type.startsWith('teacher/') && action.type.endsWith('/pending'), (state) => {
        state.status = 'loading';
      })
      .addMatcher((action) => action.type.startsWith('teacher/') && action.type.endsWith('/rejected'), (state, action: any) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default teacherSlice.reducer;