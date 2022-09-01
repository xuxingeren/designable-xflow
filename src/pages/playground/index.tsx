import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import { FormItem, Input, FormDialog, FormLayout } from '@formily/antd';
import { createSchemaField } from '@formily/react';
import { Dropdown, Menu, Popconfirm, Space, Button } from 'antd';
import { FC, useRef, useState } from 'react';
import Preview from './Preview';
import { LgetItem, LsetItem } from '@/utils/storage';
import { uuidv4 } from '@antv/xflow';
import { history } from 'umi';

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
});

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: '模板名',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
};

const Playground: FC = () => {
  const [modalConfig, setModalConfig] = useState<{ [key: string]: any }>({});
  const previewRef = useRef<{ setVisible: (flag: boolean) => void }>(null);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<any>[] = [
    {
      dataIndex: 'name',
      title: '模板名',
    },
    {
      dataIndex: 'params',
      title: '是否配置',
      renderText(text, record, index, action) {
        return text ? '是' : '否';
      },
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => {
        return [
          <a
            key="preview"
            onClick={() => {
              setModalConfig(record);
              previewRef.current?.setVisible(true);
            }}
          >
            预览
          </a>,
          <a key="edit" onClick={() => handleEdit(record)}>
            配置
          </a>,
          <a key="del" onClick={() => handleDel(record)}>
            删除
          </a>,
        ];
      },
    },
  ];

  const handleEdit = (record: any) => {
    history.push(`/playground/details?id=${record.id}`);
  };

  const handleDel = (record: any) => {
    const playgroundList = LgetItem('playgroundList') || [];
    LsetItem(
      'playgroundList',
      playgroundList.filter((s: { id: string }) => s.id !== record.id),
    );
    actionRef.current?.reload();
  };

  const handleAdd = () => {
    FormDialog('新增模板', () => {
      return (
        <FormLayout labelCol={6} wrapperCol={10}>
          <SchemaField schema={schema} />
        </FormLayout>
      );
    })
      .forOpen((payload, next) => {
        next({
          initialValues: {
            name: '',
          },
        });
      })
      .forConfirm((payload, next) => {
        const playgroundList = LgetItem('playgroundList') || [];
        playgroundList.push({
          name: payload.getFormState().values.name,
          id: uuidv4(),
        });
        LsetItem('playgroundList', playgroundList);
        actionRef.current?.reload();
        next(payload);
      })
      .forCancel((payload, next) => {
        next(payload);
      })
      .open()
      .then(console.log);
  };

  const getData = async (params: any) => {
    const data = LgetItem('playgroundList');
    return {
      data: data ?? [],
      success: true,
      total: data?.length ?? 0,
    };
  };

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={async (params: any, _sorter: any, _filter: any) => {
          return await getData(params);
        }}
        rowKey="id"
        pagination={{
          showQuickJumper: true,
        }}
        toolBarRender={() => [
          <Button key="button" type="primary" onClick={handleAdd}>
            新增
          </Button>,
        ]}
      />
      <Preview previewRef={previewRef} modalConfig={modalConfig} />
    </PageContainer>
  );
};

export default Playground;
