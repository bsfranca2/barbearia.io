import { sql } from "kysely";
import { createEmployeeSchema } from "~/lib/validations/employee";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import type { Roles } from "~/types/barbershop";

export const employeesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const employees = await ctx.db
      .selectFrom("Employee")
      .selectAll("Employee")
      .innerJoin(
        "BarbershopEmployee",
        "BarbershopEmployee.employeeId",
        "Employee.id"
      )
      .select("BarbershopEmployee.roles")
      .where(
        "BarbershopEmployee.barbershopId",
        "=",
        ctx.session.user.barbershopId
      )
      .where("BarbershopEmployee.deletedAt", "is", null)
      .execute();
    return employees.map((employee) => ({
      ...employee,
      roles: (employee.roles?.split(",") as Roles[]) ?? [],
    }));
  }),

  create: protectedProcedure
    .input(createEmployeeSchema)
    .mutation(async ({ ctx, input }) => {
      const roles: string[] = [];
      if (input.isManager) {
        roles.push("ADMIN");
      }
      if (input.isBarber) {
        roles.push("BARBER");
      }
      await ctx.db.transaction().execute(async (trx) => {
        await trx
          .insertInto("Employee")
          .values({
            name: input.name,
            email: input.email,
            phoneNumber: input.phone,
          })
          .execute();

        const { rows } = await sql`select LAST_INSERT_ID() as id`.execute(trx);
        const employeeId = Number((rows[0] as { id: string }).id);

        await trx
          .insertInto("BarbershopEmployee")
          .values({
            employeeId,
            barbershopId: ctx.session.user.barbershopId,
            roles: roles.join(","),
          })
          .execute();

        // TODO: implement custom duration and price
        if (input.services.length) {
          await trx
            .insertInto("EmployeeService")
            .values(
              input.services.map((service) => ({
                employeeId: employeeId,
                serviceId: service.id,
                duration: null, // service.duration
                price: null, // service.price
              }))
            )
            .execute();
        }

        if (input.workingHours.length) {
          await trx
            .insertInto("WorkingHours")
            .values(
              input.workingHours.map((workingHours) => ({
                employeeId: employeeId,
                dayOfWeek: workingHours.dayOfWeek,
                startTime: workingHours.startTime,
                endTime: workingHours.endTime,
              }))
            )
            .execute();
        }
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
