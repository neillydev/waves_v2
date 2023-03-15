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
    <a href={path ? path : ''} className={subHeader?.includes('@') ? styles.featuredItemWrapper : styles.sideItemWrapper}>
        {icon}
        <h2 className={`${subHeader?.includes('@') ? styles.featuredItemHeader : ''} ${styles.sideItemHeader}`}>{header}</h2>
        <h4 className={styles.featuredItemSubheader}>{subHeader}</h4>
    </a>
  );
};

export default SideItem;