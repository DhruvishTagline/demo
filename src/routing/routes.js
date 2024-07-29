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
import { ALL_STUDENT, CREATE_EXAM, EDIT_EXAM, HOME_PAGE, LOGIN_PAGE, SIGNUP_PAGE, STUDENT, STUDENT_DETAIL, TEACHER, TEACHER_DASHBOARD, VERIFIED_STUDENT, VIEW_EXAM } from "../utils/constant";
import Auth from "../HOC/Auth";

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
                path: EDIT_EXAM,
                element: <EditExam />
              }
            ]
          }
        ]
      },
      {
        element: <Auth role={['student']} />,
        children: [
          {
            path: STUDENT,
            element: <h1>Student</h1>,
            children: []
          }
        ]
      }
    ]
  }
];
