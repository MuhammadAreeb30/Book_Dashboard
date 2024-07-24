import { Link, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Tabs, TabsContent } from "../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import useTokenStore from "../tokenStore";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";

const AddBook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useTokenStore((state) => state);
  const nameRef = useRef<HTMLInputElement>(null);
  const genreRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const coverImageRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const pdfRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const createBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", nameRef.current?.value || "");
      formData.append("genre", genreRef.current?.value || "");
      formData.append("author", authorRef.current?.value || "");
      formData.append("description", descriptionRef.current?.value || "");
      formData.append("coverImage", coverImageRef.current?.files?.[0] || "");
      formData.append("file", pdfRef.current?.files?.[0] || "");

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BOOKS_URI}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        setIsLoading(false);
        navigate("/dashboard/books");
        return toast.success("Book created successfully", {
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
      toast.error("Something went wrong", {
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
    <>
      <form>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/dashboard/home">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/dashboard/books">Books</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Create</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex gap-4 md:grow-0">
            <NavLink to={"/dashboard/books"}>
              <Button variant={"outline"}>Cancel</Button>
            </NavLink>
            <Button type="submit" onClick={createBook} disabled={isLoading}>
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin" />{" "}
                  <span className="ml-2">Submit</span>
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader className="flex flex-row items-center">
                  <div>
                    <CardTitle>Create a new Book</CardTitle>
                    <CardDescription>
                      Fill out the form below to create a new Book.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Name</Label>
                      <Input ref={nameRef} type="text" id="name" required />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="genre">Genre</Label>
                      <Input ref={genreRef} type="text" id="genre" required />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="author">Author</Label>
                      <Input ref={authorRef} type="text" id="author" required />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="coverImage">Cover Image</Label>
                      <Input
                        ref={coverImageRef}
                        type="file"
                        id="coverImage"
                        required
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="pdf">Book PDF</Label>
                      <Input ref={pdfRef} type="file" id="pdf" required />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        ref={descriptionRef}
                        id="description"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </form>
    </>
  );
};

export default AddBook;
