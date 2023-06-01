import { Route, Routes } from "react-router-dom";
import { ApplicationLayout } from "./views/layout/ApplicationLayout.jsx";
import Home from "./views/home/Home.jsx";
import { Login } from "./views/auth/Login.jsx";
import { Register } from "./views/auth/Register.jsx";
import { Answers} from "./views/answer/Answers.jsx";
import { Surveys } from "./views/survey/Surveys.jsx";
import { Profile } from "./views/profile/Profile.jsx";
import {store} from "./state/store.js";

export default function App() {
  const accessToken = false;

  return (
    <>
      <ApplicationLayout>
        <Routes>
          { accessToken ?
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

console.log("Initial state: ", store.getState());

const unsubscribe = store.subscribe(() =>
    console.log("State after dispatch: ", store.getState())
);

unsubscribe();
