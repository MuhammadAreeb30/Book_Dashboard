import { TableBody, TableCell, TableRow } from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreHorizontal, Trash2Icon, Edit2Icon, EyeIcon } from "lucide-react";
import { Button } from "./ui/button";

import { books, BookTableProps } from "../types/bookList";
import { Badge } from "./ui/badge";
import { toast } from "react-toastify";
import axios from "axios";
import useTokenStore from "../tokenStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BooksTable: React.FC<BookTableProps> = ({ bookList, onBookDeleted }) => {
  const [books, setBooks] = useState<books[]>([]);
  const { token } = useTokenStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    setBooks(bookList);
  }, [bookList]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  // delete book code
  const deleteBook = async (id: string) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_BOOKS_URI}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        onBookDeleted(id);
        return toast.success("Book deleted successfully", {
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
      return toast.error("Failed to delete the book. Please try again later.", {
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
    <TableBody>
      {books.map((book: books) => {
        const { _id } = book;
        return (
          <TableRow key={book._id}>
            <TableCell className="hidden sm:table-cell">
              <img
                src={book.coverImage}
                width="64px"
                height="64px"
                alt={book.title}
              />
            </TableCell>
            <TableCell className="font-medium">{book.title}</TableCell>
            <TableCell>
              <Badge>{book.genre}</Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {book.author}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {formatDate(book.createdAt)}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => navigate("#")}
                  >
                    <EyeIcon size={18} className="pr-1" />
                    Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => navigate(`/dashboard/edit-book/${_id}`)}
                  >
                    <Edit2Icon size={18} className="pr-1" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => deleteBook(_id)}
                  >
                    <Trash2Icon size={18} className="pr-1" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default BooksTable;
