import React, { Suspense, lazy } from 'react';
import Auth from '../HOC/Auth';
import Loader from '../shared/Loader';
import { 
  ALL_EXAM, 
  ALL_STUDENT, 
  CREATE_EXAM, 
  EDIT_EXAM, 
  EXAM_RESTRICTION_PAGE, 
  FORGET_PASSWORD, 
  GIVE_EXAM, 
  HOME_PAGE, 
  LOGIN_PAGE, 
  NEW_PASSWORD, 
  RESET_PASSWORD, 
  SIGNUP_PAGE, 
  STUDENT, 
  STUDENT_DASHBOARD, 
  STUDENT_DETAIL, 
  STUDENT_PROFILE, 
  TEACHER, 
  TEACHER_DASHBOARD, 
  VERIFIED_STUDENT, 
  VIEW_EXAM 
} from '../utils/constant';


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
const ExamRestrictionPage = lazy(()=>import("../shared/ExamRestrictionPage"));
const ErrorPage = lazy(()=>import("../shared/ErrorPage"))

export const routes = [
  {
    path: HOME_PAGE,
    element: (
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    ),
    errorElement: ( <ErrorPage /> ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        )
      },
      {
        path: LOGIN_PAGE,
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        )
      },
      {
        path: SIGNUP_PAGE,
        element: (
          <Suspense fallback={<Loader />}>
            <SignUp />
          </Suspense>
        )
      },
      {
        path: FORGET_PASSWORD,
        element: (
          <Suspense fallback={<Loader />}>
            <ForgotPassword />
          </Suspense>
        )
      },
      {
        path: NEW_PASSWORD,
        element: (
          <Suspense fallback={<Loader />}>
            <NewPassword />
          </Suspense>
        )
      },
      {
        element: (
          <Suspense fallback={<Loader />}>
            <Auth role={["teacher"]} />
          </Suspense>
        ),
        children: [
          {
            path: TEACHER,
            element: (
              <Suspense fallback={<Loader />}>
                <Teacher />
              </Suspense>
            ),
            children: [
              {
                path: TEACHER_DASHBOARD,
                element: (
                  <Suspense fallback={<Loader />}> 
                    <TeacherDashboard />
                  </Suspense>
                )
              },
              {
                path: ALL_STUDENT,
                element: (
                  <Suspense fallback={<Loader />}>
                    <AllStudent />
                  </Suspense>
                )
              },
              {
                path: VERIFIED_STUDENT,
                element: (
                  <Suspense fallback={<Loader />}>
                    <VerifiedStudent />
                  </Suspense>
                )
              },
              {
                path: STUDENT_DETAIL,
                element: (
                  <Suspense fallback={<Loader />}>
                    <ViewStudentDetail />
                  </Suspense>
                )
              },
              {
                path: CREATE_EXAM,
                element: (
                  <Suspense fallback={<Loader />}>
                    <CreateExam />
                  </Suspense>
                )
              },
              {
                path: VIEW_EXAM,
                element: (
                  <Suspense fallback={<Loader />}>
                    <ViewExam />
                  </Suspense>
                )
              },
              {
                path: EDIT_EXAM,
                element: (
                  <Suspense fallback={<Loader />}>
                    <EditExam />
                  </Suspense>
                )
              },
              {
                path: RESET_PASSWORD,
                element: (
                  <Suspense fallback={<Loader />}>
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
          <Suspense fallback={<Loader />}>
            <Auth role={['student']} />
          </Suspense>
        ),
        children: [
          {
            path: STUDENT,
            element: (
              <Suspense fallback={<Loader />}>
                <Student />
              </Suspense>
            ),
            children: [
              {
                path: STUDENT_DASHBOARD,
                element: (
                  <Suspense fallback={<Loader />}>
                    <StudentDashboard />
                  </Suspense>
                )
              },
              {
                path: ALL_EXAM,
                element: (
                  <Suspense fallback={<Loader />}>
                    <AllExam />
                  </Suspense>
                )
              },
              {
                path: GIVE_EXAM,
                element: (
                  <Suspense fallback={<Loader />}>
                    <GiveExam />
                  </Suspense>
                )
              },
              {
                path: STUDENT_PROFILE,
                element: (
                  <Suspense fallback={<Loader />}>
                    <StudentProfile />
                  </Suspense>
                )
              },
              {
                path: RESET_PASSWORD,
                element: (
                  <Suspense fallback={<Loader />}>
                    <ResetPassword />
                  </Suspense>
                )
              },
              {
                path: EXAM_RESTRICTION_PAGE,
                element: (
                  <Suspense fallback={<Loader />}>
                    <ExamRestrictionPage />
                  </Suspense>
                )
              },              
            ]
            
          }
        ]
      }
    ]
  }
];
