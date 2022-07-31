import { Engine } from '@designable/core';
import {
  transformToSchema,
  transformToTreeNode,
} from '@designable/formily-transformer';
import { message } from 'antd';
import { LgetItem, LsetItem } from '@/utils/storage';
import { useHistory } from 'umi';

export const saveSchema = (designer: Engine) => {
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  let playgroundList = LgetItem('playgroundList') || [];
  playgroundList = playgroundList.map((s) => {
    if (s.id === searchParams.get('id')) {
      return {
        ...s,
        params: transformToSchema(designer.getCurrentTree()),
      };
    }
    return s;
  });
  LsetItem('playgroundList', playgroundList);
  message.success('保存成功');
};

export const loadInitialSchema = (designer: Engine) => {
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  const playgroundList = LgetItem('playgroundList') || [];
  const data = playgroundList.find((s) => s.id === searchParams.get('id'));
  try {
    designer.setCurrentTree(transformToTreeNode(data?.params || []));
  } catch {}
};
