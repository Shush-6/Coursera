import API from "./axios";

// Fetch all available courses
export const getCourses = async () => {
  try {
    const response = await API.get("/course");
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Failed to fetch courses");
    }
    throw new Error(error.message || "Network error occurred");
  }
};

// Purchase/Enroll in a course (Student)
export const purchaseCourse = async (courseId) => {
  try {
    const response = await API.post("/course/purchases", { courseId });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Failed to purchase course");
    }
    throw new Error(error.message || "Network error occurred");
  }
};

// Fetch student's purchased courses
export const getPurchasedCourses = async () => {
  try {
    const response = await API.get("/user/purchases");
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Failed to fetch purchases");
    }
    throw new Error(error.message || "Network error occurred");
  }
};

// Fetch courses created by admin
export const getAdminCourses = async () => {
  try {
    const response = await API.get("/admin/course/bulk");
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Failed to fetch admin courses");
    }
    throw new Error(error.message || "Network error occurred");
  }
};

// Create a new course (Admin)
export const createCourse = async (courseData) => {
  try {
    const response = await API.post("/admin/course", courseData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Failed to create course");
    }
    throw new Error(error.message || "Network error occurred");
  }
};

// Update an existing course (Admin)
export const updateCourse = async (courseData) => {
  try {
    const response = await API.put("/admin/course/purchase", courseData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Failed to update course");
    }
    throw new Error(error.message || "Network error occurred");
  }
};
