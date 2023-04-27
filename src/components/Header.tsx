import { signIn, signOut, useSession } from "next-auth/react";
import { useBuyCredits } from "~/hooks/useBuyCredits";
import { Button } from "./Button";
import { PrimaryLink } from "./PrimaryLink";

export function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;
  const { buyCredits } = useBuyCredits();
  return (
    <header className="container mx-auto flex h-16 items-center justify-between px-4 dark:bg-gray-800">
      <PrimaryLink href={"/"}>Icon Generator</PrimaryLink>
      <ul>
        <PrimaryLink href="/generate">Generate</PrimaryLink>
      </ul>
      <ul className="flex gap-2">
        {!isLoggedIn && (
          <li>
            <Button
              variant="secondary"
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
            <li>
              <Button
                onClick={() => {
                  buyCredits().catch(console.error);
                }}
              >
                Buy Credits
              </Button>
            </li>
            <li>
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
      <div>Account Buttons</div>
    </header>
  );
}
