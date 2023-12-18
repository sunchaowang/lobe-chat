import { ChatStoreState } from '@/store/chat';


const isDallEImageGenerating = (id: string) => (s: ChatStoreState) => !!s.dalleImageLoading[id];

export const chatEnhanceSelectors = {
  isDallEImageGenerating,
};
