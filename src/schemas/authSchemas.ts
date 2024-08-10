import { db } from "@/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import toast from "react-hot-toast";
import { z } from "zod";

// Function to check if the username is unique
async function isUsernameUnique(username: string): Promise<boolean> {
  try {
    const q = query(collection(db, "users"), where("username", "==", username));
    const qSnap = await getDocs(q);
    return qSnap.empty; // Return true if no matching documents
  } catch (err) {
    toast.error("An error occurred, Please try again");
    return false;
  }
}

// Zod schema with async validation using preprocess
const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Please enter a valid email" })
      .max(50)
      .email({ message: "Please enter a valid email" }),
    username: z
      .string()
      .min(1, { message: "Please enter your name" })
      .max(50)
      .refine(
        async (username) => {
          const isUnique = await isUsernameUnique(username);
          return isUnique;
        },
        {
          message: "Username is already taken",
        }
      ),
    password: z.string().min(6).max(50),
    confirmPassword: z.string().min(6).max(50),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Preprocess function to handle async validation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function preprocessRegisterData(data: any) {
  console.log("data", data);
  if (typeof data.username === "string") {
    const isUnique = await isUsernameUnique(data.username);
    if (!isUnique) {
      // toast.error("Username is already taken");
    }
  }
  return data;
}

// Schema with preprocessing
const registerSchemaWithPreprocess = z.preprocess(
  preprocessRegisterData,
  registerSchema
);

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter a valid email" })
    .max(50)
    .email({ message: "Please enter a valid email" }),
  password: z.string().min(6).max(50),
});

export { registerSchemaWithPreprocess as registerSchema, loginSchema };
