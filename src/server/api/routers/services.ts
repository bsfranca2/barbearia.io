import { sql } from "kysely";
import {
  createServiceSchema,
  updateServiceSchema,
} from "~/lib/validations/service";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const servicesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .selectFrom("Service")
      .selectAll("Service")
      .where("Service.barbershopId", "=", ctx.session.user.barbershopId)
      .execute();
  }),

  create: protectedProcedure
    .input(createServiceSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction().execute(async (trx) => {
        await trx
          .insertInto("Service")
          .values({
            ...input,
            barbershopId: ctx.session.user.barbershopId,
          })
          .execute();

        const selectEmployees = trx
          .selectFrom("Employee")
          .select([
            "Employee.id as employeeId",
            sql`LAST_INSERT_ID()`.as("serviceId"),
          ])
          .where("Employee.barbershopId", "=", ctx.session.user.barbershopId);
        await sql`insert into EmployeeService (employeeId, serviceId) ${selectEmployees}`.execute(
          trx
        );
      });
    }),

  update: protectedProcedure
    .input(updateServiceSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      await ctx.db
        .updateTable("Service")
        .set({
          ...data,
        })
        .where("Service.id", "=", id)
        .execute();
    }),
});
