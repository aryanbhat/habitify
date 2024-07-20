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
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { z } from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { MouseEventHandler } from "react";

function Login() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const formData = {
        email: values.email,
        password: values.password,
      };
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData
      );
      const data = res.data;
      localStorage.setItem("token", data.token);
      toast.success("successfully logged in", { id: "login" });
    } catch (err) {
      if (err.response.status === 403) {
        toast.error("invalid email or password", { id: "login" });
      } else {
        toast.error("an error occured", { id: "login" });
      }
    }
  }

  const handleGoogleLogin: MouseEventHandler<HTMLButtonElement> = () => {
    toast.success("done");
  };

  return (
    <div className=" w-full h-full flex flex-col justify-center items-center ">
      <Card className="sm:w-screen md:w-1/3  px-4 py-2 shadow-md">
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
    </div>
  );
}

export default Login;
