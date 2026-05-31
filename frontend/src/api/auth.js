import API from "./axios";

export const signupUser = async (email, password, firstName, lastName) => {
  try {
    const response = await API.post("/user/signup", {
      email,
      password,
      firstName,
      lastName,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Signup failed");
    }
    throw new Error(error.message || "Network error occurred");
  }
};
