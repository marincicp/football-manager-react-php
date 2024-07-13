import { forwardRef } from "react";
import Spinner from "./Spinner";

const PageLayout = forwardRef(({ children, className, loading }, ref) => {
  const tlaod = true;
  return (
    <div
      className={`relative bg-red-300 h-screen p-4 flex  flex-col gap-6 ${className}`}
      ref={ref}
    >
      {tlaod && (
        <div className="sppiner-div bg-green-300 absolute left-0 top-0 right-0 max-h-4">
          <Spinner />
        </div>
      )}
      {children}
    </div>
  );
});

function PageHeader({ children }) {
  return <div>{children}</div>;
}
function PageBody({ children, className }) {
  return <div className={`overflow-y-scroll ${className}`}>{children}</div>;
}

PageLayout.Header = PageHeader;
PageLayout.Body = PageBody;

export default PageLayout;
