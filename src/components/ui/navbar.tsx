import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNavbarState } from "@/stores/navbarSlice/navbarSlice";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";

export default function Navbar() {
  const navigate = useNavigate();
  const activeIdx = useSelector((state) => state.navbar.activeIdx);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      }
    });
  }, [auth, user]);
  return (
    <div className=" w-screen  h-16 flex justify-center items-center mb-3">
      {!loggedIn ? (
        <div className=" m-auto flex gap-12  w-fit">
          <Button
            variant={"link"}
            className={`text-slate-400 hover:text-slate-100 text-base hover:no-underline ${
              activeIdx == 0 && "text-slate-100"
            }`}
            onClick={() => {
              dispatch(setNavbarState(0));
              navigate("/");
            }}
          >
            How it works
          </Button>
          <Button
            variant={"link"}
            className={`text-slate-400 hover:text-slate-100 text-base hover:no-underline ${
              activeIdx == 1 && "text-slate-100"
            }`}
            onClick={() => {
              dispatch(setNavbarState(1));
              navigate("/");
            }}
          >
            Premium
          </Button>
          <Button
            variant={"link"}
            className={`text-slate-400 hover:text-slate-100 text-base hover:no-underline ${
              activeIdx == 2 && "text-slate-100"
            }`}
            onClick={() => {
              dispatch(setNavbarState(2));
              navigate("/login");
            }}
          >
            Sign in
          </Button>
        </div>
      ) : (
        <div className=" m-auto flex gap-12  w-fit">
          <Button
            variant={"link"}
            className={`text-slate-400 hover:text-slate-100 text-base hover:no-underline ${
              activeIdx == 0 && "text-slate-100"
            }`}
            onClick={() => {
              dispatch(setNavbarState(0));
              navigate("/");
            }}
          >
            Habits
          </Button>
          <Button
            variant={"link"}
            className={`text-slate-400 hover:text-slate-100 text-base hover:no-underline ${
              activeIdx == 1 && "text-slate-100"
            }`}
            onClick={() => {
              dispatch(setNavbarState(1));
              navigate("/");
            }}
          >
            Profile
          </Button>
          <Button
            variant={"link"}
            className={`text-slate-400 hover:text-slate-100 text-base hover:no-underline ${
              activeIdx == 2 && "text-slate-100"
            }`}
            onClick={() => {
              dispatch(setNavbarState(2));
              navigate("/login");
            }}
          >
            Settings
          </Button>
        </div>
      )}
    </div>
  );
}
