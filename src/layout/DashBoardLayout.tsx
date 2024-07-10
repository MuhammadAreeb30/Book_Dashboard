import { Navigate, NavLink, Outlet } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Bell,
  CircleUser,
  Home,
  Menu,
  Book,
  Search,
  LogOut,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import useTokenStore from "../tokenStore";
import { toast } from "react-toastify";

const DashBoardLayout = () => {
  const { token, setToken } = useTokenStore((state) => state);
  if (!token) {
    return <Navigate to={"/login"} />;
  }

  const logOut = () => {
    setToken("");
    return toast.success("logged out Successfully.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <NavLink to="#" className="flex items-center gap-2 font-semibold">
              <Book className="h-6 w-6 text-main" />
              <span>Book Oisis</span>
            </NavLink>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4 text-main" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid gap-1 items-start px-2 text-sm font-medium lg:px-4">
              <NavLink
                to="/dashboard/home"
                className={({ isActive }) =>
                  isActive
                    ? "bg-muted flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-primary"
                    : "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary hover:bg-muted"
                }
              >
                <Home className="h-4 w-4 text-main" />
                Home
              </NavLink>
              <NavLink
                to="/dashboard/books"
                className={({ isActive }) =>
                  isActive
                    ? "bg-muted flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-primary"
                    : "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary hover:bg-muted"
                }
              >
                <Book className="h-4 w-4 text-main" />
                Books{" "}
              </NavLink>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5 text-main" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <NavLink
                  to="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Book className="h-6 w-6 text-main" />
                  <span>Book Oisis</span>
                </NavLink>
                <NavLink
                  to="/dashboard/home"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-muted flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-primary"
                      : "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary hover:bg-muted"
                  }
                >
                  <Home className="h-5 w-5 text-main" />
                  Home
                </NavLink>
                <NavLink
                  to="/dashboard/books"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-muted flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-primary"
                      : "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary hover:bg-muted"
                  }
                >
                  <Book className="h-5 w-5 text-main" />
                  Books
                </NavLink>
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5 text-main" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button onClick={logOut} variant={"ghost"}>
                  Logout <LogOut size={15} className="ml-2" />
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;
