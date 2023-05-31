export function Footer() {
  return (
    <footer className="mt-4 rounded-lg bg-white shadow dark:bg-gray-800">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
          © 2023{" "}
          <a href="https://www.leighbriody.com" className="hover:underline">
            AssetBrainAI™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Cookies Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
