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
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { setUser } from "@/stores/userSlice/userSlice";
import { setNavbarState } from "@/stores/navbarSlice/navbarSlice";
import { MouseEventHandler } from "react";
import AnimatedComponent from "@/components/AnimatedComponent";
import { useAppDispatch } from "@/hooks/reduxHook";

function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
      const message =
        err instanceof Error ? err.message : "something went wrong";
      toast.error(message);
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
            console.log("New user added with ID: ", newUserRef.id);
            dispatch(
              setUser({
                uid: newUserRef.id,
              })
            );
          }
        }
        dispatch(setNavbarState(0));
        toast.success("🎉 Login successful! Welcome aboard!");
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
