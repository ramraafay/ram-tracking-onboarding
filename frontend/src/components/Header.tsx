import { useContext } from "react";
import { AuthContext, IAuthContext } from "react-oauth2-code-pkce";
import LoginButton from "./LoginButton";

function Header() {
  const auth: IAuthContext = useContext(AuthContext);

  return (
    <header className="border-b border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              RAF Tracking
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              Favourite places demo.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              className="inline-flex items-center justify-center gap-1.5 rounded-sm border border-gray-200 bg-white px-5 py-3 text-gray-900 transition hover:text-gray-700 focus:ring-3 focus:outline-hidden"
              type="button"
              href="https://ramtracking.atlassian.net/wiki/spaces/DEVELOPMEN/pages/3000271009/Tracking+Onboarding+Project"
            >
              <span className="text-sm font-medium">Confluence</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>

            <LoginButton />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
