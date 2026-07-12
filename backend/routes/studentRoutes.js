const express = require("express");
const multer = require("multer");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getStudentCourses,
  getStudentDashboard,
  getStudentCommunity,
  updateStudentProfile,
} = require("../controllers/studentController");

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

router.use(authMiddleware);
router.get("/dashboard", getStudentDashboard);
router.get("/courses", getStudentCourses);
router.get("/community", getStudentCommunity);
router.put("/profile", upload.single("avatar"), updateStudentProfile);

module.exports = router;
