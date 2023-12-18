import { memo, useMemo } from 'react';
import { Flexbox } from 'react-layout-kit';

import Loading from '../Loading';

export interface BuiltinTypeProps {
  content: string;
  id: string;
  identifier?: string;
  loading?: boolean;
}

const BuiltinType = memo<BuiltinTypeProps>(({ content, id, identifier, loading }) => {
  let isJSON = true;
  try {
    JSON.parse(content);
  } catch {
    isJSON = false;
  }

  const contentObj = useMemo<object>(() => (isJSON ? JSON.parse(content) : content), [content]);

  if (!isJSON) {
    return (
      loading && (
        <Flexbox gap={8}>
          <Loading />
        </Flexbox>
      )
    );
  }
  console.log(identifier, contentObj);
  return <div>123</div>;
});

export default BuiltinType;
