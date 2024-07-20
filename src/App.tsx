import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./page/Login";
import Register from "./page/Register";
import Landing from "./page/Landing";
import Navbar from "./components/ui/navbar";

function App() {
  return (
    <div className=" w-screen flex flex-col justify-center items-center overflow-x-hidden">
      <Navbar />
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
