import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setNavbarState } from "@/stores/navbarSlice/navbarSlice";
import { auth } from "@/firebaseConfig";

import AnimatedComponent from "@/components/AnimatedComponent";

function Landing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRedirection: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(setNavbarState(2));
    navigate("/login");
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/habits");
      }
    });
  }, []);

  return (
    <AnimatedComponent>
      <div className="content max-w-5xl mx-auto">
        <div className=" tagline text-4xl text-center  ">
          Track your habits with beautiful calendar heat maps and customizable
          statistics.
        </div>
        <Button
          onClick={handleRedirection}
          size={"lg"}
          className=" flex items-center justify-center gap-2 mt-10 mx-auto"
        >
          <span>Create your Habit</span>
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </div>
    </AnimatedComponent>
  );
}

export default Landing;
