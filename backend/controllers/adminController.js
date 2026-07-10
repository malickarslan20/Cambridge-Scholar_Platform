const User = require("../models/user");
const Course = require("../models/course");

const getAllUsers = async (req, res) => {
  try {
    const filter = {};
    if (req.query.role) {
      filter.role = req.query.role;
    }

    const users = await User.find(filter).select("-password");
    return res.status(200).json(users);
  } catch (error) {
    console.error("Get users error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("teacher", "name role")
      .populate("students", "name role")
      .lean();

    const formattedCourses = courses.map((course) => ({
      ...course,
      studentCount: course.students ? course.students.length : 0,
      teacherName: course.teacher ? course.teacher.name : "Unassigned",
    }));

    return res.status(200).json(formattedCourses);
  } catch (error) {
    console.error("Get courses error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const course = await Course.create({ title, description });
    return res.status(201).json({ message: "Course created", course });
  } catch (error) {
    console.error("Create course error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const course = await Course.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({ message: "Course updated", course });
  } catch (error) {
    console.error("Update course error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({ message: "Course deleted" });
  } catch (error) {
    console.error("Delete course error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const assignTeacherToCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { teacherId } = req.body;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== "teacher") {
      return res.status(400).json({ message: "Invalid teacher" });
    }

    course.teacher = teacherId;
    await course.save();

    return res.status(200).json({ message: "Teacher assigned", course });
  } catch (error) {
    console.error("Assign teacher error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const enrollStudentInCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId } = req.body;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const student = await User.findById(studentId);
    if (!student || student.role !== "student") {
      return res.status(400).json({ message: "Invalid student" });
    }

    if (!course.students.includes(studentId)) {
      course.students.push(studentId);
      await course.save();
    }

    return res.status(200).json({ message: "Student enrolled", course });
  } catch (error) {
    console.error("Enroll student error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const removeStudentFromCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId } = req.body;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.students = course.students.filter((student) => student.toString() !== studentId);
    await course.save();

    return res.status(200).json({ message: "Student removed", course });
  } catch (error) {
    console.error("Remove student error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const adminCount = await User.countDocuments({ role: "admin" });

    if (adminCount <= 1) {
      const targetUser = await User.findById(id);
      if (targetUser && targetUser.role === "admin") {
        return res.status(400).json({ message: "Cannot delete the last admin" });
      }
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error("Delete user error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllUsers,
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  assignTeacherToCourse,
  enrollStudentInCourse,
  removeStudentFromCourse,
  deleteUser,
};
