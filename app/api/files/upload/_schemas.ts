import z from 'zod';

export const ZImportLogFileParams = z.object({
  fileName: z.string(),
});

export type TImportLogFileParams = z.infer<typeof ZImportLogFileParams>;
