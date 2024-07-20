import axios from "axios";
import { z } from "zod";

function isUsernameUnique(username: string) {
  try {
    console.log(username);
    // const formData = {
    //   username,
    // };
    // const res = await axios.post(
    //   `${import.meta.env.VITE_API_URL}/api/auth/username`,
    //   formData
    // );
    return true;
  } catch (err) {
    alert("an error occured");
    return;
  }
}

const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, {
        message: "please enter a valid email",
      })
      .max(50)
      .email({
        message: "please enter a valid email",
      }),
    username: z
      .string()
      .min(1, { message: "please enter your name" })
      .max(50)
      .refine(
        async (username) => {
          const isUnique = await isUsernameUnique(username);
          return isUnique;
        },
        {
          async: true,
          message: "Username is already taken",
        }
      ),
    password: z.string().min(6).max(50),
    confirmPassword: z.string().min(6).max(50),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

const loginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "please enter a valid email",
    })
    .max(50)
    .email({
      message: "please enter a valid email",
    }),
  password: z.string().min(6).max(50),
});

export { registerSchema, loginSchema };
