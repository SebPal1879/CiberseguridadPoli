import axios from "axios";

export function getAll(id) {
  return axios.post("https://ciberseguridadpoli.onrender.com/quiz/find-quiz/", {
    id,
  });
}

export function submitRegisterForm(formData) {
  return axios.post(
    "https://ciberseguridadpoli.onrender.com/signup/",
    formData
  );
}

export function submitLoginForm(formData) {
  return axios.post(
    "https://ciberseguridadpoli.onrender.com/signin/",
    formData
  );
}

export function getInformation(url, userToken) {
  return axios.get(url, {
    headers: { Authorization: `Token ${userToken}` },
  });
}
export function postRequest(url, data = {}, userToken) {
  console.log(data);
  return axios.post(url, data, {
    headers: { Authorization: `Token ${userToken}` },
  });
}
