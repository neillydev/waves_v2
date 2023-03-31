import React, { useContext } from 'react';

import UserSVG from '../../../public/user.svg';
import CogSVG from '../../../public/cog.svg';
import LogOutSVG from '../../../public/logout.svg';

import styles from '../../styles/Navbar/Navbar.module.css';
import { AuthContext } from '@/context/AuthContext';

const Dropdown = () => {
    const { authDispatch } = useContext(AuthContext);

    const handleLogout = async (event: any) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('api/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                localStorage.removeItem('token');
                authDispatch({type: false});

                window.location.reload();
            } else {
                // switch errors and handle accordingly
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className={styles.dropContainer}>
            <div className={styles.dropWrapper}>

            </div>
            <ul className={styles.dropList}>
                <li className={styles.dropHeader}>
                </li>
                <li className={styles.dropItem}>
                    <UserSVG />
                    <span>Profile</span>
                </li>
                <li className={styles.dropItem}>
                    <CogSVG />
                    <span>Settings</span>
                </li>
                <span className={styles.separator}></span>
                <li className={styles.dropItem} onClick={handleLogout}>
                    <LogOutSVG />
                    <span>Log Out</span>
                </li>
            </ul>
        </div>
    )
}

export default Dropdown