import React from 'react';

import styles from '../../styles/LoginModal/LoginModal.module.css';

const LoginForm = () => {

    return (
        <form className={styles.loginForm}>
            <div className={styles.inputContainer}>
                <h3>Email or username</h3>
                <input type="text" placeholder='Email or username' className={styles.loginInput} onClick={(e) => {
                    e.stopPropagation();
                }} />
            </div>
            <div className={styles.inputContainer}>
                <input type="password"  placeholder='Password' className={`${styles.loginInput} ${styles.passwordInput}`} onClick={(e) => {
                    e.stopPropagation();
                }} />
                <h4>Forgot password?</h4>
            </div>
            <button className={styles.loginFormSubmit}>Login</button>
        </form>
    );
};

export default LoginForm;