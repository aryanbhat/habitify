import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LogOut, Settings as SettingsIcon } from "lucide-react";
import { auth } from "@/firebaseConfig";
import { resetNavbarState } from "@/stores/navbarSlice/navbarSlice";
import { resetUser } from "@/stores/userSlice/userSlice";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/reduxHook";
import AnimatedComponent from "@/components/AnimatedComponent";

export default function Settings() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await signOut(auth);
      toast.success("You are logged out", {
        id: "Settings",
      });
      dispatch(resetUser());
      dispatch(resetNavbarState());
      navigate("/");
    } catch (err) {
      toast.error((err as Error).message || "Something went wrong", {
        id: "Settings",
      });
    }
  }

  return (
    <AnimatedComponent>
      <div className="container mx-auto py-10">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-6 w-6" />
              Settings
            </CardTitle>
            <CardDescription>
              Manage your account settings and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Your account settings and preferences would typically appear here.
              For now, you can use the button below to log out of your account.
            </p>
          </CardContent>
          <CardFooter>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to log out?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will sign you out of your account. You will need
                    to log in again to access your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout}>
                    Log out
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      </div>
    </AnimatedComponent>
  );
}
