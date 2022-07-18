import { FC, useEffect, useState } from 'react';
import { Input, Form, Spin, Button, Select } from 'antd';
import { NsJsonSchemaForm } from '@antv/xflow';
import { set } from 'lodash';
import styles from './index.less';

const { Option } = Select;

interface NodeComponentProps {
  updateNode: any;
  targetData: NsJsonSchemaForm.TargetData;
}

const NodeComponent: FC<NodeComponentProps> = (props) => {
  const { updateNode, targetData } = props;
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      label: targetData?.label,
      ...targetData?.attr.attribute,
    });
    setLoading(false);
  }, [targetData]);

  const onFinish = (values: any) => {
    const data: any = {
      ...targetData,
    };
    Object.keys(values).forEach((key: any) => {
      if (key === 'label') {
        set(data, key, values[key]);
      } else {
        set(data.attr.attribute, key, values[key]);
      }
    });
    updateNode(data);
  };

  return (
    <div className={styles.nodeComponent}>
      <Spin spinning={loading}>
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="label" label="节点名">
            <Input />
          </Form.Item>
          <Form.Item name="type" label="类型">
            <Input />
          </Form.Item>
          <Form.Item name="tag" label="类型">
            <Select mode="multiple">
              <Option key={1}>1</Option>
              <Option key={2}>2</Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form>
      </Spin>
    </div>
  );
};

export default NodeComponent;
