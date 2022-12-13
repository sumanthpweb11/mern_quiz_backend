import express from "express";
import {
  addExam,
  deleteExamById,
  editExamById,
  getAllExams,
  getExamById,
  addQuestionToExam,
  editQuestionInExam,
  deleteQuestionInExam,
} from "../controllers/examController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

// ADD Exam
router.route("/add").post(authMiddleware, addExam);

// Get all exams
router.route("/get-all-exams").post(authMiddleware, getAllExams);

// get exam by id
router.route("/get-exam-by-id").post(authMiddleware, getExamById);

// edit exam by Id
router.route("/edit-exam-by-id").post(authMiddleware, editExamById);

// delete exam by id
router.route("/delete-exam-by-id").post(authMiddleware, deleteExamById);

//.........QUESTION ROUTES.............................

// add Question
router.route("/add-question-to-exam").post(authMiddleware, addQuestionToExam);

// edit question in exam
router.route("/edit-question-in-exam").post(authMiddleware, editQuestionInExam);

// delete question in exam
router
  .route("/delete-question-in-exam")
  .post(authMiddleware, deleteQuestionInExam);

export default router;
