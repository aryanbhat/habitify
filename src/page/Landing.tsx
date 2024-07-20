import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setNavbarState } from "@/stores/navbarSlice/navbarSlice";

function Landing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleRedirection: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(setNavbarState(2));
    navigate("/login");
  };

  useEffect(() => {
    console.log(user.username, user.uid);
  }, [user]);

  return (
    <div className=" w-screen h-fit flex flex-col gap-8 justify-center ">
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
    </div>
  );
}

export default Landing;
