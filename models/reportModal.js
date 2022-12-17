import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "exams",
    },
    result: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const reportModal = mongoose.model("reports", reportSchema);

export default reportModal;
