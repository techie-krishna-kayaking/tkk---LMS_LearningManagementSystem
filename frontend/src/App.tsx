import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminRoute } from './components/AdminRoute';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminCourseImportPage } from './pages/admin/AdminCourseImportPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { CatalogPage } from './pages/public/CatalogPage';
import { HomePage } from './pages/public/HomePage';
import { LoginPage } from './pages/public/LoginPage';
import { NotesPage } from './pages/public/NotesPage';
import { SignupPage } from './pages/public/SignupPage';
import { CheckoutPage } from './pages/student/CheckoutPage';
import { CourseProgressPage } from './pages/student/CourseProgressPage';
import { DashboardPage } from './pages/student/DashboardPage';
import { LessonPlayerPage } from './pages/student/LessonPlayerPage';
import { ProfilePage } from './pages/student/ProfilePage';
import { SettingsPage } from './pages/student/SettingsPage';

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/course/:courseId"
          element={
            <ProtectedRoute>
              <CourseProgressPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/lesson/:courseId/:lessonId"
          element={
            <ProtectedRoute>
              <LessonPlayerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/content-import"
          element={
            <AdminRoute>
              <AdminCourseImportPage />
            </AdminRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
