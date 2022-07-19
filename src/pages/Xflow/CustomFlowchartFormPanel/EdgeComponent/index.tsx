import { NsJsonSchemaForm } from '@antv/xflow';
import { Input, Button, Form, Spin } from 'antd';
import { set } from 'lodash';
import { FC, useEffect, useState } from 'react';
import Header from '../Header';
import styles from './index.less';
interface EdgeComponentProps {
  updateEdge: any;
  targetData: NsJsonSchemaForm.TargetData;
}

const EdgeComponent: FC<EdgeComponentProps> = (props) => {
  const { updateEdge, targetData } = props;
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ...targetData?.attrs?.attribute,
    });
    setLoading(false);
  }, [targetData]);

  const onFinish = (values: any) => {
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
  };

  return (
    <div className={styles.edgeComponent}>
      <Header title="连线编辑" />
      <Spin spinning={loading}>
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="key" label="key">
            <Input />
          </Form.Item>
          <Form.Item name="value" label="value">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form>
      </Spin>
    </div>
  );
};

export default EdgeComponent;
