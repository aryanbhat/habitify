import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNavbarState } from "@/stores/navbarSlice/navbarSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const activeIdx = useSelector((state) => state.navbar.activeIdx);
  const dispatch = useDispatch();
  return (
    <div className=" w-screen  h-16 flex justify-center items-center mb-3">
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
    </div>
  );
}
