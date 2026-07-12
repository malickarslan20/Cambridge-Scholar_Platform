// backend/routes/teacherRoutes.js
const express = require("express");
const multer = require("multer");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getMyCourses,
  getGradingQueue,
  getCommunityStudents,
  getDashboardStats,
  createCourse,
  updateTeacherProfile,
  deleteTeacherProfile,
  enrollStudentInCourse,
  removeStudentFromCourse,
} = require("../controllers/teacherController");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, JPEG and PNG images are allowed"), false);
    }
  },
});

router.use(authMiddleware); // all routes below require a valid JWT

router.get("/courses", getMyCourses);
router.post("/courses", createCourse);
router.put("/courses/:id/enroll-student", enrollStudentInCourse);
router.put("/courses/:id/remove-student", removeStudentFromCourse);
router.put("/profile", upload.single("avatar"), updateTeacherProfile);
router.delete("/profile", deleteTeacherProfile);
router.get("/grading-queue", getGradingQueue);
router.get("/community", getCommunityStudents);
router.get("/stats", getDashboardStats);

module.exports = router;