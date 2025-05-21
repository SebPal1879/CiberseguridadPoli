import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import QuizPage from "./pages/QuizPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/quiz" />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/registro" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
