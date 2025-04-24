import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login/Login';
import ProgramData from './pages/Program/ProgramData';

import { Provider } from 'react-redux';
import store from './stores/store';
import ContentPage from './pages/Content/ContentPage';
import StudentPage from './pages/Student/StudentPage';
import ClassPage from './pages/Classes/ClassPage';
import DashboardPage from './pages/Dashboard/DashboardPage.jsx';
import SchedulePage from './pages/Schedule/SchedulePage.jsx';
import Attendance from './pages/Attendance/Attendance.jsx';
import PaymentPage from './pages/Payment/PaymentPage.jsx';
import TeacherPage from './pages/Teacher/TeacherPage.jsx';
import HomePage from './pages/HomePage/Homepage.jsx';

import ProtectedRoute from './components/ProtectedRoute';
import DashboardTeacherage from './pages/TeacherView/DashboardTeacher/DashboardTeacherage.jsx';
import DarshboardStudent from './pages/StudentView/DashboardStudent/DarshboardStudent.jsx';
import ClassTeacherPage from './pages/TeacherView/ClassTeacher/ClassTeacherPage.jsx';
import StudentDataPage from './pages/TeacherView/StudentData/StudentDataPage.jsx';
import AttendancePage from './pages/TeacherView/Attendance/AttendancePage.jsx';
import ScorePage from './pages/TeacherView/Score/ScorePage.jsx';
import ScoreStudentPage from './pages/StudentView/ScoreStudent/ScoreStudentPage.jsx';
import AttendentStudentPage from './pages/StudentView/AttendanceStudent/AttendentStudentPage.jsx';
import ClassStudentPage from './pages/StudentView/ClassStudent/ClassStudentPage.jsx';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <HomePage/>,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute allowedRoles={['Admin', 'Teacher', 'Student']}>
      <Provider store={store}>
        <App />
      </Provider>
        
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute allowedRoles={['Admin' ]}>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/teacher',
        element: (
          <ProtectedRoute allowedRoles={["Teacher"]}>
            <DashboardTeacherage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/student',
        element: (
          <ProtectedRoute allowedRoles={["Student"]}>
            <DarshboardStudent />
          </ProtectedRoute>
        ),
      },
      {
        path: '/programs',
        element: (
          <ProtectedRoute allowedRoles={['Admin']}>
            <ProgramData />
          </ProtectedRoute>
        ),
      },
      {
        path: '/programs/:programId',
        element: (
          <ProtectedRoute allowedRoles={['Admin']}>
            <ContentPage/>
           </ProtectedRoute>
        ),
      },
      {
        path: '/students',
        element: (
          <ProtectedRoute allowedRoles={['Admin']}>
            <StudentPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/classes',
        element: (
          <ProtectedRoute allowedRoles={['Admin']}>
            <ClassPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/classes/:classId',
        element: (
          <ProtectedRoute allowedRoles={['Admin']}>
            <StudentPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/schedule',
        element: (
          <ProtectedRoute allowedRoles={['Admin']}>
            <SchedulePage/>
          </ProtectedRoute>
        ),
      },
      {
        path: '/attendance',
        element: (
          <ProtectedRoute allowedRoles={['Admin']}>
            <Attendance/>
          </ProtectedRoute>
        ),
      },
      {
        path: '/payment',
        element: (
          <ProtectedRoute allowedRoles={['Admin']}>
            <PaymentPage/>
          </ProtectedRoute>
        ),
      },
      {
        path: '/teachers',
        element: (
          <ProtectedRoute allowedRoles={['Admin']}>
            <TeacherPage/>
          </ProtectedRoute>
        ),
      },
      {
        path: '/classes/teacher',
        element: (
          <ProtectedRoute allowedRoles={['Teacher']}>
            <ClassTeacherPage/>
          </ProtectedRoute>
        ),
      },
      {
        path: '/classes/teacher/:classId',
        element: (
          <ProtectedRoute allowedRoles={['Teacher']}>
            <StudentDataPage/>
          </ProtectedRoute>
        ),
      },
      {
        path: '/teacher/attendance',
        element: (
          <ProtectedRoute allowedRoles={['Teacher']}>
            <AttendancePage/>
          </ProtectedRoute>
        ),
      },
      {
        path: '/teacher/score-entry',
        element: (
          <ProtectedRoute allowedRoles={['Teacher', 'Admin']}>
            <ScorePage/>
          </ProtectedRoute>
        ),
      },
      {
        path: '/score/student',
        element: (
          <ProtectedRoute allowedRoles={['Student']}>
            <ScoreStudentPage/>
          </ProtectedRoute>
        ),
      },
      {
        path: '/attendance/student',
        element: (
          <ProtectedRoute allowedRoles={['Student']}>
            <AttendentStudentPage/>
          </ProtectedRoute>
        ),
      },
      {
        path: '/classes/student',
        element: (
          <ProtectedRoute allowedRoles={['Student']}>
            <ClassStudentPage/>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/unauthorized',
    element: <h1>Không có quyền truy cập</h1>,
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);