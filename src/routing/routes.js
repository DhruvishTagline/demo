import React, { Suspense, lazy } from 'react';
import { Outlet } from 'react-router';
import { ALL_EXAM, ALL_STUDENT, CREATE_EXAM, EDIT_EXAM, FORGET_PASSWORD, GIVE_EXAM, HOME_PAGE, LOGIN_PAGE, NEW_PASSWORD, SHOW_RESULT, SIGNUP_PAGE, STUDENT, STUDENT_DASHBOARD, STUDENT_DETAIL, STUDENT_PROFILE, TEACHER, TEACHER_DASHBOARD, VERIFIED_STUDENT, VIEW_EXAM } from '../utils/constant';
import ErrorPage from '../shared/ErrorPage';
import Auth from '../HOC/Auth';

const Loading = () => <div>Loading...</div>;


const App = lazy(() => import("../App"));

const Home = lazy(() => import("../shared/Home"));
const Teacher = lazy(() => import("../modules/teacher/Teacher"));
const AllStudent = lazy(() => import("../modules/teacher/actions/AllStudent"));
const CreateExam = lazy(() => import("../modules/teacher/actions/CreateExam"));
const EditExam = lazy(() => import("../modules/teacher/actions/EditExam"));
const TeacherDashboard = lazy(() => import("../modules/teacher/actions/TeacherDashbord"));
const VerifiedStudent = lazy(() => import("../modules/teacher/actions/VerifiedStudent"));
const ViewExam = lazy(() => import("../modules/teacher/actions/ViewExam"));
const ViewStudentDetail = lazy(() => import("../modules/teacher/actions/ViewStudentDetail"));
const Login = lazy(() => import("../modules/user/Login"));
const SignUp = lazy(() => import("../modules/user/SignUp"));
const ResetPassword = lazy(() => import("../shared/ResetPassword"));
const ForgotPassword = lazy(() => import("../shared/ForgotPassword"));
const NewPassword = lazy(() => import("../shared/NewPassword"));
const Student = lazy(() => import("../modules/student/Student"));
const StudentDashboard = lazy(() => import("../modules/student/actions/StudentDashboard"));
const AllExam = lazy(() => import("../modules/student/actions/AllExam"));
const GiveExam = lazy(() => import("../modules/student/actions/GiveExam"));
const StudentProfile = lazy(() => import("../modules/student/actions/StudentProfile"));
const ShowResult = lazy(() => import("../modules/student/actions/ShowResult"));

// Define the routes with Suspense for lazy-loaded components
export const routes = [
  {
    path: HOME_PAGE,
    element: (
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    ),
    errorElement: (
        <ErrorPage />
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        )
      },
      {
        path: LOGIN_PAGE,
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        )
      },
      {
        path: SIGNUP_PAGE,
        element: (
          <Suspense fallback={<Loading />}>
            <SignUp />
          </Suspense>
        )
      },
      {
        path: FORGET_PASSWORD,
        element: (
          <Suspense fallback={<Loading />}>
            <ForgotPassword />
          </Suspense>
        )
      },
      {
        path: NEW_PASSWORD,
        element: (
          <Suspense fallback={<Loading />}>
            <NewPassword />
          </Suspense>
        )
      },
      {
        element: (
          <Suspense fallback={<Loading />}>
            <Auth role={["teacher"]} />
          </Suspense>
        ),
        children: [
          {
            path: TEACHER,
            element: (
              <Suspense fallback={<Loading />}>
                <Teacher />
              </Suspense>
            ),
            children: [
              {
                path: TEACHER_DASHBOARD,
                element: (
                  <Suspense fallback={<Loading />}>
                    <TeacherDashboard />
                  </Suspense>
                )
              },
              {
                path: ALL_STUDENT,
                element: (
                  <Suspense fallback={<Loading />}>
                    <AllStudent />
                  </Suspense>
                )
              },
              {
                path: VERIFIED_STUDENT,
                element: (
                  <Suspense fallback={<Loading />}>
                    <VerifiedStudent />
                  </Suspense>
                )
              },
              {
                path: STUDENT_DETAIL,
                element: (
                  <Suspense fallback={<Loading />}>
                    <ViewStudentDetail />
                  </Suspense>
                )
              },
              {
                path: CREATE_EXAM,
                element: (
                  <Suspense fallback={<Loading />}>
                    <CreateExam />
                  </Suspense>
                )
              },
              {
                path: VIEW_EXAM,
                element: (
                  <Suspense fallback={<Loading />}>
                    <ViewExam />
                  </Suspense>
                )
              },
              {
                path: EDIT_EXAM,
                element: (
                  <Suspense fallback={<Loading />}>
                    <EditExam />
                  </Suspense>
                )
              },
              {
                path: 'reset-password',
                element: (
                  <Suspense fallback={<Loading />}>
                    <ResetPassword />
                  </Suspense>
                )
              }
            ]
          }
        ]
      },
      {
        element: (
          <Suspense fallback={<Loading />}>
            <Auth role={['student']} />
          </Suspense>
        ),
        children: [
          {
            path: STUDENT,
            element: (
              <Suspense fallback={<Loading />}>
                <Student />
              </Suspense>
            ),
            children: [
              {
                path: STUDENT_DASHBOARD,
                element: (
                  <Suspense fallback={<Loading />}>
                    <StudentDashboard />
                  </Suspense>
                )
              },
              {
                path: ALL_EXAM,
                element: (
                  <Suspense fallback={<Loading />}>
                    <AllExam />
                  </Suspense>
                )
              },
              {
                path: GIVE_EXAM,
                element: (
                  <Suspense fallback={<Loading />}>
                    <GiveExam />
                  </Suspense>
                )
              },
              {
                path: STUDENT_PROFILE,
                element: (
                  <Suspense fallback={<Loading />}>
                    <StudentProfile />
                  </Suspense>
                )
              },
              {
                path: 'reset-password',
                element: (
                  <Suspense fallback={<Loading />}>
                    <ResetPassword />
                  </Suspense>
                )
              },
              {
                path: SHOW_RESULT,
                element: (
                  <Suspense fallback={<Loading />}>
                    <ShowResult />
                  </Suspense>
                )
              }
            ]
          }
        ]
      }
    ]
  }
];
