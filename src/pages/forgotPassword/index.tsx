import { AuthPage } from "@/components/refine-ui/auth";

export const ForgotPassword = () => {
  return (
    <AuthPage
      type="forgotPassword"
      wrapperProps={{
        className: "min-h-screen flex items-center justify-center",
      }}
    />
  );
};
