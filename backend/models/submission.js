const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    submittedAt: { type: Date, default: Date.now },
    content: { type: String }, // text answer, or a file URL later
    grade: { type: Number, default: null },
    feedback: { type: String },
    status: { type: String, enum: ["pending", "graded"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", submissionSchema);