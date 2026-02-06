import z from 'zod';

export const ZSort = z.record(
  z.string(),
  z.union([
    z.literal(1),
    z.literal(-1),
  ]),
);

export type TSort = z.infer<typeof ZSort>;
