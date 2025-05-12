import axios from "axios";

export function getAll(id) {
  return axios.post("http://localhost:8000/quiz/find-quiz/", {
    id,
  });
}
