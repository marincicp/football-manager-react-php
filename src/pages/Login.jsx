import { useState } from "react";
import { Logo } from "../components";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await login(username, password);
    navigate("/");
  }

  return (
    <div className="bg-cust-grey-100 h-screen w-screen flex justify-center items-center gap  ">
      <div className="bg-cust-grey-0 px-4 py-8 w-4/5 rounded flex flex-col justify-center items-center gap-10 shadow-lg">
        <Logo
          className="flex-col text-blue-700"
          size="6rem"
          header="text-4xl text-blue-800"
        />

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
            />
          </div>
          <div className="flex flex-col gap-2">
            <input
              placeholder="Lozinka"
              type="password"
              name="password"
              className="py-2 px-4 rounded-md bg-cust-grey-100 tracking-wider"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <button
              className="bg-blue-400 py-2 px-4 rounded-md text-white uppercase font-bold tracking-wider hover:bg-blue-700 transition-all duration-100 disabled:opacity-25"
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
