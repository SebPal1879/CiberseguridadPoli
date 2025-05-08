import axios from "axios";

export function getAll() {
  return axios.get("http://localhost:8000/quiz/api/v1/quiz/");
}
