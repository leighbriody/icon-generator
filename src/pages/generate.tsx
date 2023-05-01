/* eslint-disable @next/next/no-img-element */
import { type NextPage } from "next";
import Head from "next/head";
import Input from "~/components/Input";
import FormGroup from "~/components/FormGroup";
import { useState } from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import Image from "next/image";
import clsx from "clsx";
import { Button } from "~/components/Button";

const colors = [
  "blue",
  "red",
  "green",
  "yellow",
  "pink",
  "black",
  "white",
  "orange",
];

const GeneratePage: NextPage = () => {
  const [form, setForm] = useState({
    prompt: "",
    color: "",
  });

  const [imageUrl, setImageUrl] = useState("");

  const generateIcon = api.generate.generateIcon.useMutation({
    onSuccess(data) {
      console.log("mutation finihsed ");
      if (!data.imageUrl) return;
      setImageUrl(data.imageUrl);
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
    });
  }

  const session = useSession();
  const isLoggedIn = !!session.data;

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
            <Input value={form.prompt} onChange={updateForm("prompt")}></Input>
          </FormGroup>
          <h2 className="text-xl">2. Pick your icon color.</h2>
          <FormGroup className="mb-12 grid grid-cols-4">
            {colors.map((color) => (
              <label key={color} className={clsx("flex gap-2 text-2xl", color)}>
                <input
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
          <Button
            isLoading={generateIcon.isLoading}
            className="rounde py- px-4"
          >
            Submit
          </Button>
        </form>

        {imageUrl && (
          <>
            <h2 className="text-xl">Your Icons</h2>
            <section className="grid grid-cols-4 gap-4 mb-12">
              <Image
                src={imageUrl}
                alt="Picture of the author"
                width={100}
                height={100}
              />
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default GeneratePage;
