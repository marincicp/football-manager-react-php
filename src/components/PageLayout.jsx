import { forwardRef } from "react";

const PageLayout = forwardRef(({ children, className, loading }, ref) => {
  return (
    <div
      className={`h-full px-2 py-8 flex  overflow-hidden  flex-col gap-6 rounded-xl ${className}`}
      ref={ref}
    >
      {children}
    </div>
  );
});

function PageHeader({ children, className }) {
  return <div className={className}>{children}</div>;
}
function PageBody({ children, className }) {
  return (
    <div
      className={` w-full px-2 shadow-md  h-full overflow-y-scroll  rounded-xl ${className}`}
    >
      {children}
    </div>
  );
}

PageLayout.Header = PageHeader;
PageLayout.Body = PageBody;

export default PageLayout;

// w-full px-2 shadow-md  h-4/5
