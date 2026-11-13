import { type FC } from "react";
import AuthLayout from "@/components/layout/AuthLayout";
import RegisterOrgForm from "@/features/auth/components/RegisterOrgForm";

const RegisterPage: FC = () => {
  return (
    <AuthLayout>
      <RegisterOrgForm
      />
    </AuthLayout>
  );
};

export default RegisterPage;