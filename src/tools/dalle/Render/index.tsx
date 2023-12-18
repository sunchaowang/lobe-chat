import { memo } from 'react';

import FileList from '@/components/FileList';
import { BuiltinRender, BuiltinRenderProps } from '@/types/tool';
import { DalleImageItem } from '@/types/tool/dalle';

const Dalle = memo<BuiltinRenderProps<DalleImageItem[]>>(({ content, identifier, messageId }) => {
  return (
    <div>
      <FileList items={content.map((c) => c.id)} />
    </div>
  );
});

export default Dalle;
