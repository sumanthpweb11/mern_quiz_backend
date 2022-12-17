import express from "express";
import {
  addReport,
  getAllReports,
  getAllReportsByUser,
} from "../controllers/reportsController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// add report
router.route("/add-report").post(authMiddleware, addReport);

// get all reports

router
  .route("/get-all-reports", getAllReports)
  .post(authMiddleware, getAllReports);

// get all reports by user
router
  .route("/get-all-reports-by-user")
  .post(authMiddleware, getAllReportsByUser);

export default router;
