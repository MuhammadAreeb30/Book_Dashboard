export interface books {
  _id: string;
  title: string;
  genre: string;
  author: string;
  description: string;
  coverImage: string;
  file: string;
  token: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookTableProps {
  bookList: books[];
}
