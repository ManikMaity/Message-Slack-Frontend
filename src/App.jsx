import "./App.css";

import {} from "react";
import { Route, Routes } from "react-router-dom";

import Signup from "./components/organisms/auth/Signup";
import Auth from "./pages/auth/Auth";

function App() {
  return (
    
    <Routes>
      <Route path="/signup" element={<Auth><Signup/></Auth>} />
    </Routes>
  );
}

export default App;
