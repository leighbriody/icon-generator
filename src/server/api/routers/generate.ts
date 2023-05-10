import { TRPCError } from "@trpc/server";
import { z } from "zod";
import AWS from "aws-sdk";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { Configuration, OpenAIApi } from "openai";
import { env } from "~/env.mjs";
import { b64Image } from "~/data/b64Image";

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: env.ACCESS_KEY_ID,
    secretAccessKey: env.SECRET_ACCESS_KEY,
  },
  region: "us-east-1",
});

const BUCKET_NAME = "leighs-icon-generator";

const configuration = new Configuration({
  apiKey: env.DALLE_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateIcon(prompt: string, numberOfIcons = 1) {
  if (env.MOCK_DALLE === "true") {
    console.log("mock dalle");
    return new Array<string>(numberOfIcons).fill(b64Image);
  } else {
    const response = await openai.createImage({
      prompt,
      n: numberOfIcons,
      size: "512x512",
      response_format: "b64_json",
    });
    return response.data.data.map((result) => result.b64_json || "");
  }
}
//we have a router and we need to make a method
//that our form can submit to

//we are saying this endpint we have to have a prompt passed to it

export const generateRouter = createTRPCRouter({
  generateIcon: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
        color: z.string(),
        numberOfIcons: z.number().min(1).max(10),
        shape: z.string(),
        style: z.string(),
        asset: z.string(),
        background: z.string(),
        share: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { count } = await ctx.prisma.user.updateMany({
        where: {
          id: ctx.session.user.id,
          credits: {
            gte: input.numberOfIcons,
          },
        },
        data: {
          credits: {
            decrement: input.numberOfIcons,
          },
        },
      });

      if (count <= 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Not enough credits",
        });
      }

      //TODO - Make fetch to dalle api
      const finalPrompt = `a modern ${input.shape}  ${input.asset} in ${input.color} of a ${input.prompt} in the style of ${input.style} with a background color of ${input.background} minimalisttic , high quality , trending on art station , unreal engine graphics quality `;
      const base64EncodedImages = await generateIcon(
        finalPrompt,
        input.numberOfIcons
      );

      //promise.all for quciker
      const createdIcons = await Promise.all(
        base64EncodedImages.map(async (image) => {
          const icon = await ctx.prisma.icon.create({
            data: {
              prompt: input.prompt,
              userId: ctx.session.user.id,
              promptOptions: [
                input.asset,
                input.style,
                input.color,
                input.shape,
                input.background + " background",
              ],
              share: input.share,
            },
          });
          await s3
            .putObject({
              Bucket: BUCKET_NAME,
              Body: Buffer.from(image, "base64"),
              Key: icon.id,
              ContentEncoding: "base64",
              ContentType: "image/png",
            })
            .promise();
          return icon;
        })
      );

      return createdIcons.map((icon) => {
        return {
          imageUrl: `https://${BUCKET_NAME}.s3.amazonaws.com/${icon.id}`,
        };
      });
    }),
});
