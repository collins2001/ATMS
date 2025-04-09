import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { Layout } from './components/layout';

// Pages
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import ClassRepDashboard from './components/pages/ClassRepDashboard';
import StudentDashboard from './components/pages/StudentDashboard';
import NotificationsPage from './components/pages/NotificationsPage';
import SettingsPage from './components/pages/SettingsPage';
import ProfilePage from './components/pages/ProfilePage';

// Admin Components (reused for class reps)
import AdminDashboard from './components/admin/AdminDashboard';
import Assignment from './components/admin/assignment';
import AddAssignment from './components/admin/AddAssignment';
import EditAssignment from './components/admin/EditAssignment';
import ViewTt from './components/admin/Timetable/viewTt';
import EditTt from './components/admin/Timetable/editTt';
import AddTt from './components/admin/Timetable/addtt';
import ViewAllAnnouncements from './components/admin/Announcements/viewAll';
import AddAnnouncement from './components/admin/Announcements/addAnn';
import EditAnnouncement from './components/admin/Announcements/editAnn';
import ViewOneAnnouncement from './components/admin/Announcements/viewOneAnn';
import DeleteAnnouncement from './components/admin/Announcements/deleteAnn';
import ViewAllNotes from './components/admin/Notes/viewAll';
import AddNotes from './components/admin/Notes/addNote';
import UpdateNotes from './components/admin/Notes/updateNotes';
import ViewOneNotes from './components/admin/Notes/viewOneNotes';
import DeleteNotes from './components/admin/Notes/deleteNote';
import UserManagement from './components/admin/UserManagement';

// Student Components
import StudentAnnouncements from './components/student/StudentAnnouncements';
import StudentNotes from './components/student/StudentNotes';
import StudentAssignments from './components/student/StudentAssignments';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  const { user } = useAuth();

  // Determine the default dashboard based on user role
  const getDefaultDashboard = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'class_rep':
        return '/class-rep/dashboard';
      case 'student':
        return '/dashboard';
      default:
        return '/login';
    }
  };

  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes with Layout */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['student']}>
            <Layout>
              <StudentDashboard />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Layout>
              <AdminDashboard />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/class-rep/dashboard" element={
          <ProtectedRoute allowedRoles={['class_rep']}>
            <Layout>
              <ClassRepDashboard />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/assignments" element={
          <ProtectedRoute allowedRoles={['student', 'class_rep', 'admin']}>
            <Layout>
              <AssignmentsRouter />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/addAssign" element={
          <ProtectedRoute allowedRoles={['class_rep', 'admin']}>
            <Layout>
              <AddAssignment />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/editAssign/:id" element={
          <ProtectedRoute allowedRoles={['class_rep', 'admin']}>
            <Layout>
              <EditAssignment />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Timetable Routes */}
        <Route path="/timetable" element={
          <ProtectedRoute allowedRoles={['student', 'class_rep', 'admin']}>
            <Layout>
              <ViewTt />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/add-timetable" element={
          <ProtectedRoute allowedRoles={['class_rep', 'admin']}>
            <Layout>
              <AddTt />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/edit-timetable/:id" element={
          <ProtectedRoute allowedRoles={['class_rep', 'admin']}>
            <Layout>
              <EditTt />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Announcement Routes */}
        <Route path="/admin/announcements" element={
          <ProtectedRoute allowedRoles={['class_rep', 'admin']}>
            <Layout>
              <ViewAllAnnouncements />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/admin/announcements/add" element={
          <ProtectedRoute allowedRoles={['class_rep', 'admin']}>
            <Layout>
              <AddAnnouncement />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/admin/announcements/edit/:id" element={
          <ProtectedRoute allowedRoles={['class_rep', 'admin']}>
            <Layout>
              <EditAnnouncement />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/admin/announcements/view/:id" element={
          <ProtectedRoute allowedRoles={['student', 'class_rep', 'admin']}>
            <Layout>
              <ViewOneAnnouncement />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/admin/announcements/delete/:id" element={
          <ProtectedRoute allowedRoles={['class_rep', 'admin']}>
            <Layout>
              <DeleteAnnouncement />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Notes Routes */}
        <Route path="/admin/notes" element={
          <ProtectedRoute allowedRoles={['class_rep', 'admin']}>
            <Layout>
              <ViewAllNotes />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/admin/notes/add" element={
          <ProtectedRoute allowedRoles={['class_rep', 'admin']}>
            <Layout>
              <AddNotes />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/admin/notes/edit/:id" element={
          <ProtectedRoute allowedRoles={['class_rep', 'admin']}>
            <Layout>
              <UpdateNotes />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/admin/notes/view/:id" element={
          <ProtectedRoute allowedRoles={['student', 'class_rep', 'admin']}>
            <Layout>
              <ViewOneNotes />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/admin/notes/delete/:id" element={
          <ProtectedRoute allowedRoles={['class_rep', 'admin']}>
            <Layout>
              <DeleteNotes />
            </Layout>
          </ProtectedRoute>
        } />

        {/* User Management Route */}
        <Route path="/admin/users" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Layout>
              <UserManagement />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Notifications Route (Accessible to all logged-in users) */}
        <Route path="/notifications" element={
          <ProtectedRoute allowedRoles={['student', 'class_rep', 'admin']}> 
            <Layout>
              <NotificationsPage />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Settings Route (Accessible to all logged-in users) */}
        <Route path="/settings" element={
          <ProtectedRoute allowedRoles={['student', 'class_rep', 'admin']}> 
            <Layout>
              <SettingsPage />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Student Routes */}
        <Route path="/student/announcements" element={
          <ProtectedRoute allowedRoles={['student']}>
            <Layout>
              <StudentAnnouncements />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/student/notes" element={
          <ProtectedRoute allowedRoles={['student']}>
            <Layout>
              <StudentNotes />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Profile Route */}
        <Route path="/profile" element={
          <ProtectedRoute allowedRoles={['student', 'class_rep', 'admin']}>
            <Layout>
              <ProfilePage />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Redirect root to appropriate dashboard */}
        <Route path="/" element={<Navigate to={getDefaultDashboard()} />} />
      </Routes>
    </div>
  );
}

const AssignmentsRouter = () => {
  const { user } = useAuth();
  return user?.role === 'student' ? <StudentAssignments /> : <Assignment />;
};

export default App; 