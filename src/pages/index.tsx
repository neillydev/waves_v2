import { useContext } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import ContainerBlock from '@/components/ContainerBlock/ContainerBlock'

import { AuthContext, AuthProvider } from '@/context/AuthContext';
import Main from '@/components/Main/Main'

const Home = () => {
  const { authState, authDispatch } = useContext(AuthContext);

  return (
    <ContainerBlock>
      <Main />
    </ContainerBlock>
  )
};

export default Home;