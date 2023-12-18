import { produce } from 'immer';
import pMap from 'p-map';
import { StateCreator } from 'zustand/vanilla';

import { chainLangDetect } from '@/chains/langDetect';
import { chainTranslate } from '@/chains/translate';
import { supportLocales } from '@/locales/options';
import { chatService } from '@/services/chat';
import { fileService } from '@/services/file';
import { imageGenerationService } from '@/services/imageGeneration';
import { messageService } from '@/services/message';
import { chatSelectors } from '@/store/chat/selectors';
import { ChatStore } from '@/store/chat/store';
import { DallEImageItem } from '@/types/tool/dalle';
import { setNamespace } from '@/utils/storeDebug';

const n = setNamespace('enhance');

/**
 * enhance chat action like translate,tts
 */
export interface ChatEnhanceAction {
  clearTTS: (id: string) => Promise<void>;
  clearTranslate: (id: string) => Promise<void>;
  generateImageFromPrompts: (items: DallEImageItem[], id: string) => Promise<void>;

  toggleDallEImageLoading: (key: string, value: boolean) => void;
  translateMessage: (id: string, targetLang: string) => Promise<void>;
  ttsMessage: (
    id: string,
    state?: { contentMd5?: string; file?: string; voice?: string },
  ) => Promise<void>;
}

export const chatEnhance: StateCreator<
  ChatStore,
  [['zustand/devtools', never]],
  [],
  ChatEnhanceAction
> = (set, get) => ({
  clearTTS: async (id) => {
    await messageService.updateMessageTTS(id, null);
    await get().refreshMessages();
  },

  clearTranslate: async (id) => {
    await messageService.updateMessageTranslate(id, null);
    await get().refreshMessages();
  },

  generateImageFromPrompts: async (items, messageId) => {
    const message = chatSelectors.getMessageById(messageId)(get());
    const parent = chatSelectors.getMessageById(message!.parentId!)(get());
    const originPrompt = parent?.content;

    await pMap(items, async (params, index) => {
      get().toggleDallEImageLoading(messageId + params.prompt, true);
      const urls = await imageGenerationService.generateImage(params);
      const { id } = await fileService.uploadImageByUrl(urls, {
        metadata: { ...params, originPrompt: originPrompt },
        name: `${originPrompt || params.prompt}_${index}.png`,
      });

      get().toggleDallEImageLoading(messageId + params.prompt, false);

      const nextContent = produce(items, (draft) => {
        draft[index].imageId = id;
      });

      await messageService.updateMessageContent(messageId, JSON.stringify(nextContent));
      await get().refreshMessages();
    });
  },

  toggleDallEImageLoading: (key, value) => {
    set({ dalleImageLoading: { [key]: value } }, false, n('toggleDallEImageLoading'));
  },

  translateMessage: async (id, targetLang) => {
    const { toggleChatLoading, dispatchMessage, refreshMessages } = get();

    const message = chatSelectors.getMessageById(id)(get());
    if (!message) return;

    // create translate extra
    await messageService.updateMessageTranslate(id, { content: '', from: '', to: targetLang });
    await refreshMessages();

    toggleChatLoading(true, id, n('translateMessage(start)', { id }) as string);

    let content = '';
    let from = '';

    // detect from language
    chatService
      .fetchPresetTaskResult({
        params: chainLangDetect(message.content),
      })
      .then(async (data) => {
        if (data && supportLocales.includes(data)) from = data;

        await messageService.updateMessageTranslate(id, { content, from, to: targetLang });
        await refreshMessages();
      });

    // translate to target language
    await chatService.fetchPresetTaskResult({
      onMessageHandle: (text) => {
        dispatchMessage({
          id,
          key: 'translate',
          type: 'updateMessageExtra',
          value: produce({ content: '', from, to: targetLang }, (draft) => {
            content += text;
            draft.content += content;
          }),
        });
      },
      params: chainTranslate(message.content, targetLang),
    });

    await messageService.updateMessageTranslate(id, { content, from, to: targetLang });
    await refreshMessages();

    toggleChatLoading(false);
  },

  ttsMessage: async (id, state = {}) => {
    await messageService.updateMessageTTS(id, state);
    await get().refreshMessages();
  },
});
