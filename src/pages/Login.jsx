import { useEffect, useState } from "react";
import { Logo } from "../components";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { login, isLoading, user } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await login(username, password);
    navigate("/");
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="bg-cust-grey-100 h-screen  w-screen flex justify-center items-center gap-2">
      <div className="bg-cust-grey-0 px-4 py-8 w-4/5 rounded-2xl flex flex-col justify-center items-center gap-4 shadow-lg md:w-6/12 lg:w-1/3 2xl:w-3/12">
        <Logo className="flex-col text-blue-800" header isLogin={true} />

        <form
          className="px-4 py-8 s rounded-md flex flex-col gap-10 w-full bg-cust-grey-0"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4">
            <input
              placeholder="Username"
              type="text"
              name="username"
              className="py-2 px-4 rounded-md bg-cust-grey-100 tracking-wider  text-blue-900 focus:outline-0 focus:ring-offset-2 focus:ring-2 focus:ring-blue-700"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <input
              placeholder="Lozinka"
              type="password"
              name="password"
              className="py-2 px-4 rounded-md bg-cust-grey-100 tracking-wider  text-blue-900 focus:outline-0 focus:ring-offset-2 focus:ring-2 focus:ring-blue-700"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <button
              className={`bg-blue-500  px-4 rounded-md text-white uppercase font-bold tracking-wider hover:bg-blue-700 transition-all duration-100 disabled:opacity-25 py-2 max-h-[34px]`}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Prijavi se"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
