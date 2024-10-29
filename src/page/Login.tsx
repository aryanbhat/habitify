import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { MouseEventHandler } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { setUser } from "@/stores/userSlice/userSlice";
import { setNavbarState } from "@/stores/navbarSlice/navbarSlice";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import AnimatedComponent from "@/components/AnimatedComponent";
import { useAppDispatch } from "@/hooks/reduxHook";

function Login() {
  const googleProvider = new GoogleAuthProvider();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      if (userCred) {
        dispatch(
          setUser({
            username: userCred?.user?.displayName,
            uid: userCred?.user?.uid,
            email: userCred?.user?.email,
            profile: userCred?.user?.photoURL,
          })
        );
        dispatch(setNavbarState(0));
        toast.success("Login successfull", {
          id: "login",
        });
        navigate("/habits");
      } else {
        toast.error("Something is wrong please try again", {
          id: "login",
        });
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "something went wrong";
      toast.error(message, {
        id: "login",
      });
      console.log(err);
    }
  }

  const handleGoogleLogin: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const userCred = await signInWithPopup(auth, googleProvider);
      if (userCred) {
        dispatch(
          setUser({
            username: userCred?.user?.displayName,
            uid: userCred?.user?.uid,
            email: userCred?.user?.email,
            profile: userCred?.user?.photoURL,
          })
        );
        const user = userCred.user;
        if (user.email) {
          const usersCollection = collection(db, "users");
          const q = query(usersCollection, where("email", "==", user.email));
          const userSnap = await getDocs(q);

          if (!userSnap.empty) {
            const userDoc = userSnap.docs[0];
            await updateDoc(doc(db, "users", userDoc.id), {
              username: user.displayName,
            });
            dispatch(
              setUser({
                uid: userDoc.id,
              })
            );
          } else {
            const newUserRef = await addDoc(collection(db, "users"), {
              email: user.email,
              username: user.displayName,
            });

            dispatch(
              setUser({
                uid: newUserRef.id,
              })
            );
          }
        }
        dispatch(setNavbarState(0));
        toast.success("🎉 Login successful! Welcome aboard!", {
          id: "login",
        });
        navigate("/habits");
      }
    } catch (err) {
      toast.error("Something went wrong", {
        id: "login",
      });
      console.log(err);
    }
  };

  return (
    <AnimatedComponent>
      <Card className=" w-full sm:w-full md:w-full lg:w-[30vw]  px-4 py-2 shadow-md">
        <CardHeader>
          <CardTitle className=" text-xl text-center">
            Welcome Aboard!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" space-y-6 flex flex-col"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className=" flex flex-col">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="johndoe@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className=" flex flex-col">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Login
              </Button>
            </form>
          </Form>
          <div className="w-full bg-slate-400 h-px my-5"></div>
          <Button className=" w-full flex gap-3" onClick={handleGoogleLogin}>
            <FontAwesomeIcon icon={faGoogle} />
            <span>Continue with Google</span>
          </Button>
          <div className=" text-center mt-3">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className=" hover:underline-offset-2 hover:underline"
            >
              Register here
            </Link>{" "}
          </div>
        </CardContent>
      </Card>
    </AnimatedComponent>
  );
}

export default Login;
