import { AuthPage } from "@/components/refine-ui/auth";
import { FaGoogle } from "react-icons/fa";

export const Register = () => {
  return (
    <AuthPage
      type="register"
      providers={[
        {
          name: "google",
          icon: <FaGoogle />,
          label: "Sign up with Google",
        },
      ]}
      wrapperProps={{
        className: "min-h-screen flex items-center justify-center",
      }}
    />
  );
};
