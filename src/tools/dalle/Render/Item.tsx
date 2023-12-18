import { Spin } from 'antd';
import { createStyles } from 'antd-style';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import ImageFileItem from '@/components/FileList/ImageFileItem';
import { useChatStore } from '@/store/chat';
import { chatEnhanceSelectors } from '@/store/chat/selectors/enchance';
import { DallEImageItem } from '@/types/tool/dalle';

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    border: 1px solid ${token.colorBorder};
    border-radius: 8px;
  `,
}));

const ImageItem = memo<DallEImageItem & { messageId: string }>(({ prompt, messageId, imageId }) => {
  const { styles } = useStyles();
  const loading = useChatStore(chatEnhanceSelectors.isDallEImageGenerating(messageId + prompt));

  return (
    <Flexbox className={styles.container} padding={8}>
      {loading && <Spin />}
      {!imageId ? prompt : <ImageFileItem id={imageId} />}
    </Flexbox>
  );
});

export default ImageItem;
