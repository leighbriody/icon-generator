import React from "react";
import Image from "next/image";
export default function Content() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
        <div className="mb-8 max-w-screen-md lg:mb-16 ">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Designed to help build the best digital assets.
          </h2>
          <p className="text-gray-500 dark:text-gray-400 sm:text-xl">
            Here at AssetBrainAI we provide you with the tools to help build &
            share unique AI generated assets.
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
          <div>
            <div className="bg-primary-100 dark:bg-primary-900 mb-4 flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12">
              {/* <img
                src="assetType.png"
                alt="Asset Type"
                class="h-5 w-5 lg:h-6 lg:w-6"
              /> */}
              <Image
                className="h-5 w-5 lg:h-6 lg:w-6"
                width="100"
                height="100"
                alt={ "Icon"}
                src={`/assetType.png`}
              />
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">Asset Type</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Logos, Wallpapers, App Icons, we provide a variety of different
              asset types to which you can create & customize.
            </p>
          </div>

          <div>
            <div className="bg-primary-100 dark:bg-primary-900 mb-4 flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12">
            <Image
                className="h-5 w-5 lg:h-6 lg:w-6"
                width="100"
                height="100"
                alt={ "Icon"}
                src={`/assetStyle.png`}
              />
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              Asset Style
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              The last thing we want is plain old boring asstes , so we have
              hand picked some exciting asset styles for you to choose from.
            </p>
          </div>
          <div>
            <div className="bg-primary-100 dark:bg-primary-900 mb-4 flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12">
            <Image
                className="h-5 w-5 lg:h-6 lg:w-6"
                width="100"
                height="100"
                alt={ "Icon"}
                src={`/assetStorage.png`}
              />
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              Asset Storage
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              What good is an Asset if you have no where to keep it ? Here a
              Asset Brain all your assets will be stored safely and securly for
              you to revist and use whenever you please.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
