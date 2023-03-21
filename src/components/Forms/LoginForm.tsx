import React, { useState } from 'react';

import styles from '../../styles/LoginModal/LoginModal.module.css';

type LoginForm = {
    login: string;
    password: string;
};


const LoginForm = () => {
    const [loginFormValues, setLoginFormValues] = useState<LoginForm>({
        login: '',
        password: '',
    });

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginFormValues),
            });

            if (response.status === 200) {
                //const data = await response.json();

            } else {
                // switch errors and handle accordingly
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <form className={styles.loginForm} onSubmit={handleLogin}>
            <div className={styles.inputContainer}>
                <h3>Email or username</h3>
                <input type="text" placeholder='Email or username' className={styles.loginInput} onClick={(e) => {
                    e.stopPropagation();
                }} />
            </div>
            <div className={styles.inputContainer}>
                <input type="password" placeholder='Password' className={`${styles.loginInput} ${styles.passwordInput}`} onClick={(e) => {
                    e.stopPropagation();
                }} />
                <h4>Forgot password?</h4>
            </div>
            <button type='submit' className={styles.loginFormSubmit}>Login</button>
        </form>
    );
};

export default LoginForm;