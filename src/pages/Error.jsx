import { Link } from "react-router-dom";
import { PageLayout } from "../components";

function Error() {
  return (
    <PageLayout>
      <PageLayout.Body className="bg-cust-grey-200">
        <div className="h-fit flex justify-center flex-col items-center p-8 gap-8">
          <div className="flex flex-col justify-center items-center gap-8">
            <h2 className="text-4xl font-bold">Something went wrong!</h2>
            <p className="text-2xl ">Page not found.</p>
          </div>
          <Link
            className="py-2 px-6 text-white bg-cust-grey-600 rounded-md"
            to="/"
          >
            Go Back
          </Link>
        </div>
      </PageLayout.Body>
    </PageLayout>
  );
}

export default Error;
