import { ModalContext } from '@/context/ModalContext';
import React, { useContext } from 'react';

import styles from '../../styles/LoginModal/LoginModal.module.css';

const LoginModal = () => {
    const { modalState, modalDispatch } = useContext(ModalContext);

  return (
    <div className={`${modalState ? styles.modalActive : ''} ${styles.modalContainer}`}>
        <div className={styles.modalWrapper} onClick={() => modalDispatch({type: false})}>
            <div className={styles.loginModalContainer}>
                <div className={styles.loginModalWrapper}>
                    <h2>Login to Waves</h2>
                    <ul className={styles.loginList}>
                        <li className={styles.loginItem}>
                            <div className={styles.loginIcon}>

                            </div>
                            <h3>Login with email / username</h3>
                        </li>
                    </ul>
                    <div className={styles.registerWrapper}>
                        <h3>Don't have an account?</h3>
                        <span className={styles.spanSeparator} />
                        <span className={styles.registerSpan}>Register</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginModal;