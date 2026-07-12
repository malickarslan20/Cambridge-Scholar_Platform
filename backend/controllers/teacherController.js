// backend/controllers/teacherController.js
const Course = require("../models/course");
const Submission = require("../models/submission");
const Attendance = require("../models/attendance");
const User = require("../models/user");

const getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.user.id })
      .populate("students", "name")
      .lean();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};

const getGradingQueue = async (req, res) => {
  try {
    const myCourses = await Course.find({ teacher: req.user.id }).select("_id");
    const courseIds = myCourses.map((c) => c._id);

    const submissions = await Submission.find({ status: "pending" })
      .populate({ path: "assignment", match: { course: { $in: courseIds } }, select: "title course" })
      .populate("student", "name")
      .sort({ submittedAt: -1 })
      .limit(10)
      .lean();

    res.json(submissions.filter((s) => s.assignment)); // drop nulls from populate match
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch grading queue" });
  }
};

const getCommunityStudents = async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.user.id })
      .populate("students", "name email role")
      .lean();

    const grouped = courses.map((course) => ({
      courseId: course._id,
      courseTitle: course.title,
      students: course.students?.map((student) => ({
        _id: student._id,
        name: student.name,
        email: student.email,
        role: student.role,
      })) ?? [],
    }));

    res.json(grouped);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch community students" });
  }
};

const updateTeacherProfile = async (req, res) => {
  try {
    const { name, mobile } = req.body;
    const update = {};

    if (name !== undefined) update.name = String(name).trim();
    if (mobile !== undefined) update.mobile = String(mobile).trim();
    if (req.file) {
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ message: "Only JPG and PNG images are allowed" });
      }
      update.avatar = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    }

    const user = await User.findByIdAndUpdate(req.user.id, update, {
      new: true,
      runValidators: true,
    }).lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};

const deleteTeacherProfile = async (req, res) => {
  try {
    await Course.updateMany({ teacher: req.user.id }, { teacher: null });
    const user = await User.findByIdAndDelete(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete profile" });
  }
};

const enrollStudentInCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentEmail } = req.body;

    const course = await Course.findOne({ _id: id, teacher: req.user.id });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const student = await User.findOne({ email: String(studentEmail).toLowerCase(), role: "student" });
    if (!student) {
      return res.status(400).json({ message: "Student not found" });
    }

    if (!course.students.includes(student._id)) {
      course.students.push(student._id);
      await course.save();
    }

    await course.populate("students", "name email role").execPopulate?.();
    const updatedCourse = await Course.findById(course._id).populate("students", "name email").lean();

    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "Failed to add student to course" });
  }
};

const removeStudentFromCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId } = req.body;

    const course = await Course.findOne({ _id: id, teacher: req.user.id });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.students = course.students.filter((student) => student.toString() !== studentId);
    await course.save();

    const updatedCourse = await Course.findById(course._id).populate("students", "name email").lean();
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "Failed to remove student from course" });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.user.id });
    const totalStudents = new Set(courses.flatMap((c) => c.students.map(String))).size;
    const courseIds = courses.map((c) => c._id);

    const pendingGrading = await Submission.countDocuments({
      status: "pending",
    });

    const attendanceRecords = await Attendance.find({ course: { $in: courseIds } });
    const presentCount = attendanceRecords.filter((a) => a.status === "present").length;
    const avgAttendance = attendanceRecords.length
      ? Math.round((presentCount / attendanceRecords.length) * 100)
      : 0;

    res.json({
      totalStudents,
      totalCourses: courses.length,
      pendingGrading,
      avgAttendance,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const course = await Course.create({
      title,
      description,
      teacher: req.user.id,
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: "Failed to create course" });
  }
};

module.exports = {
  getMyCourses,
  getGradingQueue,
  getCommunityStudents,
  getDashboardStats,
  createCourse,
  updateTeacherProfile,
  deleteTeacherProfile,
  enrollStudentInCourse,
  removeStudentFromCourse,
};
