import * as React from "react";
import { Routes, Route,useLocation, Navigate} from "react-router-dom";
import "./App.css";
import { isAuthincated } from "./helper/auth";
import UserLogin from './Pages/userLogin'
import UserProfile from './Pages/userProfilePage'
import UserRegistration from "./Pages/userRegistration";

function App() {
  return (
      <Routes>
        <Route path="/login" element={<UserLogin />}/>
        <Route path="/create" element={<UserRegistration />}/>
        <Route path="/" element={
          <RequireAuth>
            <UserProfile />
          </RequireAuth>
        } />
      </Routes>
  );
}


function RequireAuth({ children }) {
  let auth = isAuthincated();
  let location = useLocation();

  if (!auth.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}


export default App;