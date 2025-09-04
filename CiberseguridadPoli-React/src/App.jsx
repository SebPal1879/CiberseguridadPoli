import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import FooterValidator from "./components/FooterValidator";
import LecturePanel from "./pages/Lecture/LecturePanel";
import { useEffect, useState } from "react";

const invalidHeaderRoutes = ["/signin", "/signup", "/challenges/"];

function App() {
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(false);
  useEffect(
    function () {
      for (let route of invalidHeaderRoutes) {
        if (location.pathname.startsWith(route)) {
          console.log("cumplido");
          setShowHeader(false);
          return;
        }
      }
      setShowHeader(true);
    },
    [location.pathname]
  );
  return (
    <>
      <AccountProvider>
        {showHeader && <HeaderValidator />}
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="help-center" element={<HelpCenter />} />
          <Route path="account" element={<Account />} />
          <Route path="course" element={<CourseOverview />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="learning" element={<Learning />} />
          <Route path="learning/section/:id" element={<Section />} />
          <Route path="help-center" element={<HelpCenter />} />
          <Route path="history" element={<History />} />
          <Route
            path="learning/section/:ids/lecture/:idl"
            element={
              <Lecture>
                <LecturePanel />
              </Lecture>
            }
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
        <FooterValidator />
      </AccountProvider>
    </>
  );
}

export default App;
