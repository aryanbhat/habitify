import AnimatedComponent from "@/components/AnimatedComponent";

import { auth } from "@/firebaseConfig";
import { User } from "firebase/auth";

import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  return (
    <AnimatedComponent>
      {user && (
        <div>
          <h1>{user.displayName}</h1>
          <h2>{user.email}</h2>
          <h2>{user.uid}</h2>
        </div>
      )}
    </AnimatedComponent>
  );
};

export default Profile;
