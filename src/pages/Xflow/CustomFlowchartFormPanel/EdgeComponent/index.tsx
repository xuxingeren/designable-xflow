import { NsJsonSchemaForm } from '@antv/xflow';
import type { FC } from 'react';

interface EdgeComponentProps {
  updateEdge: any;
  targetData: NsJsonSchemaForm.TargetData;
}

const EdgeComponent: FC<EdgeComponentProps> = (props) => {
  const { updateEdge, targetData } = props;

  return <div>1111</div>;
};

export default EdgeComponent;
