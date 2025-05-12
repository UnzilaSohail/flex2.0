import Course from "../models/courseSchema.js";

export const addCourse = async (req, res) => {
  const { code, name, prerequisites, department, semester, lectureCreditHours, labCreditHours } = req.body;

  try {
    // Log to debug values
    console.log("lectureCreditHours:", lectureCreditHours);
    console.log("labCreditHours:", labCreditHours);
    console.log("Is lectureCreditHours a number?", typeof lectureCreditHours);
    console.log("Is labCreditHours a number?", typeof labCreditHours);

    // Ensure credit hours are numbers
    const lectureCreditHoursNum = parseFloat(lectureCreditHours);
    const labCreditHoursNum = parseFloat(labCreditHours);

    if (isNaN(lectureCreditHoursNum) || isNaN(labCreditHoursNum)) {
      return res.status(400).json({ message: "Invalid credit hours, must be a number" });
    }

    // Validate credit hours range
    if (lectureCreditHoursNum < 1 || lectureCreditHoursNum > 3 || labCreditHoursNum < 0 || labCreditHoursNum > 1) {
      return res.status(400).json({ message: "Invalid credit hours" });
    }

    // Handle prerequisites as array, even if there's only one
    const prerequisiteCourses = prerequisites
      ? await Course.find({ code: { $in: prerequisites.split(",").map(prereq => prereq.trim()) } }).select("_id")
      : [];

    // Create the new course
    const newCourse = new Course({
      code,
      name,
      prerequisites: prerequisiteCourses.map((course) => course._id),
      department,
      semester,
      lectureCreditHours: lectureCreditHoursNum,
      labCreditHours: labCreditHoursNum,
    });

    // Save the course
    await newCourse.save();
    res.status(201).json({ message: "Course added successfully", course: newCourse });
  } catch (error) {
    console.error("Error adding course:", error.message);
    res.status(500).json({ message: "Error adding course" });
  }
};

// Update a course

export const updateCourse = async (req, res) => {
  const { courseId } = req.params;
  const { code, name, prerequisites, department, semester, lectureCreditHours, labCreditHours } = req.body;

  try {
    // Validate credit hours
    if (
      lectureCreditHours < 1 || lectureCreditHours > 3 || 
      labCreditHours < 0 || labCreditHours > 1
    ) {
      return res.status(400).json({ message: "Invalid credit hours" });
    }

    // Handle prerequisites as an array
    const prerequisiteCourses = prerequisites
      ? await Course.find({ code: { $in: prerequisites.split(",") } }).select("_id")
      : [];

    // Update the course in the database
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        code,
        name,
        prerequisites: prerequisiteCourses.map((course) => course._id),
        department,
        semester,
        lectureCreditHours,
        labCreditHours,
      },
      { new: true }
    );

    // If course not found
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Respond with updated course
    res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    console.error("Error updating course:", error.message);
    res.status(500).json({ message: "Error updating course" });
  }
};


// Delete a course
export const deleteCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error.message);
    res.status(500).json({ message: "Error deleting course" });
  }
};

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("prerequisites", "code name");

    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    res.status(500).json({ message: "Error fetching courses" });
  }
};
// Search courses
export const searchCourse = async (req, res) => {
  try {
    const { 
      searchQuery, // Changed to match frontend search input
      code, 
      name, 
      department, 
      semester, 
      minLectureHours, 
      maxLectureHours, 
      minLabHours, 
      maxLabHours 
    } = req.query;

    const query = {};

    if (searchQuery) {
      query.$or = [
        { code: { $regex: searchQuery, $options: "i" } }, 
        { name: { $regex: searchQuery, $options: "i" } },
        { department: { $regex: searchQuery, $options: "i" } },
        { semester: { $regex: searchQuery, $options: "i" } }
      ];
    }

    if (code) {
      query.code = { $regex: code, $options: "i" };
    }

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    if (department) {
      query.department = { $regex: department, $options: "i" };
    }

    if (semester) {
      query.semester = semester;
    }

    // Handle credit hours filter
    if (minLectureHours || maxLectureHours) {
      query.lectureCreditHours = {};
      if (minLectureHours && !isNaN(minLectureHours)) {
        query.lectureCreditHours.$gte = parseFloat(minLectureHours);
      }
      if (maxLectureHours && !isNaN(maxLectureHours)) {
        query.lectureCreditHours.$lte = parseFloat(maxLectureHours);
      }
    }

    if (minLabHours || maxLabHours) {
      query.labCreditHours = {};
      if (minLabHours && !isNaN(minLabHours)) {
        query.labCreditHours.$gte = parseFloat(minLabHours);
      }
      if (maxLabHours && !isNaN(maxLabHours)) {
        query.labCreditHours.$lte = parseFloat(maxLabHours);
      }
    }

    const courses = await Course.find(query).populate("prerequisites", "code name");

    if (courses.length === 0) {
      return res.status(404).json({ message: "No courses found matching the criteria" });
    }

    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error searching for courses:", error.message);
    res.status(500).json({ message: "Error searching for courses" });
  }
};

