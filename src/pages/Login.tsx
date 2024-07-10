"use client";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import axios from "axios";
import useTokenStore from "../tokenStore";

const Login = () => {
  const setToken = useTokenStore((state) => state.setToken);
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const userLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const user = {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      };
      // console.log(user, "user");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_AUTH_URI}login`,
        user
      );
      // console.log(response, "response");

      if (response.status === 200) {
        setToken(response.data.token);
        setIsLoading(false);
        navigate("/dashboard/home");
        return toast.success("Login Successfully", {
          position: "top-right",
          autoClose: 5000,
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
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 5000,
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
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
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
              required
              className="focus-visible:ring-main"
              ref={passwordRef}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            className="w-full bg-main hover:bg-main hover:opacity-[0.90]"
            type="submit"
            onClick={userLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoaderCircle className="animate-spin" />{" "}
                <span className="ml-2">Sign in</span>
              </>
            ) : (
              "Sign in"
            )}
          </Button>
          <CardDescription>
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-md text-main font-semibold">
              Sign up
            </Link>
          </CardDescription>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Login;
