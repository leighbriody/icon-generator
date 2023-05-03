import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Content from "~/components/Content";
import Price from "~/components/Price";
import { PrimaryLinkButton } from "~/components/PrimaryLinkButton";

function HeroBanner() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
              Generate Icons Using{" "}
              <span
                className="block text-indigo-600 xl:inline"
                data-primary="indigo-600"
              >
                The Power Of AI.
              </span>
            </h1>
            <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
              Generating Icons has never been easier , we use AI to help you
              created icons without the need for a designer.
            </p>
            <div className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-900 mr-3 inline-flex items-center justify-center rounded-lg px-5 py-3 text-center text-base font-medium text-white focus:ring-4">
              <PrimaryLinkButton href={"/generate"} className="self-start">
                Generate your Icons
              </PrimaryLinkButton>
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <div className="sm: hidden lg:col-span-5 lg:mt-0 lg:flex">
            <Image
              className="order-first sm:-order-none"
              src="/monkey2.png"
              alt="hero image"
              width="300"
              height="300"
            ></Image>
          </div>
        </div>
      </section>
      <Content></Content>
      <Price></Price>
    </>

    // <section className="mb-24 mt-12 grid grid-cols-1 gap-12 px-8 text-4xl sm:grid-cols-2">
    //   <div className="flex flex-col gap-4">
    //     <h1 className="text-6xl">Generate Icons with a click of a button</h1>
    //     <p className="text-2xl">
    //       Use AI to generate icons instead of paying a designer and waiting for
    //       them...
    //     </p>
    //     <PrimaryLinkButton href={"/generate"} className="self-start">
    //       Generate your Icons
    //     </PrimaryLinkButton>
    //   </div>
    //   <Image
    //     className="order-first sm:-order-none"
    //     src="/banner.png"
    //     alt="hero image"
    //     width="300"
    //     height="300"
    //   ></Image>
    // </section>
  );
}

export function Section() {
  return (
    <section className="tails-selected-element h-auto bg-red-100">
      <div className="mx-auto max-w-7xl px-10 py-24">
        <div className="mx-auto w-full text-left md:text-center">
          <h1 className="mx-auto mb-6 max-w-5xl text-5xl font-extrabold leading-none tracking-normal text-gray-900 sm:text-6xl md:text-6xl md:tracking-tight lg:text-7xl">
            {" "}
            The{" "}
            <span className="w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent lg:inline">
              Number One Source
            </span>{" "}
            for
            <br className="hidden lg:block" /> all your digital assets.{" "}
          </h1>
          <p className="mb-6 px-0 text-lg text-gray-600 md:text-xl lg:px-24">
            {" "}
            Say hello to the number one source for all your design needs. Drag
            and drop designs, edit designs, and modify the components to help
            tell your story.{" "}
          </p>
        </div>
      </div>
    </section>
  );
}
const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Icon Generator</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex  flex-col items-center justify-center">
        <HeroBanner />
      </main>
    </>
  );
};

export default HomePage;
