import PropTypes from "prop-types";

function Logo({ className, isLogin = false, header = false }) {
  const imgClassName = isLogin ? "h-[120px] w-[120px]" : "h-[50px] w-[50px]";
  const titleColor = header
    ? "text-4xl text-blue-[#1e40af]"
    : "text-cust-grey-900 text-3xl";
  return (
    <div className={`flex items-center gap-6 p-4 ${className}`}>
      <img
        className={`${imgClassName}`}
        src="./public/mladost-grb.png"
        alt="logo"
      />
      <h1 className={` font-bold tracking-wide ${titleColor}`}>
        NK Mladost Cerić
      </h1>
    </div>
  );
}

export default Logo;

Logo.propTypes = {
  className: PropTypes.string,
  isLogin: PropTypes.bool,
  header: PropTypes.bool,
};
