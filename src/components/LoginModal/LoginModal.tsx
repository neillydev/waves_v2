import { ModalContext } from '@/context/ModalContext';
import React, { useContext } from 'react';

import styles from '../../styles/LoginModal/LoginModal.module.css';

const LoginModal = () => {
    const { modalState, modalDispatch } = useContext(ModalContext);

  return (
    <div className={`${modalState ? styles.modalActive : ''} ${styles.modalContainer}`}>
        <div className={styles.modalWrapper} onClick={() => modalDispatch({type: false})}>
            
        </div>
    </div>
  )
}

export default LoginModal;