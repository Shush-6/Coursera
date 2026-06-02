import API from "./axios";

export const signupUser = async (email, password, firstName, lastName, role) => {
  try {
    const response = await API.post("/user/signup", {
      email,
      password,
      firstName,
      lastName,
      role: "User",
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Signup failed");
    }
    throw new Error(error.message || "Network error occurred");
  }
};
export const signinUser = async (email, password, role) => {
try {
  const response = await API.post("/user/signin", {
    email,
    password,
  role: role
  });
  localStorage.setItem("token",response.data.token);
  localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);
  return response.data;
}
catch(error){
  if (error.response && error.response.data) {
    throw new Error(error.response.data.message || "Signin Failed");
  } throw new Error(error.message || "Network error occurred");
}
};
export const signupAdmin = async (email, password, firstName, lastName, role) => {
  try {
    const response = await API.post("/admin/signup", {
      email,
      password,
      firstName,
      lastName,
      role: "Admin",
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Signup failed");
    }
    throw new Error(error.message || "Network error occurred");
  }
};
export const signinAdmin = async (email, password, role) => {
try {
  const response = await API.post("/admin/signin", {
    email,
    password,
  role: role
  });
  localStorage.setItem("token",response.data.token);
  localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);
  return response.data;
}
catch(error){
  if (error.response && error.response.data) {
    throw new Error(error.response.data.message || "Signin Failed");
  } throw new Error(error.message || "Network error occurred");
}
};
