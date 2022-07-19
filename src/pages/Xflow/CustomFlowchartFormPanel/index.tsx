import type {
  NsNodeCmd,
  NsGraph,
  NsEdgeCmd,
  NsJsonSchemaForm,
} from '@antv/xflow';
import {
  JsonSchemaForm,
  XFlowNodeCommands,
  XFlowEdgeCommands,
} from '@antv/xflow';
import { FC } from 'react';
import { CanvasService, canvasSchema } from './CanvasService';
import NodeComponent from './NodeComponent';
import EdgeComponent from './EdgeComponent';

namespace NsJsonForm {
  export const getCustomRenderComponent: NsJsonSchemaForm.ICustomRender = (
    targetType,
    targetData,
    _modelService,
    commandService,
  ) => {
    const updateNode = (node: NsGraph.INodeConfig) => {
      return commandService.executeCommand<NsNodeCmd.UpdateNode.IArgs>(
        XFlowNodeCommands.UPDATE_NODE.id,
        { nodeConfig: node },
      );
    };
    const updateEdge = (edge: NsGraph.IEdgeConfig) => {
      return commandService.executeCommand<NsEdgeCmd.UpdateEdge.IArgs>(
        XFlowEdgeCommands.UPDATE_EDGE.id,
        { edgeConfig: edge, options: {} },
      );
    };
    if (targetType === 'node') {
      return () => (
        <NodeComponent updateNode={updateNode} targetData={targetData} />
      );
    }
    if (targetType === 'edge') {
      return () => (
        <EdgeComponent updateEdge={updateEdge} targetData={targetData} />
      );
    }
    if (targetType === 'canvas') {
      return () => <CanvasService />;
    }

    return null;
  };
  export const formSchemaService: NsJsonSchemaForm.IFormSchemaService = async (
    args,
  ) => {
    return canvasSchema();
  };
}

const CustomFlowchartFormPanel: FC = () => {
  return (
    <JsonSchemaForm
      targetType={['canvas', 'node', 'edge']}
      formSchemaService={NsJsonForm.formSchemaService}
      getCustomRenderComponent={NsJsonForm.getCustomRenderComponent}
      position={{ top: 40, bottom: 0, right: 0, width: 400 }}
    />
  );
};

export default CustomFlowchartFormPanel;
