import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "@/stores/userSlice/userSlice";
import { setNavbarState } from "@/stores/navbarSlice/navbarSlice";
import { MouseEventHandler } from "react";
import AnimatedComponent from "@/components/AnimatedComponent";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const googleProvider = new GoogleAuthProvider();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        values?.email,
        values?.password
      );
      if (userCred) {
        await updateProfile(userCred.user, {
          displayName: values?.username,
        });
        console.log(userCred.user);
        await addDoc(collection(db, "users"), {
          email: values?.email,
          username: values?.username,
        });
        dispatch(
          setUser({
            username: userCred?.user?.displayName,
            uid: userCred?.user?.uid,
            email: userCred?.user?.email,
            profile: userCred?.user?.photoURL,
          })
        );
        toast.success("🎉 Signup successful! Welcome aboard!");
        navigate("/habits");
        dispatch(setNavbarState(0));
      }
    } catch (err) {
      toast.error(err.message);
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
          const docRef = doc(db, "users", user.email);
          const userSnap = await getDoc(docRef);
          if (userSnap.exists()) {
            await setDoc(
              docRef,
              {
                username: user.displayName,
              },
              { merge: true }
            );
          } else {
            await setDoc(docRef, {
              email: user.email,
              username: user.displayName,
            });
          }
        }
        dispatch(setNavbarState(0));
        toast.success("Login successfull");
        navigate("/habits");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
  };

  return (
    <AnimatedComponent>
      <Card className=" w-full sm:w-full md:full lg:w-[30vw] px-4 py-2 shadow-md">
        <CardHeader>
          <CardTitle className=" text-xl text-center">Register</CardTitle>
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
                name="username"
                render={({ field }) => (
                  <FormItem className=" flex flex-col">
                    <FormLabel>Username</FormLabel>
                    <FormDescription>
                      This will appear on your public profile
                    </FormDescription>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        type="string"
                        placeholder="John"
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className=" flex flex-col">
                    <FormLabel>confirm password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Register
              </Button>
            </form>
          </Form>
          <div className="w-full bg-slate-400 h-px my-5"></div>
          <Button className=" w-full flex gap-3" onClick={handleGoogleLogin}>
            <FontAwesomeIcon icon={faGoogle} />
            <span>Continue with Google</span>
          </Button>
          <div className=" text-center mt-3">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className=" hover:underline-offset-2 hover:underline"
            >
              Login here
            </Link>{" "}
          </div>
        </CardContent>
      </Card>
    </AnimatedComponent>
  );
}

export default Register;
