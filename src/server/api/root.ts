import { createTRPCRouter } from "~/server/api/trpc";
import { servicesRouter } from "~/server/api/routers/services";
import { employeesRouter } from "~/server/api/routers/employees";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  services: servicesRouter,
  employees: employeesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
