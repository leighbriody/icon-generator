/* eslint-disable @next/next/no-img-element */
import { type NextPage } from "next";
import Head from "next/head";
import FormGroup from "~/components/FormGroup";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import clsx from "clsx";
import { Button } from "~/components/Button";
import GenerateHeader from "~/components/GenerateHeader";
import { SkeletonLoadingImage } from "~/components/SkeletonLoadingImage";
import { useRouter } from "next/router";
import {
  findAsset,
  findBackground,
  findColor,
  findShape,
  findStyle,
} from "~/utils/findStrings";

const assets = [
  "Logo",
  "Icon",
  "App Icon",
  "Photo",
  "Vector",
  "Digital Art",
  "Letters",
];
const publicOptions = [true, false];
const colors = [
  "blue",
  "red",
  "green",
  "yellow",
  "pink",
  "black",
  "white",
  "any",
];

const shapes = ["circle", "square", "rounded"];

const backgroundColors = [
  "dark",
  "light",
  "gradient",
  "black",
  "white",
  "rainbow",
  "blue",
  "any",
];

// const styles = [
//   "claymorphic",
//   "flat",
//   "3d rendered",
//   "pixelated",
//   "illustrated with color pencil",
//   "sketched",
//   "water color",
// ];

const styles = [
  "claymorphic",
  "flat",
  "3d rendered",
  "pixelated",
  "realistic",
  "sticker",
  "cartoonish",
  "hand drawn",
  // "water color",
];

