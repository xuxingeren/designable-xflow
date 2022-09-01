import { FC, useEffect, useState } from 'react';
import { Empty, Button } from 'antd';
import { useXFlowApp, NsJsonSchemaForm } from '@antv/xflow';
import { Form, Submit } from '@formily/antd';
import { createForm } from '@formily/core';
import { set } from 'lodash';
import { request } from 'umi';
import tempSchemaField from '@/pages/playground/temp-schemaField';
import Header from '../Header';
import styles from './index.less';
import { LgetItem } from '@/utils/storage';

interface EdgeComponentProps {
  updateEdge: any;
  targetData: NsJsonSchemaForm.TargetData;
  readOnly?: boolean;
}

const EdgeComponent: FC<EdgeComponentProps> = (props) => {
  const [formilySchema, setFormilySchema] = useState<{ [key: string]: any }>(
    {},
  );
  const { updateEdge, targetData, readOnly = false } = props;
  const SchemaField = tempSchemaField({
    $fetch: request,
  });

  const xflowApp = useXFlowApp();

  const form = createForm({
    values: targetData!.attrs ?? {},
    readOnly,
  });

  const onFinish = async (values: any) => {
    const grap = await xflowApp.getGraphInstance();
    const data: any = {
      ...targetData,
    };
    Object.keys(values).forEach((key: any) => {
      if (!data.attrs?.attribute) {
        set(data.attrs, 'attribute', {});
      }
      set(data.attrs.attribute, key, values[key]);
    });
    updateEdge(data);
    grap.resetSelection();
  };

  const delBtn = async () => {
    const grap = await xflowApp.getGraphInstance();
    grap.removeEdge(targetData!.id);
  };

  useEffect(() => {
    // 这里用接口获取节点id关联的表单模板，我简写了
    const playgroundList = LgetItem('playgroundList') || [];
    setFormilySchema(playgroundList[0]?.params ?? {});
  }, []);

  const { form: formProps, schema } = formilySchema;

  return (
    <div className={styles.edgeComponent}>
      <Header title="连线编辑" />
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
            删除连线
          </Button>
        </div>
      )}
    </div>
  );
};

export default EdgeComponent;
