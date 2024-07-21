import { Button } from "@/components/ui/button";
import { auth } from "@/firebaseConfig";
import { resetNavbarState } from "@/stores/navbarSlice/navbarSlice";
import { resetUser } from "@/stores/userSlice/userSlice";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
    <div className=" w-full max-w-3xl flex flex-col justify-center items-center">
      <Button variant="destructive" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
};

export default Settings;
