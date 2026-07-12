import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/shared/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import StudentDashboard from './pages/StudentDashboard';
import StudentCourses from './pages/StudentCourses';
import StudentCommunity from './pages/StudentCommunity';
import StudentSettings from './pages/StudentSettings';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherCourses from './pages/TeacherCourses';
import TeacherCommunity from './pages/TeacherCommunity';
import TeacherSettings from './pages/TeacherSettings';
import AdminDashboard from './pages/AdminDashboard';
import CoursesPage from './pages/CoursesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import './index.css';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<MainLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="courses" element={<CoursesPage />} />
          </Route>

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard/student"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/student/courses"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/student/community"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentCommunity />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/student/settings"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/teacher"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/teacher/courses"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/teacher/community"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherCommunity />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/teacher/settings"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback for general dashboard path */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div className="p-10">Redirecting to your role-specific dashboard...</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;