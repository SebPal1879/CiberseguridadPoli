import axios from "axios";
import { API_URL } from "../../urls.js";

export function getAll(id) {
  return axios.post(`${API_URL}/quiz/find-quiz/`, {
    id,
  });
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
