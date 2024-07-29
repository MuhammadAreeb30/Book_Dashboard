import { createBrowserRouter } from "react-router-dom";
import Page from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DashBoardLayout from "./layout/DashBoardLayout";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";

export const Router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DashBoardLayout />,
    children: [
      {
        path: "home",
        element: <Page />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "add-book",
        element: <AddBook />,
      },
      {
        path: "edit-book/:id",
        element: <EditBook />
      }
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/sign-up", element: <SignUp /> },
]);
