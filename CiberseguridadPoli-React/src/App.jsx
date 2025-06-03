import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import QuizPage from "./pages/QuizPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Course from "./pages/Course";
import Section from "./pages/Section";
import PruebaNesting from "./components/PruebaNesting";
import Lecture from "./pages/Lecture";
import InfoCurso from "./pages/InfoCurso";
import Home from "./pages/Home";
import Help from "./pages/Help";
import Account from "./pages/Account";
import Challenges from "./pages/Challenges";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/course" element={<InfoCurso />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/learning" element={<Course />}>
          <Route path="test" element={<PruebaNesting />} />
        </Route>
        <Route path="/learning/section/:id" element={<Section />} />
        <Route path="/help" element={<Help />} />
        <Route path="challenges" element={<Challenges />} />
        <Route
          path="/learning/section/:ids/lecture/:idl"
          element={<Lecture />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
