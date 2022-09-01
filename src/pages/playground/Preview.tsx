import { FC, Ref, useEffect, useImperativeHandle, useState } from 'react';
import { Modal } from 'antd';
import { request } from 'umi';
import { Form, Submit } from '@formily/antd';
import tempSchemaField from '@/pages/playground/temp-schemaField';
import { LgetItem } from '@/utils/storage';
import { createForm } from '@formily/core';

interface PreviewProps {
  previewRef: Ref<{ setVisible: (flag: boolean) => void }>;
  modalConfig: { [key: string]: any };
}

const Preview: FC<PreviewProps> = ({ previewRef, modalConfig }) => {
  const [visible, setVisible] = useState(false);
  const [params, setParams] = useState<{ [key: string]: any }>({});
  const normalForm = createForm({});
  const SchemaField = tempSchemaField({
    $fetch: request,
  });

  useImperativeHandle(previewRef, () => ({
    setVisible,
  }));
  useEffect(() => {
    if (modalConfig && visible) {
      const playgroundList = LgetItem('playgroundList') || [];
      const data = playgroundList.find(
        (s: { id: string }) => s.id === modalConfig.id,
      );
      setParams(data?.params || {});
    }
    request('/api/users', {
      params: {
        id: 1,
      },
    }).then((res) => {
      console.log(res);
    });
  }, [modalConfig, visible]);

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <Modal
      title="模板预览"
      visible={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={normalForm} onAutoSubmit={console.log} {...params.form}>
        <SchemaField schema={params.schema} />
        <Submit block>保存</Submit>
      </Form>
    </Modal>
  );
};

export default Preview;
