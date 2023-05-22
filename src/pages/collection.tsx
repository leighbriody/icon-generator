import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import Image from "next/image";
import { FaLock, FaUnlock } from "react-icons/fa";
import { type Icon } from "@prisma/client";
import { useState } from "react";
const CollectionPage: NextPage = () => {
  const icons = api.icons.getIcons.useQuery();

  const [isDownloadingAsset, setIsDownloadingAsset] = useState<Icon | null>(
    null
  );

  const [expandedIcons, setExpandedIcons] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const makePrivate = api.icons.makeAssetPrivate.useMutation({
    onSuccess(data) {
      console.log("make asset private success", data);
      //reload the icons
      void icons.refetch();
    },
    onError(error) {
      console.log("make asset private error", error);
    },
  });

  const MakePublic = api.icons.makeAssetPublic.useMutation({
    onSuccess(data) {
      console.log("make asset public success", data);
      //reload the icons
      void icons.refetch();
    },
    onError(error) {
      console.log("make asset public error", error);
    },
  });

  async function downloadAsset(icon: Icon) {
    setIsDownloadingAsset(icon);
    const assetSource = `https://leighs-icon-generator.s3.amazonaws.com/${icon.id}`;

    // Fetch the image data
    await fetch(assetSource)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a temporary download link
        const downloadLink = document.createElement("a");
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = `icon_${icon.id}.png`; // Specify the filename for the downloaded asset

        // Trigger the download
        downloadLink.click();

        // Clean up the temporary URL object
        URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Error downloading asset:", error));
    setIsDownloadingAsset(null);
  }

  function makeAssetPrivate(iconId: string) {
    makePrivate.mutate({ iconId: iconId });
  }

  function makeAssetPublic(iconId: string) {
    MakePublic.mutate({ iconId: iconId });
  }

  return (
    <>
      <Head>
        <title>Your Icons</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto mt-24 flex flex-col items-center gap-8 px-8">
        <h1 className="text-4xl">Your Assets</h1>
        <ul className="grid grid-cols-2 gap-8 sm:grid-cols-2 sm:gap-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {icons.data?.map((icon: Icon) => (
            <div key={icon.id} className="group relative">
              <Image
                className="w-full"
                width={250}
                height={250}
                alt={icon.prompt ?? "Icon"}
                src={`https://leighs-icon-generator.s3.amazonaws.com/${icon.id}`}
              />
              <button
                className="absolute right-2 top-2 rounded-full bg-gray-200 p-2 transition-colors duration-300 ease-in-out group-hover:bg-gray-800"
                onClick={() => {
                  if (selectedIcon === icon.id) {
                    setSelectedIcon(null); // Close the dropdown
                  } else {
                    setSelectedIcon(icon.id); // Open the dropdown
                  }
                }}
              >
                {/* Add your menu button icon here */}
                {/* For example, you can use an SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-gray-900"
                >
                  <path d="M3 12h18M3 6h18M3 18h18"></path>
                </svg>
              </button>
              {selectedIcon === icon.id && (
                <div className="absolute right-2 top-10 z-10 rounded-md bg-gray-800 p-2">
                  <ul className="space-y-2">
                    {icon.isPublic && (
                       <li className="flex flex-row gap-2 m-0">
                        <button
                          className="text-white hover:text-gray-200"
                          onClick={() => makeAssetPrivate(icon.id)}
                        >
                          Make Private
                        </button>
                        <FaLock className="mt-0.5"></FaLock>
                      </li>
                    )}

                    {!icon.isPublic && (
                      <li className="flex flex-row gap-2 m-0">
                        <button
                          className="text-white hover:text-gray-200"
                          onClick={() => makeAssetPublic(icon.id)}
                        >
                          Make Public
                          
                        </button>
                        <FaUnlock className="mt-0.5"></FaUnlock>
                      </li>
                    )}
                    <li className="flex flex-row gap-2">
                      <button
                        className="flex flex-row gap-2 text-white hover:text-gray-200"
                        onClick={() => {
                          void downloadAsset(icon);
                        }}
                      >
                        {!isDownloadingAsset && <span>Download</span>}
                        {isDownloadingAsset && <span>Downloading</span>}
                      </button>
                      {isDownloadingAsset === icon && (
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="mt-1 h-4 animate-spin fill-blue-600 p-0 text-gray-200 dark:text-gray-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      )}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </ul>
      </main>
    </>
  );
};

export default CollectionPage;
