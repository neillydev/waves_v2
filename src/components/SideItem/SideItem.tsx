import { AuthContext } from '@/context/AuthContext';
import { ModalContext } from '@/context/ModalContext';
import React, { useContext } from 'react';

import styles from '../../styles/SideItem/SideItem.module.css';
import { ViewType } from '../Main/Main';
import { useRouter } from 'next/router';

type SideItemProps = {
  icon: any;
  header: string;
  subHeader: string | null;
  path: string | null;
  account: boolean | null;
  selected?: boolean | null;
  authRequired: boolean;
  disabled?: boolean;
  viewType?: ViewType;
  setViewType?: React.Dispatch<React.SetStateAction<any>>;
};

const SideItem = ({ icon, header, subHeader, path, account, selected, authRequired, viewType, disabled, setViewType, }: SideItemProps) => {
  const router = useRouter();

  const { authState } = useContext(AuthContext);
  const { modalDispatch } = useContext(ModalContext);

  const handleSideItem = (event: React.MouseEvent) => {
    event.preventDefault();
    
    if(disabled) return;

    if(!authState && !selected && authRequired) {
      event.preventDefault();
      modalDispatch({ type: true });
      return;
    }
    if(setViewType) {
      setViewType(viewType);
    }

    if(path) {
      router.push(path);
    }
  };

  return (
    <a onClick={(e) => handleSideItem(e)} href={path ? path : ''} className={`${disabled ? styles.disabled : ''} ${!selected || styles.selected} ${subHeader?.includes('@') ? styles.featuredItemWrapper : styles.sideItemWrapper}`}>
      {account ? <img className={`${styles.profileImg}`} src={icon}></img> : icon}
      <div className={`${styles.featuredItemTitle}`}>
        <h2 className={`${subHeader?.includes('@') ? styles.featuredItemHeader : ''} ${styles.sideItemHeader}`}>{header}</h2>
        <h4 className={styles.featuredItemSubheader}>{subHeader}</h4>
      </div>
    </a>
  );
};

export default SideItem;