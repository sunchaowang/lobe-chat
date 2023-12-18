import { Button } from 'antd';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import GalleyGrid from '@/components/GalleyGrid';
import { useChatStore } from '@/store/chat';
import { BuiltinRenderProps } from '@/types/tool';
import { DallEImageItem } from '@/types/tool/dalle';

import ImageItem from './Item';

const Dalle = memo<BuiltinRenderProps<DallEImageItem[]>>(({ content, messageId }) => {
  const generateImageFromPrompts = useChatStore((s) => s.generateImageFromPrompts);

  return (
    <Flexbox gap={16}>
      <GalleyGrid items={content.map((c) => ({ ...c, messageId }))} renderItem={ImageItem} />

      <Button
        block
        onClick={() => {
          generateImageFromPrompts(content, messageId);
        }}
        type={'primary'}
      >
        生成
      </Button>
      {/*{items.map((item, index) => (*/}
      {/*  <div key={`${item.prompt}-${index}`}>{item.prompt}</div>*/}
      {/*))}*/}
      {/*<FileList items={content.map((c) => c.id)} />*/}
    </Flexbox>
  );
});

export default Dalle;
