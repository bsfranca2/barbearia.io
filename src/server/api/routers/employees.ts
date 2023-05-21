import { sql } from "kysely";
import { createEmployeeSchema } from "~/lib/validations/employee";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const employeesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .selectFrom("Employee")
      .selectAll("Employee")
      .innerJoin("Role", "Employee.roleId", "Role.id")
      .select("Role.name as roleName")
      .where("Employee.barbershopId", "=", ctx.session.user.barbershopId)
      .execute();
  }),

  create: protectedProcedure
    .input(createEmployeeSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction().execute(async (trx) => {
        // TODO: role must be a array of roles
        await trx
          .insertInto("Employee")
          .values({
            name: input.name,
            email: input.email,
            phone: input.phone,
            roleId: 1,
            barbershopId: ctx.session.user.barbershopId,
          })
          .execute();

        // TODO: implement custom duration and price
        await trx
          .insertInto("EmployeeService")
          .values(
            input.services.map((service) => ({
              employeeId: sql`LAST_INSERT_ID()`,
              serviceId: service.id,
              duration: null, // service.duration
              price: null, // service.price
            }))
          )
          .execute();
      });
      return { success: true };
    }),

  //   update: protectedProcedure
  //     .input(updateServiceSchema)
  //     .mutation(async ({ ctx, input }) => {
  //       const { id, ...data } = input;
  //       await ctx.db
  //         .updateTable("Service")
  //         .set({
  //           ...data,
  //         })
  //         .where("Service.id", "=", id)
  //         .execute();
  //       return { success: true };
  //     }),
  //           ...input,
  //           barbershopId: ctx.session.user.barbershopId,
  //         })
  //         .executeTakeFirstOrThrow();
  //       return { success: true };
  //     }),

  //   update: protectedProcedure
  //     .input(updateServiceSchema)
  //     .mutation(async ({ ctx, input }) => {
  //       const { id, ...data } = input;
  //       await ctx.db
  //         .updateTable("Service")
  //         .set({
  //           ...data,
  //         })
  //         .where("Service.id", "=", id)
  //         .execute();
  //       return { success: true };
  //     }),
});
