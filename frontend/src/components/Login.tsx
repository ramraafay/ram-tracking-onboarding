import { useContext } from "react";
import { AuthContext, IAuthContext } from "react-oauth2-code-pkce";
import Button from "./Button";
import { ButtonColour } from "../types/ButtonColor";
import Places from "./Places";

function Login() {
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
          <div className="pt-4 flex flex-col gap-4 w-min">
            <Places authToken={auth.token} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
