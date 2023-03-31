import { AuthContext } from '@/context/AuthContext';
import { ModalContext } from '@/context/ModalContext';
import React, { useContext } from 'react';

import styles from '../../styles/SideItem/SideItem.module.css';

type SideItemProps = {
  icon: any;
  header: string;
  subHeader: string | null;
  path: string | null;
  account: boolean | null;
  selected?: boolean | null;
};

const SideItem = ({ icon, header, subHeader, path, account, selected }: SideItemProps) => {

  const { authState } = useContext(AuthContext);
  const { modalDispatch } = useContext(ModalContext);

  const handleSideItem = (event: React.MouseEvent) => {
    if(selected) event.preventDefault();

    if(!authState && !selected) {
      event.preventDefault();
      modalDispatch({ type: true })
      console.log('Dispatch modal')
    }
  };

  return (
    <a onClick={(e) => handleSideItem(e)} href={path ? path : ''} className={`${!selected || styles.selected} ${subHeader?.includes('@') ? styles.featuredItemWrapper : styles.sideItemWrapper}`}>
      {account ? <img className={styles.profileImg} src={icon}></img> : icon}
      <div className={styles.featuredItemTitle}>
        <h2 className={`${subHeader?.includes('@') ? styles.featuredItemHeader : ''} ${styles.sideItemHeader}`}>{header}</h2>
        <h4 className={styles.featuredItemSubheader}>{subHeader}</h4>
      </div>
    </a>
  );
};

export default SideItem;