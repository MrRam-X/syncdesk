// import { useState } from "react";
// import {
//   Building2,
//   Mail,
//   Lock,
//   User,
//   ArrowRight,
//   Sparkles,
//   ShieldCheck,
//   Eye,
//   EyeOff,
// } from "lucide-react";
// import { AuthLayout } from "./components/layout/AuthLayout";
import BoardPage from "./pages/BoardPage";

export default function App() {
  // const [authMode, setAuthMode] = useState<"login" | "register">("login");
  // const [showPassword, setShowPassword] = useState(false);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const [orgName, setOrgName] = useState("");
  // const [orgSlug, setOrgSlug] = useState("");

  // const handleQuickDemo = (roleEmail: string) => {
  //   setEmail(roleEmail);
  //   setPassword("DemoPassword123!");
  // };

  // console.log(authMode);

  return (
    <BoardPage />
  );
}
