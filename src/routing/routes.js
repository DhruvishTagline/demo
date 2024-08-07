import App from "../App";
import ErrorPage from "../shared/ErrorPage";
import Home from "../shared/Home";
import Teacher from "../modules/teacher/Teacher";
import AllStudent from "../modules/teacher/actions/AllStudent";
import CreateExam from "../modules/teacher/actions/CreateExam";
import EditExam from "../modules/teacher/actions/EditExam";
import TeacherDashboard from "../modules/teacher/actions/TeacherDashbord";
import VerifiedStudent from "../modules/teacher/actions/VerifiedStudent";
import ViewExam from "../modules/teacher/actions/ViewExam";
import ViewStudentDetail from "../modules/teacher/actions/ViewStudentDetail";
import Login from "../modules/user/Login";
import SignUp from "../modules/user/SignUp";
import { ALL_EXAM, ALL_STUDENT, CREATE_EXAM, EDIT_EXAM, FORGET_PASSWORD, GIVE_EXAM, HOME_PAGE, LOGIN_PAGE, NEW_PASSWORD, RESET_PASSWORD, SHOW_RESULT, SIGNUP_PAGE, STUDENT, STUDENT_DASHBOARD, STUDENT_DETAIL, STUDENT_PROFILE, TEACHER, TEACHER_DASHBOARD, VERIFIED_STUDENT, VIEW_EXAM } from "../utils/constant";
import Auth from "../HOC/Auth";
import ResetPassword from "../shared/ResetPassword";
import ForgotPassword from "../shared/ForgotPassword";
import NewPassword from "../shared/NewPassword";
import { Outlet } from "react-router";
import Student from "../modules/student/Student";
import StudentDashboard from "../modules/student/actions/StudentDashboard";
import AllExam from "../modules/student/actions/AllExam";
import GiveExam from "../modules/student/actions/GiveExam";
import StudentProfile from "../modules/student/actions/StudentProfile";
import ShowResult from "../modules/student/actions/ShowResult";


export const routes = [
  {
    path: HOME_PAGE,
    errorElement: <ErrorPage />,
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: LOGIN_PAGE,
        element: <Login />
      },
      {
        path: SIGNUP_PAGE,
        element: <SignUp />
      },
      {
        path: FORGET_PASSWORD,
        element: <ForgotPassword/>
      },
      {
        path: NEW_PASSWORD,
        element:<NewPassword/>
      },
      {
        element: <Auth role={["teacher"]} />,
        children: [
          {
            path: TEACHER,
            element: <Teacher />,
            children: [
              {
                path: TEACHER_DASHBOARD,
                element: <TeacherDashboard />
              },
              {
                path: ALL_STUDENT,
                element: <AllStudent />
              },
              {
                path: VERIFIED_STUDENT,
                element: <VerifiedStudent />
              },
              {
                path: STUDENT_DETAIL,
                element: <ViewStudentDetail />
              },
              {
                path: CREATE_EXAM,
                element: <CreateExam />
              },
              {
                path: VIEW_EXAM,
                element: <ViewExam />
              },
              {
                path:EDIT_EXAM,
                element:<EditExam />
              },
              
              {
                path: 'reset-password',
                element: <ResetPassword/>
              }
            ]
          }
        ]
      },
      {
        element:<Auth role={['student']}/>,
        children:[
          {
            path:STUDENT,
            element:<Student />,
            children:[
              {
                path:STUDENT_DASHBOARD,
                element:<StudentDashboard />
              },
              {
                path:ALL_EXAM,
                element:<AllExam />
              },
              {
                path:GIVE_EXAM,
                element:<GiveExam />
              },
              {
                path:STUDENT_PROFILE,
                element:<StudentProfile />
              },
              {
                path:'reset-password',
                element:<ResetPassword />
              },
              {
                path:SHOW_RESULT,
                element:<ShowResult />
              }
            ]
          }
        ]
      }
    ]
  }
];
