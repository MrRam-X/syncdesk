import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { api, errorMessageHandler } from "@/lib/api";
import type { AuthResponse } from "@syncdesk/shared";
import { API_URL } from "@/constants/appConstant";

const useRegisterForm = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registerFormInput, setRegisterFormInput] = useState({
    orgName: "",
    orgSlug: "",
    fullName: "",
    email: "",
    password: "",
  });

  const onRegisterformInputDataChange = (
    event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    let updatedValue = { ...registerFormInput };
    if (name == "orgName") {
      updatedValue = {
        ...updatedValue,
        orgSlug: value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-"),
      };
    }
    setRegisterFormInput({
      ...updatedValue,
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
      const { orgName, orgSlug, fullName, email, password } = registerFormInput;
      const response = await api.post<AuthResponse>(
        API_URL.REGISTER_OWNER,
        {
          orgName,
          orgSlug,
          fullName,
          email,
          password,
        },
      );

      if (response.status === 201) {
        toast.success(`${orgName} successfully registered!`);
      }

      navigate("/login");
    } catch (err: unknown) {
      const errorMessage = errorMessageHandler(
        "Registration failed. Please verify your details.",
        err,
      );
      console.log({errorMessage})
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  return {
    isLoading,
    registerFormInput,
    showPassword,
    onRegisterformInputDataChange,
    handleShowPasswordIconClick,
    handleSubmit,
    handleNavigateToLogin,
  };
};

export default useRegisterForm;
