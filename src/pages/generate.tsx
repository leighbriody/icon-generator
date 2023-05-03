/* eslint-disable @next/next/no-img-element */
import { type NextPage } from "next";
import Head from "next/head";
import Input from "~/components/Input";
import FormGroup from "~/components/FormGroup";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import clsx from "clsx";
import { Button } from "~/components/Button";
import { setErrorMap } from "zod";

const assets = [
  "Logo",
  "Icons",
  "Painting",
  "Wallpaper",
  "Photographs",
  "Vector Graphics",
  "Iphone App Icon",
  "Patterns",
];

const colors = [
  "blue",
  "red",
  "green",
  "yellow",
  "pink",
  "black",
  "white",
  "rainbow",
];

const shapes = [
  "circle",
  "square",
  "rounded",
  "star",
  "heart",
  "diamond",
  "hexagon",
  "octagon",
];

const backgroundColors = [
  "dark",
  "light",
  "gradient",
  "white",
  "black",
  "white",
  "rainbow",
  "transparent",
  "blue",
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
  "retro",
  "cartoonish",
  "futuristic",
  "water color",
];

const GeneratePage: NextPage = () => {
  const [form, setForm] = useState({
    prompt: "",
    color: "",
    numberOfIcons: "1",
    shape: "",
    style: "",
    asset: "",
    background: "",
  });

  const [error, setError] = useState("");
  const [imagesUrl, setImagesUrl] = useState<{ imageUrl: string }[]>([]);

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
    //prevent default prevents the page from reloading
    e.preventDefault();
    //TODO - add logic to handle form submission
    generateIcon.mutate({
      ...form,
      numberOfIcons: parseInt(form.numberOfIcons),
    });
  }

  const session = useSession();
  const isLoggedIn = !!session.data;

  //use effect that if the user is not logged in show them an alert saying they need to

  return (
    <>
      <Head>
        <title>Generate Icons</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto mt-24 flex min-h-screen flex-col gap-4 px-8">
        <h1 className="text-5xl">Generate AI Icons</h1>
        <p className="mb-12 text-2xl">
          Fill out the form blow to start generating your icons
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <h2 className="text-xl">
            1. Desribe what you want icon to look like
          </h2>
          <FormGroup>
            <label>Propmt</label>
            <Input
              placeholder="A happy dog with a top hat . . "
              required
              value={form.prompt}
              onChange={updateForm("prompt")}
              className="w-full md:w-1/2"
            ></Input>
          </FormGroup>
          <h2 className="text-xl">2. Pick your asset type.</h2>
          <FormGroup className="mb-12 grid grid-cols-2 sm:grid-cols-4">
            {assets.map((asset) => (
              <label key={asset} className={clsx("flex gap-2 text-2xl", asset)}>
                <input
                  required
                  type="radio"
                  name="asset"
                  value={asset}
                  checked={asset === form.asset}
                  onChange={() => setForm((prev) => ({ ...prev, asset }))}
                ></input>
                {asset}
              </label>
            ))}
          </FormGroup>
          <h2 className="text-xl">2. Pick your background color type.</h2>
          <FormGroup className="mb-12 grid grid-cols-2 sm:grid-cols-4">
            {backgroundColors.map((background) => (
              <label
                key={background}
                className={clsx("flex gap-2 text-2xl", background)}
              >
                <input
                  required
                  type="radio"
                  name="background"
                  value={background}
                  checked={background === form.background}
                  onChange={() => setForm((prev) => ({ ...prev, background }))}
                ></input>
                {background}
              </label>
            ))}
          </FormGroup>
          <h2 className="text-xl">2. Pick your icon color.</h2>
          <FormGroup className="mb-12 grid grid-cols-2 sm:grid-cols-4">
            {colors.map((color) => (
              <label key={color} className={clsx("flex gap-2 text-2xl", color)}>
                <input
                  required
                  type="radio"
                  name="color"
                  value={color}
                  checked={color === form.color}
                  onChange={() => setForm((prev) => ({ ...prev, color }))}
                ></input>
                {color}
              </label>
            ))}
          </FormGroup>

          <h2 className="text-xl">3. Pick your icon shape.</h2>
          <FormGroup className="mb-12 grid grid-cols-2 sm:grid-cols-4">
            {shapes.map((shape) => (
              <label key={shape} className={clsx("flex gap-2 text-2xl", shape)}>
                <input
                  required
                  type="radio"
                  name="shape"
                  value={shape}
                  checked={shape === form.shape}
                  onChange={() => setForm((prev) => ({ ...prev, shape }))}
                ></input>
                {shape}
              </label>
            ))}
          </FormGroup>

          <h2 className="text-xl">4. Pick your icon style.</h2>
          <FormGroup className="mb-12 grid grid-cols-2 sm:grid-cols-4">
            {styles.map((style) => (
              <label key={style} className={clsx("flex gap-2 text-2xl", style)}>
                <input
                  required
                  type="radio"
                  name="style"
                  value={style}
                  checked={style === form.style}
                  onChange={() => setForm((prev) => ({ ...prev, style }))}
                ></input>
                {style}
              </label>
            ))}
          </FormGroup>

          <h2 className="text-xl">4. How many do you want.</h2>
          <FormGroup>
            <label className="mb-4 sm:col-span-3 sm:mb-0">
              How many icons do you want?
            </label>
            <Input
              required
              inputMode="numeric"
              pattern="[1-9]|10"
              value={form.numberOfIcons}
              onChange={updateForm("numberOfIcons")}
              className="w-full md:w-1/2"
            ></Input>
          </FormGroup>

          {error && <p className="text-red-500">{error}</p>}

          {isLoggedIn && (
            <Button
              isLoading={generateIcon.isLoading}
              className="rounde py- px-4"
            >
              Submit
            </Button>
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
