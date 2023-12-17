import { DalleManifest } from '@/tools/dalle';
import { LobeBuiltinTool } from '@/types/tool';

export const builtinTools: LobeBuiltinTool[] = [
  {
    identifier: 'dalle3',
    manifest: DalleManifest,
    type: 'builtin',
  },
];
