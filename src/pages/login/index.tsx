import { AuthPage } from "@/components/refine-ui/auth";
import { FaGoogle } from "react-icons/fa";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      providers={[
        {
          name: "google",
          icon: <FaGoogle />,
          label: "Sign in with Google",
        },
      ]}
      wrapperProps={{
        className: "min-h-screen flex items-center justify-center",
      }}
    />
  );
};
