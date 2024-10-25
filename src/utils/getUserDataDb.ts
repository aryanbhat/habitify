import { db } from "@/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import toast from "react-hot-toast";

export async function getUserDetails({ email }: { email: string }) {
  try {
    const q = query(collection(db, "users"), where("email", "==", email));
    const qSnap = await getDocs(q);
    if (qSnap.empty) {
      return null;
    }
    let docData = "";
    qSnap.forEach((doc) => {
      docData = doc.id;
    });
    return docData;
  } catch (error) {
    toast.error("please logout and try again");
    console.error(error);
    return null;
  }
}
