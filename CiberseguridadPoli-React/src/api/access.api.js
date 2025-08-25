import axios from "axios";
import { BACKEND_URL } from "../functions/urls";

export function getAll(id) {
  return axios.post(`${BACKEND_URL}/quiz/find-quiz/`, {
    id,
  });
}

export function submitRegisterForm(formData) {
  return axios.post(`${BACKEND_URL}/signup/`, formData);
}

export function submitLoginForm(formData) {
  return axios.post(`${BACKEND_URL}/signin/`, formData);
}

export function getInformation(url, headers = {}) {
  return axios.get(url, {
    headers: headers,
  });
}
export function postRequest(url, data = {}, headers = {}) {
  return axios.post(url, data, {
    headers: headers,
  });
}
