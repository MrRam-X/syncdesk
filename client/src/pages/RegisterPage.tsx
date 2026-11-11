import { type FC } from "react";
import AuthLayout from "@/components/layout/AuthLayout";
import RegisterOrgForm from "@/features/auth/components/RegisterOrgForm";

const RegisterPage: FC = () => {
  const handleSuccessRegister = (data: {
    orgName: string;
    slug: string;
    ownerEmail: string;
  }) => {
    alert(`Registered ${data.orgName} (${data.slug}) for ${data.ownerEmail}`);
  };

  const handleNavigateToLogin = () => {
    alert("Navigate to /login");
  };

  return (
    <AuthLayout>
      <RegisterOrgForm
        onSuccessRegister={handleSuccessRegister}
        onNavigateToLogin={handleNavigateToLogin}
      />
    </AuthLayout>
  );
};

export default RegisterPage;