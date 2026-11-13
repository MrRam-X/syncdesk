import { type FC } from "react";
import AuthLayout from "@/components/layout/AuthLayout";
import LoginForm from "@/features/auth/components/LoginForm";

const LoginPage: FC = () => {

  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;