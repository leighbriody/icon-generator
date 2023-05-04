import { signIn, useSession } from "next-auth/react";
import { PrimaryLink } from "./PrimaryLink";

export function CommunityHero() {
  const session = useSession();
  const isLoggedIn = !!session.data;

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-12 lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          The Designs Of The Community
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
          Have a look at some of the awesome assets the community has made. What
          are you waiting for? Join the fun!
        </p>
        <div className="whitespace-no-wrap focus:shadow-outline-indigo inline-block rounded-md bg-indigo-600 px-6 py-3 text-lg font-medium leading-6 text-white hover:bg-indigo-500 focus:bg-indigo-500 focus:outline-none">
          {!isLoggedIn && (
            <PrimaryLink
              onClick={() => {
                signIn().catch(console.error);
              }}
              href="/generate"
            >
              Join the community
            </PrimaryLink>
          )}

          {isLoggedIn && (
            <PrimaryLink href="/generate">
              Contribute to the community
            </PrimaryLink>
          )}
        </div>
      </div>
    </section>
  );
}
