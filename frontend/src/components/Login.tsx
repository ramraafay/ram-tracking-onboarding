import { useContext } from "react";
import { AuthContext, IAuthContext } from "react-oauth2-code-pkce";

function Login() {
  const auth: IAuthContext = useContext(AuthContext);

  return (
    <div>
      {!auth.token ? (
        <div>
          <button
            className="inline-block rounded-sm bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-black focus:ring-3 focus:outline-hidden"
            onClick={() => auth.logIn()}
          >
            Login
          </button>
        </div>
      ) : (
        <div>
          <button
            className="inline-block rounded-sm bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-black focus:ring-3 focus:outline-hidden"
            onClick={() => auth.logOut()}
          >
            Logout
          </button>
          <p>{auth.token}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
