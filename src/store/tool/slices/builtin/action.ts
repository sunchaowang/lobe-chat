import pMap from 'p-map';
import { StateCreator } from 'zustand/vanilla';

import { imageGenerationService } from '@/services/imageGeneration';
import { OpenAIImagePayload } from '@/types/openai/image';
import { setNamespace } from '@/utils/storeDebug';

import { ToolStore } from '../../store';

const n = setNamespace('builtinTool');

interface Text2ImageParams extends Pick<OpenAIImagePayload, 'quality' | 'style' | 'size'> {
  prompts: string[];
}

/**
 * 代理行为接口
 */
export interface BuiltinToolAction {
  invokeBuiltinTool: (key: string, params: any) => Promise<string | undefined>;
  text2image: (params: Text2ImageParams) => Promise<any>;
  toggleBuiltinToolLoading: (key: string, value: boolean) => void;
}

export const createBuiltinToolSlice: StateCreator<
  ToolStore,
  [['zustand/devtools', never]],
  [],
  BuiltinToolAction
> = (set, get) => ({
  invokeBuiltinTool: async (key, params) => {
    const { builtinToolLoading, toggleBuiltinToolLoading } = get();

    if (builtinToolLoading[key]) return;

    toggleBuiltinToolLoading(key, true);

    const { [key as keyof BuiltinToolAction]: action } = get();

    if (!action) return;

    // @ts-ignore
    const result = await action(params);

    toggleBuiltinToolLoading(key, false);

    return JSON.stringify(result);
  },
  text2image: async ({ prompts, size, quality, style }) => {
    const data = await pMap(prompts, async (prompt) => {
      const urls = await imageGenerationService.generateImage({ prompt, quality, size, style });

      return {
        prompt,
        quality: quality || 'standard',
        size: size || '1024x1024',
        style: style || 'vivid',
        url: urls[0],
      };
    });
    console.log(data);

    return data;
  },
  toggleBuiltinToolLoading: (key, value) => {
    set({ builtinToolLoading: { [key]: value } }, false, n('toggleBuiltinToolLoading'));
  },
});
