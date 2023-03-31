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

    const handleUsernameChange = (event: any) => {
        setRegisterFormValues({...registerFormValues, username: event.target.value});
    };

    const handlePasswordChange = (event: any) => {
        setRegisterFormValues({...registerFormValues, password: event.target.value});
    };

    const handleEmailChange = (event: any) => {
        setRegisterFormValues({...registerFormValues, email: event.target.value});
    };

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registerFormValues),
            });

            if (response.status === 200) {
                const {token, user_profile: { avatar }} = await response.json();
                localStorage.setItem('token', token);
                localStorage.setItem('avatar', avatar);

                window.location.reload();

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
                }}
                onChange={handleEmailChange} />
            </div>
            <div className={styles.inputContainer}>
                <h3>Username</h3>
                <input type="text" placeholder='Username' className={styles.loginInput} onClick={(e) => {
                    e.stopPropagation();
                }} 
                onChange={handleUsernameChange} />
            </div>
            <div className={styles.inputContainer}>
                <h3>Password</h3>
                <input type="password" placeholder='Password' className={`${styles.loginInput} ${styles.passwordInput}`} onClick={(e) => {
                    e.stopPropagation();
                }}
                onChange={handlePasswordChange} />
            </div>
            <button type='submit' className={styles.loginFormSubmit}>Register</button>
        </form>
    );
};

export default RegisterForm;