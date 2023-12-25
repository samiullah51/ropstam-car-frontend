import { Routes, Route } from "react-router-dom";

import ProtectedRoutes from "./ProtectedRoutes";
import Home from "./pages/HomePage";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn/SignIn";

function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
