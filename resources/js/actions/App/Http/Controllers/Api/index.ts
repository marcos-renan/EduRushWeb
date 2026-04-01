import AuthController from './AuthController'
import StudentTrailController from './StudentTrailController'
import StudentMissionController from './StudentMissionController'
import StudentFriendController from './StudentFriendController'
import StudentReviewController from './StudentReviewController'
import StudentProfileController from './StudentProfileController'
import StudentQuestionController from './StudentQuestionController'
import StudentLessonController from './StudentLessonController'
const Api = {
    AuthController: Object.assign(AuthController, AuthController),
StudentTrailController: Object.assign(StudentTrailController, StudentTrailController),
StudentMissionController: Object.assign(StudentMissionController, StudentMissionController),
StudentFriendController: Object.assign(StudentFriendController, StudentFriendController),
StudentReviewController: Object.assign(StudentReviewController, StudentReviewController),
StudentProfileController: Object.assign(StudentProfileController, StudentProfileController),
StudentQuestionController: Object.assign(StudentQuestionController, StudentQuestionController),
StudentLessonController: Object.assign(StudentLessonController, StudentLessonController),
}

export default Api