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
import { set } from 'lodash';

namespace NsJsonForm {
  export const formValueUpdateService: NsJsonSchemaForm.IFormValueUpdateService =
    async (args) => {
      const { values, commandService, targetData } = args;
      if (!targetData) {
        return;
      }
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
      const data: NsGraph.INodeConfig = {
        ...targetData,
      };
      values.forEach((val) => {
        set(data, val.name, val.value);
      });
      if (args.targetType === 'edge') {
        updateEdge(data as NsGraph.IEdgeConfig);
      } else if (args.targetType === 'node') {
        updateNode(data as NsGraph.INodeConfig);
      }
    };
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
    // if (targetType === 'canvas') {
    //   console.log('canvas');
    //   return () => {
    //     <div>12312321</div>;
    //   };
    // }
    return null;
  };
  export const controlMapService: NsJsonSchemaForm.IControlMapService = (
    contronlMap,
  ) => {
    contronlMap.set('canvas-service', CanvasService);
    return contronlMap;
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
      controlMapService={NsJsonForm.controlMapService}
      formSchemaService={NsJsonForm.formSchemaService}
      formValueUpdateService={NsJsonForm.formValueUpdateService}
      getCustomRenderComponent={NsJsonForm.getCustomRenderComponent}
      position={{ top: 40, bottom: 0, right: 0, width: 500 }}
    />
  );
};

export default CustomFlowchartFormPanel;
