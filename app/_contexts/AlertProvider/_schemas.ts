import { z } from 'zod';

export const ZAlertSeverity = z.union([
  z.literal('success'),
  z.literal('warning'),
  z.literal('error'),
  z.literal('info'),
  z.literal('none'),
]);

export type TAlertSeverity = z.infer<typeof ZAlertSeverity>;
