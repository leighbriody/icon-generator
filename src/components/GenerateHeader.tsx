export default function GenerateHeader() {
  return (
    <section className="tails-selected-element h-auto bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-10 py-24">
        <div className="mx-auto w-full text-left md:text-center">
          <h1 className="mx-auto mb-6 max-w-5xl text-5xl font-extrabold leading-none tracking-normal text-gray-900 dark:text-white sm:text-6xl md:text-6xl md:tracking-tight lg:text-7xl">
            {" "}
            Lets{" "}
            <span className="w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent lg:inline">
              Generate Assets
            </span>{" "}
            for
            <br className="hidden lg:block" /> all your design needs.
          </h1>
          <p className="mb-6 px-0 text-lg text-gray-600 md:text-xl lg:px-24">
            {" "}
            Just fill out the quick form below and we will generate a bunch of
            assets for you to use.
          </p>
        </div>
      </div>
    </section>
  );
}
