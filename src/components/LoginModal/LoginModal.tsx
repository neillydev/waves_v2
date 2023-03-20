import { ModalContext } from '@/context/ModalContext';
import React, { useContext, useEffect, useState } from 'react';

import styles from '../../styles/LoginModal/LoginModal.module.css';
import LoginForm from '../Forms/LoginForm';
import RegisterForm from '../Forms/RegisterForm';

enum FormType {
    LOGIN = 0,
    REGISTER = 1
};

const LoginModal = () => {
    const { modalState, modalDispatch } = useContext(ModalContext);

    const [loginForm, setLoginForm] = useState<FormType | null>(null);

    return (
        <div className={`${modalState ? styles.modalActive : ''} ${styles.modalContainer}`}>
            <div className={styles.modalWrapper} onClick={() => {
                setLoginForm(null);
                modalDispatch({ type: false })
            }}>
                <div className={styles.loginModalContainer} onClick={(e) => {
                    e.stopPropagation();
                }}>
                    <div className={styles.loginModalWrapper}>
                        <h2>Login to Waves</h2>

                        {
                            loginForm === null ?
                                <ul className={styles.loginList}>
                                    <li className={styles.loginItem} onClick={() => setLoginForm(FormType.LOGIN)}>
                                        <div className={styles.loginIcon}>

                                        </div>
                                        <h3>Login with email / username</h3>
                                    </li>
                                </ul>
                                :
                                (loginForm === FormType.LOGIN ? <LoginForm /> : (loginForm !== FormType.REGISTER || <RegisterForm />))
                        }
                        <div className={styles.registerWrapper}>
                            <h3>{loginForm === null || loginForm === FormType.LOGIN ? 'Don\'t have an account?' : 'Already have an account?' }</h3>
                            <span className={styles.spanSeparator} />
                            <span className={styles.registerSpan} onClick={() => setLoginForm(loginForm === null || loginForm === FormType.LOGIN ? FormType.REGISTER : FormType.LOGIN)}>{loginForm === null || loginForm === FormType.LOGIN ? 'Register' : 'Login'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginModal;