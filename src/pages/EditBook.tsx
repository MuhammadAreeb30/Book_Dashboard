import { Link, useParams, useNavigate } from "react-router-dom";
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
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import useTokenStore from "../tokenStore";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";

const EditBook = () => {
  const { token } = useTokenStore((state) => state);
  const { id } = useParams<{ id: string }>();
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [book, setBook] = useState({
    title: "",
    genre: "",
    author: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BOOKS_URI}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response);
        if (response.status === 200) {
          setBook(response.data.book);
        }
      } catch (error) {
        navigate("/dashboard/books");
        return toast.error("Book not Found", {
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
    fetchBook();
  }, [id, token]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      if (name === "coverImage") {
        setCoverImageFile(files[0]);
      } else if (name === "file") {
        setPdfFile(files[0]);
      }
    }
  };

  const updateBook = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", book.title || "");
      formData.append("genre", book.genre || "");
      formData.append("author", book.author || "");
      formData.append("description", book.description || "");
      formData.append("coverImage", coverImageFile || "");
      formData.append("file", pdfFile || "");
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_BOOKS_URI}/${id}`,
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
        toast.success("Book updated successfully", {
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
      toast.error("Failed to update book", {
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
                <BreadcrumbPage>Edit</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex gap-4 md:grow-0">
            <NavLink to={"/dashboard/books"}>
              <Button variant={"outline"}>Cancel</Button>
            </NavLink>
            <Button type="submit" onClick={updateBook}>
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin" />{" "}
                  <span className="ml-2">Update Book</span>
                </>
              ) : (
                "Update Book"
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
                    <CardTitle>Edit Book</CardTitle>
                    <CardDescription>
                      Update the details below to edit the book information.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        value={book.title}
                        name="title"
                        type="text"
                        id="name"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="genre">Genre</Label>
                      <Input
                        name="genre"
                        value={book.genre}
                        type="text"
                        id="genre"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="author">Author</Label>
                      <Input
                        name="author"
                        value={book.author}
                        type="text"
                        id="author"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="coverImage">Cover Image</Label>
                      <Input
                        name="coverImage"
                        type="file"
                        id="coverImage"
                        onChange={handleFileChange}
                        required
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="pdf">Book PDF</Label>
                      <Input
                        name="file"
                        type="file"
                        id="pdf"
                        onChange={handleFileChange}
                        required
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        name="description"
                        value={book.description}
                        id="description"
                        onChange={handleInputChange}
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

export default EditBook;
