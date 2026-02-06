import z from 'zod';
import { ZFilter, ZFilterConfig } from '../app/_components/Filter/_schemas';
import { ZSort } from '../app/_components/Sort/_schemas';

export const ZFindBaseParams = z.object({
  filter: ZFilter,
  filterConfigs: ZFilterConfig.array(),
  sort: ZSort,
  page: z.number().int(),
  rowsPerPage: z.number().int(),
});
