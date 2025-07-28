import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizPage from "./pages/Quiz/QuizPage";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Learning from "./pages/Learning/Learning";
import Section from "./pages/Section/Section";
import Lecture from "./pages/Lecture/Lecture";
import CourseOverview from "./pages/CourseOverview";
import Home from "./pages/Home";
import HelpCenter from "./pages/Help/HelpCenter";
import Account from "./pages/Account/Account";
import Challenges from "./pages/Challenges/Challenges";
import History from "./pages/History";
import ChangePassword from "./pages/ChangePassword";
import NewPassword from "./pages/NewPassword";
import { AccountProvider } from "./contexts/AccountContext";
import HeaderValidator from "./components/HeaderValidator";

function App() {
  return (
    <>
      <AccountProvider>
        <BrowserRouter>
          <HeaderValidator />
          <Routes>
            <Route path="" element={<Home />} x />
            <Route path="account" element={<Account />} x />
            <Route path="course" element={<CourseOverview />} x />
            <Route path="challenges" element={<Challenges x />} />
            <Route path="learning" element={<Learning />} x />
            <Route path="learning/section/:id" element={<Section />} x />
            <Route path="help-center" element={<HelpCenter />} x />
            <Route path="history" element={<History />} x />
            <Route
              path="learning/section/:ids/lecture/:idl"
              element={<Lecture x />}
            />
            <Route path="signup" element={<Signup />} />
            <Route path="signin" element={<Signin />} />
            <Route path="signin/forgot-password" element={<ChangePassword />} />
            <Route
              path="signin/password-reset/:uidb64/:token"
              element={<NewPassword />}
            />
            <Route path="challenges/:id" element={<QuizPage />} />
          </Routes>
        </BrowserRouter>
      </AccountProvider>
    </>
  );
}

export default App;
