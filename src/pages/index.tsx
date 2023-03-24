import { useContext, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import ContainerBlock from '@/components/ContainerBlock/ContainerBlock';

import { AuthContext, AuthProvider } from '@/context/AuthContext';
import Main from '@/components/Main/Main';
import LoginModal from '@/components/LoginModal/LoginModal';
import { ModalProvider } from '@/context/ModalContext';

const Home = () => {
  const { authState, authDispatch } = useContext(AuthContext);

  const handleAuth = () => {
    if(!authState) {
      const token = localStorage.getItem('token');

      if(token && token.length > 0) {
        //Check if token is expired

        //If expired, remove token from localStorage
        //localStorage.removeItem('token');

        //Else, set authDispatch to true
        authDispatch({type: true});
      }
    } else {
      console.log('Logged in');
    }
  };

  useEffect(() => handleAuth(), [authState]);

  return (
    <>
      <ContainerBlock>
        <Main />
      </ContainerBlock>
      <LoginModal />
    </>
  );
};

export default Home;