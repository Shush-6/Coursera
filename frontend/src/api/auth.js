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
export const signinUser = async (email, password) => {
try {
  const response = await API.post("/user/signin", {
    email,
    password,
  });
  localStorage.setItem("token",response.data.token);
  return response.data;
}
catch(error){
  if (error.response && error.response.data) {
    throw new Error(error.response.data.message || "Signin Failed");
  } throw new Error(error.message || "Network error occurred");
}
};
