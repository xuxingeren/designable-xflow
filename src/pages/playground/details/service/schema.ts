import { Engine } from '@designable/core';
import {
  transformToSchema,
  transformToTreeNode,
} from '@designable/formily-transformer';
import { message } from 'antd';
import { LgetItem, LsetItem } from '@/utils/storage';

function fixUrlHash(url: string) {
  let fixedUrl = new URL(url);
  let search = fixedUrl.search;
  let hash = fixedUrl.hash;
  const position = fixedUrl.hash.indexOf('?');
  if (search.length <= 1 && position >= 0) {
    search = hash.slice(position);
    hash = hash.slice(0, position);
    fixedUrl.hash = hash;
    fixedUrl.search = search;
    fixedUrl.href = fixedUrl.toString();
  }
  return fixedUrl;
}

export const saveSchema = (designer: Engine) => {
  const url = fixUrlHash(window.location.href);
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
  const url = fixUrlHash(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  const playgroundList = LgetItem('playgroundList') || [];
  const data = playgroundList.find((s) => s.id === searchParams.get('id'));
  try {
    designer.setCurrentTree(transformToTreeNode(data?.params || []));
  } catch {}
};
