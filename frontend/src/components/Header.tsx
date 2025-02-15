import { useContext } from "react";
import { AuthContext, IAuthContext } from "react-oauth2-code-pkce";

function Header() {
  const auth: IAuthContext = useContext(AuthContext);

  return <div>header</div>;
}

export default Header;
