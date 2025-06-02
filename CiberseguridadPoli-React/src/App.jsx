import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import QuizPage from "./pages/QuizPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Course from "./pages/Course";
import Section from "./pages/Section";
import PruebaNesting from "./components/PruebaNesting";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/registro" />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/inicio" element={<LoginPage />} />
        <Route path="/learning" element={<Course />}>
          <Route path="test" element={<PruebaNesting />} />
        </Route>
        <Route path="/learning/section/:id" element={<Section />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
