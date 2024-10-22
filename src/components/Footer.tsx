import { Heart } from "lucide-react";
import { Button } from "./ui/button";

function Footer() {
  function handleRedirectClick() {
    const a = document.createElement("a");
    a.href = "https://github.com/aryanbhat";
    a.target = "blank";
    a.click();
  }

  return (
    <div className=" w-screen flex items-center justify-center my-3">
      Made with <Heart className="  mx-2" /> by{" "}
      <Button
        variant={"link"}
        className=" p-2 hover:underline cursor-pointer"
        onClick={handleRedirectClick}
      >
        Aryan
      </Button>
    </div>
  );
}

export default Footer;
