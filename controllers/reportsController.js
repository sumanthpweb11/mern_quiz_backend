import reportModal from "../models/reportModal.js";
import examModal from "../models/examModel.js";
import userModal from "../models/userModal.js";

// add report
export const addReport = async (req, res) => {
  try {
    const newReport = new reportModal(req.body);
    await newReport.save();
    res.send({
      message: "Attempt added successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
};

// get all reports
export const getAllReports = async (req, res) => {
  try {
    const { examName, userName } = req.body;

    const exams = await examModal.find({
      name: {
        $regex: examName,
      },
    });

    const matchedExamIds = exams.map((exam) => exam._id);

    const users = await userModal.find({
      name: {
        $regex: userName,
      },
    });

    const matchedUserIds = users.map((user) => user._id);

    const reports = await reportModal
      .find({
        exam: {
          $in: matchedExamIds,
        },
        user: {
          $in: matchedUserIds,
        },
      })
      .populate("exam")
      .populate("user")
      .sort({ createdAt: -1 });
    res.send({
      message: "Attempts fetched successfully",
      data: reports,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
};

// get all reports by user

export const getAllReportsByUser = async (req, res) => {
  try {
    const reports = await reportModal
      .find({ user: req.body.userId })
      .populate("exam")
      .populate("user")
      .sort({ createdAt: -1 });
    res.send({
      message: "Attempts fetched successfully",
      data: reports,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
};
