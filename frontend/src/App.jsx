import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import AllTask from "./pages/AllTask";
import Complete from "./pages/Complete";
import Home from "./pages/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import InComplete from "./pages/InComplete";
import Important from "./pages/Important";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import { useSelector } from "react-redux";
import { useEffect } from "react";
function App() {
  const IsLogged = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  // console.log(IsLogged);
  const Id =  localStorage.getItem("id");
  const token = localStorage.getItem("token")
  // console.log(Id,token)
  useEffect(() => {
    if ( Id &&  token) {
      // navigate("/");
    }else if (IsLogged === false) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="bg-gray-900 h-screen p-2 text-white relative ">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<AllTask />} />
          <Route path="complete" element={<Complete />} />
          <Route path="Incomplete" element={<InComplete />} />
          <Route path="Important" element={<Important />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
