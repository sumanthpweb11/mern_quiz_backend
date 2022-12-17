import examModal from "../models/examModel.js";
import questionModal from "../models/questionModal.js";

// add exam
export const addExam = async (req, res) => {
  try {
    // check if exam already exists
    const examExists = await examModal.findOne({ name: req.body.name });
    if (examExists) {
      return res
        .status(200)
        .send({ message: "Exam already exists", success: false });
    }
    req.body.questions = [];
    const newExam = new examModal(req.body);
    await newExam.save();
    res.send({
      message: "Exam added successfully",
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

// get all exams
export const getAllExams = async (req, res) => {
  try {
    const exams = await examModal.find({});
    res.send({
      message: "Exam fecthed successfully",
      data: exams,
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

// get exam by id
export const getExamById = async (req, res) => {
  try {
    const exam = await examModal
      .findById(req.body.examId)
      .populate("questions");
    res.send({
      message: "Exam fecthed successfully",
      data: exam,
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

// edit exam by id
export const editExamById = async (req, res) => {
  try {
    await examModal.findByIdAndUpdate(req.body.examId, req.body);
    res.send({
      message: "Exam edited successfully",
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

// delete exam by id
export const deleteExamById = async (req, res) => {
  try {
    await examModal.findByIdAndDelete(req.body.examId);
    res.send({
      message: "Exam deleted successfully",
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

// ------------------------Question Controllers------------

// add question
// basically add question to question collection and
// then add id to the 'questions' array in the exam
export const addQuestionToExam = async (req, res) => {
  try {
    // add question to Questions collection
    const newQuestion = new questionModal(req.body);
    const question = await newQuestion.save();

    // add question to exam
    const exam = await examModal.findById(req.body.exam);
    exam.questions.push(question._id);
    await exam.save();
    res.send({
      message: "Question added successfully",
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

// edit question

export const editQuestionInExam = async (req, res) => {
  try {
    // edit question in Questions collection
    await questionModal.findByIdAndUpdate(req.body.questionId, req.body);
    res.send({
      message: "Question edited successfully",
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

// delete question in exam
export const deleteQuestionInExam = async (req, res) => {
  try {
    // delete question in Questions collection
    await questionModal.findByIdAndDelete(req.body.questionId);

    // delete question in exam
    const exam = await examModal.findById(req.body.examId);
    exam.questions = exam.questions.filter(
      (question) => question._id != req.body.questionId
    );
    await exam.save();
    res.send({
      message: "Question deleted successfully",
      success: true,
    });
  } catch (error) {}
};
