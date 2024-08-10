import { Button } from "@/components/ui/button";
import { auth } from "@/firebaseConfig";
import { resetNavbarState } from "@/stores/navbarSlice/navbarSlice";
import { resetUser } from "@/stores/userSlice/userSlice";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AnimatedComponent from "@/components/AnimatedComponent";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    signOut(auth)
      .then(() => {
        toast.success("you are logged out");
        dispatch(resetUser());
        dispatch(resetNavbarState());
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message || "something went wrong");
      });
  }

  return (
    <AnimatedComponent>
      <Button variant="destructive" onClick={handleLogout}>
        Log out
      </Button>
    </AnimatedComponent>
  );
};

export default Settings;
