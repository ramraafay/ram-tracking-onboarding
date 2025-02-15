import { useContext } from "react";
import { AuthContext, IAuthContext } from "react-oauth2-code-pkce";

function Footer() {
  const auth: IAuthContext = useContext(AuthContext);

  return <div>footer</div>;
}

export default Footer;
