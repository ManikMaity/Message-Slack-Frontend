import "./App.css";

import {} from "react";
import { Route, Routes } from "react-router-dom";

import Signin from "@/components/organisms/auth/Signin";
import Signup from "@/components/organisms/auth/Signup";
import Auth from "@/pages/auth/Auth";
import NotFound from "./pages/NotFound";

function App() {
  return (
    
    <Routes>
      <Route path="/signup" element={<Auth><Signup/></Auth>} />
      <Route path="/signin" element={<Auth><Signin/></Auth>} />
      <Route path="/*" element={<NotFound/>} />
    </Routes>
  );
}

export default App;
