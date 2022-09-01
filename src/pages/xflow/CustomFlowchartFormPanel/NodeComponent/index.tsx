import { FC, useEffect, useState } from 'react';
import { Button, Empty, message } from 'antd';
import { NsJsonSchemaForm, useXFlowApp } from '@antv/xflow';
import { Form, Submit } from '@formily/antd';
import { createForm } from '@formily/core';
import { set } from 'lodash';
import { request } from 'umi';
import tempSchemaField from '@/pages/playground/temp-schemaField';
import Header from '../Header';
import styles from './index.less';
import { LgetItem } from '@/utils/storage';

interface NodeComponentProps {
  updateNode: any;
  targetData: NsJsonSchemaForm.TargetData;
  readOnly?: boolean;
}

const NodeComponent: FC<NodeComponentProps> = (props) => {
  const [formilySchema, setFormilySchema] = useState<{ [key: string]: any }>(
    {},
  );
  const { updateNode, targetData, readOnly = false } = props;
  const SchemaField = tempSchemaField({
    $fetch: request,
  });

  const xflowApp = useXFlowApp();
  const form = createForm({
    values: {
      label: targetData?.label,
      ...targetData?.attrs?.attribute,
    },
    readOnly,
  });

  const onFinish = async (values: any) => {
    const grap = await xflowApp.getGraphInstance();
    const data: any = {
      ...targetData,
    };
    Object.keys(values).forEach((key: any) => {
      if (key === 'label') {
        set(data, key, values[key]);
      } else {
        set(data.attrs.attribute, key, values[key]);
      }
    });
    updateNode(data);
    message.success('暂存成功');
    // 失去焦点
    grap.resetSelection();
  };

  const delBtn = async () => {
    const grap = await xflowApp.getGraphInstance();
    grap.removeNode(targetData!.id);
  };

  useEffect(() => {
    // 这里用接口获取节点id关联的表单模板，我简写了
    if (targetData?.renderKey) {
      const playgroundList = LgetItem('playgroundList') || [];
      setFormilySchema(playgroundList[0]?.params ?? {});
    }
  }, [targetData]);

  const { form: formProps, schema } = formilySchema;
  return (
    <div className={styles.nodeComponent}>
      <Header title="节点编辑" />
      <div className="formBox">
        {schema && Object.keys(schema)?.length ? (
          <Form {...formProps} form={form} onAutoSubmit={onFinish}>
            <SchemaField schema={schema} />
            {readOnly ? null : <Submit block>保存</Submit>}
          </Form>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="无表单模板"
          />
        )}
      </div>
      {readOnly ? null : (
        <div className="delBtn">
          <Button size="large" block danger onClick={delBtn}>
            删除节点
          </Button>
        </div>
      )}
    </div>
  );
};

export default NodeComponent;
