import React from "react";
import { PrimaryLink } from "./PrimaryLink";

export default function Price() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto mb-8 max-w-screen-md text-center lg:mb-12">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Lets Talk About Pricing
          </h2>
          <p className="mb-5 font-light text-gray-500 dark:text-gray-400 sm:text-xl">
            Here at AssetBrainAI we try to keep pricing as simple as possible.
            Unfortunatly our service is not free, but we do offer a free credit
            on sign up !
          </p>
        </div>
        <div className="space-y-8 sm:gap-6 lg:grid lg:grid-cols-3 lg:space-y-0 xl:gap-10">
          <div className="mx-auto flex max-w-lg flex-col rounded-lg border border-gray-100 bg-white p-6 text-center text-gray-900 shadow dark:border-gray-600 dark:bg-gray-800 dark:text-white xl:p-8">
            <h3 className="mb-4 text-2xl font-semibold">Free Trial</h3>
            <p className="font-light text-gray-500 dark:text-gray-400 sm:text-lg">
              On sign up you will get 1 free credit to try out our service.
            </p>
            <div className="my-8 flex items-baseline justify-center">
              <span className="mr-2 text-5xl font-extrabold">$0</span>
              <span className="text-gray-500 dark:text-gray-400">
                / 1 Free Credit
              </span>
            </div>

            <PrimaryLink href="/generate">Get Started</PrimaryLink>
          </div>
          <div className="mx-auto flex max-w-lg flex-col rounded-lg border border-gray-100 bg-white p-6 text-center text-gray-900 shadow dark:border-gray-600 dark:bg-gray-800 dark:text-white xl:p-8">
            <h3 className="mb-4 text-2xl font-semibold">Starter Pack</h3>
            <p className="font-light text-gray-500 dark:text-gray-400 sm:text-lg">
              Best for small scale uses and personal projects.
            </p>
            <div className="my-8 flex items-baseline justify-center">
              <span className="mr-2 text-5xl font-extrabold">$5</span>
              <span className="text-gray-500 dark:text-gray-400">
                / 50 Credits
              </span>
            </div>

            <PrimaryLink href="/generate">Get Started</PrimaryLink>
          </div>

          <div className="mx-auto flex max-w-lg flex-col rounded-lg border border-gray-100 bg-white p-6 text-center text-gray-900 shadow dark:border-gray-600 dark:bg-gray-800 dark:text-white xl:p-8">
            <h3 className="mb-4 text-2xl font-semibold">Enterprise</h3>
            <p className="font-light text-gray-500 dark:text-gray-400 sm:text-lg">
              Best for large scale uses and extended redistribution rights.
            </p>
            <div className="my-8 flex items-baseline justify-center">
              <span className="mr-2 text-5xl font-extrabold">$19</span>
              <span className="text-gray-500 dark:text-gray-400">
                / 250 Credits
              </span>
            </div>
            <PrimaryLink href="/generate">Get Started</PrimaryLink>
          </div>
        </div>
      </div>
    </section>
  );
}
