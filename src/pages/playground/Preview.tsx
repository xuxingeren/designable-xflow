import { FC, Ref, useEffect, useImperativeHandle, useState } from 'react';
import { Modal } from 'antd';
import { request } from 'umi';
import {
  FormItem,
  Input,
  Form,
  Submit,
  ArrayBase,
  ArrayCards,
  ArrayCollapse,
  ArrayItems,
  ArrayTable,
  ArrayTabs,
  BaseItem,
  Cascader,
  Checkbox,
  DatePicker,
  Editable,
  FormButtonGroup,
  FormCollapse,
  FormGrid,
  FormTab,
  GridColumn,
  NumberPicker,
  Password,
  PreviewText,
  Radio,
  Reset,
  Select,
  SelectTable,
  Space,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
} from '@formily/antd';
import { createSchemaField } from '@formily/react';
import { LgetItem } from '@/utils/storage';
import { createForm } from '@formily/core';

interface PreviewProps {
  previewRef: Ref<{ setVisible: (flag: boolean) => void }>;
  modalConfig: { [key: string]: any };
}

const SchemaField = createSchemaField({
  components: {
    Input,
    ArrayBase,
    ArrayCards,
    ArrayCollapse,
    ArrayItems,
    ArrayTable,
    ArrayTabs,
    BaseItem,
    Cascader,
    Checkbox,
    DatePicker,
    Editable,
    Form,
    FormButtonGroup,
    FormCollapse,
    FormGrid,
    FormItem,
    FormTab,
    GridColumn,
    NumberPicker,
    Password,
    PreviewText,
    Radio,
    Reset,
    Select,
    SelectTable,
    Space,
    Submit,
    Switch,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
  },
  scope: {
    $fetch: request,
  },
});

const Preview: FC<PreviewProps> = ({ previewRef, modalConfig }) => {
  const [visible, setVisible] = useState(false);
  useImperativeHandle(previewRef, () => ({
    setVisible,
  }));

  const [params, setParams] = useState({});
  const normalForm = createForm({});
  useEffect(() => {
    if (modalConfig && visible) {
      const playgroundList = LgetItem('playgroundList') || [];
      const data = playgroundList.find((s) => s.id === modalConfig.id);
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
