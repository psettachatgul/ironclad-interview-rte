import z from 'zod';

export const ZText = z.object({
  color: z.string(),
  text: z.string(),
});

export type TText = z.infer<typeof ZText>;

export const ZDocument = z.object({
  content: ZText.array(),
});

export type TDocument = z.infer<typeof ZDocument>;

export const ZSelection = z.object({
  /**
   * The index of the first character to include within the edit
   */
  startIndex: z.int(),
  /**
   * The number of characters to be included in the editor
   */
  length: z.int(),
});

export type TSelection = z.infer<typeof ZSelection>;

export const ZEdit = z.object({
  selection: ZSelection,
  replacement: z.string(),
});

export type TEdit = z.infer<typeof ZEdit>;
