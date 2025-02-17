import { useContext } from "react";
import { AuthContext, IAuthContext } from "react-oauth2-code-pkce";
import useFetch from "../hooks/useFetch";
import { Place } from "../types/Place";
import Button from "./Button";
import { ButtonColour } from "../types/ButtonColor";

function Login() {
  const auth: IAuthContext = useContext(AuthContext);
  const { data, loading, error } = useFetch<Place>(
    "http://localhost:8080/places",
    {
      token: auth.token,
    },
  );

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
            <Button
              colour={ButtonColour.Purple}
              onClick={() => {
                console.log(data);
              }}
            >
              Fetch
            </Button>
            <Button
              colour={ButtonColour.Purple}
              onClick={() => {
                console.log(auth.token);
              }}
            >
              Print Token
            </Button>
          </div>
          {error ? <p>:-(</p> : <p>ok :-)</p>}
        </div>
      )}
    </div>
  );
}

export default Login;
