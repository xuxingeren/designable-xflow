import {
  NsNodeCollapsePanel,
  NsNodeCmd,
  uuidv4,
  XFlowNodeCommands,
  IFlowchartGraphProps,
  NsGraph,
} from '@antv/xflow';
import { PropsWithChildren } from 'react';
import Nodes from './Nodes';
import { getPorts } from './ports';

export const onNodeDrop: NsNodeCollapsePanel.IOnNodeDrop = async (
  nodeConfig,
  commandService,
) => {
  const args: NsNodeCmd.AddNode.IArgs = {
    nodeConfig: { ...nodeConfig, id: uuidv4(), ports: getPorts() },
  };
  commandService.executeCommand<NsNodeCmd.AddNode.IArgs>(
    XFlowNodeCommands.ADD_NODE.id,
    args,
  );
};

const renderNode = (
  props:
    | JSX.IntrinsicAttributes
    | PropsWithChildren<NsGraph.IReactNodeProps<any>>,
  style: { width: number; height: number },
) => {
  const Node = Nodes[props.data.renderKey];
  return Node ? <Node {...props} style={style} /> : null;
};

const nodeList = (arr: any[]) => {
  const newArr = arr.map((s) => {
    const attr = s.attr;
    return {
      popoverContent: () => <div>{s.label}</div>,
      renderKey: s.renderKey || 'CustomNode',
      renderComponent: (props: any) => renderNode(props, attr.style),
      label: s.label,
      id: s.id,
      attr: attr,
      ...attr.canvansStyle,
    };
  });
  return newArr;
};

export const nodeDataService: NsNodeCollapsePanel.INodeDataService =
  async () => {
    // 这里可以通过接口获取节点列表
    const resData = [
      {
        id: 1,
        renderKey: 'CustomNode',
        label: '开始',
        attr: {
          style: {
            width: 280,
            height: 40,
          },
          canvansStyle: {
            width: 120,
            height: 40,
          },
        },
      },
    ];
    return [
      {
        id: 'NODE',
        header: '节点',
        children: nodeList(resData),
      },
    ];
  };

export const useGraphConfig: IFlowchartGraphProps['useConfig'] = (config) => {
  console.log(config, Nodes);
  Object.keys(Nodes).map((key) => {
    config.setNodeRender(key, (props) => {
      return renderNode(props, props.size);
    });
  });
  // config.setDefaultNodeRender((props) => {
  //   return <Nodes.DefaultNode {...props} />;
  // });
};

export const searchService: NsNodeCollapsePanel.ISearchService = async (
  nodes: NsNodeCollapsePanel.IPanelNode[] = [],
  keyword: string,
) => {
  const list = nodes.filter((node) => node?.label?.includes(keyword));
  return list;
};
