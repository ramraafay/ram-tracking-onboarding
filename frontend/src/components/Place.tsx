import { useContext } from "react";
import { AuthContext, IAuthContext } from "react-oauth2-code-pkce";

function Place() {
  const auth: IAuthContext = useContext(AuthContext);

  return <div>place</div>;
}

export default Place;
