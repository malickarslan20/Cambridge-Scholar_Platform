import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

const API_URL = import.meta.env.VITE_API_URL;

interface UserSummary {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
}

interface CourseSummary {
  _id: string;
  title: string;
  description?: string;
  teacher?: { _id: string; name: string; role: string } | null;
  students?: Array<{ _id: string; name: string; role: string }>;
  studentCount: number;
  teacherName: string;
}

interface AdminState {
  users: UserSummary[];
  courses: CourseSummary[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AdminState = {
  users: [],
  courses: [],
  status: 'idle',
  error: null,
};

const getAuthHeaders = (token: string | null) => ({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async ({ role }: { role?: string } = {}, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const res = await fetch(`${API_URL}/admin/users${role ? `?role=${role}` : ''}`, {
        headers: getAuthHeaders(state.auth.token),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || 'Failed to load users');
      return data;
    } catch {
      return rejectWithValue('Network error');
    }
  }
);

export const fetchCourses = createAsyncThunk(
  'admin/fetchCourses',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const res = await fetch(`${API_URL}/admin/courses`, {
        headers: getAuthHeaders(state.auth.token),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || 'Failed to load courses');
      return data;
    } catch {
      return rejectWithValue('Network error');
    }
  }
);

export const createCourse = createAsyncThunk(
  'admin/createCourse',
  async (payload: { title: string; description?: string }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const res = await fetch(`${API_URL}/admin/courses`, {
        method: 'POST',
        headers: getAuthHeaders(state.auth.token),
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || 'Failed to create course');
      return data;
    } catch {
      return rejectWithValue('Network error');
    }
  }
);

export const updateCourse = createAsyncThunk(
  'admin/updateCourse',
  async ({ id, payload }: { id: string; payload: { title?: string; description?: string } }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const res = await fetch(`${API_URL}/admin/courses/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(state.auth.token),
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || 'Failed to update course');
      return data;
    } catch {
      return rejectWithValue('Network error');
    }
  }
);

export const deleteCourse = createAsyncThunk(
  'admin/deleteCourse',
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const res = await fetch(`${API_URL}/admin/courses/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(state.auth.token),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || 'Failed to delete course');
      return { id };
    } catch {
      return rejectWithValue('Network error');
    }
  }
);

export const assignTeacher = createAsyncThunk(
  'admin/assignTeacher',
  async ({ id, teacherId }: { id: string; teacherId: string }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const res = await fetch(`${API_URL}/admin/courses/${id}/assign-teacher`, {
        method: 'PUT',
        headers: getAuthHeaders(state.auth.token),
        body: JSON.stringify({ teacherId }),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || 'Failed to assign teacher');
      return data;
    } catch {
      return rejectWithValue('Network error');
    }
  }
);

export const enrollStudent = createAsyncThunk(
  'admin/enrollStudent',
  async ({ id, studentId }: { id: string; studentId: string }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const res = await fetch(`${API_URL}/admin/courses/${id}/enroll-student`, {
        method: 'PUT',
        headers: getAuthHeaders(state.auth.token),
        body: JSON.stringify({ studentId }),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || 'Failed to enroll student');
      return data;
    } catch {
      return rejectWithValue('Network error');
    }
  }
);

export const removeStudent = createAsyncThunk(
  'admin/removeStudent',
  async ({ id, studentId }: { id: string; studentId: string }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const res = await fetch(`${API_URL}/admin/courses/${id}/remove-student`, {
        method: 'PUT',
        headers: getAuthHeaders(state.auth.token),
        body: JSON.stringify({ studentId }),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || 'Failed to remove student');
      return data;
    } catch {
      return rejectWithValue('Network error');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const res = await fetch(`${API_URL}/admin/users/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(state.auth.token),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || 'Failed to delete user');
      return { id };
    } catch {
      return rejectWithValue('Network error');
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserSummary[]>) => {
        state.users = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action: PayloadAction<CourseSummary[]>) => {
        state.courses = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action: PayloadAction<{ course: CourseSummary }>) => {
        state.courses = [action.payload.course, ...state.courses];
        state.status = 'succeeded';
      })
      .addCase(updateCourse.fulfilled, (state, action: PayloadAction<{ course: CourseSummary }>) => {
        state.courses = state.courses.map((course) => (course._id === action.payload.course._id ? action.payload.course : course));
        state.status = 'succeeded';
      })
      .addCase(deleteCourse.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
        state.courses = state.courses.filter((course) => course._id !== action.payload.id);
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
        state.users = state.users.filter((user) => user._id !== action.payload.id);
      })
      .addCase(assignTeacher.fulfilled, (state, action: PayloadAction<{ course: CourseSummary }>) => {
        state.courses = state.courses.map((course) => (course._id === action.payload.course._id ? action.payload.course : course));
      })
      .addCase(enrollStudent.fulfilled, (state, action: PayloadAction<{ course: CourseSummary }>) => {
        state.courses = state.courses.map((course) => (course._id === action.payload.course._id ? action.payload.course : course));
      })
      .addCase(removeStudent.fulfilled, (state, action: PayloadAction<{ course: CourseSummary }>) => {
        state.courses = state.courses.map((course) => (course._id === action.payload.course._id ? action.payload.course : course));
      })
      .addMatcher(
        (action) => action.type.startsWith('admin/') && action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('admin/') && action.type.endsWith('/rejected'),
        (state, action: { payload?: unknown }) => {
          state.status = 'failed';
          state.error = (action.payload as string) || null;
        }
      );
  },
});

export default adminSlice.reducer;
