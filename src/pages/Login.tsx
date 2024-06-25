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

const Login = () => {
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
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              className="focus-visible:ring-main"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full bg-main hover:bg-main hover:opacity-[0.90]">
            Sign in
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
