import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizPage from "./pages/QuizPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Learning from "./pages/Learning";
import Section from "./pages/Section";
import PruebaNesting from "./components/PruebaNesting";
import Lecture from "./pages/Lecture";
import CourserOverview from "./pages/CourseOverview";
import Home from "./pages/Home";
import Help from "./pages/Help";
import Account from "./pages/Account";
import Challenges from "./pages/Challenges";
import History from "./pages/History";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/course" element={<CourserOverview />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/learning" element={<Learning />}>
          <Route path="test" element={<PruebaNesting />} />
        </Route>
        <Route path="/learning/section/:id" element={<Section />} />
        <Route path="/help" element={<Help />} />
        <Route
          path="/learning/section/:ids/lecture/:idl"
          element={<Lecture />}
        />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/challenges/:id" element={<QuizPage />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
