import { Route, Routes } from "react-router-dom";
import { ApplicationLayout } from "./views/ApplicationLayout.jsx";
import { Home } from "./views/Home.jsx";
import { Login } from "./views/Login.jsx";
import { Register } from "./views/Register.jsx";
import { Answers} from "./views/Answers.jsx";
import { Surveys } from "./views/Surveys.jsx";
import { Profile } from "./views/Profile.jsx";
import { useAuth } from "./state/AuthProvider.jsx";

function App() {
  const {accessToken} = useAuth();

  return (
    <>
      <ApplicationLayout>
        <Routes>
          {accessToken ?
              (
                  <>
                      <Route path="/surveys" element={ <Surveys/> }></Route>
                      <Route path="/answers" element={ <Answers/> }></Route>
                      <Route path="/profile" element={ <Profile/> }></Route>
                  </>
              ) : (
                  <>
                      <Route path="/" element={ <Home/> }></Route>
                      <Route path="/home" element={ <Home/> }></Route>
                      <Route path="/login" element={ <Login/> }></Route>
                      <Route path="/register" element={ <Register/> }></Route>
                  </>
              )
          }
        </Routes>
      </ApplicationLayout>
    </>
  )
}

export default App
