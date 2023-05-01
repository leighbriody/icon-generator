import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const iconsRouter = createTRPCRouter({
  //get all of the users icons
  getIcons: protectedProcedure.query(async ({ ctx }) => {
    const icons = await ctx.prisma.icon.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return icons;
  }),
  getCommunityIcons: publicProcedure.query(async ({ ctx }) => {
    //get 50 random icons
    const icons = await ctx.prisma.icon.findMany({
      take: 50,
      orderBy: {
        createdAt: "desc",
      },
    });

    return icons;
  }),
});
