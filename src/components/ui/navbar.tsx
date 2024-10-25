import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import { setNavbarState } from "@/stores/navbarSlice/navbarSlice";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { setUser } from "@/stores/userSlice/userSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { collection, query, where } from "firebase/firestore";
import { getUserDetails } from "@/utils/getUserDataDb";

export default function Navbar() {
  const navigate = useNavigate();
  const activeIdx = useAppSelector((state) => state.navbar.activeIdx);
  const dispatch = useAppDispatch();
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const id = await getUserDetails({ email: user.email as string });
        const userData = {
          username: user?.displayName,
          email: user?.email,
          uid: id,
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
            Home
          </Button>
          <Button
            variant={"link"}
            className={`text-slate-400 hover:text-slate-100 text-base hover:no-underline ${
              activeIdx == 1 && "text-slate-100"
            }`}
            onClick={() => {
              dispatch(setNavbarState(1));
              navigate("/support");
            }}
          >
            Support
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
              navigate("/support");
            }}
          >
            Support
          </Button>
          <Button
            variant={"link"}
            className={`text-slate-400 hover:text-slate-100 text-base hover:no-underline ${
              activeIdx == 2 && "text-slate-100"
            }`}
            onClick={() => {
              dispatch(setNavbarState(2));
              navigate("/profile");
            }}
          >
            Profile
          </Button>
          <Button
            variant={"link"}
            className={`text-slate-400 hover:text-slate-100 text-base hover:no-underline ${
              activeIdx == 3 && "text-slate-100"
            }`}
            onClick={() => {
              dispatch(setNavbarState(3));
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
