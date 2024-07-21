import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./page/Login";
import Register from "./page/Register";
import Landing from "./page/Landing";
import Navbar from "./components/ui/navbar";
import Habits from "./page/Habits";
import Profile from "./page/Profile";
import Settings from "./page/Settings";

function App() {
  return (
    <div className=" w-screen flex flex-col justify-center items-center overflow-x-hidden max-w-5xl mx-auto">
      <Navbar />
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/habits" element={<Habits />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
