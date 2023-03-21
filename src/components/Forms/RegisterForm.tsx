import React, { useState } from 'react';

import styles from '../../styles/LoginModal/LoginModal.module.css';

type RegisterForm = {
    email: string;
    username: string;
    password: string;
}

const RegisterForm = () => {
    const [registerFormValues, setRegisterFormValues] = useState<RegisterForm>({
        username: '',
        email: '',
        password: '',
    });

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registerFormValues),
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
        <form className={styles.loginForm} onSubmit={(e) => handleRegister(e)}>
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
                <input type="password" placeholder='Password' className={`${styles.loginInput} ${styles.passwordInput}`} onClick={(e) => {
                    e.stopPropagation();
                }} />
            </div>
            <button type='submit' className={styles.loginFormSubmit}>Register</button>
        </form>
    );
};

export default RegisterForm;