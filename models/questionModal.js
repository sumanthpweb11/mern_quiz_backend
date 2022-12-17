import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    correctOption: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "exams",
    },
  },
  {
    timestamps: true,
  }
);

const questionModal = mongoose.model("questions", questionSchema);
export default questionModal;
