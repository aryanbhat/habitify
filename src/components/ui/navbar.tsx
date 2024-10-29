import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { setUser } from "@/stores/userSlice/userSlice";
import { setNavbarState } from "@/stores/navbarSlice/navbarSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { getUserDetails } from "@/utils/getUserDataDb";
import { Button } from "./button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const activeIdx = useAppSelector((state) => state.navbar.activeIdx);
  const dispatch = useAppDispatch();
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const id = await getUserDetails({ email: user.email as string });
        const userData = {
          username: user?.displayName,
          email: user?.email,
          uid: id,
          profile: user?.photoURL,
        };
        dispatch(setUser(userData));
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, [auth, dispatch]);

  const handleNavigation = (index: number, path: string) => {
    dispatch(setNavbarState(index));
    navigate(path);
    setIsMenuOpen(false);
  };

  if (loggedIn === undefined) {
    return (
      <div className="w-full h-16 flex justify-center items-center mb-3"></div>
    );
  }

  const NavButton = ({
    index,
    path,
    children,
  }: {
    index: number;
    path: string;
    children: React.ReactNode;
  }) => (
    <Button
      variant="link"
      className={`w-full text-left text-slate-400 hover:text-slate-100 text-base hover:no-underline ${
        activeIdx === index && "text-slate-100"
      }`}
      onClick={() => handleNavigation(index, path)}
    >
      {children}
    </Button>
  );

  return (
    <nav className="w-full bg-background shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span
              className="text-xl font-bold text-primary cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              HabitTracker
            </span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {!loggedIn ? (
              <>
                <NavButton index={0} path="/">
                  Home
                </NavButton>
                <NavButton index={1} path="/support">
                  Support
                </NavButton>
                <NavButton index={2} path="/login">
                  Sign in
                </NavButton>
              </>
            ) : (
              <>
                <NavButton index={0} path="/habits">
                  Habits
                </NavButton>
                <NavButton index={1} path="/support">
                  Support
                </NavButton>
                <NavButton index={2} path="/profile">
                  Profile
                </NavButton>
                <NavButton index={3} path="/settings">
                  Settings
                </NavButton>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background shadow-lg">
            {!loggedIn ? (
              <>
                <NavButton index={0} path="/">
                  Home
                </NavButton>
                <NavButton index={1} path="/support">
                  Support
                </NavButton>
                <NavButton index={2} path="/login">
                  Sign in
                </NavButton>
              </>
            ) : (
              <>
                <NavButton index={0} path="/habits">
                  Habits
                </NavButton>
                <NavButton index={1} path="/support">
                  Support
                </NavButton>
                <NavButton index={2} path="/profile">
                  Profile
                </NavButton>
                <NavButton index={3} path="/settings">
                  Settings
                </NavButton>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
