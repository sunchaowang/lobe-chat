import { createHeaderWithOpenAI } from '@/services/_header';
import { OPENAI_URLS } from '@/services/_url';
import { ImageGenerationSize, OpenAIImagePayload } from '@/types/openai/image';

interface FetchOptions {
  signal?: AbortSignal | undefined;
}

class ImageGenerationService {
  async generateImage(
    params: { prompt: string; size?: ImageGenerationSize },
    options?: FetchOptions,
  ) {
    const payload: OpenAIImagePayload = { ...params, model: 'dall-e-3', n: 1 };

    const res = await fetch(OPENAI_URLS.images, {
      body: JSON.stringify(payload),
      headers: createHeaderWithOpenAI({ 'Content-Type': 'application/json' }),
      method: 'POST',
      signal: options?.signal,
    });

    const { urls } = await res.json();

    return urls;
  }
}

export const imageGenerationService = new ImageGenerationService();
