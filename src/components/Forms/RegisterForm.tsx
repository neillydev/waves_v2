import React from 'react';

import styles from '../../styles/LoginModal/LoginModal.module.css';

const RegisterForm = () => {
  return (
    <form className={styles.loginForm}>
            <div className={styles.inputContainer}>
                <h3>Email</h3>
                <input type="text" placeholder='Email' className={styles.loginInput} onClick={(e) => {
                    e.stopPropagation();
                }} />
            </div>
            <div className={styles.inputContainer}>
                <h3>Username</h3>
                <input type="text" placeholder='Username' className={styles.loginInput} onClick={(e) => {
                    e.stopPropagation();
                }} />
            </div>
            <div className={styles.inputContainer}>
                <h3>Password</h3>
                <input type="password"  placeholder='Password' className={`${styles.loginInput} ${styles.passwordInput}`} onClick={(e) => {
                    e.stopPropagation();
                }} />
            </div>
            <button className={styles.loginFormSubmit}>Register</button>
        </form>
  );
};

export default RegisterForm;