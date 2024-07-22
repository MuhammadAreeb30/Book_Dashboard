import { TableBody, TableCell, TableRow } from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";

import { books, BookTableProps } from "../types/bookList";
import { Badge } from "./ui/badge";

const BooksTable: React.FC<BookTableProps> = ({ bookList }) => {
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

  return (
    <TableBody>
      {bookList.map((book: books) => {
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
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
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
