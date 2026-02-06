import z from 'zod';

export const ZUploadFileParams = z.object({
  fileName: z.string(),
});

export type TUploadFileParams = z.infer<typeof ZUploadFileParams>;
