import type { FC } from 'react';
import type { NsNodeCollapsePanel } from '@antv/xflow';

interface CustomNodeProps {
  data: NsNodeCollapsePanel.IPanelNode;
  isNodePanel: boolean;
  style: React.CSSProperties;
}

const CustomNode: FC<CustomNodeProps> = ({ data, style, isNodePanel }) => {
  return <div style={style}>{data.label}</div>;
};

export default CustomNode;
