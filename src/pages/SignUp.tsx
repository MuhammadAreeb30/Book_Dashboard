import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import useTokenStore from "../tokenStore";

const SignUp = () => {
  const { token, setToken, setUserId } = useTokenStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  if (token) {
    return <Navigate to={"/dashboard/home"} />;
  }

  const userRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const user = {
        username: usernameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      };
      // console.log(user, "user");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_AUTH_URI}register`,
        user
      );
      // console.log(response, "response");
      if (response.status === 201) {
        setToken(response.data.token);
        setUserId(response.data.userID);
        setIsLoading(false);
        navigate("/dashboard/home");
        return toast.success("Account created successfully.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to create account", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <section className="h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Name</Label>
              <Input
                id="name"
                type="text"
                required
                className="focus-visible:ring-main"
                ref={usernameRef}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="focus-visible:ring-main"
                ref={emailRef}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                className="focus-visible:ring-main"
                required
                ref={passwordRef}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-main hover:bg-main hover:opacity-[0.90]"
              onClick={userRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin" />{" "}
                  <span className="ml-2">Create an account</span>
                </>
              ) : (
                "Create an account"
              )}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-md text-main font-semibold">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default SignUp;
