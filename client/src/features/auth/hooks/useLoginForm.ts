import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { api, errorMessageHandler } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";
import type { AuthResponse } from "@syncdesk/shared";
import { API_URL } from "@/constants/appConstant";

const useLoginForm = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginFormInput, setLoginFormInput] = useState({
    email: "",
    password: "",
  });

  const onLoginFormInputDataChange = (
    event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    setLoginFormInput({
      ...loginFormInput,
      [name]: value,
    });
  };

  const handleShowPasswordIconClick = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post<AuthResponse>(API_URL.LOGIN, {
        email: loginFormInput.email,
        password: loginFormInput.password,
      });

      const { user, token } = response.data;
      setAuth(user, token);

      toast.success(`Logged in as, ${user.fullName}!`);

      if (user.role === "ADMIN") {
        navigate("/admin/orgs");
      } else {
        navigate("/dashboard");
      }
    } catch (err: unknown) {
      const errorMessage = errorMessageHandler(
        "Failed to sign in. Please check your credentials.",
        err,
      );
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = (roleEmail: string) => {
    setLoginFormInput({
      email: roleEmail,
      password: "SuperSecretPassword123!",
    });
  };

  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  return {
    loginFormInput,
    showPassword,
    isLoading,
    onLoginFormInputDataChange,
    handleShowPasswordIconClick,
    handleQuickDemo,
    handleSubmit,
    handleNavigateToRegister,
  };
};

export default useLoginForm;
