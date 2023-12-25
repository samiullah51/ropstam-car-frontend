import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import SignIn from "./pages/SignIn/SignIn";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import MyCars from "./pages/MyCars/MyCars";

function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/mycars" element={<MyCars />} />
        </Route>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
