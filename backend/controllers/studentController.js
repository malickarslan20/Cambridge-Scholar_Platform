const Course = require("../models/course");
const Assignment = require("../models/assignment");
const Submission = require("../models/submission");
const Attendance = require("../models/attendance");
const User = require("../models/user");

const getStudentCourses = async (req, res) => {
  try {
    const courses = await Course.find({ students: req.user.id })
      .populate("teacher", "name email")
      .lean();

    res.json(courses);
  } catch (error) {
    console.error("Error fetching student courses:", error);
    res.status(500).json({ message: "Failed to fetch student courses" });
  }
};

const getStudentDashboard = async (req, res) => {
  try {
    const courses = await Course.find({ students: req.user.id })
      .populate("teacher", "name")
      .lean();

    const courseIds = courses.map((course) => course._id);

    const submissions = await Submission.find({ student: req.user.id })
      .populate({ path: "assignment", select: "title dueDate course" })
      .lean();

    const gradedSubmissions = submissions.filter((submission) => submission.status === "graded");
    const completedAssignments = gradedSubmissions.length;
    const pendingAssignments = submissions.filter((submission) => submission.status === "pending").length;
    const avgGrade = gradedSubmissions.length
      ? Math.round(
          gradedSubmissions.reduce((sum, submission) => sum + (submission.grade || 0), 0) /
            gradedSubmissions.length
        )
      : 0;

    const attendanceRecords = await Attendance.find({ student: req.user.id }).lean();
    const presentCount = attendanceRecords.filter((record) => record.status === "present").length;
    const attendanceRate = attendanceRecords.length
      ? Math.round((presentCount / attendanceRecords.length) * 100)
      : 0;

    const upcomingAssignments = courseIds.length
      ? await Assignment.find({ course: { $in: courseIds }, dueDate: { $gte: new Date() } })
          .sort({ dueDate: 1 })
          .limit(5)
          .lean()
      : [];

    const coursesSummary = courses.map((course) => ({
      _id: course._id,
      title: course.title,
      description: course.description || "No description available",
      teacher: course.teacher?.name || "TBA",
      studentCount: course.students?.length ?? 0,
    }));

    res.json({
      totalCourses: courses.length,
      completedAssignments,
      pendingAssignments,
      avgGrade,
      attendanceRate,
      courses: coursesSummary,
      upcomingAssignments: upcomingAssignments.map((assignment) => ({
        _id: assignment._id,
        title: assignment.title,
        dueDate: assignment.dueDate,
        course: assignment.course?.toString(),
      })),
    });
  } catch (error) {
    console.error("Error fetching student dashboard:", error);
    res.status(500).json({ message: "Failed to fetch student dashboard" });
  }
};

const getStudentCommunity = async (req, res) => {
  try {
    const courses = await Course.find({ students: req.user.id })
      .populate("students", "name email role avatar")
      .lean();

    const formatted = courses.map((course) => ({
      courseId: course._id,
      courseTitle: course.title,
      students: course.students?.map((student) => ({
        _id: student._id,
        name: student.name,
        email: student.email,
        role: student.role,
        avatar: student.avatar,
      })) || [],
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Error fetching student community:", error);
    res.status(500).json({ message: "Failed to fetch student community" });
  }
};

const updateStudentProfile = async (req, res) => {
  try {
    const { name, mobile } = req.body;
    const update = {};

    if (name !== undefined) update.name = String(name).trim();
    if (mobile !== undefined) update.mobile = String(mobile).trim();
    if (req.file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
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
    console.error("Error updating student profile:", error);
    res.status(500).json({ message: "Failed to update student profile" });
  }
};

module.exports = {
  getStudentCourses,
  getStudentDashboard,
  getStudentCommunity,
  updateStudentProfile,
};
