import { StateCreator } from 'zustand/vanilla';

import { imageGenerationService } from '@/services/imageGeneration';
import { ImageGenerationSize } from '@/types/openai/image';
import { setNamespace } from '@/utils/storeDebug';

import { ToolStore } from '../../store';

const n = setNamespace('builtinTool');

/**
 * 代理行为接口
 */
export interface BuiltinToolAction {
  invokeBuiltinTool: (key: string, params: any) => Promise<void>;
  text2image: (params: { prompts: string[]; size: ImageGenerationSize }) => Promise<any>;
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

    return result;
  },
  text2image: async ({ prompts, size }) => {
    return await imageGenerationService.generateImage({ prompt: prompts[0], size });
  },
  toggleBuiltinToolLoading: (key, value) => {
    set({ builtinToolLoading: { [key]: value } }, false, n('toggleBuiltinToolLoading'));
  },
});
