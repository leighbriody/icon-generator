import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

//we have a router and we need to make a method
//that our form can submit to

//we are saying this endpint we have to have a prompt passed to it

export const generateRouter = createTRPCRouter({
  generateIcon: publicProcedure
    .input(
      z.object({
        prompt: z.string(),
      })
    )
    .mutation(({input }) => {
      console.log("we are here , the input was ", input);
      return {
        message: "success",
      };
    }),
});
