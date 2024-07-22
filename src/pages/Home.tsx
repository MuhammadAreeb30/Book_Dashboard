import { Link } from "react-router-dom";

const Page = () => {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no books
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling as soon as you add a Book.
          </p>
          <Link to={"/dashboard/add-book"} className="mt-4 bg-main text-white py-2 px-6 rounded-md hover:bg-main/90">Add Book</Link>
        </div>
      </div>
    </>
  );
};

export default Page;
