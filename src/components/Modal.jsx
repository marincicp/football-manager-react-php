import PropTypes from "prop-types";
import { HiOutlineX } from "react-icons/hi";

function Modal({ onClick, children }) {
  return (
    <>
      <div className="fixed w-screen top-0 left-0 bottom-0   transition-all duration-100 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm z-40">
        <div className="fixed top-[10%]  h-fit  max-h-[600px] bg-cust-grey-50 px-1 py-2 left-0 right-0 w-[95%]  z-40 mx-auto rounded-md overflow-scroll sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%]">
          <button
            className="absolute top-6 right-6 text-4xl  rounded-full"
            onClick={onClick}
          >
            <HiOutlineX />
          </button>
          {children}
        </div>
      </div>
    </>
  );
}

export default Modal;

Modal.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.object,
};
