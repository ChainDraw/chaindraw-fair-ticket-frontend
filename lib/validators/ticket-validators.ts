import { z, ZodSchema } from "zod";

export const AVAILABLE_EventType = [
  "concerts",
  "sportsEvents",
  "theaterPerformances",
  "artExhibitions",
  "movieScreenings",
] as const;
export const AVAILABLE_SORT = ["none", "price-asc", "price-desc"] as const;

export const TicketFilterValidator = z.object({
  creator: z.any(),
  eventType: z.array(z.enum(AVAILABLE_EventType)),
  sort: z.enum(AVAILABLE_SORT),
  price: z.tuple([z.number(), z.number()]),
});

export type TicketState = Omit<
  z.infer<typeof TicketFilterValidator>,
  "price"
> & {
  price: { isCustom: boolean; range: [number, number] };
};
