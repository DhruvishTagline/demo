
export const HOME_PAGE = '/'

export const LOGIN_PAGE = '/login'

export const SIGNUP_PAGE = '/signup'

export const FORGET_PASSWORD = '/forget-password'

export const NEW_PASSWORD = '/newPassword*'

export const TEACHER = '/teacher'

export const TEACHER_DASHBOARD = '/teacher/dashboard'
// export const DASHBOARD = '/:role/teacher/dashboard'

export const ALL_STUDENT = '/teacher/allstudent'

export const VERIFIED_STUDENT = 'teacher/verified-student'

export const STUDENT_DETAIL = '/teacher/view-student-detail'

export const CREATE_EXAM = '/teacher/create-exam'

export const VIEW_EXAM = '/teacher/view-exam'
    
export const EDIT_EXAM = '/teacher/edit-exam/:id/:subjectName'

export const RESET_PASSWORD= 'reset-password'

export const STUDENT = '/student'

export const STUDENT_DASHBOARD = '/student/dashboard'

export const ALL_EXAM = '/student/all-exam'

export const GIVE_EXAM = '/student/give-exam/:id/:subjectName'

export const STUDENT_PROFILE = '/student/student-profile'

export const EXAM_RESTRICTION_PAGE= '/student/exam-restriction-page'

// REGEX

export const EMAIL_REGEX=/^[a-zA-Z0-9]+@[a-zA-Z_]+\.[a-zA-Z]{2,3}$/

export const NAME_REGEX=/^([a-zA-Z0-9]+\s?)*\S$/

export const PASSWORD_REGEX=/[a-zA-Z0-9]{6,30}/

// URL End points

// Teacher
export const TEACHER_CREATE_EXAM_END_POINT='dashboard/Teachers/Exam'

export const TEACHER_EDIT_EXAM_END_POINT='dashboard/Teachers/editExam'

export const TEACHER_DELETE_EXAM_END_POINT='dashboard/Teachers/deleteExam'

export const TEACHER_DASHBOARD_END_POINT='dashboard/Teachers'

export const TEACHER_GET_EXAM_DETAIL='dashboard/Teachers/examDetail'

export const TEACHER_VERIFIED_STUDENT_END_POINT='dashboard/Teachers/StudentForExam'

export const TEACHER_VIEW_EXAM_END_POINT='dashboard/Teachers/viewExam'

export const TEACHER_VIEW_STUDENT_DETAIL_END_POINT=`dashboard/Teachers/viewStudentDetail`

// Student

export const STUDENT_GIVE_EXAM_END_POINT='student/giveExam'

export const STUDENT_STUDENT_PROFILE_END_POINT='student/studentProfile'

export const STUDENT_STUDENT_EXAM_END_POINT='student/studentExam'

export const STUDENT_EXAM_PAPER_END_POINT='student/examPaper'

export const STUDENT_STUDENT_DETAILS_END_POINTS='student/getStudentDetail'

// User

export const USER_FORGOT_PASSWORD_END_POINT='users/ForgotPassword'

export const USER_FORGOT_PASSWORD_VERIFY_END_POINT='users/ForgotPassword/Verify'

export const USER_RESET_PASSWORD_END_POINT='users/ResetPassword'

export const USERS_LOGIN_END_POINT='users/Login'

export const USERS_SIGN_UP_END_POINT='users/SignUp'