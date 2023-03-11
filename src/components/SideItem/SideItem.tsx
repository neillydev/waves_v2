import React from 'react';

import styles from '../../styles/SideItem/SideItem.module.css';

type SideItemProps = {
    icon: any;
    header: string;
    subHeader: string | null;
    path: string | null;
};

const SideItem = ({icon, header, subHeader, path}: SideItemProps) => {
  return (
    <a href={path ? path : ''} className={styles.sideItemWrapper}>
        {icon}
        <h2 className={styles.sideItemHeader}>{header}</h2>
        {subHeader ?? <h2 className={styles.sideItemSubheader}>{subHeader}</h2>}
    </a>
  )
}

export default SideItem