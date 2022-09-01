import React, { useEffect } from 'react';
import { Space, Button, Radio } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { useDesigner, TextWidget } from '@designable/react';
import { GlobalRegistry } from '@designable/core';
import { observer } from '@formily/react';
import { loadInitialSchema, saveSchema } from '../service';
import { history } from 'umi';

export const ActionsWidget = observer(() => {
  const designer = useDesigner();
  useEffect(() => {
    loadInitialSchema(designer);
  }, []);
  const supportLocales = ['zh-cn', 'en-us', 'ko-kr'];
  useEffect(() => {
    if (!supportLocales.includes(GlobalRegistry.getDesignerLanguage())) {
      GlobalRegistry.setDesignerLanguage('zh-cn');
    }
  }, []);
  return (
    <Space style={{ marginRight: 10 }}>
      <Button href="https://xuxin123.com">陌路凡歌</Button>
      <Button
        href="https://github.com/xuxingeren/designable-xflow"
        target="_blank"
      >
        <GithubOutlined />
        Github
      </Button>
      <Button
        type="primary"
        onClick={() => {
          saveSchema(designer);
        }}
      >
        <TextWidget>Save</TextWidget>
      </Button>
      <Button
        onClick={() => {
          history.goBack();
        }}
      >
        <TextWidget>返回</TextWidget>
      </Button>
    </Space>
  );
});
