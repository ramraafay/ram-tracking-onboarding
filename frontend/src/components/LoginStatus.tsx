import { useContext } from "react";
import { AuthContext, IAuthContext } from "react-oauth2-code-pkce";

function LoginStatus() {
  const auth: IAuthContext = useContext(AuthContext);

  return (
    <div>
      {auth.token ? (
        <div>
          <p>Logged in</p>
          <button onClick={() => auth.logOut()}>Logout</button>
          <AuthContext.Provider value={auth}>
            <button
              onClick={() => {
                console.log(auth.token);
              }}
            >
              print token
            </button>
          </AuthContext.Provider>
        </div>
      ) : (
        <div>
          <p>Not logged in</p>
          <button onClick={() => auth.logIn()}>Login</button>
        </div>
      )}
    </div>
  );
}

export default LoginStatus;
