import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { z } from "zod";


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
      where: {
        isPublic: true,
      },
      take: 50,
      orderBy: {
        createdAt: "desc",
      },
    });

    return icons;
  }),
  makeAssetPublic: protectedProcedure
    .input(
      z.object({
        iconId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const icon = await ctx.prisma.icon.update({
        where: {
          id: input.iconId,
        },
        data: {
          isPublic: true,
        },
      });
      return icon;
    }),
  makeAssetPrivate: protectedProcedure
    .input(
      z.object({
        iconId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const icon = await ctx.prisma.icon.update({
        where: {
          id: input.iconId,
        },
        data: {
          isPublic: false,
        },
      });
      return icon;
    }),
  getIcon: publicProcedure
    .input(
      z.object({
        iconId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      //get 50 random icons
      const icon = await ctx.prisma.icon.findUnique({
        where: {
          id: input.iconId,
        },
      });

      return icon;
    }),
});
