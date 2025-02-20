import { useContext } from "react";
import { AuthContext, IAuthContext } from "react-oauth2-code-pkce";
import Button from "./Button";
import { ButtonColour } from "../types/ButtonColor";
import Main from "./Main";

function LoginManager() {
  const auth: IAuthContext = useContext(AuthContext);
  return (
    <div>
      {!auth.token ? (
        <div>
          <Button colour={ButtonColour.Blue} onClick={() => auth.logIn()}>
            Login
          </Button>
        </div>
      ) : (
        <div>
          <Button colour={ButtonColour.Red} onClick={() => auth.logOut()}>
            Logout
          </Button>
          <div className="mt-4 flex flex-col">
            <Main authToken={auth.token} />
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginManager;
