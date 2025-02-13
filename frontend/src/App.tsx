import "./App.css";
import { AuthProvider, TAuthConfig } from "react-oauth2-code-pkce";
import LoginStatus from "./components/LoginStatus";

function App() {
  const authConfig: TAuthConfig = {
    clientId: "web",
    authorizationEndpoint:
      "https://staging-auth.ramtracking.com/oauth2/authorize",
    tokenEndpoint: "https://staging-auth.ramtracking.com/oauth2/token",
    redirectUri: "http://localhost:3000/",
    decodeToken: true,
    scope: "all",
    autoLogin: false,
    refreshTokenExpiresIn: 600000,
  };

  return (
    <AuthProvider authConfig={authConfig}>
      <LoginStatus />
    </AuthProvider>
  );
}

export default App;
