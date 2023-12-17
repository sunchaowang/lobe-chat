export type ImageGenerationSize = '256x256' | '512x512' | '1024x1024';
export interface OpenAIImagePayload {
  model: 'dall-e-2' | 'dall-e-3';
  /**
   * The number of images to generate. Must be between 1 and 10.
   */
  n?: number;
  /**
   * A text description of the desired image(s).
   * The maximum length is 1000 characters.
   */
  prompt: string;
  /**
   * The size of the generated images.
   * Must be one of `256x256`, `512x512`, or `1024x1024`.
   */
  size?: ImageGenerationSize;
}
