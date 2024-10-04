import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import { setNavbarState } from "@/stores/navbarSlice/navbarSlice";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { setUser } from "@/stores/userSlice/userSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";

export default function Navbar() {
  const navigate = useNavigate();
  const activeIdx = useAppSelector((state) => state.navbar.activeIdx);
  const dispatch = useAppDispatch();
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        const userData = {
          username: user?.displayName,
          email: user?.email,
          uid: user?.uid,
          profile: user?.photoURL,
        };
        dispatch(setUser(userData));
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, [auth]);

  if (loggedIn === undefined) {
    return (
      <div className="w-screen  h-16 flex justify-center items-center mb-3 "></div>
    );
  }

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
              navigate("/habits");
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
              navigate("/profile");
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
              navigate("/settings");
            }}
          >
            Settings
          </Button>
        </div>
      )}
    </div>
  );
}
