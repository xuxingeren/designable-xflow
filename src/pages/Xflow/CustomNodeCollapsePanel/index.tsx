import { NodeCollapsePanel } from '@antv/xflow';
import { FC } from 'react';
import * as panelConfig from './config-dnd-panel';

const CustomNodeCollapsePanel: FC = () => {
  return (
    <NodeCollapsePanel
      header={<h4 className="dnd-panel-header"> 组件面板 </h4>}
      footer={<div> Foorter </div>}
      onNodeDrop={panelConfig.onNodeDrop}
      searchService={panelConfig.searchService}
      nodeDataService={panelConfig.nodeDataService}
      position={{ top: 0, bottom: 0, left: 0, width: 290 }}
    />
  );
};

export default CustomNodeCollapsePanel;
