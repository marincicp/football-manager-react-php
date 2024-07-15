import PropTypes from "prop-types";
function PageLayout({ children, className }) {
  return (
    <div
      className={`h-full px-2 py-8 flex  overflow-hidden  flex-col gap-6 rounded-xl ${className}`}
    >
      {children}
    </div>
  );
}

function PageHeader({ children, className }) {
  return (
    <div className={`sm:w-11/12 md:w-9/12 2xl:w-7/12 sm:mx-auto ${className}`}>
      {children}
    </div>
  );
}
function PageBody({ children, className }) {
  return (
    <div
      className={`w-full px-2 sm:px-0 shadow-md  h-fit  overflow-y-scroll  rounded-xl sm:w-11/12 md:w-9/12 2xl:w-7/12 sm:mx-auto ${className}`}
    >
      {children}
    </div>
  );
}

PageLayout.Header = PageHeader;
PageLayout.Body = PageBody;

export default PageLayout;

PageLayout.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

PageHeader.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

PageBody.propTypes = {
  children: PropTypes.object,
  className: PropTypes.string,
};
