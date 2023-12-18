import OpenAI from 'openai';

import { OpenAIImagePayload } from '@/types/openai/image';

// const images = [
//   'https://oaidalleapiprodscus.blob.core.windows.net/private/org-hJDsNmGCygYpdg3MSs0Kacmg/user-DUfi2UytGhdefsRlO8sOtIFi/img-topuY5Au8qsl4tLFRlA1eEvz.png?st=2023-12-18T12%3A22%3A02Z&se=2023-12-18T14%3A22%3A02Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-12-18T10%3A52%3A49Z&ske=2023-12-19T10%3A52%3A49Z&sks=b&skv=2021-08-06&sig=OcdNHSnyt/Ejvn%2B3LNc2SpwYUyy/g6CubC0FWgAs4LI%3D',
//   // 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-qf00Jo0DH7n1WQLPQmKmNp30/user-Saafi0d2NEI9bf3cyFwyDIRH/img-gtC8SNA2UPhEoolF3K03XdSG.png?st=2023-12-18T12%3A22%3A00Z&se=2023-12-18T14%3A22%3A00Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-12-17T20%3A03%3A11Z&ske=2023-12-18T20%3A03%3A11Z&sks=b&skv=2021-08-06&sig=KombidBd%2B/CrlEI/8TnjX/hpJzmcVb4CddqCL6i052c%3D',
//   // 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-745WwYDIno7yeLlem8m8LdP6/user-mY6F6rhw9ak81xvU1u3wt98i/img-MMIygFF0WX3OWlBwMw8kdthL.png?st=2023-12-18T12%3A22%3A00Z&se=2023-12-18T14%3A22%3A00Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-12-18T08%3A48%3A38Z&ske=2023-12-19T08%3A48%3A38Z&sks=b&skv=2021-08-06&sig=CKzYX64zbnAOTCqilMFxorrfl73csgcexjkMxoj%2BsjI%3D',
//   // 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-Wfu93ZpYhaLsFDvGw7DfU5Dn/user-4gjPoZp29oaKkTpMyo04eJPK/img-PYBnRGPnDI8FtZlx2HDI4Cek.png?st=2023-12-18T12%3A22%3A00Z&se=2023-12-18T14%3A22%3A00Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-12-17T18%3A57%3A02Z&ske=2023-12-18T18%3A57%3A02Z&sks=b&skv=2021-08-06&sig=O3ZK8cBRi/YSkC92m1ZFL3J5WZZu1TrdJ0c2xkf%2BZNE%3D',
// ];
export const createImageGeneration = async ({
  openai,
  payload,
}: {
  openai: OpenAI;
  payload: OpenAIImagePayload;
}) => {
  const res = await openai.images.generate({ ...payload, response_format: 'url' });

  const urls = res.data.map((o) => o.url) as string[];

  return new Response(JSON.stringify(urls));
};
