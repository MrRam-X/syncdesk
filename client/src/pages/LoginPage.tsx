import { type FC } from "react";
import AuthLayout from "@/components/layout/AuthLayout";
import LoginForm from "@/features/auth/components/LoginForm";

const LoginPage: FC = () => {
  const handleSuccessLogin = (email: string) => {
    alert(`Logged in as ${email}`);
  };

  const handleNavigateToRegister = () => {
    alert("Navigate to /register");
  };

  return (
    <AuthLayout>
      <LoginForm
        onSuccessLogin={handleSuccessLogin}
        onNavigateToRegister={handleNavigateToRegister}
      />
    </AuthLayout>
  );
};

export default LoginPage;