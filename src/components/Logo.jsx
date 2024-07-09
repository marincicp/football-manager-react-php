function Logo() {
  return (
    <div className="flex items-center gap-6 p-4">
      <img
        className="h-[5rem] w-[5rem]"
        src="./public/mladost-grb.png"
        alt="logo"
      />
      <h1 className="text-3xl font-bold text-cust-grey-900 tracking-wide	">
        NK Mladost Cerić
      </h1>
    </div>
  );
}

export default Logo;
