import { signIn, signOut, useSession } from "next-auth/react";
import { useBuyCredits } from "~/hooks/useBuyCredits";
import { Button } from "./Button";
import { PrimaryLink } from "./PrimaryLink";
import { api } from "~/utils/api";

export function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;
  const { buyCredits } = useBuyCredits();

  const credits = api.user.getCredits.useQuery();

  return (
    <nav className="border-gray-200 bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <div className="flex items-center">

          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            <PrimaryLink href={"/"}>Icon Generator</PrimaryLink>
          </span>
        </div>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className="hidden w-full md:block md:w-auto"
          id="navbar-default container"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
            <li className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
              <PrimaryLink href="/generate">Generate Icons</PrimaryLink>
            </li>

            <li className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
              <PrimaryLink href="/community">Community</PrimaryLink>
            </li>
            {isLoggedIn && (
              <>
                <li className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
                  <PrimaryLink href="/collection">Collection</PrimaryLink>
                </li>
              </>
            )}

            {!isLoggedIn && (
              <li className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
                <Button
                  variant="primary"
                  onClick={() => {
                    signIn().catch(console.error);
                  }}
                >
                  Login
                </Button>
              </li>
            )}

            {isLoggedIn && (
              <>
                <li className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
                  Credits Remaining: {credits.data}
                </li>
                <li className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
                  <Button
                    onClick={() => {
                      buyCredits().catch(console.error);
                    }}
                  >
                    Buy Credits
                  </Button>
                </li>
                <li className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      signOut().catch(console.error);
                    }}
                  >
                    Logout
                  </Button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>

    // <header className="container mx-auto flex h-16 items-center justify-between px-4 dark:bg-gray-800">
    //   <PrimaryLink href={"/"}>Icon Generator</PrimaryLink>
    //   <ul className="flex gap-4">
    //     <li>
    //       <PrimaryLink href="/generate">Generate</PrimaryLink>
    //     </li>
    //     {isLoggedIn && (
    //       <>
    //         <li>
    //           <PrimaryLink href="/collection">Collection</PrimaryLink>
    //         </li>
    //         <li>
    //           <PrimaryLink href="/community">Community</PrimaryLink>
    //         </li>
    //       </>
    //     )}
    //   </ul>
    //   <ul className="flex gap-2">
    // {!isLoggedIn && (
    //   <li>
    //     <Button
    //       variant="secondary"
    //       onClick={() => {
    //         signIn().catch(console.error);
    //       }}
    //     >
    //       Login
    //     </Button>
    //   </li>
    // )}
    // {isLoggedIn && (
    //   <>
    //     <div className="flex items-center justify-center">
    //       Credits Remaining: {credits.data}
    //     </div>

    //     <li>
    //       <Button
    //         onClick={() => {
    //           buyCredits().catch(console.error);
    //         }}
    //       >
    //         Buy Credits
    //       </Button>
    //     </li>
    //     <li>
    //       <Button
    //         variant="secondary"
    //         onClick={() => {
    //           signOut().catch(console.error);
    //         }}
    //       >
    //         Logout
    //       </Button>
    //     </li>
    //   </>
    // )}
    //   </ul>
    //   <div>Account Buttons</div>
    // </header>
  );
}
