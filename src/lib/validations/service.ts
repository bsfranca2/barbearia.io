import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string(),
  duration: z.coerce.number(),
  price: z.string(),
});

export const updateServiceSchema = createServiceSchema.extend({
  id: z.number(),
});
