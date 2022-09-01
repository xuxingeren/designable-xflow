import { FC } from 'react';
import styles from './index.less';

const Header: FC<{ title: string }> = ({ title }) => {
  return <div className={styles.header}>{title}</div>;
};

export default Header;
