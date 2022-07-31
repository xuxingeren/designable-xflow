import { FC, Ref, useEffect, useImperativeHandle, useState } from 'react';
import { Modal } from 'antd';
import { FormItem, Input, FormDialog, FormLayout } from '@formily/antd';
import { createSchemaField } from '@formily/react';
import { LgetItem } from '@/utils/storage';

interface PreviewProps {
  previewRef: Ref<{ setVisible: (flag: boolean) => void }>;
  modalConfig: { [key: string]: any };
}

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
});

const Preview: FC<PreviewProps> = ({ previewRef, modalConfig }) => {
  const [visible, setVisible] = useState(false);
  useImperativeHandle(previewRef, () => ({
    setVisible,
  }));

  const [params, setParams] = useState({});

  useEffect(() => {
    if (modalConfig && visible) {
      const playgroundList = LgetItem('playgroundList') || [];
      const data = playgroundList.find((s) => s.id === modalConfig.id);
      setParams(data?.params || {});
    }
  }, [modalConfig, visible]);

  const handleOk = () => {};

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      title="模板预览"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <FormLayout {...params.form}>
        <SchemaField schema={params.schema} />
      </FormLayout>
    </Modal>
  );
};

export default Preview;
