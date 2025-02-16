import { AuthProvider, TAuthConfig } from "react-oauth2-code-pkce";
import Header from "./components/Header";
import Login from "./components/Login";

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
    <div className="bg-gray-50 w-screen h-screen mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <AuthProvider authConfig={authConfig}>
        <Header />
        <Login />
      </AuthProvider>
    </div>
  );
}

export default App;
