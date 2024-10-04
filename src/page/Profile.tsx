import AnimatedComponent from "@/components/AnimatedComponent";
import { RootState } from "@/stores/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <AnimatedComponent>
      {user && (
        <div>
          <h1>{user.username}</h1>
          <h2>{user.email}</h2>
          <h2>{user.uid}</h2>
        </div>
      )}
    </AnimatedComponent>
  );
};

export default Profile;
