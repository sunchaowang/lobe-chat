export type DallEImageQuality = 'standard' | 'hd';
export type DallEImageStyle = 'vivid' | 'natural';
export type DallEImageSize = '256x256' | '512x512' | '1024x1024';

export interface DalleImageItem {
  id: string;
  prompt: string;
  quality: DallEImageQuality;
  size: DallEImageStyle;
  style: DallEImageSize;
}
