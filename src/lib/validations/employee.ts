import * as z from "zod";
import isMobilePhone from "validator/lib/isMobilePhone";

export const createEmployeeSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  phone: z
    .string()
    .nonempty()
    .refine((value) => isMobilePhone(value, "pt-BR"), {
      message: "Numero de telefone invalido",
    })
    .transform((value) => value.replace(/\D/g, "")),
  isBarber: z.boolean(),
  isManager: z.boolean(),
  services: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      duration: z.number(),
      price: z.number(),
    })
  ),
  workingHours: z.array(
    z.object({ dayOfWeek: z.number(), startTime: z.string(), endTime: z.string() })
  ),
});
export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;
