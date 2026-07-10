const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  getAllUsers,
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  assignTeacherToCourse,
  enrollStudentInCourse,
  removeStudentFromCourse,
  deleteUser,
} = require("../controllers/adminController");

router.use(authMiddleware, adminMiddleware);

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.get("/courses", getAllCourses);
router.post("/courses", createCourse);
router.put("/courses/:id", updateCourse);
router.delete("/courses/:id", deleteCourse);
router.put("/courses/:id/assign-teacher", assignTeacherToCourse);
router.put("/courses/:id/enroll-student", enrollStudentInCourse);
router.put("/courses/:id/remove-student", removeStudentFromCourse);

module.exports = router;
