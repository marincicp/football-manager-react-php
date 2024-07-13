function Logo({ className, isLogin = false, header = "" }) {
  const imgClassName = isLogin ? "h-[120px] w-[120px]" : "h-[50px] w-[50px]";

  return (
    <div className={`flex items-center gap-6 p-4 ${className}`}>
      <img
        className={`${imgClassName}`}
        src="./public/mladost-grb.png"
        alt="logo"
      />
      <h1
        className={`text-3xl font-bold text-cust-grey-900 tracking-wide ${header}`}
      >
        NK Mladost Cerić
      </h1>
    </div>
  );
}

export default Logo;