const GeneratePage: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const { id } = query;

  //use state for the form
  const [error, setError] = useState("");
  const [imagesUrl, setImagesUrl] = useState<{ imageUrl: string }[]>([]);

  // Call the useQuery hook outside of useEffect
  let test = "";
  if (id) {
    test = id.toString();
  }

  const iconQuery = api.icons.getIcon.useQuery({ iconId: test });

  console.log("passedVariation", iconQuery);

  const [form, setForm] = useState({
    prompt: "",
    color: "",
    numberOfIcons: "1",
    shape: "",
    style: "",
    asset: "",
    background: "",
    isPublic: true,
  });
  useEffect(() => {
    if (id && iconQuery.data) {
      const prompt = iconQuery.data.prompt;
      const color = findColor(iconQuery.data.promptOptions);
      const numberOfIcons = "1";
      const shape = findShape(iconQuery.data.promptOptions);
      const style = findStyle(iconQuery.data.promptOptions);
      const asset = findAsset(iconQuery.data.promptOptions);
      const background = findBackground(iconQuery.data.promptOptions)?.split(
        " "
      )[0];

      if (
        !color ||
        !shape ||
        !style ||
        !asset ||
        !background ||
        !prompt ||
        !numberOfIcons
      ) {
        console.log("error");
        //should probably deal with this error
        return;
      }

      setForm((prev) => ({
        ...prev,
        prompt,
        color,
        numberOfIcons,
        shape,
        style,
        asset,
        background,
        isPublic: true,
      }));
    }
  }, [id, iconQuery.data]);

  const generateIcon = api.generate.generateIcon.useMutation({
    onSuccess(data) {
      setImagesUrl(data);
    },
    onError(error) {
      setError(error.message);
    },
  });

  function updateForm(key: string) {
    return function (e: React.ChangeEvent<HTMLInputElement>) {
      setForm((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    generateIcon.mutate({
      ...form,
      numberOfIcons: parseInt(form.numberOfIcons),
    });

    //scroll to the bottom of the page
    window.scrollTo(0, document.body.scrollHeight);
  }

  const session = useSession();
  const isLoggedIn = !!session.data;

  return (
    <>
      <Head>
        <title>Generate Assets</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GenerateHeader></GenerateHeader>
      <main className="container mx-auto mb-8 mt-0 flex min-h-screen flex-col gap-4 px-8">
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <h2 className="mb-4 text-left text-3xl font-bold leading-tight">
            1. Describe what your asset to look like
          </h2>
          <div className="flex flex-col gap-2">
            <label htmlFor="prompt" className="text-lg font-semibold">
              Prompt
            </label>
            <input
              id="prompt"
              type="text"
              className="rounded-md border border-gray-300 p-3 text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="E.g., A happy dog with a top hat..."
              required
              value={form.prompt}
              onChange={updateForm("prompt")}
            />
          </div>

          <h2 className="mb-4 text-left text-3xl font-bold leading-tight">
            2. Choose your asset type
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {assets.map((asset) => (
              <label key={asset} className="flex flex-col items-center gap-2">
                <input
                  type="radio"
                  name="asset"
                  value={asset}
                  checked={asset === form.asset}
                  onChange={() => setForm((prev) => ({ ...prev, asset }))}
                  className="hidden"
                />
                <div
                  className={clsx(
                    "h-32 w-32 rounded-full border border-gray-300",
                    {
                      "border-8 border-blue-500": asset === form.asset,
                      "bg-blue-200": asset === form.asset,
                      "shadow-md": asset === form.asset,
                    }
                  )}
                >
                  <Image
                    src={`/styles/${asset
                      .toLowerCase()
                      .replace(/\s/g, "")}.png`}
                    alt=""
                    className={clsx("h-full w-full rounded-full", {
                      "opacity-30": asset !== form.asset,
                    })}
                    width={250}
                    height={250}
                  />
                </div>
                <span
                  className={clsx({
                    "font-bold": asset === form.asset,
                    "text-blue-500": asset === form.asset,
                    underline: asset === form.asset,
                  })}
                >
                  {asset}
                </span>
              </label>
            ))}
          </div>
          <h2 className="mb-4 text-left text-3xl font-bold leading-tight">
            3. Choose your asset color.
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {colors.map((color) => (
              <label
                key={color}
                className="relative flex flex-col items-center gap-2"
              >
                <input
                  type="radio"
                  name="color"
                  value={color}
                  checked={color === form.color}
                  onChange={() => setForm((prev) => ({ ...prev, color }))}
                  className="hidden"
                />
                <div
                  className={clsx(
                    "h-32 w-32 rounded-full border border-gray-300",
                    {
                      "border-8 border-blue-500": color === form.color,
                      "bg-blue-200": color === form.color,
                      "shadow-md": color === form.color,
                    }
                  )}
                >
                  <Image
                    src={`/styles/${color
                      .toLowerCase()
                      .replace(/\s/g, "")}foreground.png`}
                    alt=""
                    className={clsx("h-full w-full rounded-full", {
                      "opacity-30": color !== form.color,
                    })}
                    width={250}
                    height={250}
                  />
                </div>
                <span
                  className={clsx({
                    "font-bold": color === form.color,
                    "text-blue-500": color === form.color,
                    underline: color === form.color,
                  })}
                >
                  {color}
                </span>
              </label>
            ))}
          </div>
          <h2 className="mb-4 text-left text-3xl font-bold leading-tight">
            4. Choose your asset background color.
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {backgroundColors.map((background) => (
              <label
                key={background}
                className="flex flex-col items-center gap-2"
              >
                <input
                  type="radio"
                  name="background"
                  value={background}
                  checked={background === form.background}
                  onChange={() => setForm((prev) => ({ ...prev, background }))}
                  className="hidden"
                />
                <div
                  className={clsx(
                    "h-32 w-32 rounded-full border border-gray-300",
                    {
                      "border-8 border-blue-500":
                        background === form.background,
                      "bg-blue-200": background === form.background,
                      "shadow-md": background === form.background,
                    }
                  )}
                >
                  <Image
                    src={`/styles/${background
                      .toLowerCase()
                      .replace(/\s/g, "")}background.png`}
                    alt=""
                    className={clsx("h-full w-full rounded-full", {
                      "opacity-30": background !== form.background,
                    })}
                    width={250}
                    height={250}
                  />
                </div>
                <span
                  className={clsx({
                    "font-bold": background === form.background,
                    "text-blue-500": background === form.background,
                    underline: background === form.background,
                  })}
                >
                  {background}
                </span>
              </label>
            ))}
          </div>
          <h2 className="mb-4 text-left text-3xl font-bold leading-tight">
            5. Choose your asset shape.
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {shapes.map((shape) => (
              <label key={shape} className="flex flex-col items-center gap-2">
                <input
                  type="radio"
                  name="shape"
                  value={shape}
                  checked={shape === form.shape}
                  onChange={() => setForm((prev) => ({ ...prev, shape }))}
                  className="hidden"
                />
                <div
                  className={clsx(
                    "h-32 w-32 rounded-full border border-gray-300",
                    {
                      "border-8 border-blue-500": shape === form.shape,
                      "bg-blue-200": shape === form.shape,
                      "shadow-md": shape === form.shape,
                    }
                  )}
                >
                  <Image
                    src={`/styles/${shape
                      .toLowerCase()
                      .replace(/\s/g, "")}.png`}
                    alt=""
                    className={clsx("h-full w-full rounded-full", {
                      "opacity-30": shape !== form.shape,
                    })}
                    width={250}
                    height={250}
                  />
                </div>
                <span
                  className={clsx({
                    "font-bold": shape === form.shape,
                    "text-blue-500": shape === form.shape,
                    underline: shape === form.shape,
                  })}
                >
                  {shape}
                </span>
              </label>
            ))}
          </div>

          <h2 className="mb-4 text-left text-3xl font-bold leading-tight">
            6. Choose your asset style.
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {styles.map((style) => (
              <label key={style} className="flex flex-col items-center gap-2">
                <input
                  type="radio"
                  name="style"
                  value={style}
                  checked={style === form.style}
                  onChange={() => setForm((prev) => ({ ...prev, style }))}
                  className="hidden"
                />
                <div
                  className={clsx(
                    "h-32 w-32 rounded-full border border-gray-300",
                    {
                      "border-8 border-blue-500": style === form.style,
                      "bg-blue-200": style === form.style,
                      "shadow-md": style === form.style,
                    }
                  )}
                >
                  <Image
                    src={`/styles/${style
                      .toLowerCase()
                      .replace(/\s/g, "")}.png`}
                    alt=""
                    className={clsx("h-full w-full rounded-full", {
                      "opacity-30": style !== form.style,
                    })}
                    width={250}
                    height={250}
                  />
                </div>
                <span
                  className={clsx({
                    "font-bold": style === form.style,
                    "text-blue-500": style === form.style,
                    underline: style === form.style,
                  })}
                >
                  {style}
                </span>
              </label>
            ))}
          </div>
          <h2 className="mb-4 text-left text-3xl font-bold leading-tight">
            7. Do you want to share your asset with the community?
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {publicOptions.map((isPublic) => (
              <label
                key={isPublic ? "yes" : "no"}
                className="flex flex-col items-center gap-2"
              >
                <input
                  type="radio"
                  name="isPublic"
                  value={isPublic ? "yes" : "no"}
                  checked={isPublic === form.isPublic}
                  onChange={() => setForm((prev) => ({ ...prev, isPublic }))}
                  className="hidden"
                />
                <div
                  className={clsx(
                    "h-32 w-32 rounded-full border border-gray-300",
                    {
                      "border-8 border-blue-500": isPublic === form.isPublic,
                      "bg-blue-200": isPublic === form.isPublic,
                      "shadow-md": isPublic === form.isPublic,
                    }
                  )}
                >
                  <Image
                    src={`/styles/${
                      isPublic ? "yes" : "no".toLowerCase().replace(/\s/g, "")
                    }.png`}
                    alt=""
                    className={clsx("h-full w-full rounded-full", {
                      "opacity-30": isPublic !== form.isPublic,
                    })}
                    width={250}
                    height={250}
                  />
                </div>
                <span
                  className={clsx({
                    "font-bold": isPublic === form.isPublic,
                    "text-blue-500": isPublic === form.isPublic,
                    underline: isPublic === form.isPublic,
                  })}
                >
                  {isPublic ? "Yes" : "No"}
                </span>
              </label>
            ))}
          </div>
          <h2 className="mb-4 text-left text-3xl font-bold leading-tight">
            8. How many do you want to generate? (1 credit each)
          </h2>
          <FormGroup>
            <label className="mb-4 sm:col-span-3 sm:mb-0"></label>
            <input
              type="text"
              required
              inputMode="numeric"
              pattern="[1-9]|10"
              value={form.numberOfIcons}
              onChange={updateForm("numberOfIcons")}
              className="rounded-md border border-gray-300 p-2 text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormGroup>

          {error && <p className="text-red-500">{error}</p>}

          {isLoggedIn && (
            <button
              type="submit"
              disabled={generateIcon.isLoading}
              className="rounded-md bg-blue-500 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-blue-600"
            >
              {generateIcon.isLoading ? "Loading..." : "Submit"}
            </button>
          )}

          {!isLoggedIn && (
            <Button
              variant="secondary"
              onClick={() => {
                signIn().catch(console.error);
              }}
            >
              Login to Generate
            </Button>
          )}
        </form>

        {generateIcon.isLoading && (
          <SkeletonLoadingImage></SkeletonLoadingImage>
        )}
        {imagesUrl.length > 0 && (
          <>
            <h2 className="text-xl">Your Assets</h2>
            <section className="mb-12 grid grid-cols-4 gap-4">
              {imagesUrl.map(({ imageUrl }) => (
                <Image
                  key={imageUrl}
                  src={imageUrl}
                  alt="Picture of the author"
                  width="1024"
                  height="1024"
                />
              ))}
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default GeneratePage;
