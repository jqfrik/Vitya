import axios from "../axios";

const endpoints = {
  register: (data) => axios.post("/Users/Register", data),
  authentication: (data) => axios.post("/Users/Authentication", data),
  resetPasswordFirstStage: (data) => axios.post("/Users/ResetPasswordFirstStage", data),
  resetPasswordSecondStage: (data) => axios.post("/Users/ResetPasswordSecondStage",data)
};

export default endpoints;
